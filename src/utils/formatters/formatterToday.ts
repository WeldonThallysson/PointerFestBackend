import {DateTime} from 'luxon'

const today = new Date();

export const todayFormatted = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "America/Sao_Paulo", // Garante o horário do Brasil
  })
    .format(today)
    .split("/")
    .reverse()
    .join("-"); // Converte para YYYY-MM-DD


export const todayFormattedWithTime = (dateNow: Date) => {
  new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit", // Inclui as horas no formato de 2 dígitos
    minute: "2-digit", // Inclui os minutos no formato de 2 dígitos
    timeZone: "America/Sao_Paulo", // Garante o horário do Brasil
}).format(dateNow).replace(',', ''); // Remove a vírgula entre data e hora


}
  

export const todayFormattedWithTimeToIso = (dateNow: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
    hour12: false, // Para garantir o formato 24h
  };

  // Obter a data e hora formatadas no padrão ISO customizado
  const formatted = new Intl.DateTimeFormat("pt-BR", options)
    .format(dateNow)
    .replace(',', ''); // Remove vírgula

  // Converter "DD/MM/AAAA HH:MM" para "AAAA-MM-DD HH:MM"
  const [date, time] = formatted.split(' ');
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day} ${time}`;
};



export const todayWithTime = (): string => {

  const now = DateTime.now().setZone('America/Sao_Paulo');
  
  
  return now.toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
};


export const todayWithTimeAtFormat = (date?: Date | null): string => {
  if (!date) {
    return ""; // Retorna uma string vazia se `date` for `null` ou `undefined`.
  }

  const isoString = date instanceof Date ? date.toISOString() : date; // Garante que seja uma string ISO
  const [datePart, timePart] = isoString.split("T"); // Divide a data em partes (data e hora)
  const [year, month, day] = datePart.split("-"); // Divide a parte da data (YYYY-MM-DD)
  const [hours, minutes] = timePart.split(":"); // Divide a parte do tempo (HH:mm:ss)

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};