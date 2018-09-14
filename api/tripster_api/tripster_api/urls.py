"""tripster_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token
from api.views import *
from api import views

router = routers.DefaultRouter()
router.register(r'loggedin-traveler', LoggedInTravelerViewSet, base_name='loggedin-traveler')
router.register(r'users', UserViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'nationalities', NationalityViewSet)
router.register(r'cities', CityViewSet)
router.register(r'travelers', TravelerViewSet)
# router.register(r'authenticate', CustomObtainAuthToken, base_name='authenticate')

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'post-traveler/', views.post_traveler_view),
    url(r'traveler-list/', views.list_traveler_view),
    url(r'travelers/<int:pk>/', views.traveler_view),
    url(r'get-user/', views.user_view),
    url(r'traveler-like/', views.traveler_like_view),
    url(r'traveler-match/', views.traveler_match_view),
    url(r'traveler-chat/', views.traveler_chat_view),
    # url(r'traveler-like/<int:pk>/', views.TravelerLikeView.as_view()),
    url(r'traveler-remove/', views.traveler_remove_view),
    url(r'^', include(router.urls)),
    url(r'^register/', views.register_user),
    url(r'^authenticate', ObtainAuthToken),
    url(r'^api-token-auth/', obtain_auth_token),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
