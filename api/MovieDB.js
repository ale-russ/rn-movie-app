import axios from "axios";

import { apiKey, access_token } from "../constants";

// Endpoints
const baseUrl = "https://api.themoviedb.org/3";

const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day`;
const upComingMoviesEndpoint = `${baseUrl}/movie/upcoming`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated`;
const movieDetailsEndPoint = `${baseUrl}/movie`;

// fallback images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${access_token}`,
};

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : { language: "en-US" },
    headers,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const fetchDetails = async (id) => {
  const response = await apiCall(`${movieDetailsEndPoint}/${id}`);

  return response;
};
export const fetchCreds = async (id) => {
  return await apiCall(`${movieDetailsEndPoint}/${id}/credits`);
};
export const fetchSimilarMovies = (id) => {
  return apiCall(`${movieDetailsEndPoint}/${id}/similar`);
};

export const fetchPersonDetails = async (id) => {
  return await apiCall(`${baseUrl}/person/${id}`);
};

export const fetchPersonMoviesCredit = async (id) => {
  return await apiCall(`${baseUrl}/person/${id}/movie_credits`);
};

export const fetchTrending = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpComing = () => {
  return apiCall(upComingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchSearchResult = async (query) => {
  return apiCall(`${baseUrl}/search/movie`, query);
};
