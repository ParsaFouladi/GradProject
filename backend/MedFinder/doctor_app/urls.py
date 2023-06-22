from django.urls import path,re_path
from . import views

urlpatterns = [
    path('<int:pk>/', views.DoctorDetailApiView.as_view()),
    path('create/', views.DoctorCreateApiView.as_view()),
    path('', views.DoctorListApiView.as_view()),
    path('update/<int:pk>/', views.DoctorUpdateApiView.as_view()),
    path('delete/<int:pk>/', views.DoctorDeleteApiView.as_view()),
    #Get doctor id based on the username
    path('get_doctor_id/', views.get_doctor_id),

    #Scraped Doctors
    path('scraped/', views.ScrapedDoctorsListApiView.as_view()),
    path('scraped/<int:pk>/', views.ScrapedDoctorsDetailApiView.as_view()),
    #Delete
    path('scraped/delete/<int:pk>/', views.ScrapedDoctorsDeleteApiView.as_view()),

    #Scraped Doctors Location
    path('locations/', views.ScrapedDoctorsLocationListApiView.as_view()),
    #Scraped Doctors Specialty
    path('specialities/', views.ScrapedDoctorsSpecialityListApiView.as_view()),

    #Reviews
    path('reviews/', views.ReviewScrapedListApiView.as_view()),
    path('reviews/<int:pk>/', views.ReviewScrapedDetailApiView.as_view()),

    #Timeslots
    path('timeslots/<int:doctor>/', views.TimeSlotScrapedListApiView.as_view()),
    
    #Top Rated Doctors
    path('top-rated/', views.TopRatedDoctorsListApiView.as_view()),

    

]
