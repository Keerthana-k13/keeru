from django.urls import path
from .views import UserCreateView
from .views import CertificateUploadView
from .views import generate_cv

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
]
urlpatterns += [
    path('certificates/upload/', CertificateUploadView.as_view(), name='certificate-upload'),
]
urlpatterns += [
    path('cv/<int:user_id>/', generate_cv, name='generate-cv'),
]