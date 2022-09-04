import axios from "axios";
import React, { useEffect, useState } from "react";

const OpenWater = () => {
  const [openWater, setOpenWater] = useState({});
  const [isCentigrade, setIsCentigrade] = useState(true)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
    function success(pos) {
      const crd = pos.coords;

      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=e9e7c415f76d245a641e87caa0f21fb9`
        )
        .then((res) => setOpenWater(res.data));
    }
  }, []);
  console.log(openWater);
  return (
    <div className="card">
      <h1>Wheather App</h1>
      <div>
        <h2>
          {openWater?.name}, {openWater.sys?.country}
        </h2>
      </div>
      <div>
        <b>Temperature: </b> {isCentigrade ? openWater.main?.temp : ((openWater.main?.temp - 273.15)*1).toFixed(2)}  {isCentigrade ? 'Kelvin': 'Centigrade'}
      </div>
      <div className="icon">
        <img
          src={`http://openweathermap.org/img/wn/${openWater.weather?.[0].icon}.png`}
          alt=""
        />
      </div>
      <div>
        <h2>{openWater.weather?.[0].description}</h2>
      </div>
      <div>
        <b>Wind Speed: </b> {openWater.wind?.speed} m/s
      </div>
      <div>
        <b>Cloud: </b>
        {openWater.clouds?.all}%
      </div>
      <div>
        <b>Pressure: </b> {openWater.main?.pressure}
      </div>
      <button onClick={()=> setIsCentigrade(!isCentigrade)}>
        Change to {isCentigrade ? 'Centigrade' : 'Kelvin'}
      </button>
    </div>
  );
};

export default OpenWater;
