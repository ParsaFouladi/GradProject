from django.db import models
from django.contrib.auth.models import User


class Insurance(models.Model):
    name = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    provider = models.CharField(max_length=100)
    valid_from = models.DateField()
    valid_to = models.DateField()

    def __str__(self):
        return f"Insurance: {self.name}"
    
class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, null=True)
    REQUIRED_FIELDS = ['first_name', 'last_name']
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)
    insurance = models.ManyToManyField(Insurance,null=True, blank=True)
    # insurance = models.OneToOneField('Insurance', null=True, blank=True, on_delete=models.SET_NULL, related_name='patient_entry')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

# class PatientContactInfo(models.Model):
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     phone_number = models.CharField(max_length=20)
#     address = models.CharField(max_length=100)

#     def __str__(self):
#         return f"Contact info for {self.patient.first_name} {self.patient.last_name}"


