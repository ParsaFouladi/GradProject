import warnings

from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
import random
from ...models import ScrapedDoctors

class Command(BaseCommand):
    help = 'Generate fake time slots for doctors'

    def handle(self, *args, **options):
        fake = Faker()

        # Redirect the warning output to stdout
        warnings.simplefilter("ignore", category=RuntimeWarning)

        # Retrieve the list of doctors
        doctors = ScrapedDoctors.objects.all()

        

        for doctor in doctors:
            try:
                doctor.experience_years = int(doctor.experience.split()[0])
                doctor.save()
            except:
                pass
            self.stdout.write(self.style.SUCCESS(f'Experiance years generated for doctor ID: {doctor.id}'))
        
        self.stdout.write(self.style.SUCCESS('Experiance years for all doctors!'))