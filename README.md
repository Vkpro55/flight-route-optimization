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
2.  Why Dijkstra’s Algorithm is Best for This Project: For our Flight Route Finder project, Dijkstra’s Algorithm strikes the right balance of time efficiency (O(E log V)) and space efficiency (O(V + E)), especially when dealing with graphs that represent positive-weighted connections (flight distances, costs, times). While A* and Bellman-Ford are viable alternatives, Dijkstra’s simplicity and reliability make it the best choice for our current needs.
3. Animation on the Map:The backend doesn’t directly handle the animation, but it prepares and sends the necessary data to the frontend. The flight routes, once calculated, are sent as coordinates and waypoints that the frontend uses to animate the route on the map. By using Leaflet.js and custom front-end logic, we visualize the journey with smooth animations, allowing users to see the flight path dynamically as the animation progresses.


## 🎨 Frontend: Building a Seamless User Experience
The frontend of Flight Route Finder is built with React, powered by Vite for a fast development environment, and styled with Pure CSS to ensure clean and minimal design. Here's how the frontend works, how it interacts with the backend, and the technologies that make it all come together.
### 🔗 Frontend-Backend Interaction
1. API Communication:
The communication between the frontend and backend happens via RESTful APIs. The frontend sends HTTP requests to the backend and expects the response in JSON format. The key endpoints for interaction are:
    ```bash
      POST /calculate: Accepts the origin and destination and returns the optimal route.
      GET /routes: Retrieves available routes for the user to explore.
    ``` 
2. State Management:
The frontend uses React’s state and useEffect hooks to manage and update the UI based on API responses. When the user submits the form, the state is updated with the new route data, which automatically triggers the re-render of components like the route map and details.
3. Asynchronous Data Fetching:
Data fetching is done asynchronously, ensuring that the UI remains responsive even while waiting for backend calculations. Axios is used to handle async requests and manage errors, while loading indicators are shown during the waiting period to improve the user experience.
