from django.shortcuts import render

# Create your views here.


from django.contrib.auth.models import User, Group
from simpleticket.simpleticketapp.models import Ticket
from rest_framework import viewsets
from rest_framework import permissions
from simpleticket.simpleticketapp.serializers import UserSerializer, GroupSerializer, TicketSerializer, TokenObtainPairResponseSerializer, TokenRefreshResponseSerializer

# JWT
from rest_framework import status
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer,RegisterSerializer
from django.contrib.auth.models import User
# from rest_framework.authentication import TokenAuthentication
from rest_framework import generics

# https://www.codersarts.com/post/how-to-create-register-and-login-api-using-django-rest-framework-and-token-authentication
class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = []￼

class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]
    # permission_classes = []

class TicketViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]
    #permission_classes = []

#Class based view to register user
class RegisterUserAPIView(generics.CreateAPIView):
  permission_classes = []
  serializer_class = RegisterSerializer