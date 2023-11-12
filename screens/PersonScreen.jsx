import {
  View,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles, theme } from "../theme/index";
import MovieList from "../components/MovieList";
import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchPersonDetails,
  fetchPersonMoviesCredit,
  image342,
  image500,
} from "../api/MovieDB";
import BackButton from "../components/BackButton";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS === "ios";
const verticalMargin = ios ? "" : "my-4";

export default function PersonScreen() {
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personInfo, setPersonInfo] = useState([]);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { params: person } = useRoute();

  useEffect(() => {
    setLoading(true);
    fetchPerson(person.id);
    fetchPersonMovies(person.id);
  }, [person]);

  const fetchPerson = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data && data) {
      setPersonInfo(data);
    }

    setLoading(false);
  };

  const fetchPersonMovies = async (id) => {
    const data = await fetchPersonMoviesCredit(id);
    if (data && data.cast) {
      setPersonMovies(data.cast);
    }
  };

  let imageUrl = person?.profile_path?.slice(1);

  return (
    <ScrollView
      className="flex-1 bg-neutral-900 "
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={
          " z-20 w-full flex-row justify-between items-center px-4" +
          verticalMargin
        }
      >
        <BackButton />
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>
      {/* Person details */}

      {loading ? (
        <Loading />
      ) : (
        <View>
          <View
            className="flex-row justify-center"
            style={{
              shadowColor: "gray",
              shadowRadius: 40,
              shadowOpacity: 1,
              shadowOffset: { width: 0, height: 5 },
            }}
          >
            <View className="rounded-full items-center overflow-hidden h-72 w-72 border-2 border-neutral-500">
              <Image
                source={{ uri: image342(imageUrl) || fallbackMoviePoster }}
                style={{ height: height * 0.43, width: width * 0.74 }}
              />
            </View>
          </View>
          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">
              {personInfo?.name}
            </Text>
            <Text className="text-base text-neutral-500 text-center">
              {/* London, United Kingdom */} {personInfo?.place_of_birth}
            </Text>
          </View>
          <View className="p-4 mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Gender</Text>
              <Text className="text-neutral-300 tx-sm">
                {personInfo?.gender === 1 ? "Female" : "Male"}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 tx-sm">
                {personInfo?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Known</Text>
              <Text className="text-neutral-300 tx-sm">
                {personInfo?.known_for_department}
              </Text>
            </View>
            <View className=" px-2 items-center">
              <Text className="text-white font-semibold">Popularity</Text>
              <Text className="text-neutral-300 tx-sm">
                {personInfo?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>
          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personInfo?.biography || "N / A"}
            </Text>
          </View>
          {/* movies */}
          <MovieList title={"Movies"} hideSeeAll={true} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}
