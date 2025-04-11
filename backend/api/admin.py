from django.contrib import admin
from django.urls import path
from django.http import HttpResponseRedirect
from django.urls import reverse
from .models import WorkingSchedule, AvailableSlot, Booking
from .utils import generate_available_dates

@admin.register(WorkingSchedule)
class WorkingScheduleAdmin(admin.ModelAdmin):
    list_display = ('day_of_week', 'start_time', 'end_time')

@admin.register(AvailableSlot)
class AvailableSlotAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'is_booked')
    list_filter = ('date', 'is_booked')
    search_fields = ('date', 'time')

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('generate-slots/', self.admin_site.admin_view(self.generate_slots), name='generate-slots'),
        ]
        return custom_urls + urls

    def generate_slots(self, request):
        generate_available_dates()
        self.message_user(request, "Successfully generated available slots.")
        return HttpResponseRedirect(reverse('admin:api_availableslot_changelist'))

    change_list_template = "admin/available_slot_changelist.html"

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('slot', 'name', 'country', 'email')
    list_filter = ('slot__date', 'name', 'country')
    search_fields = ('name', 'email', 'country')