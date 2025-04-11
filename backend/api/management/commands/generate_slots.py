from django.core.management.base import BaseCommand
from api.utils import generate_available_dates

class Command(BaseCommand):
    help = 'Generate available slots for the next two months'

    def handle(self, *args, **kwargs):
        generate_available_dates()
        self.stdout.write(self.style.SUCCESS('Successfully generated available slots'))