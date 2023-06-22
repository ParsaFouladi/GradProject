import random
from django.core.management.base import BaseCommand
from doctor_app.models import ScrapedDoctors
from patient_app.models import Insurance


class Command(BaseCommand):
    help = 'Assign random insurances to doctors'

    def handle(self, *args, **options):
        # Create or get existing insurance options
        insurance_names = ['Public Health Insurance', 'Private Health Insurance', 'Medicare', 'Life Insurance', 'Dental Insurance', 'Vision Insurance']
        existing_insurances = []
        for name in insurance_names:
            insurance, created = Insurance.objects.get_or_create(name=name)
            existing_insurances.append(insurance)

        # Get all doctors
        doctors = ScrapedDoctors.objects.all()

        # Assign random insurances to doctors
        for doctor in doctors:
            # Determine the number of random insurances to assign
            num_random_insurances = random.randint(1, 3)  # Adjust as needed

            # Get a random sample of insurances
            random_insurances = random.sample(existing_insurances, num_random_insurances)

            # Assign the random insurances to the doctor
            doctor.insurance.set(random_insurances)

        self.stdout.write(self.style.SUCCESS('Random insurances assigned successfully to doctors.'))
