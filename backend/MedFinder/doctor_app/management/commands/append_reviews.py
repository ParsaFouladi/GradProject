from django.core.management.base import BaseCommand
import random
import pandas as pd
from ...models import ScrapedDoctors, ReviewScraped

class Command(BaseCommand):
    help = 'Distributes reviews among doctors'

    def handle(self, *args, **options):
        # Load the CSV file and read the reviews
        df = pd.read_csv('doctor_reviews.csv')

        # Shuffle the reviews randomly
        df = df.sample(frac=1).reset_index(drop=True)

        # Retrieve the list of doctors
        doctors = ScrapedDoctors.objects.all()
        total_doctors = len(doctors)

        # Calculate the desired number of reviews per doctor
        min_reviews_per_doctor = 5
        max_reviews_per_doctor = 10

        # Duplicate the reviews to ensure enough reviews for each doctor
        duplicated_reviews = df['reviews'].tolist() * ((max_reviews_per_doctor // len(df)) + 1)

        # Shuffle the duplicated reviews randomly
        random.shuffle(duplicated_reviews)

        # Create a list to keep track of assigned reviews for each doctor
        assigned_reviews_per_doctor = {doctor.id: 0 for doctor in doctors}

        # Distribute the reviews among the doctors
        for review_text in duplicated_reviews:
            # Get a random doctor who has not reached the maximum number of reviews
            eligible_doctors = [doctor for doctor in doctors if assigned_reviews_per_doctor[doctor.id] < max_reviews_per_doctor]
            if len(eligible_doctors) == 0:
                break
            doctor = random.choice(eligible_doctors)

            # Assign the review to the doctor
            new_review = ReviewScraped(
                doctor=doctor,
                comment=review_text
            )
            #new_review.rating = new_review.calculate_rating()
            new_review.save()

            # Update the assigned review count for the doctor
            assigned_reviews_per_doctor[doctor.id] += 1

        # Check if any doctor has less than the minimum number of reviews and assign additional reviews
        for doctor in doctors:
            remaining_reviews = min_reviews_per_doctor - assigned_reviews_per_doctor[doctor.id]
            for _ in range(remaining_reviews):
                # Get a random review
                review_text = random.choice(df['reviews'].tolist())

                # Assign the review to the doctor
                new_review = ReviewScraped(
                    doctor=doctor,
                    comment=review_text
                )
                #new_review.rating = new_review.calculate_rating()
                new_review.save()

                # Update the assigned review count for the doctor
                assigned_reviews_per_doctor[doctor.id] += 1

        self.stdout.write(self.style.SUCCESS('Reviews distribution complete!'))
