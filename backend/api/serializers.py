# serializers.py
from rest_framework import serializers
from .models import AvailableSlot, Booking

class AvailableSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvailableSlot
        fields = '__all__'

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'