import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import {
  QrCodeIcon,
  QueueListIcon,
  Squares2X2Icon,
} from "react-native-heroicons/outline";
import { useThemeColor } from "@/hooks/useThemeColor";
export default function Index() {
  const [viewAsList, setViewAsList] = useState(false);
  const borderColor = useThemeColor({}, "border");
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

        <ThemedView
          style={{ borderColor: borderColor, borderWidth: 1 }}
          className={`h-48 flex flex-col items-center justify-center rounded-lg ${
            viewAsList && "flex-1"
          }`}
        >
          <Link href="/qrCodeGenerator">
            <View className="p-2 flex flex-col items-center justify-center">
              <QrCodeIcon size={48} color="#c1121f" />
              <ThemedText style={{ paddingTop: 15 }} type="default">
                QR Code Generator
              </ThemedText>
            </View>
          </Link>
        </ThemedView>

        <ThemedView
          style={{ borderColor: borderColor, borderWidth: 1 }}
          className={`h-48 flex flex-col items-center justify-center rounded-lg ${
            viewAsList && "flex-1"
          }`}
        >
          <Link href="/removeBg">
            <View className="p-2 flex flex-col items-center justify-center">
              <QrCodeIcon size={48} color="#c1121f" />
              <ThemedText style={{ paddingTop: 15 }} type="default">
                QR Code Generator
              </ThemedText>
            </View>
          </Link>
        </ThemedView>
      </View>
    </ThemedView>
  );
}
