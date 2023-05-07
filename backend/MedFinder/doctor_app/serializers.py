from rest_framework import serializers
from .models import Doctor, Department, DoctorContactInfo
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password',)
class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ('name',)

class DoctorSerializer(serializers.ModelSerializer):
    department = DepartmentSerializer()
    user = UserSerializer()
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