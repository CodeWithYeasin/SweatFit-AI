from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FoodTracking, ExerciseTracking

class FoodTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodTracking
        fields = ['id', 'user', 'food_name', 'serving_qty', 'serving_unit', 'calories', 'serving_weight_grams', 'food_group', 'created_at']

    def validate_serving_qty(self, value):
        """Ensure the serving quantity is positive."""
        if value <= 0:
            raise serializers.ValidationError("Serving quantity must be greater than 0.")
        return value

    def validate_calories(self, value):
        """Ensure the calorie value is positive."""
        if value <= 0:
            raise serializers.ValidationError("Calories must be greater than 0.")
        return value

    def validate_serving_weight_grams(self, value):
        """Ensure the serving weight is positive."""
        if value <= 0:
            raise serializers.ValidationError("Serving weight must be greater than 0.")
        return value


class ExerciseTrackingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseTracking
        fields = ['id', 'user', 'exercise_name', 'duration_min', 'calories_burned', 'created_at']

    def validate_duration_min(self, value):
        """Ensure the exercise duration is positive."""
        if value <= 0:
            raise serializers.ValidationError("Exercise duration must be greater than 0 minutes.")
        return value

    def validate_calories_burned(self, value):
        """Ensure the calories burned is positive."""
        if value <= 0:
            raise serializers.ValidationError("Calories burned must be greater than 0.")
        return value
