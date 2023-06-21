from django.urls import path,re_path
from . import views

urlpatterns = [
    path('', views.AppointmentListApiView.as_view()),
    path('create/', views.AppointmentCreateApiView.as_view()),
    path('<int:pk>/', views.AppointmentDetailApiView.as_view()),
    path('delete/<int:pk>/', views.AppiointmentDeleteApiView.as_view()),
]
