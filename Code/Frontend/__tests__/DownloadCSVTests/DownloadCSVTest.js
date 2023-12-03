import downloadCSV from "../../src/helperFunctions/downloadCSV.js";

const testData = [
    { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000 },
    { "x": "2013-01-01T00:00:00", "y": 7.3 },
    { "x": "2013-01-01T00:00:00" , "y": 0.0000894006878634641*100000},
]
jest.mock('papaparse', () => ({
    unparse: jest.fn((data) => 'mockedCSVData'),
}));

global.URL.createObjectURL = jest.fn();
test('should create download CSV function properly', () => {

    //Mock all the necessary DOM functions first
    const createElementMock = jest.spyOn(document, "createElement");
    const appendChildMock = jest.spyOn(document.body, "appendChild");
    const removeChildMock = jest.spyOn(document.body, "removeChild")
    const createObjectURLMock = jest.spyOn(URL, "createObjectURL");
    createObjectURLMock.mockReturnValue("mockedObjectURL");

    //Mock a download link
    const downloadLinkMock = {href: " ", download:" ", click: jest.fn()};

    //Mock the createElementMock to return the downloadLinkMock
    createElementMock.mockReturnValue(downloadLinkMock);

    //Call the downloadCSV function
    downloadCSV([testData], "test_data.csv");

    //Check if everything is being created properly
    //CreateElement should be creating "a href" element
    expect(createElementMock).toHaveBeenCalledWith("a");
    //A Blob should be created
    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob));
    //Check the downloadLinkMock is creating the correct URL
    expect(downloadLinkMock.href).toBe("mockedObjectURL");
    //Check the downLoadLinkMock is creating with the correct filename when download
    expect(downloadLinkMock.download).toBe("test_data.csv");
    //Check the function is being added to DOM
    expect(appendChildMock).toHaveBeenCalledWith(downloadLinkMock);
    //Check if the function is being clicked
    expect(downloadLinkMock.click).toHaveBeenCalled();
    //Check if DOM is being clean up once the action is being done
    expect(removeChildMock).toHaveBeenCalledWith(downloadLinkMock);
})