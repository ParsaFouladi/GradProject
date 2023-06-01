from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Doctor,ScrapedDoctors,ReviewScraped,TimeSlotScraped
from .permissions import IsOwner
from .serializers import ScrapedDoctorsSerializer,DoctorSerializerRead,DoctorSerializerWrite,DoctorSerializerUpdate,ReviewScrapedSerializer,ScrapedDoctorsLocationSerializer,ScrapedDoctorsSpecialitySerializer,TimeSlotScrapedSerializer

from rest_framework.response import Response

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


class ReviewScrapedListApiView(generics.ListAPIView):
    queryset = ReviewScraped.objects.all()
    serializer_class = ReviewScrapedSerializer

    def get_queryset(self):
        doctor_id = self.request.query_params.get('doctor_id', None)
        if doctor_id is not None:
            return ReviewScraped.objects.filter(doctor=doctor_id)
        return ReviewScraped.objects.all()
    
class ScrapedDoctorsLocationListApiView(generics.ListAPIView):
    queryset = ScrapedDoctors.objects.order_by('location').values('location').distinct()
    serializer_class = ScrapedDoctorsLocationSerializer

class ScrapedDoctorsSpecialityListApiView(generics.ListAPIView):
    queryset = ScrapedDoctors.objects.order_by('speciality').values('speciality').distinct()
    serializer_class = ScrapedDoctorsSpecialitySerializer

class ReviewScrapedDetailApiView(generics.RetrieveAPIView):
    queryset = ReviewScraped.objects.all()
    serializer_class = ReviewScrapedSerializer

#Generic view for getting all timeslots for a doctor
class TimeSlotScrapedListApiView(generics.ListAPIView):
    queryset = TimeSlotScraped.objects.all()
    serializer_class = TimeSlotScrapedSerializer
    lookup_field = 'doctor'
    def get_queryset(self):
        doctor_id=self.kwargs['doctor']
        if doctor_id is not None:
            return TimeSlotScraped.objects.filter(doctor=doctor_id)
        return TimeSlotScraped.objects.all()






    