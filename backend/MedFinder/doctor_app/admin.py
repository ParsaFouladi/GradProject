from django.contrib import admin

from .models import *
# Register your models here.

admin.site.register(Department)
admin.site.register(Doctor)
admin.site.register(DoctorContactInfo)
admin.site.register(ScrapedDoctors)
admin.site.register(ReviewScraped)

