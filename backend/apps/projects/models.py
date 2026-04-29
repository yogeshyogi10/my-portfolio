"""
Project model — stores portfolio projects.
"""

from django.db import models


class Project(models.Model):
    """
    Represents a portfolio project entry.

    Fields:
        title       — Short display name of the project.
        description — Full markdown-friendly description.
        tech_stack  — JSON array of technology strings, e.g. ["React", "Django"].
        live_url    — Public URL where the project is deployed.
        created_at  — Timestamp set automatically on creation.
        updated_at  — Timestamp updated automatically on every save.
    """

    title = models.CharField(max_length=255)
    description = models.TextField()
    tech_stack = models.JSONField(default=list, help_text="Array of technology names")
    live_url = models.URLField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __str__(self) -> str:
        return self.title
