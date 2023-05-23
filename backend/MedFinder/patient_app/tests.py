from django.test import TestCase
from django.contrib.auth.models import User
from .models import Patient, PatientContactInfo, Insurance
from .serializers import PatientSerializer
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse


class PatientModelTest(TestCase): 
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')

    def test_patient_creation(self):
        self.assertEqual(self.patient.user, self.user)
        self.assertEqual(self.patient.first_name, 'John')
        self.assertEqual(self.patient.last_name, 'Doe')

    def test_patient_str_representation(self):
        patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')
        self.assertEqual(str(patient), 'John Doe')


class PatientSerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.data = {
            'user': self.user.id,
            'first_name': 'John',
            'last_name': 'Doe',
            'contact_info': {
                'phone_number': '123456789',
                'address': '123 Test Street'
            },
            'insurance': {
                'insurance_number': '123456789',
                'provider': 'Test Provider',
                'valid_from': '2023-01-01',
                'valid_to': '2024-01-01'
            }
        }

    def test_patient_serializer(self):
        serializer = PatientSerializer(data=self.data)
        serializer.is_valid()
        patient = serializer.save()

        self.assertEqual(patient.user, self.user)
        self.assertEqual(patient.first_name, 'John')
        self.assertEqual(patient.last_name, 'Doe')

        contact_info = patient.contact_info
        self.assertEqual(contact_info.phone_number, '123456789')
        self.assertEqual(contact_info.address, '123 Test Street')

        insurance = patient.insurance
        self.assertEqual(insurance.insurance_number, '123456789')
        self.assertEqual(insurance.provider, 'Test Provider')
        self.assertEqual(str(insurance.valid_from), '2023-01-01')
        self.assertEqual(str(insurance.valid_to), '2024-01-01')

class PatientAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')

    def test_get_patient_detail(self):
        url = f'/patient_app/{self.patient.id}/'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'John')
        self.assertEqual(response.data['last_name'], 'Doe')

    def test_create_patient(self):
        url = '/patient_app/create/'
        data = {
            'user': self.user.id,
            'first_name': 'Jane',
            'last_name': 'Smith',
            'contact_info': {
                'phone_number': '987654321',
                'address': '456 Test Street'
            },
            'insurance': {
                'insurance_number': '987654321',
                'provider': 'Test Provider',
                'valid_from': '2023-01-01',
                'valid_to': '2024-01-01'
            }
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['first_name'], 'Jane')
        self.assertEqual(response.data['last_name'], 'Smith')

        patient = Patient.objects.get(first_name='Jane', last_name='Smith')
        self.assertEqual(patient.user, self.user)
        self.assertEqual(patient.first_name, 'Jane')
        self.assertEqual(patient.last_name, 'Smith')

        contact_info = patient.contact_info
        self.assertEqual(contact_info.phone_number, '987654321')
        self.assertEqual(contact_info.address, '456 Test Street')

        insurance = patient.insurance
        self.assertEqual(insurance.insurance_number, '987654321')
        self.assertEqual(insurance.provider, 'Test Provider')
        self.assertEqual(str(insurance.valid_from), '2023-01-01')
        self.assertEqual(str(insurance.valid_to), '2024-01-01')


    def test_get_patient_list(self):
        url = reverse('patient-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)  # Assuming there is only one patient in the database

    def test_update_patient(self):
        url = reverse('patient-detail', kwargs={'pk': self.patient.pk})
        data = {
            'first_name': 'Updated First Name',
            'last_name': 'Updated Last Name',
            'contact_info': {
                'phone_number': '987654321',
                'address': 'Updated Address'
            }
        }

        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.patient.refresh_from_db()
        self.assertEqual(self.patient.first_name, 'Updated First Name')
        self.assertEqual(self.patient.last_name, 'Updated Last Name')
        self.assertEqual(self.patient.contact_info.phone_number, '987654321')
        self.assertEqual(self.patient.contact_info.address, 'Updated Address')

    def test_delete_patient(self):
        url = reverse('patient-detail', kwargs={'pk': self.patient.pk})
        response = self.client.delete(url)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Patient.objects.filter(pk=self.patient.pk).exists())


    def test_create_patient_missing_fields(self):
        url = reverse('patient-create')
        data = {
            # Missing 'user' field
            # Missing 'first_name' field
            # Missing 'last_name' field
            'contact_info': {
                'phone_number': '987654321',
                'address': '456 Test Street'
            },
            'insurance': {
                'insurance_number': '987654321',
                'provider': 'Test Provider',
                'valid_from': '2023-01-01',
                'valid_to': '2024-01-01'
            }
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            'user': ['This field is required.'],
            'first_name': ['This field is required.'],
            'last_name': ['This field is required.'],
        })
        self.assertEqual(Patient.objects.count(), 1)  # No new patient should be created


    def test_create_patient_invalid_data_type(self):
        url = reverse('patient-create')
        data = {
            'user': 'invalid_id',  # Invalid user ID data type
            'first_name': 'Jane',
            'last_name': 'Smith',
            'contact_info': {
                'phone_number': '987654321',
                'address': '456 Test Street'
            },
            'insurance': {
                'insurance_number': '987654321',
                'provider': 'Test Provider',
                'valid_from': '2023-01-01',
                'valid_to': '2024-01-01'
            }
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            'user': ['Invalid pk "invalid_id" - object does not exist.'],
        })

    def test_create_patient_with_existing_user(self):
        url = reverse('patient-create')
        data = {
            'user': self.user.id,  # Existing user ID
            'first_name': 'Jane',
            'last_name': 'Smith',
            'contact_info': {
                'phone_number': '987654321',
                'address': '456 Test Street'
            },
            'insurance': {
                'insurance_number': '987654321',
                'provider': 'Test Provider',
                'valid_from': '2023-01-01',
                'valid_to': '2024-01-01'
            }
        }

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, {
            'user': ['This user already has a patient entry.'],
        })




class PatientContactInfoModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')
        self.contact_info = PatientContactInfo.objects.create(patient=self.patient, phone_number='123456789', address='123 Test Street')

    def test_contact_info_str_representation(self):
        self.assertEqual(str(self.contact_info), 'Contact info for John Doe')

class InsuranceModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')
        self.insurance = Insurance.objects.create(patient=self.patient, insurance_number='123456789', provider='Test Provider', valid_from='2023-01-01', valid_to='2024-01-01')

    def test_insurance_str_representation(self):
        self.assertEqual(str(self.insurance), 'Insurance: 123456789')
