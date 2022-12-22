from django.contrib.auth.models import User, Group
from simpleticket.simpleticketapp.models import Ticket
from rest_framework import serializers

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class TicketSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ticket
        fields = [  'url',
                     'title' ,
                    'description' ,
                    'creationDate' ,
                    'dueDate' ,
                    'createdBy' ,
                    'requestedBy' ,
                    'requestedFor' ,
                    'completed' ]
    