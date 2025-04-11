from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_notification(message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": "send_notification",
            "message": message
        }
    )

# Use it in your views like this:
def your_view(request):
    # ... your existing code ...
    send_notification("A new booking has been made!")
    # ... rest of your code ... 