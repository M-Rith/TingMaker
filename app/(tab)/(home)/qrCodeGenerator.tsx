import { ThemedView } from "@/components/ThemedView";
import React, { useRef, useState, useMemo } from "react";
import { View, Alert, TouchableOpacity, Text, TextInput } from "react-native";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import QRCode from "react-native-qrcode-svg";
import Checkbox from "expo-checkbox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
export default function QRCodeGenerator() {
  const viewRef = useRef(null);
  const [displayValue, setDisplayValue] = useState("");
  const [transparentBackground, setTransparentBackground] = useState(false);
  const backgroundColor = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "background"
  );

  // Add a separate color for the border that will be visible in both modes
  const borderColor = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "text"
  );

  // Create a memoized QR code that updates when displayValue or transparentBackground changes
  const StaticQRCode = useMemo(() => {
    return (
      <QRCode
        value={displayValue || "https://example.com"}
        size={200}
        color={"#000000"}
        backgroundColor={transparentBackground ? "transparent" : "#ffffff"}
      />
    );
  }, [transparentBackground]);

  const updateDisplayValue = (newValue: string) => {
    setDisplayValue(newValue);
  };

  const saveToGallery = async () => {
    try {
      // Request permission
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied");
        return;
      }

      // Capture the QR view
      const uri = await viewRef.current.capture({
        format: "png",
        quality: 1,
        transparent: transparentBackground,
      });

      // Save to gallery
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("QR Code Saved to Gallery!");
    } catch (error) {
      console.error("Saving failed", error);
      Alert.alert("Error", "Could not save the QR code.");
    }
  };

  return (
    <ThemedView style={{ flex: 1, flexDirection: "column" }} className="px-4">
      <View style={{ alignItems: "center", marginTop: 50 }}>
        <ViewShot ref={viewRef} options={{ format: "png", quality: 1 }}>
          {StaticQRCode}
        </ViewShot>

        <View className="pt-10 w-full">
          <TextInput
            value={displayValue}
            onChangeText={updateDisplayValue}
            placeholder="Enter QR code value"
            className="p-3 mb-4 rounded-md"
            style={{
              borderWidth: 1,
              borderColor: borderColor,
              color: borderColor,
            }}
          />

          <View className="flex-row items-center">
            <Checkbox
              value={transparentBackground}
              onValueChange={setTransparentBackground}
              color="#c1121f"
            />
            <ThemedText className="ml-2">Transparent background</ThemedText>
          </View>

          <TouchableOpacity
            disabled={displayValue === ""}
            onPress={saveToGallery}
            className={`p-3 rounded-md mt-5 ${
              displayValue === "" ? "bg-[#c1121f]/50" : "bg-[#c1121f]"
            }`}
          >
            <Text className="text-white text-center">Save QR Code</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
