import API from ".";


export const createMovie = async (movieData) => {
  try {
    const { data } = await API.post("/movies", movieData);
    return data;
  } catch (error) {
    throw error.response?.data || { message: "Movie creation failed" };
  }
};

export const getMovies = async () => {
  try{
      const { data } = await API.get("/movies");
      return data;
  }catch (error) {
    throw error.response?.data || { message: "Could not load movies!"};
  }
}

export const getMovieById = async (id) =>{
  try{
      const { data } =await API.get(`/movies/${id}`)
      return data;
  }catch (error) {
    throw error.response?.data || { message: "Oops! something went wrong"}
  }
}

export const getLatestMovies = async () => {
  try{
      const { data } = await API.get("/movies/latest")
      return data;
  }catch (error) {
    throw error.response?.data || { message: "Something went wrong!"}
  }
}

export const getTopRatedMovies = async () => {
  try{
      const { data } = await API.get("/movies/top-rated")
      return data;
  }catch (error) {
    throw error.response?.data || { message: "Something went wrong!"}
  }
}

export const getMoviesByGenre = async (genre) => {
  try{
    const { data } = await API.get(`/movies/genre/${genre}`)
    return data;
  }catch (error) {
    throw error.response?.data || { message: "Something went wrong!"}
  }
}

export const updateMovie = async (id,movie) => {
  try {
    const { data } = await API.put(`/movies/${id}`,movie)
    return data;
  }catch (error) {
    throw error.response?.data || { message: "Something went wrong!"}
  }
}

export const deleteMovie = async (id) => {
  try {
        const { data } = await API.delete(`/movies/${id}`)
        return data;
  }catch (error){
    throw error.response?.data || { message: "Something went wrong!"}
  }
}