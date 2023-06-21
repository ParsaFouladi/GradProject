from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Doctor,ScrapedDoctors,ReviewScraped,TimeSlotScraped, DoctorRecommendation
from .permissions import IsOwner
from .serializers import ScrapedDoctorsSerializer,DoctorSerializerRead,DoctorSerializerWrite,DoctorSerializerUpdate,ReviewScrapedSerializer,ScrapedDoctorsLocationSerializer,ScrapedDoctorsSpecialitySerializer,TimeSlotScrapedSerializer, DoctorRecommendationSerializer
from .recommendations import get_doctor_recommendations

from rest_framework.response import Response
from django.db.models import Avg
from django.db.models import F,IntegerField
from django.db.models.functions import Cast,Substr



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

    def get_queryset(self):
        queryset = super().get_queryset()
        search = self.request.query_params.get('search')
        specialty = self.request.query_params.get('specialty')
        location = self.request.query_params.get('location')
        experience_years = self.request.query_params.get('experiance')

        if search:
            queryset = queryset.filter(name__icontains=search)
        if specialty:
            #specialty equalas to the given value
            queryset = queryset.filter(speciality__iexact=specialty)
        if location:
            queryset = queryset.filter(location__icontains=location)
        if experience_years:
            queryset = queryset.filter(experience_years__gte=experience_years)
        return queryset
            

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



#top-rated     
class TopRatedDoctorsListApiView(generics.ListAPIView):
    queryset = ScrapedDoctors.objects.annotate(avg_rating=Avg('reviewscraped__rating')).order_by('-avg_rating')[:8] 
    serializer_class = ScrapedDoctorsSerializer
