## Live Version

https://weather-app-fg.netlify.app/

## How to run the project locally

1. Clone the repository:

```bash
git clone https://github.com/efeguerrero/weather-app.git
```

2. Navigate to the project directory:

```bash
cd <project-name>
```

3. Install dependencies:

```bash
npm install
```

4. Add your API keys to the .env file:

This project uses the weatherapi.com API from RapidAPI.
If you don't have an API key already, follow [instructions below to get one](#how-to-get-api-key-from-weatherapi-com-in-rapidapi)

```bash
REACT_APP_RAPID_API_KEY=<your-api-key>
```

5. Run the development server:

```bash
npm run start
```

## How to get API key from weatherapi.com in RapidAPI

1. Go to https://rapidapi.com
2. Sign up or login
3. Search for "weatherapi.com" or go to this url https://rapidapi.com/weatherapi/api/weatherapi-com/playground
4. Click on "Subscribe to test", select the plan you want and subscribe.
   - If you opt for the free plan, you will be limited to 3 days only extended forecast.
5. Go to your "Apps" view
6. Find your desired application (default one if you didn't create one)
7. Select the authorization tab
8. Copy your API key
9. Paste it in the .env file as REACT_APP_RAPID_API_KEY
