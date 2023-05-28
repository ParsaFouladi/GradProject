from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Doctor,ScrapedDoctors
from .permissions import IsOwner
from .serializers import ScrapedDoctorsSerializer,DoctorSerializerRead,UserSerializerRead,DoctorSerializerWrite,UserSerializerWrite,DoctorSerializerUpdate

# Create your views here.
class DoctorDetailApiView(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerRead

class DoctorCreateApiView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerWrite

    # def perform_create(self, serializer):
    #     # Create a new user
    #     user_data = serializer.validated_data.get('user')
    #     user_serializer = UserSerializer(data=user_data)
    #     user_serializer.is_valid(raise_exception=True)
    #     user = user_serializer.save()

    #     # Set the created user as the user for the doctor
    #     serializer.save(user=user)

class DoctorListApiView(generics.ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerRead

class DoctorUpdateApiView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated, IsOwner]
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerUpdate

class DoctorDeleteApiView(generics.DestroyAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializerRead

class ScrapedDoctorsListApiView(generics.ListAPIView):
    queryset = ScrapedDoctors.objects.all()
    serializer_class = ScrapedDoctorsSerializer

class ScrapedDoctorsDetailApiView(generics.RetrieveAPIView):
    queryset = ScrapedDoctors.objects.all()
    serializer_class = ScrapedDoctorsSerializer

#Delete
class ScrapedDoctorsDeleteApiView(generics.DestroyAPIView):
    queryset = ScrapedDoctors.objects.all()
    serializer_class = ScrapedDoctorsSerializer

    