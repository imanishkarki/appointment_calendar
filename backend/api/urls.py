from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AvailableSlotViewSet, BookingViewSet

router = DefaultRouter()
router.register(r'available-slots', AvailableSlotViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('', include(router.urls)),
]