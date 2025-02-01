import { isValid, parseISO } from "date-fns";

export const validateBirthDate = (dateString: string) => {
    const date = parseISO(dateString); 
    return isValid(date); 
  }
  