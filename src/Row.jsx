import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURL = "https://image.tmdb.org/t/p/original";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    heigth: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  async function handleClick(movie) {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const url = await movieTrailer(movie?.name || "");
      const urlParams = new URLSearchParams(new URL(url).search);
      setTrailerUrl(urlParams.get("v"));
    }
    return trailerUrl;
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            onClick={() => handleClick(movie)}
            key={movie.id}
            src={`${baseURL}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
