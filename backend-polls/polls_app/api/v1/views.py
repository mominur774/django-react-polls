from polls_app.models import Polls, Vote
from polls_app.api.v1.serializers import PollsCreateSerializer, PollSerializer, VoteSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from datetime import datetime


class CreatePolls(CreateAPIView):
    serializer_class = PollsCreateSerializer
    queryset = Polls.objects.all()

class PollsList(ListAPIView):
    serializer_class = PollSerializer

    def get_queryset(self):
        return Polls.objects.filter(expire_at__gte=datetime.now())

class DeletePolls(DestroyAPIView):
    serializer_class = PollSerializer
    queryset = Polls.objects.all()
    lookup_field = 'pk'

class PollsDetails(RetrieveAPIView):
    serializer_class = PollSerializer
    queryset = Polls.objects.all()
    lookup_field = 'pk'

class UpdatePolls(UpdateAPIView):
    serializer_class = PollsCreateSerializer
    queryset = Polls.objects.all()
    lookup_field = 'pk'

class MakeVote(CreateAPIView):
    serializer_class = VoteSerializer
    queryset = Vote.objects.all()
