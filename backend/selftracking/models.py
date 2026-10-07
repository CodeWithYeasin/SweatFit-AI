from django.db import models
from django.contrib.auth.models import User

class FoodTracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Connect to user
    food_name = models.CharField(max_length=255)
    serving_qty = models.FloatField()
    serving_unit = models.CharField(max_length=50)
    calories = models.FloatField()
    serving_weight_grams = models.FloatField()
    food_group = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)  # Track when created

    def __str__(self):
        return f"{self.user.username}'s {self.food_name}"

class ExerciseTracking(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Connect to user
    exercise_name = models.CharField(max_length=255)
    duration_min = models.FloatField()
    calories_burned = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)  # Track when created

    def __str__(self):
        return f"{self.user.username}'s {self.exercise_name}"