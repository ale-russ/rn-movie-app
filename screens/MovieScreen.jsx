import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { LinearGradient } from "expo-linear-gradient";

import MovieList from "../components/MovieList";
import { styles, theme } from "../theme/index";
import Cast from "../components/Cast";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchCreds,
  fetchDetails,
  fetchSimilarMovies,
  image500,
} from "../api/MovieDB";
import BackButton from "../components/BackButton";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);

  const { params: item } = useRoute();

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSmiliarMovies(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchDetails(id);
    setMovie(data);
    setLoading(false);
    return data;
  };

  const getMovieCredits = async (id) => {
    const data = await fetchCreds(id);
    if (data && data.cast) {
      setCast(data.cast);
    }
  };

  const getSmiliarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) {
      setSimilarMovies(data.results);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and the movie poster */}
      <View className="w-full">
        <SafeAreaView
          className={
            "absolute z-20 w-full flex-row justify-between items-center px-4" +
            topMargin
          }
        >
          <BackButton />
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            <HeartIcon
              size="35"
              color={isFavorite ? theme.background : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <View>
            <View>
              <Image
                source={{
                  uri: image500(movie?.poster_path) || fallbackMoviePoster,
                }}
                style={{ width, height: height * 0.55 }}
              />
              <LinearGradient
                colors={[
                  "transparent",
                  "rgba(23,23,23,0.8)",
                  "rgba(23,23,23,1)",
                ]}
                style={{ width, height: height * 0.4 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className="absolute bottom-0"
              />
            </View>

            {/* Movie details */}
            <View
              style={{ marginTop: -(height * 0.09) }}
              className="space-y-3 mb-2"
            >
              {/* title */}
              <Text className="text-white text-center text-3xl font-bold tracking-wider">
                {movie?.original_title}
              </Text>
              {/* Status, release data, runtime */}
              {movie?.id ? (
                <Text className="text-neutral-400 font-semibold text-base text-center">
                  {movie?.status} * {movie?.release_date} * {movie?.runtime} min
                </Text>
              ) : null}
            </View>
            {/* genre */}

            <View className="flex-row justify-center mx-4 space-x-2 mb-2">
              {movie?.genres?.map((genre, index) => {
                let showDot = index + 1 != movie.genres.length;

                return (
                  <Text
                    key={index}
                    className="text-neutral-400 font-semibold text-base text-center"
                  >
                    {genre.name} {showDot ? "*" : null}
                  </Text>
                );
              })}
            </View>
            {/* description */}
            <Text className="text-neutral-400 mx-4 tracking-wide">
              {movie?.overview}
            </Text>
            {/* cast */}
            {cast.length > 0 && <Cast cast={cast} navigation={navigation} />}

            {/* Similar movies */}
            {similarMovies.length > 0 && (
              <MovieList hideSeeAll={true} data={similarMovies} />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
