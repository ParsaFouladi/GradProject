from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.DoctorDetailApiView.as_view()),
    path('create/', views.DoctorCreateApiView.as_view()),
    path('', views.DoctorListApiView.as_view()),
    path('update/<int:pk>/', views.DoctorUpdateApiView.as_view()),
    path('delete/<int:pk>/', views.DoctorDeleteApiView.as_view()),
]
