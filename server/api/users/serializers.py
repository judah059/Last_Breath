from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users.models import MyUser


class MyUserPostSerializer(ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = MyUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            birth_date=validated_data['birth_date'],
        )
        return user

    class Meta:
        model = MyUser
        fields = ('email',
                  'first_name',
                  'last_name',
                  'password',
                  'username',
                  'age',
                  )
