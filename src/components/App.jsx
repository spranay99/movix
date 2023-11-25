import { useEffect, useState } from "react";
import SearchIcon from "../assets/search.svg";
import MovieCard from "../components/MovieCard";
import popcorn from "../assets/icon-popcorn.png";
import nomovies from "../assets/no_movies_found.svg";
import "../App.css";

const API_URL = "https://www.omdbapi.com/?apikey=dfeba76";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") searchMovies(searchTerm);
  };

  return (
    <div className="app">
      <h1>
        Movix
        <img src={popcorn} alt="popcorn" style={{ height: "80px" }} />
      </h1>
      <div className="search">
        <input
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.imdbID} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <img src={nomovies} alt="No movies found" />
          <h2>No movies found!</h2>
        </div>
      )}
    </div>
  );
};

export default App;
