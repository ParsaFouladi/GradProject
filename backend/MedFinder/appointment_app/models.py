from django.db import models
from doctor_app.models import Doctor
from patient_app.models import Patient

# Create your models here.

class Appointment(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['date', 'time']

    def __str__(self):
        return str(self.doctor) + ' ' + str(self.patient) + ' ' + str(self.date) + ' ' + str(self.time)






