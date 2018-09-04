from django.contrib.auth.models import User
from api.models import *
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    model = User
    fields = ('username', 'first_name', 'email', 'password')

class TravelerSerializer(serializers.HyperlinkedModelSerializer):
    model = Traveler
    fields = '__all__'

class NationalitySerializer(serializers.HyperlinkedModelSerializer):
    model = Nationality
    fields = '__all__'

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    model = Question
    fields = '__all__'