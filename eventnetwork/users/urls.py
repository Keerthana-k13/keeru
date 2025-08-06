from django.urls import path
from .views import UserCreateView, UserDetailView
from .views import CertificateUploadView
from .views import generate_cv

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),
]
urlpatterns += [
    path('certificates/upload/', CertificateUploadView.as_view(), name='certificate-upload'),
]
urlpatterns += [
    path('cv/<int:user_id>/', generate_cv, name='generate-cv'),
]