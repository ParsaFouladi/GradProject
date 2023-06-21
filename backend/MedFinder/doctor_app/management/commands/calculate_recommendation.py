from django.core.management.base import BaseCommand
from doctor_app.models import ReviewScraped, ScrapedDoctors, DoctorRecommendation

class Command(BaseCommand):
    help = 'Calculates recommendation scores for doctors'

    def handle(self, *args, **options):
        doctors = ScrapedDoctors.objects.all()
        
        for doctor in doctors:
            reviews = ReviewScraped.objects.filter(doctor=doctor)
            total_score = 0
            for review in reviews:
                total_score += review.rating
            avg_score = total_score / reviews.count() if reviews.count() > 0 else 0
            recommendation_score = avg_score * reviews.count()
            DoctorRecommendation.objects.update_or_create(doctor=doctor, defaults={'recommendation_score': recommendation_score})

        self.stdout.write(self.style.SUCCESS('Successfully calculated recommendation scores'))
