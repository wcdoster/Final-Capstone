from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    question = models.CharField(max_length=300)
    
    def __str__(self):
        return self.question

class Nationality(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Traveler(models.Model):
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  first_name = models.CharField(max_length=15)
  nationality = models.ForeignKey(Nationality, on_delete=models.CASCADE)
  city = models.ForeignKey(City, on_delete=models.CASCADE)
  age = models.IntegerField()
  question_1 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_1")
  answer_1 = models.CharField(max_length=180)
  question_2 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_2")
  answer_2 = models.CharField(max_length=180)
  question_3 = models.ForeignKey(Question, on_delete=models.CASCADE, related_name="question_3")
  answer_3 = models.CharField(max_length=180)

  def __str__(self):
    return "{}".format(self.first_name)
