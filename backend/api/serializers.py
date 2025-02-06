from django.contrib.auth.models import User
from .models import Tweet
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password' : {'write_only' : True}}
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TweetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tweet
        fields = ['id', 'title', 'content', 'time', 'author']
        extra_kwargs = {'author' : {'read_only' : True}}
    