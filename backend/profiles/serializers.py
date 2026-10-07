from rest_framework import serializers
from django.contrib.auth.models import User  # Import User model
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    # The name field will display the user's username
    name = serializers.CharField(source='user.username', read_only=True)
    
    # The age is calculated in the model and is stored in the database
    age = serializers.IntegerField(read_only=True)  # age is read-only since it's calculated in the model

    class Meta:
        model = Profile
        fields = [
            'name', 'birthdate', 'height', 'weight', 'body_type',
            'gender', 'physical_disability', 'additional_info', 'age'
        ]
