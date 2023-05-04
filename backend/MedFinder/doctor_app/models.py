from django.db import models
from django.contrib.auth.models import User


class Department(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=50)
    availability = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

class DoctorContactInfo(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
