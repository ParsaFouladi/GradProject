from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS



class IsOwner(BasePermission):
    """
    Object-level permission to only allow owners of an object to edit it.
    Assumes the model instance has an `owner` attribute.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        # if request.method in SAFE_METHODS:
        #     return True

        # Instance must have an attribute named `owner`.
        return obj.user == request.user