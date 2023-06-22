from django.db import models
from django.contrib.auth.models import User
from patient_app.models import Patient,Insurance
import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
nltk.download('vader_lexicon')


class Department(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    speciality = models.CharField(max_length=50)
    availability = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    country = models.CharField(max_length=100, default='Country not provided')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50, null=True)
    phone_number = models.CharField(max_length=20,null=True,blank=True)
    address = models.CharField(max_length=100,null=True,blank=True)
    image = models.ImageField(upload_to='doctor_images', null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    def __str__(self):
        return '%s: %s' % (self.user.username, self.specialty)

class DoctorContactInfo(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=20)
    address = models.CharField(max_length=100)

    def __str__(self):
        return '%s: %s' % (self.doctor.user.username, self.phone_number)

class ScrapedDoctors(models.Model):
    name = models.CharField(max_length=1000)
    location = models.CharField(max_length=1000)
    speciality = models.CharField(max_length=500)
    url=models.CharField(max_length=10000)
    experience=models.CharField(max_length=10000)
    experience_years=models.IntegerField(default=0)
    description=models.TextField(blank=True)
    image_url=models.CharField(max_length=10000)
    country = models.CharField(max_length=100, default='Country not provided')
    insurance=models.ManyToManyField(Insurance,null=True, blank=True)
    
    @property
    def average_rating(self):
        reviews = ReviewScraped.objects.filter(doctor=self)
        return sum([review.rating for review in reviews]) / len(reviews) if reviews else 0
    


    def __str__(self):
        return '%s: %s' % (self.name, self.specialty)

class ReviewScraped(models.Model):
    doctor = models.ForeignKey(ScrapedDoctors, on_delete=models.CASCADE)
    comment = models.TextField(blank=True)
    rating = models.FloatField(default=0.0)  # Add this line to create a database field for the rating

    def save(self, *args, **kwargs):  # Overwrite the save method
        sid = SentimentIntensityAnalyzer()
        sentiment_scores = sid.polarity_scores(self.comment)
        compound_score = sentiment_scores['compound']

        # Map the compound score to a rating scale, e.g., 1 to 5
        if compound_score >= 0.5:
            self.rating = 5
        elif compound_score >= 0.3:
            self.rating = 4
        elif compound_score >= 0.1:
            self.rating = 3
        elif compound_score >= -0.1:
            self.rating = 2
        else:
            self.rating = 1

        super().save(*args, **kwargs)  # Don't forget to call the parent's save method

    def __str__(self):
        return '%s: %s' % (self.doctor.name, self.rating)
    
class DoctorRecommendation(models.Model):
    doctor = models.OneToOneField(ScrapedDoctors, on_delete=models.CASCADE)
    recommendation_score = models.FloatField(default=0)

    def __str__(self):
        return '%s: %f' % (self.doctor.name, self.recommendation_score)


class TimeSlot(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    #status can only be one of the following: available, booked, cancelled
    status = models.CharField(max_length=20)

    description = models.TextField(blank=True)

    def __str__(self):
        return '%s: %s' % (self.doctor.user.username, self.start_time)

class TimeSlotScraped(models.Model):
    doctor=models.ForeignKey(ScrapedDoctors, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    #status can only be one of the following: available, booked, cancelled
    status = models.CharField(max_length=20)

    description = models.TextField(blank=True)

    def __str__(self):
        return '%s: %s' % (self.doctor.name, self.start_time)