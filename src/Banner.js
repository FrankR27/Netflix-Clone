import React, { useState, useEffect } from "react";
import axios from "axios";
import requests from "./requests";
import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTreanding);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str = "", maxlength) {
    return str.length > maxlength ? str.substring(0, maxlength - 1) + "…" : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "${baseURL}${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__overview">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="banner--fadeBottom"></div>
    </header>
  );
}

export default Banner;
