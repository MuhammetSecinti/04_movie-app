import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const defaultImage =
  "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";

const MovieCard = ({ poster_path, title, overview, vote_average, id }) => {
    const navigate = useNavigate()
    const {currentUser} = useAuthContext()
    const getVoteClass = (vote) => {
        if (vote >= 8) return "bg-green-500 text-white";
        if (vote >= 6) return "bg-orange-500 text-white";
        return "bg-red-500 text-white";
      };
  return (
    <div className="movie" id="container" onClick={() => navigate(`details/${id}`)}>
      <img
        loading="lazy"
        src={poster_path ? IMG_API + poster_path : defaultImage}
        alt="movie-card"
      />
      <div className="flex align-baseline justify-between p-1 text-white">
        <h5>{title}</h5>
        {currentUser && <span className={`tag ${getVoteClass(vote_average)}`}>{vote_average.toFixed(1)}</span>}
     
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
