document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

    document.querySelector('#compose-form').addEventListener('submit', function(event) {
        event.preventDefault();
        send_email();
    });

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch emails for the mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
      // Handle email data here
      if(emails.length === 0) {
          document.querySelector('#emails-view').innerHTML += '<p>No emails to display.</p>';
      } else {
          emails.forEach(email => {
              const emailElement = document.createElement('div');
              emailElement.className = 'email-entry';

              // Set a data attribute based on the email's read status for styling
              emailElement.setAttribute('data-read', email.read ? 'true' : 'false');

              emailElement.innerHTML = `
                  <strong>From:</strong> ${email.sender}<br>
                  <strong>Subject:</strong> ${email.subject}<br>
                  <strong>Timestamp:</strong> ${email.timestamp}
              `;

              // Append the email to the emails view
              document.querySelector('#emails-view').appendChild(emailElement);
          });
      }
  })
  .catch(error => {
      console.log('Error:', error);
  });
}


function send_email() {
    // Get the values from the input fields
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector('#compose-subject').value;
    const body = document.querySelector('#compose-body').value;

    fetch('/emails', {
        method: 'POST',
        body: JSON.stringify({
            recipients: recipients,
            subject: subject,
            body: body
        })
    })
    .then(response => response.json())
    .then(result => {
        console.log(result);
        if (result.message === "Email sent successfully.") {
            // Redirect to the sent mailbox or provide a success message
            load_mailbox('sent');
        } else {
            // Handle other types of messages or errors
            alert(result.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("An error occurred. Please try again.");
    });
}

