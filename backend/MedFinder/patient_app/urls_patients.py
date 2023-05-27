from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.PatientDetailApiView.as_view()),
    path('create/', views.PatientCreateApiView.as_view()),
    path('', views.PatientListApiView.as_view()),
    path('update/<int:pk>/', views.PatientUpdateApiView.as_view()),
    path('delete/<int:pk>/', views.PatientDeleteApiView.as_view()),


]


