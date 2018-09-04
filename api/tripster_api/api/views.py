from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from rest_framework import viewsets
from django.core import serializers

from models import *
from serializers import *

class TravelerViewSet(viewsets.ModelViewSet):
  queryset = Traveler.objects.all()
  serializer_class = TravelerSerializer

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class NationalityViewSet(viewsets.ModelViewSet):
  queryset = Nationality.objects.all()
  serializer_class = NationalitySerializer