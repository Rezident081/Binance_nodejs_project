# Binance dashboard

This project is designed to fetch and display cryptocurrency data from the Binance exchange to the user. Utilizing the ccxt library in conjunction with Node.js and Express for data retrieval, and React for the frontend display, this application offers an insightful look into various cryptocurrency metrics. 
Visualization of data is further enhanced by the use of the ApexCharts library, providing users with a dynamic and interactive charting experience.

![изображение](https://github.com/Rezident081/Binance_nodejs_project/assets/15907642/86c27c5f-c7ae-4b47-892e-77b39f896afb)

## Features
The Binance Dashboard offers a range of functionalities, including:

Currency Pair Selection: Users can load all currency pairs paired with USDT. They have the option to select from various timeframes for data display, including:
- 4 hours
- 1 day
- 1 week
- 1 month

![изображение](https://github.com/Rezident081/Binance_nodejs_project/assets/15907642/8b5c1c87-f5b8-4700-a6c5-22eaeae8e70d)


Data for the selected currency pair and timeframe is fetched for a period of **3 months**.

Signal Placement: Users have the capability to place signals on the chart randomly.

![изображение](https://github.com/Rezident081/Binance_nodejs_project/assets/15907642/e5d74f36-88b1-4a07-9f99-2beffbb1bbf1)

Real-time Data Fetching: The application can be toggled between real-time and historical data fetching modes, allowing users to monitor current market conditions or analyze past trends.

![изображение](https://github.com/Rezident081/Binance_nodejs_project/assets/15907642/403ce0de-b65c-4afa-9631-49d6b68b596b)

## Getting Started
To get the project up and running on your local machine, follow these steps:

1) Clone the Repository: Clone the project from its repository to your local machine.

`git clone https://github.com/Rezident081/Binance_nodejs_project.git`

2) Install Dependencies: Navigate to the project directory and install the necessary dependencies using Yarn or Npm.

`cd <project-name>`

`yarn install` or `npm install`

3) Start the Application: Launch the application by running the start command. This will start the backend server and the React frontend.

`yarn start` or `npm run start`