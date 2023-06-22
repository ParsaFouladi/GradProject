from django.contrib import admin
from django.contrib.admin import AdminSite

from doctor_app import models as doctor_models
from patient_app import models as patient_models
from appointment_app import models as appointment_models

class CustomAdminSite(AdminSite):
    site_title = 'MedFinder Admin Panel'  # Set your desired admin title
    site_header = 'MedFinder Admin Panel'  # Set your desired admin header

custom_admin_site = CustomAdminSite(name='custom_admin')

# Register your models here.
custom_admin_site.register(doctor_models.Doctor)
custom_admin_site.register(doctor_models.Department)
custom_admin_site.register(doctor_models.DoctorContactInfo)
custom_admin_site.register(doctor_models.ScrapedDoctors)
custom_admin_site.register(doctor_models.ReviewScraped)
custom_admin_site.register(doctor_models.TimeSlotScraped)
custom_admin_site.register(doctor_models.DoctorRecommendation)
custom_admin_site.register(patient_models.Patient)
custom_admin_site.register(patient_models.Insurance)
custom_admin_site.register(appointment_models.Appointment)



# Add more models as needed
