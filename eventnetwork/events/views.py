from rest_framework import generics
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

class EventSummaryView(APIView):
    def get(self, request, pk):
        try:
            event = Event.objects.get(pk=pk)
            
            # Create a simple summary without OpenAI API
            summary = f"""
Event Summary: {event.title}

Category: {event.category}
Date: {event.date}

Description: {event.description}

This is a {event.category} event that focuses on {event.title.lower()}. 
The event provides an opportunity for participants to learn and network in this field.
            """.strip()
            
            return Response({'summary': summary})
            
        except Event.DoesNotExist:
            return Response({'error': 'Event not found'}, status=404)
        except Exception as e:
            return Response({'error': f'Error generating summary: {str(e)}'}, status=500)

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    
    def create(self, request, *args, **kwargs):
        try:
            # Get event and participant IDs from request
            event_id = request.data.get('event')
            participant_id = request.data.get('participant')
            
            # Check if registration already exists
            existing_registration = Registration.objects.filter(
                event_id=event_id,
                participant_id=participant_id
            ).first()
            
            if existing_registration:
                return Response({
                    'detail': 'You are already registered for this event.'
                }, status=400)
            
            # Create new registration
            registration = Registration.objects.create(
                event_id=event_id,
                participant_id=participant_id
            )
            
            return Response({
                'detail': 'Registration successful!',
                'registration_id': registration.id
            }, status=201)
            
        except Exception as e:
            return Response({
                'detail': f'Registration failed: {str(e)}'
            }, status=400)
# Create your views here.
from .models import Suggestion
from .serializers import SuggestionSerializer
class SuggestionListCreateView(generics.ListCreateAPIView):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer

class RegistrationListView(generics.ListAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
    
    def get_queryset(self):
        # Filter by event if event_id is provided
        event_id = self.request.query_params.get('event')
        if event_id:
            return Registration.objects.filter(event_id=event_id)
        return Registration.objects.all()