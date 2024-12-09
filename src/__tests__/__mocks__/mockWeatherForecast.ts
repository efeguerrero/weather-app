// Used a simpler mocking approach for the weather forecast due to the complexity of the data
export const mockWeatherForecast = {
  forecast: {
    forecastday: [
      {
        date: '2024-03-20',
        date_epoch: 1710892800,
        day: {
          maxtemp_c: 20.5,
          mintemp_c: 12.3,
          condition: {
            text: 'Sunny',
            icon: 'https://example.com/sunny.png',
          },
        },
      },
      {
        date: '2024-03-21',
        date_epoch: 1710979200,
        day: {
          maxtemp_c: 22.8,
          mintemp_c: 14.1,
          condition: {
            text: 'Partly cloudy',
            icon: 'https://example.com/partly-cloudy.png',
          },
        },
      },
      {
        date: '2024-03-22',
        date_epoch: 1711065600,
        day: {
          maxtemp_c: 18.4,
          mintemp_c: 11.2,
          condition: {
            text: 'Rain',
            icon: 'https://example.com/rain.png',
          },
        },
      },
      {
        date: '2024-03-23',
        date_epoch: 1711152000,
        day: {
          maxtemp_c: 25.1,
          mintemp_c: 15.0,
          condition: {
            text: 'Cloudy',
            icon: 'https://example.com/cloudy.png',
          },
        },
      },
      {
        date: '2024-03-24',
        date_epoch: 1711238400,
        day: {
          maxtemp_c: 23.6,
          mintemp_c: 13.2,
          condition: {
            text: 'Clear',
            icon: 'https://example.com/clear.png',
          },
        },
      },
    ],
  },
};
