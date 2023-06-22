from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Appointment
from .serializers import AppointmentSerializer

# Create your views here.

class AppointmentListApiView(generics.ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

    #Get the appointments of the current user
    # def get_queryset(self):
    #     user = self.request.user
    #     return Appointment.objects.filter(patient=user)

    #Get appointments based on the patient id
    def get_queryset(self):
        queryset=super().get_queryset()
        patient_id = self.request.query_params.get('patient_id',None)
        doctor_id = self.request.query_params.get('doctor_id',None)
        if patient_id:
            queryset=queryset.filter(patient_id=patient_id)
        if doctor_id:
            queryset=queryset.filter(doctor_id=doctor_id)
        
        return queryset

class AppointmentCreateApiView(generics.CreateAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppointmentDetailApiView(generics.RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

class AppiointmentDeleteApiView(generics.DestroyAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer

