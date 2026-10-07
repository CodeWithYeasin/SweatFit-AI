# selftracking/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import FoodTracking, ExerciseTracking
from .serializers import FoodTrackingSerializer, ExerciseTrackingSerializer

class FoodTrackingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        food_items = FoodTracking.objects.filter(user=request.user)
        serializer = FoodTrackingSerializer(food_items, many=True)
        return Response(serializer.data)

class ExerciseTrackingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        exercises = ExerciseTracking.objects.filter(user=request.user)
        serializer = ExerciseTrackingSerializer(exercises, many=True)
        return Response(serializer.data)
