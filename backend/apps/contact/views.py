"""
Views for the Contact app.

Permission matrix:
  - POST /api/contact/   → anyone (AllowAny — public form submission)
  - GET  /api/contact/   → admin only (view submissions)
"""

from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContactSubmission
from .serializers import ContactSubmissionSerializer, ContactSubmissionAdminSerializer


class ContactSubmissionCreateView(APIView):
    """
    POST /api/contact/

    Public endpoint — accepts contact form submissions and stores them.
    Returns a success message without exposing the stored record's id.
    """

    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ContactSubmissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "message": "Thank you for reaching out! I'll get back to you soon.",
            },
            status=status.HTTP_201_CREATED,
        )


class ContactSubmissionListView(generics.ListAPIView):
    """
    GET /api/contact/submissions/

    Admin-only endpoint — returns a paginated list of all contact submissions.
    Supports ?is_read=true/false filter and ordering by submitted_at.
    """

    queryset = ContactSubmission.objects.all()
    serializer_class = ContactSubmissionAdminSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ["is_read"]
    ordering_fields = ["submitted_at"]
    ordering = ["-submitted_at"]
