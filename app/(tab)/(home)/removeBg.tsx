import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { View, Text } from "react-native";
export default function RemoveBg() {
  return (
    <ThemedView style={{ flex: 1, flexDirection: "column" }}>
      <View className="flex flex-col">
        <ThemedText>Remove BG</ThemedText>
      </View>
    </ThemedView>
  );
}
