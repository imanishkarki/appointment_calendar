from django.db import models

class WorkingSchedule(models.Model):
    DAYS_OF_WEEK = [
        ('Sunday', 'Sunday'),
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
    ]

    day_of_week = models.CharField(max_length=10, choices=DAYS_OF_WEEK)
    start_time = models.TimeField()
    end_time = models.TimeField()

    class Meta:
        unique_together = ('day_of_week', 'start_time', 'end_time')

    def __str__(self):
        return f"{self.day_of_week}: {self.start_time} - {self.end_time}"

class AvailableSlot(models.Model):
    date = models.DateField()
    time = models.TimeField()
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.date} {self.time}"

class Booking(models.Model):
    slot = models.ForeignKey(AvailableSlot, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    email = models.EmailField()

    def __str__(self):
        return f"Booking for {self.name} on {self.slot.date} at {self.slot.time}"