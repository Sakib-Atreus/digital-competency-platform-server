import fs from 'fs';
import path from 'path';
import { PDFDocument, StandardFonts } from 'pdf-lib';

export const generatePDF = async (data: { userName: string, examTitle: string, level: string, date: string }) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 400]);
  const { width, height } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 24;

  page.drawText('Certificate of Achievement', { x: 50, y: height - 50, size: fontSize, font });
  page.drawText(`This certifies that ${data.userName}`, { x: 50, y: height - 100, size: fontSize - 4, font });
  page.drawText(`has successfully completed ${data.examTitle}`, { x: 50, y: height - 130, size: fontSize - 4, font });
  page.drawText(`Level: ${data.level}`, { x: 50, y: height - 160, size: fontSize - 4, font });
  page.drawText(`Date: ${data.date}`, { x: 50, y: height - 190, size: fontSize - 4, font });

  const pdfBytes = await pdfDoc.save();
  const filePath = path.join(__dirname, `../../../certificates/${data.userName}_${data.examTitle}_${data.level}.pdf`);
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
};