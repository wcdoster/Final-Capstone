from django.contrib.auth.models import User
from api.models import *
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'password')


class NationalitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Nationality
        fields = '__all__'

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class CitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = City
        fields = '__all__'

class TravelerSerializer(serializers.HyperlinkedModelSerializer):

    # city = CitySerializer
    # question_1 = QuestionSerializer
    # question_2 = QuestionSerializer
    # question_3 = QuestionSerializer
    # nationality = NationalitySerializer

    class Meta:

        model = Traveler
        fields = ('user', 'first_name', 'nationality', 'age', 'city', 'question_1', 'answer_1','question_2', 'answer_2','question_3', 'answer_3', 'url', 'id')
        # fields = '__all__'