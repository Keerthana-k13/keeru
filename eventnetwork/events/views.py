from rest_framework import generics
from .models import Event, Registration
from .serializers import EventSerializer, RegistrationSerializer
import openai
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event

class EventSummaryView(APIView):
    def get(self, request, pk):
        event = Event.objects.get(pk=pk)
        openai.api_key = 'YOUR_OPENAI_API_KEY'
        prompt = f"Summarize this event: {event.title}\\n{event.description}"
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=100,
        )
        summary = response.choices[0].text.strip()
        return Response({'summary': summary})

class EventListView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailView(generics.RetrieveAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class RegistrationCreateView(generics.CreateAPIView):
    queryset = Registration.objects.all()
    serializer_class = RegistrationSerializer
# Create your views here.
from .models import Suggestion
from .serializers import SuggestionSerializer
class SuggestionListCreateView(generics.ListCreateAPIView):
    queryset = Suggestion.objects.all()
    serializer_class = SuggestionSerializer