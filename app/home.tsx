import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
export default function HomeScreen() {
  return (
      <SafeAreaView className="flex-1 bg-black justify-center items-center">
      <Text className="text-xl font-semibold text-blue-500">Hello, NativeWind!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
