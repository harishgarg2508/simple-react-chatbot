import React, { useState } from 'react';
import Messages from './Messages';
import Input from './Input';
import { getMuseums, makeBooking } from './api';
import QRCode from 'qrcode.react';  // Import QRCode component

function Chatbot() {
  const [messages, setMessages] = useState([{ text: "Welcome! Please select your language:", sender: "bot" }]);
  const [step, setStep] = useState(0);
  const [bookingData, setBookingData] = useState({});
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleUserInput = (input) => {
    let newMessages = [...messages, { text: input, sender: "user" }];
    
    switch (step) {
      case 0:
        newMessages.push({ text: "Please select your state:", sender: "bot" });
        setStep(1);
        break;
      case 1:
        getMuseums(input).then((museums) => {
          setBookingData({ ...bookingData, state: input });
          newMessages.push({ text: "Select your district:", sender: "bot" });
          setStep(2);
        });
        break;
      case 2:
        setBookingData({ ...bookingData, district: input });
        newMessages.push({ text: "Enter your name:", sender: "bot" });
        setStep(3);
        break;
      case 3:
        setBookingData({ ...bookingData, name: input });
        newMessages.push({ text: "Please enter your email:", sender: "bot" });
        setStep(4);
        break;
      case 4:
        if (!validateEmail(input)) {
          newMessages.push({ text: "Invalid email format! Please enter a valid email:", sender: "bot" });
        } else {
          setBookingData({ ...bookingData, email: input });
          newMessages.push({ text: "Please enter your phone number:", sender: "bot" });
          setStep(5);
        }
        break;
      case 5:
        if (!validatePhoneNumber(input)) {
          newMessages.push({ text: "Invalid phone number! Please enter a valid 10-digit phone number:", sender: "bot" });
        } else {
          setBookingData({ ...bookingData, phone: input });
          newMessages.push({ text: "Please enter your visit date (YYYY-MM-DD):", sender: "bot" });
          setStep(6);
        }
        break;
      case 6:
        if (!validateDate(input)) {
          newMessages.push({ text: "Invalid date! Please enter a valid date (within the next year):", sender: "bot" });
        } else {
          setBookingData({ ...bookingData, date: input });
          newMessages.push({ text: "How many tickets do you need?", sender: "bot" });
          setStep(7);
        }
        break;
      case 7:
        setBookingData({ ...bookingData, tickets: input });
        newMessages.push({ text: "Processing payment...", sender: "bot" });
        makeBooking(bookingData).then(() => {
          const qrData = JSON.stringify(bookingData);
          setQrCodeData(qrData);  // Set the QR code data
          newMessages.push({ text: "Booking confirmed! Your QR code is generated:", sender: "bot" });
          setStep(8);
        });
        break;
      case 8:
        newMessages.push({ text: "Thank you for booking! Have a great visit!", sender: "bot" });
        break;
      default:
        break;
    }

    setMessages(newMessages);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(currentDate.getFullYear() + 1);
    
    return inputDate >= currentDate && inputDate <= oneYearFromNow;
  };

  return (
    <div className="chatbot-container">
      <Messages messages={messages} />
      <Input onSendMessage={handleUserInput} />
      {qrCodeData && (
        <div>
          <p>Here is your QR code:</p>
          <QRCode value={qrCodeData} />
        </div>
      )}
    </div>
  );
}

export default Chatbot;