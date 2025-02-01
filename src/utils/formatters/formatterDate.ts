import { format, parseISO } from "date-fns";

export const formatterDate = (date: string) => {
    // Parseia a data no formato ISO
    const formattedBirthDate = parseISO(date);
    return formattedBirthDate; // Retorna o objeto Date
}

export const formatterDateToIso = (date: Date | string) => {
    const dateObject = typeof date === "string" ? parseISO(date) : date;
    const formattedBirthDate = format(dateObject, "yyyy-MM-dd"); 
    return formattedBirthDate;
};

export const formatterDateToString = (item: string | null) => {
    if (item) {
        // Divide a string de data no formato "YYYY-MM-DD"
        const [year, month, day] = item.split('-'); 
        // Retorna a data formatada no formato "DD/MM/YYYY"
        return `${day}/${month}/${year}`;
    }
    // Retorna null se o item for nulo
    return null; 
};

