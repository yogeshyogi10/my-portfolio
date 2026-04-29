"""
Serializers for the Contact app.
"""

import re

from rest_framework import serializers

from .models import ContactSubmission

# Lightweight email regex — DRF's EmailField handles the main validation,
# this is an extra sanity check.
_DISPOSABLE_DOMAINS = frozenset(
    ["mailinator.com", "guerrillamail.com", "trashmail.com", "yopmail.com"]
)


class ContactSubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for incoming contact form submissions.
    All fields are required by default.
    """

    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "message", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]

    def validate_name(self, value: str) -> str:
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Name cannot be blank.")
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters.")
        return value

    def validate_email(self, value: str) -> str:
        value = value.strip().lower()
        domain = value.split("@")[-1]
        if domain in _DISPOSABLE_DOMAINS:
            raise serializers.ValidationError(
                "Disposable email addresses are not accepted."
            )
        return value

    def validate_message(self, value: str) -> str:
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError(
                "Message must be at least 3 characters long."
            )
        return value


class ContactSubmissionAdminSerializer(serializers.ModelSerializer):
    """Extended serializer for admin views — includes the is_read flag."""

    class Meta:
        model = ContactSubmission
        fields = ["id", "name", "email", "message", "is_read", "submitted_at"]
        read_only_fields = ["id", "submitted_at"]
