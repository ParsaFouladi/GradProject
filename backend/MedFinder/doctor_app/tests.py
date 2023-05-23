from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Department, Doctor, DoctorContactInfo
from .serializers import DoctorSerializerRead, DoctorSerializerWrite
from rest_framework.exceptions import ErrorDetail


class DoctorTests(APITestCase):
    def setUp(self):
        self.department = Department.objects.create(name='Cardiology')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.doctor = Doctor.objects.create(user=self.user, specialty='Cardiologist', availability='Mon-Fri',
                                            department=self.department)
        self.contact_info = DoctorContactInfo.objects.create(doctor=self.doctor, phone_number='1234567890',
                                                             address='123 Main St')

    def test_get_doctor_list(self):
        url = '/doctors/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        doctors = Doctor.objects.all()
        serializer = DoctorSerializerRead(doctors, many=True)
        self.assertEqual(response.data, serializer.data)

    def test_get_doctor_detail(self):
        url = '/doctors/{}/'.format(self.doctor.pk)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        serializer = DoctorSerializerRead(self.doctor)
        self.assertEqual(response.data, serializer.data)

    def test_create_doctor(self):
        url = '/doctors/create/'
        data = {
            'user': {
                'username': 'newuser',
                'password': 'newpassword'
            },
            'specialty': 'Dermatologist',
            'availability': 'Mon-Wed',
            'department': {
                'name': 'Dermatology'
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Doctor.objects.count(), 2)

    def test_update_doctor(self):
        url = '/doctors/update/{}/'.format(self.doctor.pk)
        data = {
            'specialty': 'Updated Specialty',
            'availability': 'Mon-Thu',
            'department': {
                'name': 'Updated Department'
            }
        }
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.doctor.refresh_from_db()
        self.assertEqual(self.doctor.specialty, 'Updated Specialty')
        
        

    def test_create_doctor_missing_fields(self):
        url = '/doctors/create/'
        data = {
            'user': {
                'username': 'newuser',
                # Missing 'password' field
            },
            # Missing 'specialty' field
            'availability': 'Mon-Wed',
            'department': {
                'name': 'Dermatology'
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            'user': {
                'password': [ErrorDetail(string='This field is required.', code='required')]
            },
            'specialty': [ErrorDetail(string='This field is required.', code='required')]
        })
        self.assertEqual(Doctor.objects.count(), 1)  # No new doctor should be created

    def test_create_doctor_invalid_data_type(self):
        url = '/doctors/create/'
        data = {
            'user': {
                'username': 'newuser',
                'password': 'newpassword'
            },
            'specialty': 'Dermatologist',
            'availability': 123,  # Invalid data type (should be a string)
            'department': {
                'name': 'Dermatology'
            }
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            'availability': [ErrorDetail(string='Enter a valid value.', code='invalid')]
        })
        self.assertEqual(Doctor.objects.count(), 1)  # No new doctor should be created
        
        
class ModelsTestCase(TestCase):
    def setUp(self):
        self.department = Department.objects.create(name='Department 1', description='Description 1')
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.doctor = Doctor.objects.create(user=self.user, specialty='Specialty 1', availability='Availability 1', department=self.department)
        self.doctor_contact = DoctorContactInfo.objects.create(doctor=self.doctor, phone_number='1234567890', address='Address 1')

    def test_department_model(self):
        department = Department.objects.get(name='Department 1')
        self.assertEqual(department.name, 'Department 1')
        self.assertEqual(department.description, 'Description 1')

    def test_doctor_model(self):
        doctor = Doctor.objects.get(user=self.user)
        self.assertEqual(doctor.user.username, 'testuser')
        self.assertEqual(doctor.specialty, 'Specialty 1')
        self.assertEqual(doctor.availability, 'Availability 1')
        self.assertEqual(doctor.department, self.department)

    def test_doctor_contact_model(self):
        doctor_contact = DoctorContactInfo.objects.get(doctor=self.doctor)
        self.assertEqual(doctor_contact.doctor.user.username, 'testuser')
        self.assertEqual(doctor_contact.phone_number, '1234567890')
        self.assertEqual(doctor_contact.address, 'Address 1')


