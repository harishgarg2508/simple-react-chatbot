import React, { useEffect } from 'react';

const PaymentGateway = ({ triggerNextStep }) => {
  useEffect(() => {
    // Simulate payment process
    setTimeout(() => {
      alert('Payment successful!');
      triggerNextStep();  // Move to the next step after payment
    }, 2000);
  }, [triggerNextStep]);

  return <div>Redirecting to payment gateway...</div>;
};

export default PaymentGateway;
    