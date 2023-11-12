import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { styles } from "../theme";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185, image342 } from "../api/MovieDB";
import SeeAll from "../screens/SeeAll";

var { width, height } = Dimensions.get("window");

export default function MovieList({ title, data, hideSeeAll }) {
  const navigation = useNavigation();
  return (
    <View className="mb-8 gap-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={() => navigation.navigate("SeeAll", data)}>
            <Text className="text-lg" style={styles.text}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          let imageUrl = item?.poster_path?.slice(1);
          return (
            <TouchableWithoutFeedback
              onPress={() => navigation.push("Movie", item)}
              key={index}
            >
              <View className="space-y-1 mr-4">
                <Image
                  className="rounded-3xl"
                  style={{ width: width * 0.33, height: height * 0.22 }}
                  source={{
                    // uri: image185(item.poster_path) || fallbackMoviePoster,
                    uri: image185(imageUrl) || fallbackMoviePoster,
                  }}
                />
                <Text className="text-neutral-300 ml-1">
                  {item.title?.length > 14
                    ? item.title.slice(0, 14) + "..."
                    : item.title}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
