import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button } from "react-native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import FunctionCard from "@/components/ui/functionCard";
import { QrCodeIcon, SparklesIcon } from "react-native-heroicons/outline";
export default function Index() {
  const [viewAsList, setViewAsList] = useState(false);
  return (
    <ThemedView className="flex flex-1 flex-col pt-20 px-4">
      <View className="flex flex-row mb-8 justify-between">
        <View className="flex flex-row">
          <ThemedText type="title">Thin</ThemedText>
          <ThemedText type="title" lightColor="#c1121f" darkColor="#c1121f">
            Maker
          </ThemedText>
        </View>

        <ThemedText onPress={() => setViewAsList(!viewAsList)}>
          {viewAsList === true ? "Row" : "List"}
        </ThemedText>
      </View>

      {/* <View className={`flex ${viewAsList ? "flex-row" : "flex-col"} gap-5`}>
        {[1, 2].map((item) => (
          <View
            key={item}
            className={`shadow-sm border rounded-lg h-48 ${
              viewAsList ? "w-1/2" : "w-full"
            }`}
          >
            <View className="p-4 flex flex-col items-center justify-center h-full">
              <ThemedText>Testing</ThemedText>
              <ThemedText className="text-slate-600 leading-normal font-light">
                Hello
              </ThemedText>
            </View>
          </View>
        ))}
      </View> */}

      <View className={`flex ${viewAsList ? "flex-row" : "flex-col"} gap-5`}>
        <View
          className={`bg-blue-500 h-16 flex flex-col items-center justify-center ${
            viewAsList && "flex-1"
          }`}
        >
          <Text>I am here</Text>
        </View>
        <View
          className={`bg-red-500 h-16 flex flex-col items-center justify-center ${
            viewAsList && "flex-1"
          }`}
        >
          <Text>I am here</Text>
        </View>
      </View>
    </ThemedView>
  );
}
