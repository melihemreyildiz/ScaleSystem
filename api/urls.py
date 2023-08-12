from django.urls import path, include
from rest_framework import routers
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView


router = routers.DefaultRouter()

router.register(r'', RouteViewSet, basename="api")

urlpatterns = [
    path('dashboard/', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('users/', UserListAPIView.as_view(), name='user-list'),
]