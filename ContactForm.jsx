/*
Building forms is a common task in Front End. In this exercise, we will build a basic "Contact Us" form, commonly seen on marketing websites for visitors to ask questions or provide feedback.

REQUIREMENTS
The form should contain the following elements:
  1. Name field
  2. Email field
  3. Message field. Since the message can be long, using a <textarea> will be more suitable.
  4. Submit button
    > Contains the text "Send".
    > Clicking on the submit button submits the form.

The form and submission should be implemented mostly in HTML.

There is no need to do any client-side validation on the fields. Validation will be done on the server side.

SUBMISSION API
Upon submission, POST the form data to https://www.greatfrontend.com/api/questions/contact-form with the following fields in the request body:
  1. name
  2. email
  3. message

If all the form fields are correctly filled up, you will see an alert containing a success message. Congratulations!

NOTE: You do not really need JavaScript for this question, the focus is on HTML form validation and submission. **
*/

import React, {useState} from 'react';
// import axios from 'axios';
import './styles.css';
import submitForm from './submitForm';

export default function App() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {name, email, message};

    try {
      // no axios —> FETCH API **
      const res = await fetch(
        'https://www.greatfrontend.com/api/questions/contact-form',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }
      );

      if (res.ok) {
        alert('Message posted successfully!');
      } else {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
    } catch(err) {
      console.error(`Error posting message: ${err}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}>
      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required // <— HTML form validation
      />

      <label>Email Address:</label>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required // <— HTML form validation
      />

      <label>Message:</label>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required // <— HTML form validation
      />

      <button onClick={handleSubmit}>Send</button>
    </form>
  );
}