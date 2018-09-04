from django.db import models
from django.contrib.auth.models import User


class Traveler(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  nationality = models.OneToManyField(Nationality, on_delete=models.CASCADE)
  age = models.IntegerField()
  question_1 = models.OneToManyField(Question, on_delete=models.CASCADE)
  question_2 = models.OneToManyField(Question, on_delete=models.CASCADE)
  question_3 = models.OneToManyField(Question, on_delete=models.CASCADE)

  def __str__(self):
    return "{}".format(self.user.first_name)

class Question(models.Model):
    question = models.CharField(max_length=300)

class Nationality(models.Model):
    name = models.CharField(max_length=50)