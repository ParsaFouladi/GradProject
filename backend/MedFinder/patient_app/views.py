from django.shortcuts import render
from rest_framework import generics
from .models import Patient,Insurance
from .serializers import PatientSerializer,InsuranceSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from .permissions import IsOwner
from rest_framework.parsers import MultiPartParser, FormParser

class PatientDetailApiView(generics.RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientCreateApiView(generics.CreateAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    parser_classes = [MultiPartParser, FormParser]

class PatientListApiView(generics.ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientUpdateApiView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwner]
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class PatientDeleteApiView(generics.DestroyAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer

class InsuranceDetailApiView(generics.RetrieveAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class InsuranceCreateApiView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class InsuranceListApiView(generics.ListAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class InsuranceUpdateApiView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer

class InsuranceDeleteApiView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer



