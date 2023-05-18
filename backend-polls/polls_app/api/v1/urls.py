from django.urls import path
from polls_app.api.v1 import views


urlpatterns = [
    path('create-polls/', views.CreatePolls.as_view(), name="create-polls"),
    path('polls-list/', views.PollsList.as_view(), name="polls-list"),
    path('polls-details/<int:pk>/', views.PollsDetails.as_view(), name="poll-details"),
    path('update-polls/<int:pk>/', views.UpdatePolls.as_view(), name="update-polls"),
    path('delete-polls/<int:pk>/', views.DeletePolls.as_view(), name="delete-polls"),
    path('make-vote/', views.MakeVote.as_view(), name="make-vote"),
]
