import React, { useState } from "react";
import axios from "axios";
import "./Wheather.css";
import Loader from "./Loader";
const WheatherDashboard = () => {
  const [location, setLocation] = useState("");
  const [data, setData] = useState(null);
  const [err, setError] = useState(null);
  const [isLoading, setIsloading] = useState(false);
  const date = new Date();
  async function getWheatherDetails() {
    setIsloading(true);
    setError(null);
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=43167e302eb5a3784ab184a3f00d5ae7`
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data);
        setIsloading(false);
      })
      .catch((err) => {
        setError(err);
        setIsloading(false);
        setData(null);
      });
  }
  return (
    <div className="main-container">
      <div className="left">
        {isLoading ? (
          <Loader />
        ) : (
          <div className="weather-data">
            <h1 id="w-temp">{`${data ? data?.main?.temp : 0} °F`}</h1>
            <div className="wrapper">
              <h1 id="wc-name">
                {err && !err.response
                  ? "Internet error"
                  : err && err?.response?.status === 404
                  ? "City Not found"
                  : data
                  ? data?.name
                  : "-"}
              </h1>
              <div className="wrapper-1" id="icon-container">
                <p id="w-type">{data ? data?.weather[0]?.main : "-"}</p>
                <i className="icon"></i>
                <h5 id="date">{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</h5>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="right">
        <div className="right-top">
          <div className="input-feild">
            <input
              id="w-input"
              type="text"
              spellCheck="false"
              placeholder="Enter City Name"
              autoComplete="false"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
          <button
            className="search_btn"
            id="search"
            onClick={getWheatherDetails}
          >
            Search
          </button>
        </div>
        <div className="right-bottom">
          <div className="details">
            <h3>Weather Details</h3>
            <div className="weather-details">
              <h4>
                Temperature:{" "}
                <span id="w-temp1">
                  {data ? `${data?.main?.temp}° F` : "0°"}
                </span>
              </h4>
              <h4>
                Feels Like:{" "}
                <span id="w-feels">
                  {data ? `${data?.main?.feels_like}° F` : "0°"}
                </span>
              </h4>
              <h4>
                Wind Speed:{" "}
                <span id="w-wind">
                  {data ? `${data?.wind?.speed} kmph` : "0 kmph"}
                </span>{" "}
              </h4>
              <h4>
                Humidity:{" "}
                <span id="w-humid">
                  {" "}
                  {data ? `${data?.main?.humidity}%` : "0%"}
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WheatherDashboard;
