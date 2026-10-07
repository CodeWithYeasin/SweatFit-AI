from django.db import models
from django.contrib.auth.models import User
from datetime import date

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate = models.DateField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)
    body_type = models.CharField(
        max_length=20,
        choices=[
            ('ectomorph', 'Ectomorph'),
            ('endomorph', 'Endomorph'),
            ('mesomorph', 'Mesomorph'),
        ],
        blank=True,
        null=True
    )
    gender = models.CharField(
        max_length=20,
        choices=[
            ('male', 'Male'),
            ('female', 'Female'),
        ],
        blank=True,
        null=True
    )
    physical_disability = models.TextField(blank=True, null=True)
    additional_info = models.TextField(blank=True, null=True)
    age = models.IntegerField(null=True, blank=True)  # Add age field to store the calculated age

    def save(self, *args, **kwargs):
        # Automatically calculate the age when the profile is saved
        if self.birthdate:
            today = date.today()
            age = today.year - self.birthdate.year
            if today.month < self.birthdate.month or (
                today.month == self.birthdate.month and today.day < self.birthdate.day
            ):
                age -= 1
            self.age = age
        super(Profile, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.user.username}'s profile"
