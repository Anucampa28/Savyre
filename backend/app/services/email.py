import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail


def send_verification_email(to_email: str, verify_link: str) -> None:
    api_key = os.getenv('SENDGRID_API_KEY')
    email_from = os.getenv('EMAIL_FROM', 'no-reply@example.com')
    if not api_key:
        print(f"[EMAIL_DISABLED] To: {to_email} Link: {verify_link}")
        return
    subject = 'Verify your Laksham account'
    html_content = f"""
    <p>Welcome to Laksham!</p>
    <p>Please verify your email by clicking the link below:</p>
    <p><a href="{verify_link}">Verify Account</a></p>
    <p>If you did not create this account, you can ignore this email.</p>
    """
    message = Mail(from_email=email_from, to_emails=to_email, subject=subject, html_content=html_content)
    try:
        sg = SendGridAPIClient(api_key)
        sg.send(message)
    except Exception as e:
        print(f"[EMAIL_ERROR] {e}")


