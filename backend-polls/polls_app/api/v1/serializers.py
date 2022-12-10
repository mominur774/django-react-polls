from polls_app.models import Polls, Vote, Choices
from users.models import User

from rest_framework import serializers


class ChoiceSerializer(serializers.ModelSerializer):
    is_voted = serializers.SerializerMethodField('check_is_voted')
    avg_vote = serializers.SerializerMethodField('average_vote')

    def check_is_voted(self, choices):
        user = self.context['request'].user
        if Vote.objects.filter(user=user, polls=choices.polls, choices=choices.pk):
            return True
        return False

    def average_vote(self, choices):
        total_vote = len(Vote.objects.filter(polls=choices.polls))
        choices_vote = len(Vote.objects.filter(
            polls=choices.polls, choices=choices.pk))
        avg_vote = (choices_vote*100) / total_vote
        return "%.2f" % avg_vote

    class Meta:
        model = Choices
        fields = '__all__'


class PollsCreateSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(read_only=True, many=True)
    choices1 = serializers.CharField(max_length=255, write_only=True)
    choices2 = serializers.CharField(max_length=255, write_only=True)
    total_vote = serializers.SerializerMethodField('total_vote_per_poll')

    def total_vote_per_poll(self, polls):
        return len(Vote.objects.filter(polls=polls.pk))

    class Meta:
        model = Polls
        fields = '__all__'

    def create(self, validated_data):
        polls = Polls.objects.create(
            user=self.context['request'].user,
            question=validated_data.get('question', '')
        )
        new_choice1 = Choices.objects.create(
            user=self.context['request'].user,
            polls=polls,
            choices=validated_data.get('choices1', '')
        )
        new_choice2 = Choices.objects.create(
            user=self.context['request'].user,
            polls=polls,
            choices=validated_data.get('choices2', '')
        )
        return polls


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'

    def create(self, validated_data):
        vote, created = Vote.objects.update_or_create(
            user=self.context['request'].user,
            polls=validated_data.get('polls', ''),
            defaults={'choices': validated_data.get('choices', '')}
        )
        return vote
