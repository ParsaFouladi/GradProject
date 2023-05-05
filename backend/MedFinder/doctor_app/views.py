from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer

# Create your views here.
class DoctorDetailApiView(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class DoctorCreateApiView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
