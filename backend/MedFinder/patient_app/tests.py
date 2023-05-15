from django.test import TestCase
from django.contrib.auth.models import User
from .models import Patient, PatientContactInfo, Insurance
from .serializers import PatientSerializer
from rest_framework.test import APIClient
from rest_framework import status

class PatientModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.patient = Patient.objects.create(user=self.user, first_name='John', last_name='Doe')

    def test_patient_creation(self):
        self.assertEqual(self.patient.user, self.user)
        self.assertEqual(self.patient.first_name, 'John')
        self.assertEqual(self.patient.last_name, 'Doe')

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

