import Papa from 'papaparse';


//Feel free to use the function on any of your graphs :))
// from https://dev.to/thomasfindlay/how-to-download-csv-and-json-files-in-react-18m6 01/12
const downloadCSV = (data, filename) => {
        const csvData = Papa.unparse(data); //convert structured data into CSV-formatted string
        const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'}) //store the data using blob in binary format and set the type to 'text/csv'
        const downloadLink = document.createElement('a'); //create an <a> element for downloading the data in the memory
        downloadLink.href = URL.createObjectURL(blob); //set the URL for the <a> element
        downloadLink.download = filename; //Set the file name for the link
        document.body.appendChild(downloadLink); //append the URL link into the body of the document to be part of the DOM
        downloadLink.click() //trigger a click event for the downloading process
        document.body.removeChild(downloadLink); //clean up the DOM once the click event is triggered
};

export default downloadCSV;