from django.db import models
from users.models import User
from datetime import datetime

# Create your models here.


class Polls(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    question = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.question)

    class Meta:
        verbose_name_plural = 'Polls'


class Choices(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    polls = models.ForeignKey(
        Polls,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name='choices'
    )
    choices = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.polls} - {self.choices}"


class Vote(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    polls = models.ForeignKey(
        Polls,
        on_delete=models.CASCADE,
    )
    choices = models.ForeignKey(
        Choices,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}'s vote for {self.choices}"

    @property
    def total_vote_per_polls(self):
        return len(Vote.objects.filter(polls=self.polls))
