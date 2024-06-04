from twilio.rest import Client

def send_text_message(to_number, message_body):
    # Twilio account credentials
    account_sid = ''
    auth_token = ''
    twilio_number = '+19162564858'

    # Initialize Twilio client
    client = Client(account_sid, auth_token)

    try:
        # Send the message
        message = client.messages.create(
            body=message_body,
            from_=twilio_number,
            to=to_number
        )
        print(f"Message sent successfully! SID: {message.sid}")
    except Exception as e:
        print(f"Failed to send message: {str(e)}")
        

from opentelemetry import trace
from opentelemetry.exporter.cloud_trace import CloudTraceSpanExporter
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import BatchSpanProcessor
from opentelemetry.trace import Link


