from rest_framework import serializers
from .models import Patient, PatientContactInfo, Insurance
from django.contrib.auth.models import User

class UserSerializerWrite(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username','password',)

class PatientContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientContactInfo
        fields = ('phone_number', 'address')

class InsuranceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Insurance
        fields = ('insurance_number', 'provider', 'valid_from', 'valid_to')

class PatientSerializer(serializers.ModelSerializer):
    
    insurance = InsuranceSerializer()
    user = UserSerializerWrite()

    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, validated_data):
        
        insurance_data = validated_data.pop('insurance')

        

        
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data)

        patient = Patient.objects.create(user=user, **validated_data)

        
        insurance = Insurance.objects.create(patient=patient,**insurance_data)
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
