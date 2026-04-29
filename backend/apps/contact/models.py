"""
Contact model — stores contact form submissions.
"""

from django.db import models


class ContactSubmission(models.Model):
    """
    Stores messages sent through the portfolio contact form.

    Fields:
        name        — Sender's full name.
        email       — Sender's email address (validated at DB level).
        message     — Free-text message body.
        is_read     — Tracks whether admin has viewed the message.
        submitted_at — Timestamp auto-set on creation.
    """

    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-submitted_at"]
        verbose_name = "Contact Submission"
        verbose_name_plural = "Contact Submissions"

    def __str__(self) -> str:
        return f"Message from {self.name} <{self.email}>"
