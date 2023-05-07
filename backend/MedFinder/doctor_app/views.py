from rest_framework import generics
from .models import Doctor
from .serializers import DoctorSerializer,UserSerializer

# Create your views here.
class DoctorDetailApiView(generics.RetrieveAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

class DoctorCreateApiView(generics.CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer

    # def perform_create(self, serializer):
    #     # Create a new user
    #     user_data = serializer.validated_data.get('user')
    #     user_serializer = UserSerializer(data=user_data)
    #     user_serializer.is_valid(raise_exception=True)
    #     user = user_serializer.save()

    #     # Set the created user as the user for the doctor
    #     serializer.save(user=user)