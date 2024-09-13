import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import QRCodeGenerator from './QRCodeGenerator';
import PaymentGateway from './PaymentGateway';
import emailjs from 'emailjs-com';  // Add email service for sending emails

const ChatBotWrapper = () => {
  const [userData, setUserData] = useState({});

  const handleEnd = ({ steps, values }) => {
    const data = {
      name: values[5],
      age: values[6],
      gender: values[7],
      email: values[8],
      phone: values[9],
      tickets: values[10],
    };
    setUserData(data);
    
    // Send QR code to email
    emailjs.send(
      'YOUR_SERVICE_ID', // Replace with your service ID
      'YOUR_TEMPLATE_ID', // Replace with your template ID
      {
        user_name: data.name,
        user_email: data.email,
        ticket_data: `Name: ${data.name}, Age: ${data.age}, Gender: ${data.gender}, Phone: ${data.phone}, Tickets: ${data.tickets}`
      },
      'YOUR_USER_ID' // Replace with your user ID
    ).then((response) => {
      console.log('SUCCESS!', response.status, response.text);
    }).catch((err) => {
      console.log('FAILED...', err);
    });
  };

  const steps = [
    { id: '1', message: 'Welcome to the Museum Ticket Booking Service!', trigger: 'selectLanguage' },

    // Language Selection
    {
      id: 'selectLanguage',
      message: 'Please select your language:',
      trigger: 'languageOptions',
    },
    {
      id: 'languageOptions',
      options: [
        { value: 'english', label: 'English', trigger: 'selectState' },
        { value: 'hindi', label: 'Hindi', trigger: 'selectState' },
      ],
    },

    // State Selection (Indian States)
    {
      id: 'selectState',
      message: 'Please select your state:',
      trigger: 'stateOptions',
    },
    {
      id: 'stateOptions',
      options: [
        { value: 'maharashtra', label: 'Maharashtra', trigger: 'districtOptionsMaharashtra' },
        { value: 'karnataka', label: 'Karnataka', trigger: 'districtOptionsKarnataka' },
      ],
    },

    // Maharashtra Districts
    {
      id: 'districtOptionsMaharashtra',
      message: 'Please select your district:',
      trigger: 'districtMaharashtra',
    },
    {
      id: 'districtMaharashtra',
      options: [
        { value: 'pune', label: 'Pune', trigger: 'museumOptionsPune' },
        { value: 'mumbai', label: 'Mumbai', trigger: 'museumOptionsMumbai' },
      ],
    },

    

    // Karnataka Districts

    {
      id: 'districtOptionsKarnataka',
      message: 'Please select your district:',
      trigger: 'districtKarnataka',
    },
    {
      id: 'districtKarnataka',
      options: [
        { value: 'bengaluru', label: 'Bengaluru', trigger: 'museumOptionsBengaluru' },
        { value: 'mysore', label: 'Mysore', trigger: 'museumOptionsMysore' },
      ],
    },

    // Museum Options (based on district)
    {
      id: 'museumOptionsPune',
      message: 'Please select a museum to visit in Pune:',
      trigger: 'getUserDetails',
      options: [
        { value: 'museum1', label: 'Museum 1', trigger: 'getUserDetails' },
        { value: 'museum2', label: 'Museum 2', trigger: 'getUserDetails' },
      ],
    },
    {
      id: 'museumOptionsMumbai',
      message: 'Please select a museum to visit in Mumbai:',
      trigger: 'getUserDetails',
      options: [
        { value: 'museum3', label: 'Museum 3', trigger: 'getUserDetails' },
        { value: 'museum4', label: 'Museum 4', trigger: 'getUserDetails' },
      ],
    },
    {
      id: 'museumOptionsBengaluru',
      message: 'Please select a museum to visit in Bengaluru:',
      trigger: 'getUserDetails',
      options: [
        { value: 'museum5', label: 'Museum 5', trigger: 'getUserDetails' },
        { value: 'museum6', label: 'Museum 6', trigger: 'getUserDetails' },
      ],
    },
    {
      id: 'museumOptionsMysore',
      message: 'Please select a museum to visit in Mysore:',
      trigger: 'getUserDetails',
      options: [
        { value: 'museum7', label: 'Museum 7', trigger: 'getUserDetails' },
        { value: 'museum8', label: 'Museum 8', trigger: 'getUserDetails' },
      ],
    },

    // User Details
    {
      id: 'getUserDetails',
      message: 'Please enter your details.',
      trigger: 'getName',
    },
    { id: 'getName', message: 'What is your name?', trigger: 'name' },
    { id: 'name', user: true, trigger: 'getAge' },
    { id: 'getAge', message: 'What is your age?', trigger: 'age' },
    { id: 'age', user: true, trigger: 'getGender' },
    { id: 'getGender', message: 'What is your gender?', trigger: 'genderOptions' },
    {
      id: 'genderOptions',
      options: [
        { value: 'male', label: 'Male', trigger: 'getEmail' },
        { value: 'female', label: 'Female', trigger: 'getEmail' },
        { value: 'other', label: 'Other', trigger: 'getEmail' },
      ],
    },
    { id: 'getEmail', message: 'Please enter your email address:', trigger: 'email' },
    { id: 'email', user: true, trigger: 'getPhone' },
    { id: 'getPhone', message: 'Please enter your phone number:', trigger: 'phone' },
    { id: 'phone', user: true, trigger: 'getTicketQuantity' },

    // Ticket Quantity
    { id: 'getTicketQuantity', message: 'How many tickets would you like to purchase?', trigger: 'ticketQuantity' },
    { id: 'ticketQuantity', user: true, trigger: 'paymentGateway' },

    // Payment Gateway
    { id: 'paymentGateway', component: <PaymentGateway />, waitAction: true, trigger: 'generateQRCode' },

    // QR Code Generation
    { id: 'generateQRCode', component: <QRCodeGenerator userData={userData} />, asMessage: true, trigger: 'done' },

    // Done
    { id: 'done', message: 'Your ticket has been booked! The QR code has been sent via email. Thank you!', end: true },
  ];

  const theme = {
    background: '#f5f8fb',
    fontFamily: 'Arial, Helvetica, sans-serif',
    headerBgColor: '#00B2A9',
    headerFontColor: '#fff',
    headerFontSize: '18px',
    botBubbleColor: '#00B2A9',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} handleEnd={handleEnd} />
    </ThemeProvider>
  );
};

export default ChatBotWrapper;
