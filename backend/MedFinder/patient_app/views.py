from django.shortcuts import render
from rest_framework import generics
from .models import Patient
from .serializers import PatientSerializer

class PatientDetailApiView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientCreateApiView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientListApiView(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientUpdateApiView(generics.UpdateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientDeleteApiView(generics.DestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


