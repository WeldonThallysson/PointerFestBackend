import { PDFDocument } from "pdf-lib";

export const generatePDF = async (htmlContent: any) => {
    // Criando um documento PDF vazio
    const pdfDoc = await PDFDocument.create();
  
    // Adicionando uma página
    const page = pdfDoc.addPage([600, 400]);
  
    // Adicionando texto à página (você pode substituir isso por HTML ou imagens, se necessário)
    page.drawText(htmlContent, { x: 50, y: 350, size: 12 });
  
    // Serializando o PDF para um buffer
    const pdfBytes = await pdfDoc.save();
  
    return pdfBytes;
  };