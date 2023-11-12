import { TouchableOpacity } from "react-native";
import React from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation, useRoute } from "@react-navigation/native";

import { styles } from "../theme";

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="rounded-xl p-1 w-10 ml-3 "
      onPress={() => navigation.goBack()}
      style={styles.background}
    >
      <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
    </TouchableOpacity>
  );
}
