import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

/**
 * Generates and downloads an ID card PDF
 * @param {HTMLElement} element - The ID card element to convert to PDF
 * @param {string} fileName - The name of the PDF file
 */
export const generateIdCardPdf = async (element, fileName = 'id-card.pdf') => {
  try {
    // Set options for html2canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Higher quality
      useCORS: true, // Allow cross-origin images
      logging: false,
      backgroundColor: '#ffffff',
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    // Calculate PDF dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // A4 size in mm (landscape for ID card)
    const pdfWidth = 210; // A4 width in mm
    const pdfHeight = 297; // A4 height in mm
    
    // Calculate dimensions to fit the card nicely on the page
    const cardWidth = 85; // mm (standard ID card width)
    const cardHeight = 54; // mm (standard ID card height)
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Calculate scaling to fit card on page
    const scaleX = cardWidth / imgWidth;
    const scaleY = cardHeight / imgHeight;
    const scale = Math.min(scaleX, scaleY);
    
    const scaledWidth = imgWidth * scale;
    const scaledHeight = imgHeight * scale;
    
    // Center the card on the page
    const x = (pdfWidth - scaledWidth) / 2;
    const y = (pdfHeight - scaledHeight) / 2;

    // Convert canvas to image
    const imgData = canvas.toDataURL('image/png');
    
    // Add image to PDF
    pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
    
    // Download the PDF
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
