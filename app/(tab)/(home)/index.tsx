import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button } from "react-native";
import React from "react";
import { View } from "react-native";
import FunctionCard from "@/components/ui/functionCard";
import { QrCodeIcon, SparklesIcon } from "react-native-heroicons/outline";
export default function Index() {
  return (
    <ThemedView className="flex flex-1 flex-col pt-20 px-4">
      <View className="flex flex-row mb-8 justify-between">
        <View className="flex flex-row">
          <ThemedText type="title">Thin</ThemedText>
          <ThemedText type="title" lightColor="#c1121f" darkColor="#c1121f">
            Maker
          </ThemedText>
        </View>
      </View>

      {/* <View className="flex flex-row ">
        <View className="w-1/2 bg-red-500"></View>
        <View className="w-1/2 bg-blue-500"></View>
      </View> */}
      <View className="flex flex-row gap-5">
        <FunctionCard
          icon="qrcode"
          link="/(home)/removeBg"
          title="Hello owrld"
        />
        <FunctionCard
          icon="qrcode"
          link="/(home)/removeBg"
          title="Hello owrld"
        />
      </View>
    </ThemedView>
  );
}
