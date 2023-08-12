import django_filters
from .models import Route


class RouteFilter(django_filters.FilterSet):
    hostname = django_filters.CharFilter(lookup_expr='icontains')
    name = django_filters.CharFilter(lookup_expr='icontains')
    url = django_filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Route
        fields = ['hostname', 'name', 'url']
