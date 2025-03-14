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
    <div style={{padding:"40px",border:"1px solid black" , maxWidth:"400px",margin:"30px" , borderRadius:"10px",background:"lightblue",boxShadow:"10px grey"}}>
      <h1>{movie.title}</h1>
      <p><strong>Year:</strong> {movie.year}</p>
      <p><strong>Rating:</strong> {movie.rating}</p>
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>Awards:</strong> {movie.awards}</p>
      <p><strong>BoxOffice:</strong> {movie.boxOffice}</p>
      
      <p><strong>Language:</strong> {movie.language}</p>
      <p><strong>Country:</strong> {movie.country}</p>
      <img style={{borderRadius:"10px"}} src={movie.poster} alt={movie.title} width="200" />
    </div>
  );
};

export default MovieDetail;
