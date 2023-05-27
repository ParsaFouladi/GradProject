from django.urls import path
from . import views

urlpatterns = [
    path('<int:pk>/', views.InsuranceDetailApiView.as_view()),
    path('create/', views.InsuranceCreateApiView.as_view()),
    path('', views.InsuranceListApiView.as_view()),
    path('update/<int:pk>/', views.InsuranceUpdateApiView.as_view()),
    path('delete/<int:pk>/', views.InsuranceDeleteApiView.as_view()),
]