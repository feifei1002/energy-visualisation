import domtoimage from 'dom-to-image';

//Feel free to use the function on any of your graphs :))
//From https://github.com/tsayen/dom-to-image 10/12
const graphToImage = (graphId, fileName) => {
    const graphContainer = document.getElementById(graphId);

    domtoimage.toPng(graphContainer).then(function (dataURL) {
        const downloadLink = document.createElement('a'); //create an <a> element for downloading the graph in the memory
        downloadLink.href = dataURL; //set the URL for the <a> element
        downloadLink.download = fileName; //set the file name for the link
        downloadLink.click(); //trigger a click event for the downloading process
        })
        .catch(function (error) {
            console.error('Error generating image:', error);
        });
};

export default graphToImage;