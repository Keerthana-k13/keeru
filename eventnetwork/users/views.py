from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from .models import Certificate
from .serializers import CertificateSerializer



class CertificateUploadView(generics.CreateAPIView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

from django.http import HttpResponse
from reportlab.pdfgen import canvas
from .models import User, Certificate

def generate_cv(request, user_id):
    user = User.objects.get(pk=user_id)
    certificates = Certificate.objects.filter(user=user)
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = f'attachment; filename=\"{user.username}_cv.pdf\"'
    p = canvas.Canvas(response)
    p.drawString(100, 800, f"CV for {user.username}")
    p.drawString(100, 780, f"Email: {user.email}")
    p.drawString(100, 760, "Certificates:")
    y = 740
    for cert in certificates:
        p.drawString(120, y, f"{cert.event.title} - {cert.uploaded_at.date()}")
        y -= 20
    p.showPage()
    p.save()
    return response