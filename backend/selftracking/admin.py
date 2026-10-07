from django.contrib import admin
from .models import FoodTracking, ExerciseTracking

# Register the FoodTracking model
class FoodTrackingAdmin(admin.ModelAdmin):
    list_display = ('user', 'food_name', 'serving_qty', 'serving_unit', 'calories', 
                   'serving_weight_grams', 'food_group', 'created_at')
    search_fields = ('food_name', 'food_group', 'user__username')
    list_filter = ('food_group', 'created_at', 'user')
    readonly_fields = ('created_at',)
    list_select_related = ('user',)  # Optimize database queries
    date_hierarchy = 'created_at'  # Add date-based navigation

    # Group fields for better organization in admin form
    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Food Details', {
            'fields': ('food_name', 'food_group')
        }),
        ('Nutrition Information', {
            'fields': ('serving_qty', 'serving_unit', 'calories', 'serving_weight_grams')
        }),
        ('Metadata', {
            'fields': ('created_at',)
        }),
    )

# Register the ExerciseTracking model
class ExerciseTrackingAdmin(admin.ModelAdmin):
    list_display = ('user', 'exercise_name', 'duration_min', 'calories_burned', 'created_at')
    search_fields = ('exercise_name', 'user__username')
    list_filter = ('exercise_name', 'created_at', 'user')
    readonly_fields = ('created_at',)
    list_select_related = ('user',)
    date_hierarchy = 'created_at'

    fieldsets = (
        ('User Information', {
            'fields': ('user',)
        }),
        ('Exercise Details', {
            'fields': ('exercise_name', 'duration_min', 'calories_burned')
        }),
        ('Metadata', {
            'fields': ('created_at',)
        }),
    )

# Register models with admin
admin.site.register(FoodTracking, FoodTrackingAdmin)
admin.site.register(ExerciseTracking, ExerciseTrackingAdmin)