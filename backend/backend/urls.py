# sweatfitai/backend/urls.py

from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    re_path(r'^$', RedirectView.as_view(url='/api/users/signup/', permanent=False)),

   path('api/', include('profiles.urls')),
   path('api/selftracking/', include('selftracking.urls')),
 

]