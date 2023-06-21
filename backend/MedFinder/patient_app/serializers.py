from rest_framework import serializers
from .models import Patient, Insurance
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from typing import Dict, List
from rest_framework.exceptions import ValidationError


class UserSerializerWritePatient(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password',)

# class PatientContactInfoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = PatientContactInfo
#         fields = ('phone_number', 'address')

class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = ('id','name', 'number', 'provider', 'valid_from', 'valid_to' )

class InsuranceSerializerInPatient(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Insurance
        fields = ('id',)

class PatientSerializer(serializers.ModelSerializer):
    
    insurance = InsuranceSerializerInPatient(many=True, required=False)
    user = UserSerializerWritePatient()
    role=serializers.CharField(default="patient",read_only=True)

    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        
        insurance_data = validated_data.pop('insurance', [])
        
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)

        patient = Patient.objects.create(user=user,**validated_data)

        for insurance_id in insurance_data:
            try:
                insurance = Insurance.objects.get(pk=insurance_id['id'])
                patient.insurance.add(insurance)
            except Insurance.DoesNotExist:
                raise ValidationError(f"Insurance with ID {insurance_id} does not exist.")

        return patient

    
class PatientSerializerUpdate(serializers.ModelSerializer):
    #user=UserSerializerRead()
    insurance = InsuranceSerializerInPatient(many=True, required=False)
    role=serializers.CharField(default="patient",read_only=True)
    class Meta:
        model = Patient
        #For now, we will allow all fields to be updated
        fields = ['first_name','last_name','insurance','role','image','birth_date','gender']
    
    def update(self, instance, validated_data):
        insurance_data = validated_data.pop('insurance', [])

        instance.first_name = validated_data.get('first_name',instance.first_name)
        instance.last_name = validated_data.get('last_name',instance.last_name)
        instance.insurance = validated_data.get('insurance',instance.insurance)
        instance.image = validated_data.get('image',instance.image)
        instance.birth_date = validated_data.get('birth_date',instance.birthdate)
        instance.gender=validated_data.get('gender',instance.gender)

        for insurance_id in insurance_data:
            try:
                if insurance_id['id'] in instance.insurance.values_list('id', flat=True):
                    continue
                insurance = Insurance.objects.get(pk=insurance_id['id'])
                instance.insurance.add(insurance)
            except Insurance.DoesNotExist:
                raise ValidationError(f"Insurance with ID {insurance_id} does not exist.")

        instance.save()
        return instance

