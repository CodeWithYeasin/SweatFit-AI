# sweatfitai/api/urls.py

from django.urls import path
from .views import SignUpView, SignInView  # Use '.' to import from the same directory

urlpatterns = [
    path('users/signup/', SignUpView.as_view(), name='signup'),
    path('users/signin/', SignInView.as_view(), name='signin'),
]