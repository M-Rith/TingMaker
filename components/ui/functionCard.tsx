import React from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";

interface FunctionCardProps {

}

export default function FunctionCard() {
  return (
    <View className="relative flex flex-col my-6 shadow-sm border border-slate-200 rounded-lg w-96">
      <View className="p-4">
        <ThemedText className="mb-2 text-slate-800 text-xl font-semibold">
          Website Review Check Update from Our Team in San Francisco
        </ThemedText>
        <ThemedText className="text-slate-600 leading-normal font-light">
          The place is close to Barceloneta Beach and bus stop just 2 min by
          walk and near to Naviglio where you can enjoy the main night life in
          Barcelona.
        </ThemedText>
      </View>
    </View>
  );
}
