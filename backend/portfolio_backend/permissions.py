"""
Custom permissions shared across the portfolio_backend project.
"""

from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsAdminOrReadOnly(BasePermission):
    """
    Grants read access (GET, HEAD, OPTIONS) to any user including anonymous.
    Write access (POST, PUT, PATCH, DELETE) is restricted to admin/staff users.

    Usage:
        permission_classes = [IsAdminOrReadOnly]
    """

    def has_permission(self, request, view) -> bool:
        # Safe (read-only) methods are always allowed
        if request.method in SAFE_METHODS:
            return True
        # Write methods require a logged-in admin/staff user
        return bool(
            request.user
            and request.user.is_authenticated
            and (request.user.is_staff or request.user.is_superuser)
        )
