


const isValidEmail = (email,emailMsg) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return { success: false, message: emailMsg };
    }
    return {success:true}
  };

  
  const validateOtp = (otp) => {
    if (!otp) {
      return { success: false, message: "OTP is required." };
    }
    if (!/^\d{6}$/.test(otp)) {
      return { success: false, message: "OTP must be a 6-digit number." };
    }
    return {success:true}

  };
  
  const validateToken = (token) => {
    if (!token) {
      return { success: false, message: "Token is required." };
    }
    return {success:true}

   };
  
  const validateUserEmail = (email) => {
    if (!email) {
      return { success: false, message: "User email is required." };
    }
    return isValidEmail(email,"User email is invalid!");
  };
  



  module.exports={ validateUserEmail, validateToken, validateOtp, isValidEmail   }