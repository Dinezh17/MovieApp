import axios from "axios";


const FetchMovies = async()=>{
   try{
    const response = await axios.get("/api/movies");
    return response.data
   }catch(error){
    console.log("error fetching movies")
    return []
   }
}

export default FetchMovies