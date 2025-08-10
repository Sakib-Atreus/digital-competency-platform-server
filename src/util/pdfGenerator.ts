import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const generatePDF = async (data: { 
  userName: string; 
  examTitle: string; 
  level: string; 
  date: string; 
}) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([800, 600]);
  const { width, height } = page.getSize();

  const titleFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const bodyFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Colors
  const gold = rgb(0.8, 0.6, 0.2);
  const black = rgb(0, 0, 0);

  // Border
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderWidth: 4,
    color: rgb(1, 1, 1),
    borderColor: gold,
  });

  // Title
  const titleText = "Certificate of Achievement";
  const titleSize = 36;
  const titleWidth = titleFont.widthOfTextAtSize(titleText, titleSize);
  page.drawText(titleText, {
    x: (width - titleWidth) / 2,
    y: height - 100,
    size: titleSize,
    font: titleFont,
    color: gold,
  });

  // Subtitle
  const subtitle = "This is proudly presented to";
  const subSize = 18;
  const subWidth = bodyFont.widthOfTextAtSize(subtitle, subSize);
  page.drawText(subtitle, {
    x: (width - subWidth) / 2,
    y: height - 150,
    size: subSize,
    font: bodyFont,
    color: black,
  });

  // Name
  const nameSize = 28;
  const nameWidth = titleFont.widthOfTextAtSize(data.userName, nameSize);
  page.drawText(data.userName, {
    x: (width - nameWidth) / 2,
    y: height - 200,
    size: nameSize,
    font: titleFont,
    color: black,
  });

  // Description
  const descText = `For successfully completing the exam: ${data.examTitle}`;
  const descSize = 16;
  const descWidth = bodyFont.widthOfTextAtSize(descText, descSize);
  page.drawText(descText, {
    x: (width - descWidth) / 2,
    y: height - 250,
    size: descSize,
    font: bodyFont,
    color: black,
  });

  const levelText = `Achieved Level: ${data.level}`;
  const levelWidth = bodyFont.widthOfTextAtSize(levelText, descSize);
  page.drawText(levelText, {
    x: (width - levelWidth) / 2,
    y: height - 280,
    size: descSize,
    font: bodyFont,
    color: black,
  });

  // Date
  const dateText = `Date: ${data.date}`;
  const dateWidth = bodyFont.widthOfTextAtSize(dateText, descSize);
  page.drawText(dateText, {
    x: (width - dateWidth) / 2,
    y: height - 310,
    size: descSize,
    font: bodyFont,
    color: black,
  });

  // Signature placeholders
  page.drawLine({
    start: { x: 150, y: 100 },
    end: { x: 300, y: 100 },
    thickness: 1,
    color: black,
  });
  page.drawText("Signature", {
    x: 190,
    y: 80,
    size: 12,
    font: bodyFont,
    color: black,
  });

  page.drawLine({
    start: { x: 500, y: 100 },
    end: { x: 650, y: 100 },
    thickness: 1,
    color: black,
  });
  page.drawText("Authorized", {
    x: 540,
    y: 80,
    size: 12,
    font: bodyFont,
    color: black,
  });

  const pdfBytes = await pdfDoc.save();

  // Save to uploads folder
  const uploadsDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const safeFileName = `${data.userName}_${data.examTitle}_${data.level}.pdf`.replace(
    /[^a-z0-9_\-\.]/gi,
    "_"
  );
  const filePath = path.join(uploadsDir, safeFileName);
  fs.writeFileSync(filePath, pdfBytes);

  return filePath;
};
