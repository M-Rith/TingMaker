import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button } from "react-native";
import React from "react";
import { View } from "react-native";

export default function Index() {
  return (
    <ThemedView className="flex flex-1 flex-col pt-20 px-4">
      <View className="flex flex-row mb-8">
        <ThemedText type="title">Thin</ThemedText>
        <ThemedText type="title" lightColor="#c1121f" darkColor="#c1121f">
          Maker
        </ThemedText>
      </View>

      <Button
        title="Go to QR Code Generator"
        onPress={() => router.push("/qrCodeGenerator")}
      />
      <Button
        title="Go to Remove BG"
        onPress={() => router.push("/removeBg")}
      />
    </ThemedView>
  );
}
