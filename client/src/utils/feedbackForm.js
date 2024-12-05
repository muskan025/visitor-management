import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

export default function sendThankyouNote(username, useremail) {

   const form = document.createElement('form');

   const usernameInput = document.createElement('input');
   usernameInput.type = 'hidden';
   usernameInput.name = 'user_name';
   usernameInput.value = username;
   form.appendChild(usernameInput);
 
   const userEmailInput = document.createElement('input');
   userEmailInput.type = 'hidden';
   userEmailInput.name = 'user_email';
   userEmailInput.value = useremail;
   form.appendChild(userEmailInput);
 
   const messageInput = document.createElement('input');
   messageInput.type = 'hidden';
   messageInput.name = 'message';
   messageInput.value = 'Thank you for visiting!\nPlease feel free to reach out to us for any query\nHave a great day ahead';
   form.appendChild(messageInput);
 
  
   emailjs
     .sendForm( serviceId, templateId , form, {
       publicKey: publicKey,
     })
     .then(
       () => {
        toast.success(`Email sent successfully`)
       },
       (error) => {
        toast.error(`Failed to send email`)
         console.log('FAILED...', error);
       }
     );
 
    document.body.appendChild(form);
   form.remove();
 }