from django.shortcuts import get_object_or_404
from django.db import transaction
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .models import AvailableSlot, Booking
from .serializers import AvailableSlotSerializer, BookingSerializer
import logging

#Appointment
# Configure logger
logger = logging.getLogger(__name__)

class AvailableSlotViewSet(viewsets.ModelViewSet):
    queryset = AvailableSlot.objects.all()
    serializer_class = AvailableSlotSerializer

class BookingViewSet(viewsets.ModelViewSet):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer

    @action(detail=False, methods=['post'])
    def create_booking(self, request):
        slot_id = request.data.get('slot')
        if not slot_id:
            logger.error("Slot ID is missing in the request data.")
            return Response({'error': 'Slot ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        slot = get_object_or_404(AvailableSlot, id=slot_id)
        
        if slot.is_booked:
            logger.error(f"Slot {slot_id} is already booked.")
            return Response({'error': 'Slot is already booked'}, status=status.HTTP_400_BAD_REQUEST)
        
        name = request.data.get('name')
        country = request.data.get('country')
        email = request.data.get('email')
        
        if not all([name, country, email]):
            logger.error("Name, country, or email is missing in the request data.")
            return Response({'error': 'Name, country, and email are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            with transaction.atomic():
                slot.is_booked = True
                slot.save()

                booking = Booking.objects.create(
                    slot=slot,
                    name=name,
                    country=country,
                    email=email
                )
            logger.info(f"Booking created successfully for slot {slot_id}.")
            return Response(BookingSerializer(booking).data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"An error occurred while booking the slot {slot_id}: {e}")
            return Response({'error': f"An error occurred while booking the slot: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

