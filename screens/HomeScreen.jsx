import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { processTailwind } from "react-native-tailwindcss";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { styles } from "../theme";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import {
  fetchTopRatedMovies,
  fetchTrending,
  fetchUpComing,
} from "../api/MovieDB";
import ProfileScreen from "./ProfileScreen";

const ios = Platform.OS === "ios";

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigate }) => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    getTrendingMovies();
    getUpComing();
    getTopRated();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrending();
    if (data && data.results) setTrending(data.results);
    setLoading(false);
  };
  const getUpComing = async () => {
    const data = await fetchUpComing();
    if (data && data.results) setUpcoming(data.results);
    setLoading(false);
  };
  const getTopRated = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRated(data.results);
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 bg-neutral-800`}>
      {/* Search bar and logo */}
      <SafeAreaView style={{ marginBottom: ios ? "-2" : 3 }}>
        <StatusBar style="light" />
        <View
          className="flex-row justify-between items-center mx-4"
          // style={tw`flex-row justify-between items-center mx-4`}
        >
          {/* <TouchableOpacity onPress={() => navigate.openDrawer}>
            <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity> */}

          <Text style={tw`text-white text-3xl font-bold`}>
            <Text style={styles.text}>M</Text>
            ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          {trending.length > 0 && <TrendingMovies data={trending} />}

          {/* upcoming movies row */}
          {upComing.length > 0 && (
            <MovieList title="Upcoming" data={upComing} />
          )}

          {/* Top rated Movies */}
          {topRated.length > 0 && (
            <MovieList title="Top Rated" data={topRated} />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
