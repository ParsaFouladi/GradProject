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

    def update(self, instance, validated_data):
        contact_info_data = validated_data.pop('contact_info')
        insurance_data = validated_data.pop('insurance')

        contact_info = instance.contact_info
        insurance = instance.insurance

        contact_info.phone_number = contact_info_data.get('phone_number', contact_info.phone_number)
        contact_info.address = contact_info_data.get('address', contact_info.address)
        contact_info.save()

        insurance.insurance_number = insurance_data.get('insurance_number', insurance.insurance_number)
        insurance.provider = insurance_data.get('provider', insurance.provider)
        insurance.valid_from = insurance_data.get('valid_from', insurance.valid_from)
        insurance.valid_to = insurance_data.get('valid_to', insurance.valid_to)
        insurance.save()

        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()

        return instance

