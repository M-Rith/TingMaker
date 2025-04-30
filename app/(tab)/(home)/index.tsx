import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { router } from "expo-router";
import { Button } from "react-native";
import React, { useState } from "react";
import { View, Text } from "react-native";
import FunctionCard from "@/components/ui/functionCard";
import { QueueListIcon, Squares2X2Icon } from "react-native-heroicons/outline";
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
          {viewAsList === true ? (
            <Squares2X2Icon color="#c1121f" />
          ) : (
            <QueueListIcon color="#c1121f" />
          )}
        </ThemedText>
      </View>

      <View className={`flex ${viewAsList ? "flex-row" : "flex-col"} gap-5`}>
        <FunctionCard
          title="QR Code Generate"
          icon="qrcode"
          link="/qrCodeGenerator"
          viewAsList={viewAsList}
        />

        <FunctionCard
          title="Remove Background"
          icon="qrcode"
          link="/removeBg"
          viewAsList={viewAsList}
        />
      </View>
    </ThemedView>
  );
}
