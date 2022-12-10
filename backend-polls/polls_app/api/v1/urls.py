from django.urls import path
from polls_app.api.v1 import views


urlpatterns = [
    path('create-polls/', views.CreatePolls.as_view(), name="create-polls"),
    path('polls-list/', views.PollsList.as_view(), name="polls-list"),
    path('make-vote/', views.MakeVote.as_view(), name="make-vote"),
]
