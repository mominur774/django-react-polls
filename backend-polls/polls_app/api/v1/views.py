from typing import List
from polls_app.models import Polls, Vote, Choices
from polls_app.api.v1.serializers import PollsCreateSerializer, VoteSerializer, ChoiceSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny
from datetime import datetime


class CreatePolls(CreateAPIView):
    serializer_class = PollsCreateSerializer
    queryset = Polls.objects.all()


class PollsList(ListAPIView):
    serializer_class = PollsCreateSerializer
    queryset = Polls.objects.all()


class MakeVote(CreateAPIView):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()


class VoteList(ListAPIView):
    serializer_class = VoteSerializer

    def get_queryset(self):
        return Vote.objects.all()


class ChoiceList(ListAPIView):
    serializer_class = ChoiceSerializer
    queryset = Choices.objects.all()
