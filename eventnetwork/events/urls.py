from django.urls import path
from .views import EventListView, EventDetailView, RegistrationCreateView, RegistrationListView
from .views import SuggestionListCreateView
from .views import EventSummaryView

urlpatterns = [
    path('', EventListView.as_view(), name='event-list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event-detail'),
    path('register/', RegistrationCreateView.as_view(), name='event-register'),
    path('registrations/', RegistrationListView.as_view(), name='registration-list'),
]
urlpatterns += [
    path('suggestions/', SuggestionListCreateView.as_view(), name='suggestion-list-create'),
]
urlpatterns += [
    path('<int:pk>/summary/', EventSummaryView.as_view(), name='event-summary'),
]