import warnings

from django.core.management.base import BaseCommand
from django.utils import timezone
from faker import Faker
import random
from ...models import ScrapedDoctors, TimeSlotScraped

class Command(BaseCommand):
    help = 'Generate fake time slots for doctors'

    def handle(self, *args, **options):
        fake = Faker()

        # Redirect the warning output to stdout
        warnings.simplefilter("ignore", category=RuntimeWarning)

        # Retrieve the list of doctors
        doctors = ScrapedDoctors.objects.all()

        

        for doctor in doctors:
            # Generate time slots for the next 30 days
            today = timezone.now().date()
            end_date = today + timezone.timedelta(days=30)
            while today < end_date:
                # Generate a fake start time and end time for the time slot
                start_time = fake.date_time_between_dates(datetime_start=today, datetime_end=end_date)
                end_time = start_time + timezone.timedelta(hours=1)

                # Generate a random status for the time slot
                status_choices = ['available', 'booked', 'cancelled']
                status = random.choice(status_choices)

                # Create the time slot
                time_slot = TimeSlotScraped(
                    doctor=doctor,
                    start_time=start_time,
                    end_time=end_time,
                    status=status,
                    
                )
                time_slot.save()

                today = today + timezone.timedelta(days=1)

            self.stdout.write(self.style.SUCCESS(f'Fake time slots generated for doctor ID: {doctor.id}'))

        self.stdout.write(self.style.SUCCESS('Fake time slots generated for all doctors!'))
