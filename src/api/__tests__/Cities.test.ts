import { getCities } from '../Cities';
import { createMockCity } from '../../__tests__/__mocks__/mockCity';

const mockCitiesData = createMockCity({ name: 'London' });

describe('Cities API', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch cities successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCitiesData,
    });

    const data = await getCities('London');

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockCitiesData);
  });

  it('should handle API error responses', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    await expect(getCities('London')).rejects.toThrow(
      'Error: 500 Internal Server Error'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
