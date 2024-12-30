import { IQTestResultTem1 } from "../../assets";
import { popGIF, Poppins_Bold } from "../../assets";
import { PDFDocument, rgb } from "pdf-lib";
import * as fontkit from "fontkit";
export const generatePdf = async (name, score, imageData) => {
    if (!imageData) {
      console.error("Image data is not available");
      return null;
    }
  
    // Check if imageData is a valid DataURL
    if (!imageData.startsWith("data:image/png;base64,")) {
      console.error("Invalid image data format:", imageData);
      return null;
    }
  
    const fontBytes = await fetch(Poppins_Bold).then((res) => res.arrayBuffer());
    const existingPdfBytes = await fetch(IQTestResultTem1).then((res) => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);
    const customFont = await pdfDoc.embedFont(fontBytes);
  
    const page = pdfDoc.getPages()[0];
    const { width, height } = page.getSize();
    const fontSize = 24;
  
    // Main header text
    const text = `Hello, ${name}!`;
    const textWidth = customFont.widthOfTextAtSize(text, fontSize);
    const x = (width - textWidth) / 2;
    const y = 550;
  
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      color: rgb(1, 0.76, 0),
      font: customFont,
    });
  
    // IQ Score text
    const iqScoreText = `Your IQ Score is ${score}`;
    const iqScoreTextWidth = customFont.widthOfTextAtSize(iqScoreText, fontSize);
    const iqScoreTextX = (width - iqScoreTextWidth) / 2;
    const iqScoreTextY = y - fontSize - 10;
  
    page.drawText(iqScoreText, {
      x: iqScoreTextX,
      y: iqScoreTextY,
      size: fontSize,
      color: rgb(1, 1, 1),
      font: customFont,
    });
  
    // Embed the chart image
    const chartImageBytes = await fetch(imageData).then((res) => res.arrayBuffer());
    const chartImageData = await pdfDoc.embedPng(chartImageBytes);
    const chartWidth = 500;
    const chartHeight = 280;
    const chartX = (width - chartWidth) / 2;
    const chartY = (height - chartHeight) / 2 - 90;
  
    page.drawImage(chartImageData, {
      x: chartX,
      y: chartY,
      width: chartWidth,
      height: chartHeight,
    });
  
    
  
    // Save the PDF document
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
  
    return pdfBlob; // Return the Blob
  };
  
  

  // Check if imageData is a valid DataURL
    // if (!imageData.startsWith("data:image/png;base64,")) {
    //   console.error("Invalid image data format:", imageData);
    //   return;
    // }

    // const fontBytes = await fetch(Poppins_Bold).then((res) =>
    //   res.arrayBuffer()
    // );
    // const existingPdfBytes = await fetch(IQTestResultTem1).then((res) =>
    //   res.arrayBuffer()
    // );
    // const pdfDoc = await PDFDocument.load(existingPdfBytes);
    // pdfDoc.registerFontkit(fontkit);
    // const customFont = await pdfDoc.embedFont(fontBytes);

    // const page = pdfDoc.getPages()[0];
    // const { width, height } = page.getSize();
    // const fontSize = 24;
    // const text = `Hello, ${name}!`;
    // const textWidth = customFont.widthOfTextAtSize(text, fontSize);
    // const x = (width - textWidth) / 2;
    // const y = 510;
    // page.drawText(text, {
    //   x,
    //   y,
    //   size: fontSize,
    //   color: rgb(1, 0.76, 0),
    //   font: customFont,
    // });

    // const iqScoreText = `Your IQ Score is ${score}`;
    // const iqScoreTextWidth = customFont.widthOfTextAtSize(iqScoreText, fontSize);
    // const iqScoreTextX = (width - iqScoreTextWidth) / 2;
    // const iqScoreTextY = y - fontSize - 10; // Adjust to position below the name
    // page.drawText(iqScoreText, {
    //   x: iqScoreTextX,
    //   y: iqScoreTextY,
    //   size: fontSize,
    //   color: rgb(1, 1, 1),
    //   font: customFont,
    // });

    // const chartImageBytes = await fetch(imageData).then((res) =>
    //   res.arrayBuffer()
    // );
    // console.log("chartImageBytes:", chartImageBytes);

    // // const chartImageBytes = await fetch(imageData).then((res) => res.blob());
    // const chartImageData = await pdfDoc.embedPng(chartImageBytes);
    // const chartWidth = 500;
    // const chartHeight = 280;

    // const chartX = (width - chartWidth) / 2;
    // const chartY = ((height - chartHeight) / 2)-130;

    // page.drawImage(chartImageData, {
    //   x: chartX,
    //   y: chartY,
    //   width: chartWidth,
    //   height: chartHeight,
    // });

    // ------------------------------------------------------

    // const chartBlob = new Blob([chartImageBytes], { type: "image/png" });
    // const chartUrl = URL.createObjectURL(chartBlob);

    // // Create an anchor element to trigger download
    // const downloadLink = document.createElement("a");
    // downloadLink.href = chartUrl;
    // downloadLink.download = "chart.png";

    // // Programmatically trigger the download
    // downloadLink.click();

    // // Optionally, revoke the object URL after the download to free up memory
    // URL.revokeObjectURL(chartUrl);

    // --------------------------------------------------------

    // const pdfBytes = await pdfDoc.save();
    // const blob = new Blob([pdfBytes], { type: "application/pdf" });
    // console.log("chart is writed",blob);
