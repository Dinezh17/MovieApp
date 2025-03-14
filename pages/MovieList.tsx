import { useEffect, useState } from "react";
import FetchMovies from "../FetchMovies";
import { useNavigate } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("title-asc");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    FetchMovies()
      .then((data) => {
        setMovies(data);
        setFilteredMovies(data);
      })
      .catch(() => setError("Failed to load movies."));
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = movies.filter((movie: any) =>
      movie.title.toLowerCase().includes(query)
    );

    setFilteredMovies(filtered);
  };

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setSortOption(sortValue);

    let sortedMovies = [...filteredMovies];

    if (sortValue === "year-asc") sortedMovies.sort((a: any, b: any) => a.year - b.year);
    else if (sortValue === "year-desc") sortedMovies.sort((a: any, b: any) => b.year - a.year);
    else if (sortValue === "rating-asc") sortedMovies.sort((a: any, b: any) => a.rating - b.rating);
    else if (sortValue === "rating-desc") sortedMovies.sort((a: any, b: any) => b.rating - a.rating);
    else if (sortValue === "title-asc") sortedMovies.sort((a: any, b: any) => a.title.localeCompare(b.title));
    else if (sortValue === "title-desc") sortedMovies.sort((a: any, b: any) => b.title.localeCompare(a.title));

    setFilteredMovies(sortedMovies);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Movie List</h1>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={handleSearch}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "100%",
          maxWidth: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <select
        value={sortOption}
        onChange={handleSort}
        style={{ marginLeft: "10px", padding: "10px", borderRadius: "5px" }}
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="year-asc">Year (Ascending)</option>
        <option value="year-desc">Year (Descending)</option>
        <option value="rating-asc">Rating (Low to High)</option>
        <option value="rating-desc">Rating (High to Low)</option>
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Movie Cards Container */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "20px", marginTop: "20px" }}>
        {filteredMovies.map((movie: any) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
              background: "#fff",
            }}
            onClick={() => navigate(`/movie/${movie.id}`)}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ margin: "10px 0" }}>{movie.title}</h3>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Year:</strong> {movie.year}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
