from rest_framework import serializers
from .models import Doctor, Department, DoctorContactInfo,ScrapedDoctors,ReviewScraped,TimeSlotScraped, DoctorRecommendation
from django.contrib.auth.models import User

class UserSerializerWrite(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password',)

class UserSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name',)

class DoctorSerializerWrite(serializers.ModelSerializer):
    department = DepartmentSerializer()
    user = UserSerializerWrite()
    class Meta:
        model = Doctor
        fields = '__all__'
    
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        department_data = validated_data.pop('department')
        department = Department.objects.get_or_create(**department_data)[0]
        user = User.objects.create_user(**user_data)
        doctor = Doctor.objects.create(user=user,department=department,**validated_data)
        return doctor

class DoctorSerializerRead(serializers.ModelSerializer):
    department = DepartmentSerializer()
    user = UserSerializerRead()
    class Meta:
        model = Doctor
        fields = '__all__'

class DoctorSerializerUpdate(serializers.ModelSerializer):
    department = DepartmentSerializer()
    #user=UserSerializerRead()
    class Meta:
        model = Doctor
        #For now, we will allow all fields to be updated
        fields = ['department','speciality','availability']
    
    def update(self, instance, validated_data):
        department_data = validated_data.pop('department')
        department = Department.objects.get_or_create(**department_data)[0]
        instance.department = department
        instance.specialty = validated_data.get('speciality',instance.specialty)
        instance.availability = validated_data.get('availability',instance.availability)
        instance.save()
        return instance

class ScrapedDoctorsSerializer(serializers.ModelSerializer):
    average_rating = serializers.FloatField(read_only=True)  

    class Meta:
        model = ScrapedDoctors
        fields = '__all__'

#Serializer for getting all unique locations
class ScrapedDoctorsLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapedDoctors
        fields = ['location']

class ScrapedDoctorsSpecialitySerializer(serializers.ModelSerializer):
    class Meta:
        model = ScrapedDoctors
        fields = ['speciality']


class ReviewScrapedSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReviewScraped
        fields = ['doctor','comment','rating']

#Serializer for getting all time slots for a doctor
class TimeSlotScrapedSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlotScraped
        fields = '__all__'

    
#top-rated 
class DoctorRecommendationSerializer(serializers.ModelSerializer):
    doctor = ScrapedDoctorsSerializer()

    class Meta:
        model = DoctorRecommendation
        fields = '__all__'
