from django.urls import path
from .views import FoodTrackingView, ExerciseTrackingView

urlpatterns = [
    path('track-food/', FoodTrackingView.as_view(), name='track-food'),
    path('track-exercise/', ExerciseTrackingView.as_view(), name='track-exercise'),
]
