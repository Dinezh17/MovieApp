import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`/api/movies/${id}`)
      .then((response) => setMovie(response.data))
      .catch(() => setError("Movie not found"));
  }, [id]);

  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;
  if (!movie) return <h2>Loading...</h2>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Description:</strong> {movie.awards}</p>
      <img src={movie.poster} alt={movie.title} width="200" />
    </div>
  );
};

export default MovieDetail;
