import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import FlightPathAnimation from '../components/FlightPathAnimation';
import Contact from '../components/Contact';

const HomePage = () => {
    // State for form inputs
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [preference, setPreference] = useState('');
    const [searchData, setSearchData] = useState(null);
    // Handle search button click
    const handleSearch = () => {
        if (!departureCity || !arrivalCity || !preference) {
            alert('Please fill all the fields!');
            return;
        }
        console.log(departureCity, arrivalCity, preference);
        setSearchData({ departureCity, arrivalCity, preference });
    };


    return (
        <div className="section-homepage">
            <div className="main-section container">
                <div className="navbar">
                    <div className="navbar-logo">
                        <figure>
                            <img src="/assets/logo.png" alt="website-logo" />
                        </figure>
                        <h3>FlightRouteFinder</h3>
                    </div>
                    <div className="navbar-items">
                        <ul>
                            <li><a href="#content-section">Flight Route</a></li>
                            <li><a href="#contact-section">About Us</a></li>
                            {/* <li><ScrollLink to="content-section" smooth={true} duration={500}>Flight Route</ScrollLink></li>
                            <li><ScrollLink to="contact-section" smooth={true} duration={500}>About Us</ScrollLink></li> */}
                        </ul>
                    </div>
                </div>

                <div className="main-content">
                    <div className="main-heading">
                        <h1>"Your Journey Starts Here— <span>Fly Smarter</span>, Not Harder!"</h1>
                    </div>
                    <div className="main-heading-content">
                        <p>We make finding the perfect flight easy. Whether you're after the cheapest deal, the fastest route, or the shortest journey, our advanced tool compares all options to bring you the best choices. Let us handle the details so you can focus on the adventure ahead!</p>
                    </div>
                </div>
            </div>


            <div id="content-section" className="content-section container">
                <div className="theme-div">
                    <button className='btn btn1'>National</button>
                    <button className='btn btn2'>International</button>
                    <button className='btn btn3'>Multi City</button>
                </div>

                <div className="flight-content-div">
                    <div className="allbuttons">

                        <div className="flight-button">

                            <div className='first-div'>

                                <fieldset className='departure-button'>
                                    <legend>Departure City</legend>
                                    <figure>
                                        <img src="/assets/dep.png" alt="departure-icon" />
                                    </figure>
                                    <input
                                        type="text"
                                        id="departure-city"
                                        name='"departure-city"'
                                        placeholder='Enter your departure city'
                                        value={departureCity}
                                        onChange={(e) => setDepartureCity(e.target.value)}
                                    />
                                </fieldset>

                                <figure className='link-icon'>
                                    <img src="/assets/link-button.png" alt="link-icon" />
                                </figure>

                                <fieldset className='departure-button'>
                                    <legend>Arrival City</legend>
                                    <figure>
                                        <img src="/assets/arr.png" alt="departure-icon" />
                                    </figure>
                                    <input
                                        type="text"
                                        id="arrival-city"
                                        name="arrival-city"
                                        placeholder='Enter your arrival city'
                                        value={arrivalCity}
                                        onChange={(e) => setArrivalCity(e.target.value)}
                                    />
                                </fieldset>

                            </div>

                            <div className='second-div'>
                                <fieldset className='departure-button'>
                                    <legend>Options</legend>
                                    <figure>
                                        <img src="/assets/location.png" alt="departure-icon" />
                                    </figure>
                                    <select
                                        name="search"
                                        id="search"
                                        value={preference}
                                        onChange={(e) => setPreference(e.target.value)}
                                    >
                                        <option value="" disabled>Select your preference</option>
                                        <option value="fastest">Fastest</option>
                                        <option value="cheapest">Cheapest</option>
                                    </select>
                                </fieldset>
                            </div>

                        </div>

                        <div className="search-button">
                            <button className='search-btn' onClick={handleSearch}>
                                <span>Search Flight</span>
                                <img src="/assets/search-icon.png" alt="Search Icon" />
                            </button>
                        </div>

                    </div>
                </div>
            </div>


            <div className="map-section container">
                <FlightPathAnimation
                    departureCity={searchData ? searchData.departureCity : ''}
                    arrivalCity={searchData ? searchData.arrivalCity : ''}
                    preference={searchData ? searchData.preference : ''}
                />
            </div>


            <div id="contact-section">
                <Contact />
            </div>

        </div>
    );
}

export default HomePage;
