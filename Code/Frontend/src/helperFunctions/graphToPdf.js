// Importing necessary libraries
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Converts a specified HTML element containing a graph to a PDF document.
 * @param {string} graphContainerId - The ID of the HTML element containing the graph.
 * @param {string} title - The title to be used for the generated PDF file.
 */
const graphToPdf = async (graphContainerId, title) => {
  try {
    // Get the HTML element by its ID
    const input = document.getElementById(graphContainerId);

    // Define options for html2canvas, setting the scale to 0.6 for better rendering
    const options = { scale: 0.6 };

    // Use html2canvas to capture the content of the specified HTML element
    html2canvas(input, options).then((canvas) => {
      // Convert the canvas image data to a Data URL in PNG format
      const imgData = canvas.toDataURL('image/png');

      // Create a new jsPDF instance in landscape orientation
      const pdf = new jsPDF('landscape');

      // Add the captured image to the PDF at specified coordinates
      pdf.addImage(imgData, 'JPEG', 0, 10);

      // Save the generated PDF with the provided title
      pdf.save(`${title.toString()}.pdf`);
    });
  } catch (error) {
    // Handle and log any errors that occur during the PDF generation process
    console.error('Error generating PDF:', error);
  }
};

// Export the graphToPdf function as the default export of this module
export default graphToPdf;