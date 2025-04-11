from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import Booking

@receiver(post_save, sender=Booking)
def send_booking_notification(sender, instance, created, **kwargs):
    if created:  # Only send a notification when a new booking is created
        subject_admin = "New Booking Alert"
        message_admin = (
            f"A new booking has been made by {instance.name}.\n\n"
            f"📅 Date: {instance.slot.date}\n"
            f"⏰ Time: {instance.slot.time}\n"
            f"🌍 Country: {instance.country}\n"
            f"📧 Email: {instance.email}\n"
        )
        
        admin_email = "ikarkimanish@gmail.com"  # Change this to your admin's email
        send_mail(subject_admin, message_admin, settings.DEFAULT_FROM_EMAIL, [admin_email])

        # Send confirmation email to the user
        subject_user = "Appointment Confirmation"
        message_user = (
            f"Dear {instance.name},\n\n"
            f"Your appointment has been successfully booked. Here are the details:\n\n"
            f"📅 Date: {instance.slot.date}\n"
            f"⏰ Time: {instance.slot.time}\n"
            f"📍 Location: Your Company Name\n\n"
            f"Please arrive on time, and let us know if you have any questions.\n\n"
            f"Best Regards,\n"
            f"Your Company Name"
        )

        send_mail(subject_user, message_user, settings.DEFAULT_FROM_EMAIL, [instance.email])
