import downloadCSV from "../../src/helperFunctions/downloadCSV.js";
import Papa from 'papaparse';
const testData = [
    { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
    { "x": "2013-01-01T00:00:00", "y": 7.3},
    {"x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
];

describe('downloadCSV', () => {
    it('should create a download link with the correct CSV data', () => {
        // Mock the required objects and functions
        const data = [
            { x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000 },
            { x: "2013-01-01T00:00:00", y: 7.3},
            {x: "2013-01-01T00:00:00" , y: 0.0000894006878634641*100000},
        ];
        const filename = "test_data.csv";

        const createObjectURLMock = jest.fn();
        const appendChildMock = jest.fn();
        const clickMock = jest.fn();
        const removeChildMock = jest.fn();

        const unparseSpy = jest.spyOn(Papa, 'unparse').mockReturnValue('csvData');

        //Mock the necessary DOM functions
        URL.createObjectURL = createObjectURLMock;
        document.body.appendChild = appendChildMock;
        document.body.removeChild = removeChildMock;

        //Mock a download link
        jest.spyOn(document, 'createElement').mockImplementation(() => ({
            href: null,
            download: null,
            click: clickMock,
        }));

        //Call the function
        downloadCSV(data, filename);

        //Check if everything is being created properly
        //Check if the data is being unparse
        expect(unparseSpy).toHaveBeenCalledWith(data);
        //Check if URL object is being created
        expect(createObjectURLMock).toHaveBeenCalled();
        //Check the function is being added to DOM
        expect(appendChildMock).toHaveBeenCalled();
        //Check if the function is being called
        expect(clickMock).toHaveBeenCalled();
        //Check if DOM is being clean up once the action is being done
        expect(removeChildMock).toHaveBeenCalled();

        // Clean up
        URL.createObjectURL.mockRestore();
        document.body.appendChild.mockRestore();
        document.body.removeChild.mockRestore();
        unparseSpy.mockRestore();
    });
});