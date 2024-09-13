export const getMuseums = (state) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ name: "State Museum 1" }, { name: "State Museum 2" }]);
      }, 1000);
    });
  };
  
  export const makeBooking = (data) => {
    // Simulate booking process
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Booking Confirmed!");
      }, 1500);
    });
  };