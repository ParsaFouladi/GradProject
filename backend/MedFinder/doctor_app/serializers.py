from rest_framework import serializers
from .models import Doctor, Department, DoctorContactInfo
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)
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