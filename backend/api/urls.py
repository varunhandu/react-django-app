from django.urls import path, include
from .views import CreateTweetView, DeleteTweetView

urlpatterns = [
    path('tweet/', CreateTweetView.as_view(), name='create_tweet'),
    path('tweet/delete/<int:pk>/', DeleteTweetView.as_view(), name='delete_tweet'),
]