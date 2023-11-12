import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";

import Loading from "../components/Loading";
import {
  fallbackMoviePoster,
  fetchSearchResult,
  image185,
  image500,
} from "../api/MovieDB";
import { debounce } from "lodash";

var { width, height } = Dimensions.get("window");

export default function SearchScreen() {
  const navigation = useNavigation();
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      await fetchSearchResult({
        query: value,
        include_adults: "true",
        language: "en-US",
        page: "1",
      }).then((data) => {
        setLoading(false);
        if (data && data.results) setResult(data.results);
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
        <TextInput
          className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider"
          placeholderTextColor={"lightgray"}
          placeholder="Search Movie"
          onChangeText={handleTextDebounce}
        />
        <TouchableOpacity
          className="rounded-full p-3 bg-neutral-500"
          onPress={() => navigation.navigate("Home")}
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* search result */}
      {loading ? (
        <Loading />
      ) : result.length > 0 ? (
        <ScrollView className="space-y-3">
          <Text className="text-white font-semibold ml-1">
            Result: ({result?.length})
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {result.map((item, index) => {
              let imageUrl = item?.poster_path?.slice(1);

              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={{
                        uri: image185(imageUrl) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {item?.title?.length > 22
                        ? item?.title?.slice(0, 22) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
