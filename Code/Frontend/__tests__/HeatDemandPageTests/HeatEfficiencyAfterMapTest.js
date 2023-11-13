import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeatEfficiencyAfterHeatMap from '../../src/components/graphs/HeatEfficiencyAfterHeatMap';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';

// Mock the GeoJSON component to return a div with a data-testid attribute.
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(({ children }) => <div data-testid="map-container">{children}</div>),
  TileLayer: jest.fn(() => null),
  GeoJSON: jest.fn(() => <div data-testid="geojson-layer"></div>)
}));

// Sample test data for the HeatEfficiencyAfterHeatMap component
const heatData = [
  {
    "LSOA11CD": "E01000001",
    "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61,
  },
  {
    "LSOA11CD": "E01000002",
    "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62,
  },

];

const geoJsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "LSOA11CD": "E01000001", "LSOA11NM": "City of London 001A" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [ [ [ -0.097288715347549, 51.521577047855459 ], [ -0.096515642542932, 51.520274371001271 ], [ -0.095269034842215, 51.520501986465767 ], [ -0.094770564012461, 51.520594346469125 ], [ -0.094392974221931, 51.52066936131822 ], [ -0.094504708025394, 51.519759242018758 ], [ -0.09529429505753, 51.518925777820698 ], [ -0.095083736973573, 51.518236955046518 ], [ -0.09593354571175, 51.516752792288692 ], [ -0.094943290436749, 51.516586509742694 ], [ -0.095481176694217, 51.515440025484388 ], [ -0.095797241748603, 51.514967104049326 ], [ -0.096588885445263, 51.514841270772351 ], [ -0.097983152973857, 51.515536928099372 ], [ -0.097854188061043, 51.516600031432134 ], [ -0.099748844563837, 51.516767600390352 ], [ -0.099669100609672, 51.517450020863116 ], [ -0.099166091802661, 51.517761105531271 ], [ -0.098200114728284, 51.517897339887419 ], [ -0.098043593491705, 51.517545917936935 ], [ -0.097588469315868, 51.517680232464222 ], [ -0.097763198205056, 51.519664286709627 ], [ -0.097866304948503, 51.519919881388113 ], [ -0.09857496362876, 51.519733400661075 ], [ -0.098524350432694, 51.520538114422969 ], [ -0.097645980579889, 51.520688543115675 ], [ -0.097288715347549, 51.521577047855459 ] ] ]
      }
    },
    {
      "type": "Feature",
      "properties": { "LSOA11CD": "E01000002", "LSOA11NM": "City of London 001B" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [ [ [ -0.088129192891958, 51.519410725355151 ], [ -0.089291342305669, 51.517516208144379 ], [ -0.090119937520299, 51.517477438681709 ], [ -0.090309543777312, 51.517079511780395 ], [ -0.090806374952983, 51.51726210966067 ], [ -0.090686712204769, 51.517538931095849 ], [ -0.091419937438604, 51.517647957312676 ], [ -0.092415629193345, 51.515830518842641 ], [ -0.09403214079283, 51.514093133266066 ], [ -0.094779170856772, 51.514237344194669 ], [ -0.094692318075172, 51.514527211267158 ], [ -0.095227447175914, 51.514590281106543 ], [ -0.095034822531143, 51.515277754078255 ], [ -0.095481176693778, 51.515440025483009 ], [ -0.09494329043704, 51.51658650974418 ], [ -0.095933545710406, 51.516752792286837 ], [ -0.095083736974574, 51.518236955046333 ], [ -0.095294295056143, 51.518925777820243 ], [ -0.094504708023004, 51.519759242020378 ], [ -0.094392974223357, 51.520669361315413 ], [ -0.093921694591198, 51.520773930734322 ], [ -0.094040032312612, 51.521032644985858 ], [ -0.092763202724249, 51.521387320196638 ], [ -0.092527960040061, 51.521428592476319 ], [ -0.092401309616082, 51.521017830302775 ], [ -0.090585440981347, 51.520817407365136 ], [ -0.089694656164423, 51.520687456463179 ], [ -0.089945542604912, 51.519982542232633 ], [ -0.088129192891958, 51.519410725355151 ] ] ] 
      }
    },
  ]
};

describe('HeatEfficiencyAfterHeatMap', () => {
    it('renders the map container', () => {
      // Given
      render(<HeatEfficiencyAfterHeatMap heatData={heatData} geoJsonData={geoJsonData} />);
      
      // When
      const mapContainerElement = screen.getByTestId('map-container');
      
      // Then
      expect(mapContainerElement).toBeInTheDocument();
    });
  
    it('renders the title correctly', () => {
      // Given
      render(<HeatEfficiencyAfterHeatMap heatData={heatData} geoJsonData={geoJsonData} />);
      
      // When
      const titleElement = screen.getByText(/Total heat demand after energy efficiency measures 2018 \(kWh\)/i);
      
      // Then
      expect(titleElement).toBeInTheDocument();
    });
  
    it('renders GeoJSON element when data is provided', () => {
      // Render the component with provided heatData and geoJsonData
      render(<HeatEfficiencyAfterHeatMap heatData={heatData} geoJsonData={geoJsonData} />);
      
      // Check if the MapContainer has been called and it contains the GeoJSON layer
      const mapContainer = screen.getByTestId('map-container');
      expect(mapContainer).toContainElement(screen.getByTestId('geojson-layer'));
  
      // Additionally, check if the GeoJSON component has been called with the correct data prop
      expect(GeoJSON).toHaveBeenCalledWith(expect.objectContaining({
        data: geoJsonData.features
      }), {});
    });
  
    it('calls MapContainer with correct props', () => {
      // Render the component with provided heatData and geoJsonData
      render(<HeatEfficiencyAfterHeatMap heatData={heatData} geoJsonData={geoJsonData} />);
      // Check if MapContainer is called with the expected props
      expect(MapContainer).toHaveBeenCalledWith(expect.objectContaining({
        center: [55.3781, -3.4360],
        zoom: 6
      }), expect.anything());
    });
});