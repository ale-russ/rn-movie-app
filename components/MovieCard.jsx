import {
  Dimensions,
  Image,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";

import { image500 } from "../api/MovieDB";
import Loading from "./Loading";

var { width, height } = Dimensions.get("window");

export default function MovieCard({ item, handleClick }) {
  const [loading, setLoading] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View>
        <Image
          className="rounded-3xl"
          source={{ uri: image500(item.poster_path) }}
          style={{
            width: width * 0.6,
            height: height * 0.4,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
