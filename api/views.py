from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Route
from .serializers import RouteSerializer, UserRegistrationSerializer, UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import UserProfile
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .filters import RouteFilter


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (filters.SearchFilter, DjangoFilterBackend)
    filterset_class = RouteFilter
    search_fields = ('name', 'hostname', 'url')

    def perform_create(self, serializer):
        serializer.save(creator=self.request.user)

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Route.objects.all()
        else:
            return Route.objects.filter(creator=user)


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer

    def get_queryset(self):
        return self.queryset

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        user_profile, _ = UserProfile.objects.update_or_create(user=user)
        user_profile.is_admin = serializer.validated_data['is_superuser']
        user_profile.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        return serializer.save()


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
