"""
URL configuration for the Contact app.
"""

from django.urls import path

from .views import ContactSubmissionCreateView, ContactSubmissionListView

urlpatterns = [
    path("contact/", ContactSubmissionCreateView.as_view(), name="contact-submit"),
    path(
        "contact/submissions/",
        ContactSubmissionListView.as_view(),
        name="contact-submissions-list",
    ),
]
