import React, { useState } from "react";
import axios from "../api/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import img1 from "../images/weather3.png";

function Home() {
    const [weather, setWeather] = useState();
    const [location, setLocation] = useState();
    const [city, setCity] = useState();
    const token = localStorage.getItem("token");

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("weather/", {
                headers: {
                    Authorization: token && token,
                },
                params: {
                    city: city,
                },
            });
            const data = response?.data;
            console.log(data)
            if (data?.success) {
                setLocation(data?.data?.location);
                setWeather(data?.data?.current);
            } else {
                Swal.fire("", data?.message, "error");
            }
        } catch (error) {
            console.log(error);
        }
    };


    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const msg = await axios.post("logout/",null, {
                headers: {
                    Authorization: token && token,
                },
            });
            console.log(msg?.data)
            if (msg?.data?.success) {
                localStorage.removeItem("token");
                Swal.fire("", msg?.data?.message, "success");
                navigate("/");
            } else {
                Swal.fire("", msg?.data?.message, "error");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDate=(data)=>{
        return new Date(data).toString().slice(4, 15)
    }

    return (

        // <div>
        //     <button onClick={(e) => handleLogout(e)}>Logout</button>
        //     <form onSubmit={(e) => handleSearch(e)}>
        //         <input type="text" onChange={(e) => setCity(e.target.value)} required></input>
        //         <input type="submit" value="Search" />
        //     </form>
        //     <div className="card">
        //         {location && location.name}
        //         {weather && weather.temperature}
        //     </div>
        // </div>

        <div>
             <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                    crossorigin="anonymous"/>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
            <script src="https://kit.fontawesome.com/b3e187f879.js" crossorigin="anonymous"></script>




            <div class="row mx-md-5 mt-2">
                <div className="col-12 pe-3" style={{backgroundColor: "#AEE2FF",color: "white"}}>
                    <button className="float-end my-2 btn btn-light" onClick={(e)=> handleLogout(e)}>Logout</button>
                </div>
                <div className="col-md-8 col-12" style={{backgroundColor: "#7877f4",color: "white"}}>
                    <form className="px-5" onSubmit={(e)=> handleSearch(e)}>
                        <div className="text-center pt-2 "><img src={img1} alt="" width="230" height="230"/></div>
                        <div className="text-center pt-1">
                            <h3><strong>WeatherPlus</strong></h3>
                            <p>"Experience the weather"</p>
                        </div>
                        <br/>
                        <h4 className="text-center"> <strong> <i class="fa fa-paper-plane fa-sm"></i> {location && location.name} </strong> <i>Weather Status</i> <strong> <i>{weather && weather.weather_descriptions}</i> </strong> </h4>
                        <hr/>
                        <br/>
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Location" onChange={(e)=>setCity(e.target.value)}/>
                            <button className="btn btn-outline-light" type="submit" id="button-addon2"><i class="fa fa-search" aria-hidden="true"> Search</i></button>
                        </div>
                        <br/>
                    </form>
                </div>
                <div className="col-md-4 col-12" style={{backgroundColor: "#895ded", color: "white"}}>
                    <div className="text-center pt-2 "><img src={img1} alt="" width="100" height="100"/></div>
                    <div className="text-center pt-1">
                        <h3><strong>WeatherPlus</strong></h3>
                        <p>"Experience the weather"</p>
                    </div>
                    <br/>
                    <hr/>
                
                    <p className="text-center">" With WeatherPlus, you can stay informed about <br/> the current temperature, wind speed,
                        humidity, and more. <br/>
                        our user-friendly interface makes it easy <br/> to access precise weather forecasts. <br/>
                        From sunny skies to stormy weather, WeatherPlus <br/> equips you with the information <br/>
                        you need to make informed decisions and adapt <br/> your plans accordingly. <br/>
                        Download WeatherPlus today and experience the power <br/> of weather knowledge in the palm of your hand. "
                    </p> <br/>
                </div>
            </div>


            <div className="row mx-md-5 mx-1 my-1" style={{backgroundColor: "#F7D060", color: "white"}}>
                <div className="col-md-3 col-12 text-md-center py-2">
                    <i className="fa fa-plane fa-lg" aria-hidden="true"> City : {location && location.name} </i>
                </div>
                <div className="col-md-3 col-12 text-md-center py-2">
                    <i className="fa fa-globe fa-lg" aria-hidden="true"> Country : {location && location.country}</i>
                </div>
                <div className="col-md-3 col-12 text-md-center py-2">
                    <i className="fa fa-map-marker fa-lg" aria-hidden="true"> State: {location && location.region}</i>
                </div>
                <div class="col-md-3 col-12  text-md-center py-2">
                    <i class="fa fa-calendar-check-o fa-lg" aria-hidden="true"> Date & Time : {location && handleDate(location.localtime)} </i>
                </div>
            </div>

            <div className="row mx-md-5 mx-1 my-1" style={{backgroundColor: "#ACBCFF", color: "white"}}>
                    <div className="col-md-3 col-12 text-md-center py-2"><i className="fa fa-thermometer-empty fa-lg" aria-hidden="true"> Temperature : {weather && weather.temperature} °C </i>
                    </div>
                
                    <div className="col-md-5 col-12 text-md-center py-2"><i className="fa fa-cloud fa-lg" aria-hidden="true"> Description: {weather && weather.weather_descriptions} </i>
                    </div>
                    <div className="col-md-2 col-12 text-md-center py-2">
                    <i class="fa fa-arrows-h fa-lg"> lat : {location && location.lat} </i>
                    </div>
                    <div className="col-md-2 col-12 text-md-center py-2">
                    <i class="fa fa-arrows-v fa-lg"> lon : {location && location.lon} </i>
                    </div>
                
            </div>

            <div className="row mx-md-5 mx-1 my-1" style={{backgroundColor: "#FF6D60", color: "white"}}>
                <div className="col-md-3 col-12 text-md-center py-2"> <i className="fa fa-tint fa-lg" aria-hidden="true"> Humidity : {weather && weather.humidity} % </i>  
                   </div>
                <div className="col-md-3 col-12 text-md-center py-2"><i className="fa fa-flag fa-lg" aria-hidden="true"> Wind Speed : {weather && weather.wind_speed} km/h </i> 
                    </div>
                <div className="col-md-3 col-12 text-md-center py-2"><i className="fa fa-clock-o fa-lg" aria-hidden="true"> Pressure : {weather && weather.pressure} MB </i> 
                    </div>
                <div className="col-md-3 col-12 text-md-center py-2"><i className="fa fa-eye fa-lg " aria-hidden="true"> Visibility : {weather && weather.visibility} km </i> 
                    </div>
            </div>


            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
                crossorigin="anonymous"></script>
        </div>
           

    );
}

export default Home;
