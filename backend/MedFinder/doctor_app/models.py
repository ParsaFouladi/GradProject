from django.db import models
from django.contrib.auth.models import User
from patient_app.models import Patient
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
    specialty = models.CharField(max_length=50)
    availability = models.CharField(max_length=100)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

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
    specialty = models.CharField(max_length=500)
    url=models.CharField(max_length=10000)
    experience=models.CharField(max_length=10000)
    description=models.TextField(blank=True)
    image_url=models.CharField(max_length=10000)

    def __str__(self):
        return '%s: %s' % (self.name, self.specialty)

class ReviewScraped(models.Model):
    doctor = models.ForeignKey(ScrapedDoctors, on_delete=models.CASCADE)

    comment = models.TextField(blank=True)
    

    @property
    def rating(self):
        sid = SentimentIntensityAnalyzer()
        sentiment_scores = sid.polarity_scores(self.comment)
        compound_score = sentiment_scores['compound']

        # Map the compound score to a rating scale, e.g., 1 to 5
        if compound_score >= 0.5:
            rating = 5
        elif compound_score >= 0.3:
            rating = 4
        elif compound_score >= 0.1:
            rating = 3
        elif compound_score >= -0.1:
            rating = 2
        else:
            rating = 1

        return rating


    def __str__(self):
        return '%s: %s' % (self.doctor.name, self.rating)
    
# class Review(models.Model):
#     doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
#     patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
#     rating = models.IntegerField()
#     comment = models.TextField(blank=True)

#     def __str__(self):
#         return '%s: %s' % (self.doctor.user.username, self.rating)