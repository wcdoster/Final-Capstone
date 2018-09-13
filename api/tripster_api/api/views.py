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

from rest_framework.authtoken.views import ObtainAuthToken


from rest_framework import parsers, renderers
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.compat import coreapi, coreschema
from rest_framework.response import Response
from rest_framework.schemas import ManualSchema
from rest_framework.views import APIView


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
  )
  # # make new customer for that user

  token = Token.objects.create(user=new_user)

  data = json.dumps({"token": token.key, 'username': new_user.username, 'id':new_user.id})
  print(new_user.id)
  return HttpResponse(data, content_type='application/json')


class TravelerViewSet(viewsets.ModelViewSet):
  queryset = Traveler.objects.all()
  serializer_class = TravelerSerializer

  def create(self, request, *args, **kwargs):
      serializer = TravelerSerializer(data=request.data, context={'request': request})
      serializer.is_valid(raise_exception=True)
      serializer.save(user=request.user)
      return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST', 'GET'])
def post_traveler_view(request):
    if request.method == 'GET':
        traveler = Traveler.objects.filter(user=user)
        print(traveler)
        serializer = TravelerSerializer(traveler, context={'request':response})
        return Response(serializer.data)

    elif request.method == 'POST':
        print('post')
        serializer = TravelerSerializer(data=request.data, context={'request':request})
        print(request.data)
        print(serializer)
        if serializer.is_valid(raise_exception=True):
            print('is valid')
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def list_traveler_view(request):
    if request.method == 'GET':
        traveler = Traveler.objects.filter(city=request.city)
        serializer = TravelerSerializer(traveler, context={'request':request})
        return Response(serializer.data)

@api_view(['GET', 'POST', 'PUT'])
def traveler_view(request, pk):
    # print(request.user)

    # try:
    #     travelers = Traveler.objects.get(pk=pk)
    # except Traveler.DoesNotExist:
    #     return Response(status=status.HTTP_404_NOT_FOUND)

    # request.query_params['user']

    if request.method == 'PUT':
        # user=request.user
        print(request.data)
        # print(request.user)
        traveler = Traveler.objects.filter(user=request.user.id)
        print(traveler.id)
        serializer = TravelerSerializer(pk=pk, data=request.data)
        # print(serializer)
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

    def get_query_set(self, *args, **kwargs):
        user = self.request.user
        queryset = Traveler.objects.filter(user=user)

        print(queryset)

        return queryset


class LoggedInTravelerViewSet(viewsets.ModelViewSet):
    serializer_class = TravelerSerializer

    def get_queryset(self, *args, **kwargs):
        user = self.request.user
        print(user)
        queryset = Traveler.objects.filter(user=user)

        print(queryset)

        return queryset


@api_view(['GET', 'POST'])
def user_view(request):
    print(request.query_params['password'])
    # if request.method == 'GET':
    #     serializer = UserSerializer(data=request.data)
    #     if serializer.is_valid():
    #         user = User.objects.filter(password=request.query_params['password'])
    #         print(user)
    #         return Response(user, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        user = User.objects.filter(password=request.query_params['password'])
        print(user)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class QuestionViewSet(viewsets.ModelViewSet):
  queryset = Question.objects.all()
  serializer_class = QuestionSerializer

class NationalityViewSet(viewsets.ModelViewSet):
  queryset = Nationality.objects.all()
  serializer_class = NationalitySerializer

class CityViewSet(viewsets.ModelViewSet):
  queryset = City.objects.all()
  serializer_class = CitySerializer
