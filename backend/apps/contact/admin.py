"""
Django admin configuration for the Contact app.
"""

from django.contrib import admin

from .models import ContactSubmission


@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "email", "is_read", "submitted_at")
    list_display_links = ("id", "name")
    list_filter = ("is_read",)
    search_fields = ("name", "email", "message")
    ordering = ("-submitted_at",)
    readonly_fields = ("submitted_at",)
    list_per_page = 25

    actions = ["mark_as_read", "mark_as_unread"]

    @admin.action(description="Mark selected submissions as read")
    def mark_as_read(self, request, queryset):
        updated = queryset.update(is_read=True)
        self.message_user(request, f"{updated} submission(s) marked as read.")

    @admin.action(description="Mark selected submissions as unread")
    def mark_as_unread(self, request, queryset):
        updated = queryset.update(is_read=False)
        self.message_user(request, f"{updated} submission(s) marked as unread.")
