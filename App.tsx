import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MovieList from "./pages/MovieList";
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </Router>
    );
  }
  
  export default App