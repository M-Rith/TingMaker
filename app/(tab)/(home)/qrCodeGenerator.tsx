import { ThemedView } from "@/components/ThemedView";
import React, { useRef, useState, useMemo, useCallback } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Button,
} from "react-native";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import QRCode from "react-native-qrcode-svg";
import Checkbox from "expo-checkbox";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedText } from "@/components/ThemedText";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

import ColorPicker, {
  Panel1,
  Swatches,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function QRCodeGenerator() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {}, []);
  const viewRef = useRef(null);

  const [displayValue, setDisplayValue] = useState("");
  const [transparentBackground, setTransparentBackground] = useState(false);
  const [qrCodeColor, setQrCodeColor] = useState("#000000");

  // Add a separate color for the border that will be visible in both modes
  const backgroundColor = useThemeColor(
    { light: "#F5F5F5", dark: "#121212" },
    "background"
  );
  const borderColor = useThemeColor(
    { light: "#000000", dark: "#ffffff" },
    "text"
  );

  // Create a memoized QR code that updates when displayValue, transparentBackground, or qrCodeColor changes
  const StaticQRCode = useMemo(() => {
    return (
      <QRCode
        value={displayValue || "https://example.com"}
        size={200}
        color={qrCodeColor}
        backgroundColor={transparentBackground ? "transparent" : "#ffffff"}
      />
    );
  }, [qrCodeColor]);

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
      const uri = await viewRef.current?.capture();

      // Save to gallery
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert("QR Code Saved to Gallery!");
    } catch (error) {
      console.error("Saving failed", error);
      Alert.alert("Error", "Could not save the QR code.");
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemedView
          style={{ flex: 1, flexDirection: "column" }}
          className="px-4"
        >
          <View style={{ alignItems: "center", marginTop: 50 }}>
            <ViewShot ref={viewRef} options={{ format: "png", quality: 1 }}>
              <View
                style={{
                  backgroundColor: transparentBackground
                    ? "transparent"
                    : "#ffffff",
                  padding: 10,
                }}
              >
                {StaticQRCode}
              </View>
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

          <Button title="Present Sheet" onPress={handlePresentModalPress} />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={["50%", "75%"]}
            onChange={handleSheetChanges}
            backgroundStyle={{ backgroundColor: backgroundColor }}
            handleIndicatorStyle={{ backgroundColor: borderColor }}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                onPress={() => bottomSheetModalRef.current?.close()}
              />
            )}
          >
            <BottomSheetView className="flex-1">
              <View className="px-4">
                <ThemedText className="font-bold text-center" type="subtitle">
                  Edit QR Code
                </ThemedText>

                <View className="flex flex-col py-2">
                  <ThemedText type="default" className="text-start">
                    Colors
                  </ThemedText>

                  <ColorPicker
                    value={qrCodeColor}
                    sliderThickness={25}
                    thumbSize={24}
                    thumbShape="circle"
                    onChangeJS={(color) => {
                      setQrCodeColor(color.hex);
                    }}
                    boundedThumb
                  >
                    <Panel1 style={styles.panelStyle} />
                    <HueSlider style={styles.sliderStyle} />
                    <OpacitySlider style={styles.sliderStyle} />
                    <Swatches
                      style={styles.swatchesContainer}
                      swatchStyle={styles.swatchStyle}
                    />
                    {/* <View style={styles.previewTxtContainer}>
                      <PreviewText style={{ color: "#707070" }} />
                    </View> */}
                  </ColorPicker>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </ThemedView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  swatchesContainer: {
    paddingTop: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#bebdbe",
    alignItems: "center",
    flexWrap: "nowrap",
    gap: 10,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  openButton: {
    width: "100%",
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    backgroundColor: "#fff",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
