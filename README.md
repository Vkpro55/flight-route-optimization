# ✈️ Flight Route Finder: Navigate the Skies with Ease
This project aims to simplify the process of finding flight routes by providing an easy-to-use tool for exploring possible connections. While currently working with limited data, it showcases the potential to solve the challenge of identifying efficient travel paths and visualizing routes in a user-friendly way including layovers in the route.

### 🚀 Features
- Optimal Route Calculation: Find the shortest and most efficient flight paths.
- Interactive Visualization: View flight paths on an interactive map.
- Multi-Stop Routes: Plan complex journeys with multiple layovers.
- User-Friendly Interface: Simple and intuitive design for seamless usage.

### 🛠️ Technologies Used
- Backend: Node.js with Express.js
- Frontend: React.js with Leaflet for map integration
- APIs: OpenSky Network API for real-time flight data (Reached Limit: I used very limited openFlights data)


## 🛠️ Backend: Powering Flight Route Finder
The backend of Flight Route Finder is the engine that drives the logic and calculations behind flight routes. Built with Node.js and Express, it ensures a smooth experience by handling requests, processing data, and interacting with the map. Here's a detailed overview of how the backend works and the choices I made while building it.
1. Graph Structure: To model the flight routes, we use a graph structure where airports are represented as nodes, and direct flights between airports are edges. This helps us efficiently find and visualize the best routes. The graph stores the data in a format that allows easy retrieval and comparison of different routes.
```bash
"nodes": {
        "Delhi": {
            "airportName": "Indira Gandhi International Airport",
            "lat": "28.5562",
            "lon": "77.1000",
            "altitude": "777",
            "edges": [
                {
                    "toCity": "Mumbai",
                    "cost": 200,
                    "time": 2,
                    "overlay": 0,
                    "airlineName": "Air India"
                },
                ].....
```
