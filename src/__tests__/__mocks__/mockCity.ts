import { City } from '../../Types/city';

export const createMockCity = (overrides: Partial<City> = {}): City => {
  return {
    id: 1,
    name: 'Mock City',
    region: 'Mock Region',
    country: 'Mock Country',
    lat: 0.0,
    lon: 0.0,
    url: 'http://mockcity.com',
    ...overrides,
  };
};
