from rest_framework import permissions


class IsUserProfileOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.id == request.user.id
