import { View, Text, Dimensions } from "react-native";
import React from "react";
import tw from "twrnc";
import Carousel from "react-native-snap-carousel";
import MovieCard from "./MovieCard";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");

const TrendingMovies = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View className="mb-8 ">
      <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
      <Carousel
        data={data}
        renderItem={({ item }) => {
          return (
            <MovieCard
              item={item}
              handleClick={() => navigation.navigate("Movie", item)}
            />
          );
        }}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        inactiveSlideScale={0.85}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: "flex", alignItems: "center" }}
      />
    </View>
  );
};

export default TrendingMovies;
