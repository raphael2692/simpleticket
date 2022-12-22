from django.shortcuts import render

# Create your views here.


from django.contrib.auth.models import User, Group
from simpleticket.simpleticketapp.models import Ticket
from rest_framework import viewsets
from rest_framework import permissions
from simpleticket.simpleticketapp.serializers import UserSerializer, GroupSerializer, TicketSerializer

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = []

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = []

class TicketViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    # permission_classes = [permissions.IsAuthenticated]
    permission_classes = []