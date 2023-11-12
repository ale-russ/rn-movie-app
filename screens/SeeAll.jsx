import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieCard from "../components/MovieCard";
import { fallbackMoviePoster, image185, image500 } from "../api/MovieDB";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";

export default function SeeAll() {
  const { params: data } = useRoute();
  const navigation = useNavigation();

  const { width, height } = Dimensions.get("window");

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <BackButton />

      <ScrollView className="space-y-3 mt-3">
        <Text className="text-white font-semibold ml-4 my-4 text-lg">
          All Trending
        </Text>
        <View className="flex-row justify-between flex-wrap">
          {data &&
            data.map((movie, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.push("Movie", movie)}
                >
                  <View className=" items-center mb-6">
                    <Image
                      className="rounded-3xl"
                      style={{
                        width: width * 0.44,
                        height: height * 0.3,
                      }}
                      source={{
                        uri:
                          image185(movie?.poster_path?.slice(1)) ||
                          fallbackMoviePoster,
                      }}
                    />
                    <Text className="text-neutral-300 ml-3 mt-1 font-semibold text-lg">
                      {movie?.title?.length > 15
                        ? movie?.title?.slice(0, 15) + "..."
                        : movie?.title}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
