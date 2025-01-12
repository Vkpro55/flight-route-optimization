

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet/dist/images/marker-shadow.png'; //Import images
import 'leaflet/dist/images/marker-icon.png'; //Import images
import 'leaflet/dist/images/marker-icon-2x.png'; //Import images

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightPathAnimation = ({ departureCity, arrivalCity, preference }) => {

    const mapRef = useRef(null);
    const [routeData, setRouteData] = useState(null);
    const [previousSearch, setPreviousSearch] = useState(null);

    useEffect(() => {
        const currentSearch = JSON.stringify({ departureCity, arrivalCity, preference });
        setPreviousSearch(currentSearch);
        if (currentSearch !== previousSearch) {


            const fetchRouteData = async () => {
                try {
                    const response = await fetch('https://flightrouteoptimization-backend.onrender.com/api/routes/calculate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            departureCity: departureCity,
                            arrivalCity: arrivalCity,
                            option: preference
                        }),
                    });

                    const data = await response.json();

                    if (data.message === "Route not found between the cities") {
                        toast.error(data.message, {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        setRouteData({
                            route: []
                        });
                    } else {
                        setRouteData(data);
                    }
                } catch (error) {
                    toast.error("An error occurred while fetching flight data.", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.error('Error fetching route data:', error.message);
                }
            };
            fetchRouteData();

        }

    }, [departureCity, arrivalCity, preference, previousSearch]);


    useEffect(() => {

        if (routeData) {
            const map = L.map(mapRef.current).setView([20.5937, 78.9629], 4);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

            const flightIcon = L.icon({
                iconUrl: '/flight-icon.png',
                iconSize: [72, 72],
                iconAnchor: [36, 36],
                className: 'flight-icon',
            });

            // console.log(Array.isArray(routeData.route))
            // console.log(routeData.route.length)

            routeData.route.forEach((leg) => {
                L.marker([parseFloat(leg.fromLat), parseFloat(leg.fromLon)])
                    .addTo(map)
                    .bindPopup(`<b>Airport:</b> ${leg.from} <br><b>Airline:</b> ${leg.airlineName}`);
                L.marker([parseFloat(leg.toLat), parseFloat(leg.toLon)])
                    .addTo(map)
                    .bindPopup(`<b>Airport:</b> ${leg.to} <br><b>Airline:</b> ${leg.airlineName}`);
            });

            let currentLegIndex = 0;
            let flightProgress = 0;
            const flightPath = L.polyline([], { color: 'blue', weight: 5 }).addTo(map);
            let flightMarker = null;
            const linear = (t) => t;

            const animateFlight = () => {
                if (currentLegIndex < routeData.route.length) {
                    const leg = routeData.route[currentLegIndex];
                    const from = [parseFloat(leg.fromLat), parseFloat(leg.fromLon)];
                    const to = [parseFloat(leg.toLat), parseFloat(leg.toLon)];

                    flightProgress += 0.0099999;

                    const linearProgress = linear(flightProgress);

                    const lat = from[0] + (to[0] - from[0]) * linearProgress;
                    const lon = from[1] + (to[1] - from[1]) * linearProgress;

                    if (isNaN(from[0]) || isNaN(from[1]) || isNaN(to[0]) || isNaN(to[1])) {
                        console.error("Invalid latitude or longitude data:", leg);
                        return;
                    }


                    flightPath.setLatLngs([...flightPath.getLatLngs(), [from, to]]);

                    const angle = Math.atan2(to[1] - from[1], to[0] - from[0]) * (180 / Math.PI);

                    if (flightMarker) {
                        flightMarker.setLatLng([lat, lon]);
                        flightMarker.setIcon(
                            L.icon({
                                iconUrl: '/assets/flight-icon.png',
                                iconSize: [150, 150],
                                iconAnchor: [100, 65],
                                className: 'flight-icon',
                                iconAngle: angle,
                            })
                        );
                    } else {
                        flightMarker = L.marker([lat, lon], { icon: flightIcon }).addTo(map);
                    }

                    if (flightProgress >= 0 && flightProgress <= 0.01 && currentLegIndex === 0) {
                        const departureMessage = `
            <b>Airport:</b> ${leg.from} <br>
            <b>Flight:</b> ${leg.airlineName} <br>
            <b>Flight Time:</b> ${leg.time} hours <br>
            <b>Overlay Time:</b> ${leg.overlay} minutes
          `;
                        flightMarker.bindPopup(departureMessage, { offset: [0, -50] }).openPopup();
                    }

                    const progressThreshold = 0.8;
                    if (flightProgress >= progressThreshold && currentLegIndex === 0) {
                        const intermediateMessage = `
            <b>Airport:</b> ${leg.to} <br>
            <b>Flight:</b> ${leg.airlineName} <br>
            <b>Flight Time:</b> ${leg.time} hours <br>
            <b>Overlay Time:</b> ${leg.overlay} minutes
          `;
                        flightMarker.bindPopup(intermediateMessage, { offset: [0, -50] }).openPopup();
                    }

                    if (flightProgress >= 1) {
                        if (currentLegIndex < routeData.route.length - 1) {
                            currentLegIndex++;
                            flightProgress = 0;
                            const nextLeg = routeData.route[currentLegIndex];
                            const nextDepartureMessage = `
              <b>Airport:</b> ${nextLeg.from} <br>
              <b>Flight:</b> ${nextLeg.airlineName} <br>
              <b>Flight Time:</b> ${nextLeg.time} hours <br>
              <b>Overlay Time:</b> ${nextLeg.overlay} minutes
            `;
                            flightMarker.bindPopup(nextDepartureMessage, { offset: [0, -50] }).openPopup();
                        } else {
                            const finalMessage = `
              <b>Journey Complete!<br></b>
              <b>Departure City:</b> ${routeData.departureCity} <br>
              <b>Arrival City:</b> ${routeData.arrivalCity} <br>
              <b>Total Time:</b> ${routeData.totalTime} hours <br>
              <b>Total Cost:</b> ${routeData.totalCost}
            `;
                            flightMarker.bindPopup(finalMessage, { offset: [0, -50] }).openPopup();
                            return;
                        }
                    }

                    if (currentLegIndex < routeData.route.length) {
                        requestAnimationFrame(animateFlight);
                    }
                }
            };

            animateFlight();

            return () => {
                map.remove();
            };
        }
    }, [routeData]);

    return (
        <>
            <ToastContainer />
            <div id="map" ref={mapRef} style={{ height: '100%', width: '100%' }} />
        </>
    )


};

export default FlightPathAnimation;

