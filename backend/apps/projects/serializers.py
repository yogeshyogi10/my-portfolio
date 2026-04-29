"""
Serializers for the Projects app.
"""

from rest_framework import serializers

from .models import Project


class ProjectSerializer(serializers.ModelSerializer):
    """
    Full serializer for Project — used on create/update/retrieve.
    Validates that tech_stack is a non-empty list of strings.
    """

    tech_stack = serializers.ListField(
        child=serializers.CharField(max_length=100),
        allow_empty=True,
        required=False,
        default=list,
        help_text="Array of technology names, e.g. ['React', 'Django', 'PostgreSQL']",
    )

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "tech_stack",
            "live_url",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def validate_title(self, value: str) -> str:
        """Ensure title is not blank after stripping whitespace."""
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Title cannot be blank.")
        return value

    def validate_live_url(self, value: str) -> str:
        """live_url is optional — skip URL format validation if empty."""
        return value.strip()


class ProjectListSerializer(serializers.ModelSerializer):
    """
    Lightweight serializer for project list endpoints — omits full description.
    """

    class Meta:
        model = Project
        fields = ["id", "title", "tech_stack", "live_url", "created_at"]
        read_only_fields = ["id", "created_at"]
