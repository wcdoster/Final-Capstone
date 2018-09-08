import json
from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from django.core import serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.http import HttpResponse
from api.models import *
from api.serializers import *

from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def register_user(request):
  """Handles the creation of a new user for authentication

  Method args:
    request -- the full HTTP request object
  """

  print(request.path)
  req_body = json.loads(request.body.decode())

  # make new user
  new_user = User.objects.create_user(
      username=req_body['username'],
      password=req_body['password'],
      email=req_body['email'],
      first_name=req_body['first_name'],
  )
  # # make new customer for that user

  token = Token.objects.create(user=new_user)

  data = json.dumps({"token": token.key})
  print(data)
  return HttpResponse(data, content_type='application/json')


class TravelerViewSet(viewsets.ModelViewSet):
  queryset = Traveler.objects.all()
  serializer_class = TravelerSerializer

@api_view(['GET', 'POST', 'PUT'])
def traveler_view(request):

    # try:
    #     travelers = Traveler.objects.get(pk=pk)
    # except Traveler.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    # request.query_params['user']

    if request.method == 'GET':
        travelers = Travler.objects.all()
        serializer = TravelerSerializer(traveler, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TravelerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        serializer = TravelerSerializer(traveler, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Traveler.objects.create(
    #     user=req_body['user'],
    #     first_name=req_body['first_name'],
    #     nationality=req_body['nationality'],
    #     city=req_body['city'],
    #     age =req_body['age'],
    #     question_1=req_body['question_1'],
    #     answer_1=req_body['answer_1'],
    #     question_2=req_body['question_2'],
    #     answer_2=req_body['answer_2'],
    #     question_3=req_body['question_3'],
    #     answer_3=req_body['answer_3'],
    # )

    

class UserViewSet(viewsets.ModelViewSet):
  queryset = User.objects.all()
  serializer_class = UserSerializer

class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class NationalityViewSet(viewsets.ModelViewSet):
  queryset = Nationality.objects.all()
  serializer_class = NationalitySerializer

class CityViewSet(viewsets.ModelViewSet):
  queryset = City.objects.all()
  serializer_class = CitySerializer
