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
        fields = ('user', 'profile_picture', 'first_name', 'nationality', 'age', 'city', 'question_1', 'answer_1','question_2', 'answer_2','question_3', 'answer_3', 'url', 'id')
        # fields = '__all__'

class TravelerLikeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TravelerLike
        fields = ('sender', 'receiver', 'id')

class TravelerMatchSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TravelerMatch
        fields = ('traveler_1', 'traveler_2', 'id')

class TravelerRemoveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TravelerRemove
        fields = ('sender', 'receiver')

class TravelerChatSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TravelerChat
        fields = ('sender', 'receiver', 'message')
