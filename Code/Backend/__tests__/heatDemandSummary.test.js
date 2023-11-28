const { processHeatDemandData } = require('/utils/heatDemandProcessor');

describe('processHeatDemandData', () => {
    it('should return the processed data with the correct fields', async () => {
        const mockAnnualHeatData = [
            {
                "LSOA11CD": "E01000001",
                "Area (km2)": 0.135739831,
                "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.88,
                "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61
            },
            {
                "LSOA11CD": "E01000002",
                "Area (km2)": 0.223719826,
                "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.12,
                "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62
            },
            // Add more mock data entries as needed
        ];

        const mockResidentialHeatData = [
            {
                "LSOA11CD": "S01000001",
                "Area (km2)": 0.101,
                "Total heat demand before energy efficiency measures 2018 (kWh)": 1234567.89,
                "Total heat demand after energy efficiency measures 2018 (kWh)": 987654.32
            },
            {
                "LSOA11CD": "S01000002",
                "Area (km2)": 0.087,
                "Total heat demand before energy efficiency measures 2018 (kWh)": 987654.32,
                "Total heat demand after energy efficiency measures 2018 (kWh)": 765432.10
            },
            // Add more mock data entries as needed
        ];


        // Mock the fs.readFile function to return your mock data
        jest.spyOn(require('fs').promises, 'readFile')
            .mockResolvedValueOnce(JSON.stringify(mockAnnualHeatData))
            .mockResolvedValueOnce(JSON.stringify(mockResidentialHeatData));

        // Call the function and await the result
        const result = await processHeatDemandData();

        // Assert that the result contains the expected fields
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({
                region: expect.any(String),
                totalBefore: expect.any(Number),
                totalAfter: expect.any(Number),
                area: expect.any(Number),
                averagePerSqKmBefore: expect.any(Number),
                averagePerSqKmAfter: expect.any(Number),
            }),
        ]));
    });
});
