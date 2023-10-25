# Mail: A Modern Email Web Application

## Overview
**Mail** is an easy-to-use email application that takes inspiration from classic email systems. With its modern design and straightforward interface, it offers:

- **Compose New Emails:** Allows users to quickly write and send emails.
- **Inbox Management:** Review all incoming emails conveniently in a structured inbox.
- **Archiving:** Users have the option to archive emails, ensuring that important messages are safely stored.
- **Mail Categories:** Emails are classified under categories like Inbox, Sent, and Archive for better organization.

This project is an assignment from [Harvard's CS50 Web Programming with Python and JavaScript course](https://cs50.harvard.edu/web/2020/projects/3/).

## Setup
1. **Clone this repository**

    ```bash
    git clone https://github.com/qildeli/mail.git
    ```

2. **Navigate into the repository's directory**

    ```bash
    cd mail
    ```

3. **Create a virtual environment** (optional)

    ```bash
    python3 -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    ```

4. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

5. **Run migrations**

    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```