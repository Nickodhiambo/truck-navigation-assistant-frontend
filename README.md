# Truck Navigation Web Service Frontend

## Overview
The frontend of the Truck Navigation Web Service is built using React + Vite. It allows drivers to plan their routes by providing inputs such as current location, pickup and dropoff locations, and hours of service. The application displays the planned route with stops on a map and generates a PDF log sheet detailing the route activities.

## Features
- Interactive UI for inputting locations.
- The app fetches today's hours of service from the backend
- Map visualization for planned routes, including stops.
- PDF generation for a the daily log sheet.

## Requirements
To set up and run the frontend, ensure you have the following:

- Node.js (v14 or higher)
- npm

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/truck-navigation-assistant-frontend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Environment Variables
Create a `.env` file in the root directory with the following keys:

- `REACT_VITE_API_URL`: The URL of the backend API.

## Running the Application
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:5173/`.

## Usage
1. Click on `Sign In` to create your account.
2. Provide login credentials in the resulting page to access the dashboard.
3. Navigate to the `Plan Trip` page.
4. Input the following details in the provided fields:
   - Current location
   - Pickup location
   - Dropoff location
5. Click on `Plan a Trip`
6. View the planned route and stops on the map.
7. Generate the log sheet by clicking the "Generate Logsheet" button.

## Alternatively, you can view the deployed version
Visit `https://truck-navigation-assistant-frontend.vercel.app/`

## Libraries Used
- `react`: For building the user interface.
- `axios`: For making API requests to the backend.
- `react-router-dom`: For routing.
- `leaflet` and `react-leaflet`: For map rendering.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push your changes:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For questions or support, contact nodhiambo01@gmail.com.


