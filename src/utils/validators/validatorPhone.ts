export const isValidPhoneNumber = (phoneNumber: string) => {

    const phoneRegex = /^(\d{1,3})(\d{1,4})(\d{6,10})$/;

    const match = phoneRegex.exec(phoneNumber);

    if (!match) return false;

    const countryCode = match[1]; 
    const areaCode = match[2];     
    const number = match[3];      

  
    if (countryCode === '55') {
      
        const isValidBrazilAreaCode = areaCode.length >= 2 && areaCode.length <= 4;
      
        const isValidBrazilNumber = number.length >= 8 && number.length <= 9;

        return isValidBrazilAreaCode && isValidBrazilNumber;
    } else {
    
        const isValidAreaCode = areaCode.length >= 1 && areaCode.length <= 4;

      
        const isValidNumber = number.length >= 6 && number.length <= 10;

        return isValidAreaCode && isValidNumber;
    }
}

