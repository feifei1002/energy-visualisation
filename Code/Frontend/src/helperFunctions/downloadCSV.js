import Papa from 'papaparse';

const downloadCSV = (data, filename) => {
        const csvData = Papa.unparse(data);
        const blob = new Blob([csvData], {type: 'text/csv;charset=utf-8;'})
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click()
        document.body.removeChild(downloadLink);
};

export default downloadCSV;