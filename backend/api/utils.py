from datetime import datetime, timedelta
from .models import WorkingSchedule, AvailableSlot

def generate_available_dates():
    today = datetime.today().date()
    two_months_later = today + timedelta(days=60)
    working_schedules = WorkingSchedule.objects.all()

    print(f"Generating slots from {today} to {two_months_later}...")  # Debugging

    current_date = today
    while current_date <= two_months_later:
        day_of_week = current_date.strftime('%A')
        print(f"Processing {current_date} ({day_of_week})")  # Debugging
        
        schedules = working_schedules.filter(day_of_week=day_of_week)
        for schedule in schedules:
            print(f" - Found working schedule: {schedule.start_time} to {schedule.end_time}")  # Debugging
            
            start_time = datetime.combine(current_date, schedule.start_time)
            end_time = datetime.combine(current_date, schedule.end_time)
            current_time = start_time

            while current_time < end_time:
                next_time = current_time + timedelta(hours=2)
                if next_time <= end_time:
                    obj, created = AvailableSlot.objects.get_or_create(
                        date=current_date,
                        time=current_time.time(),
                    )
                    print(f"    - Created slot: {obj.date} {obj.time}")  # Debugging if slot is created
                current_time = next_time

        current_date += timedelta(days=1)
