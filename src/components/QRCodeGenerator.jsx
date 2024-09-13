import React from 'react';
import { QRCode } from 'react-qrcode-logo';

const QRCodeGenerator = ({ userData }) => {
  const ticketInfo = `Name: ${userData.name}, Age: ${userData.age}, Gender: ${userData.gender}, Phone: ${userData.phone}, Tickets: ${userData.tickets}`;

  return (
    <div>
      <h3>Scan this QR code at the museum:</h3>
      <QRCode value={ticketInfo} />
    </div>
  );
};

export default QRCodeGenerator;
