import { ThemedView } from "@/components/ThemedView";
import React, { useRef, useState, useMemo, useCallback } from "react";
import {
  View,
  Alert,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Image,
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
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PencilIcon } from "react-native-heroicons/outline";
// import { facebookLogo } from "@/assets/images/facebook.png";
// import { instagramLogo } from "@/assets/images/instagram.png";
// import { twitterLogo } from "@/assets/images/twitter.png";
// import { linkedinLogo } from "@/assets/images/linkedin.png";
// import { youtubeLogo } from "@/assets/images/youtube.png";
// import { tiktokLogo } from "@/assets/images/tik-tok.png";
// import { FacebookLogo } from "../../../assets/images/facebook.png";
import FacebookLogo from "@/assets/images/facebook.png";
import InstagramLogo from "@/assets/images/instagram.png";
import TwitterLogo from "@/assets/images/twitter.png";
import LinkedInLogo from "@/assets/images/linkedin.png";
import YouTubeLogo from "@/assets/images/youtube.png";
import TikTokLogo from "@/assets/images/tik-tok.png";
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
  const [showLogo, setShowLogo] = useState(false);
  const [activeTab, setActiveTab] = useState("color");
  // Add template state
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const templates = [
    { name: "Basic", color: "#000000", showLogo: false },
    { name: "Corporate", color: "#0047AB", showLogo: true },
    { name: "Creative", color: "#8A2BE2", showLogo: true },
    { name: "Minimal", color: "#333333", showLogo: false },
  ];

  const logos = [
    { name: "Facebook", logo: FacebookLogo },
    { name: "Instagram", logo: InstagramLogo },
    { name: "Twitter", logo: TwitterLogo },
    { name: "YouTube", logo: YouTubeLogo },
    { name: "TikTok", logo: TikTokLogo },
  ];
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
        logo={showLogo ? require("@/assets/images/react-logo.png") : null}
        logoSize={50}
        backgroundColor={transparentBackground ? "transparent" : "#ffffff"}
      />
    );
  }, [displayValue, transparentBackground, qrCodeColor, showLogo]);

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
            <View>
              <ViewShot ref={viewRef} options={{ format: "png", quality: 1 }}>
                <View className="p-10">{StaticQRCode}</View>
              </ViewShot>

              <TouchableOpacity
                onPress={handlePresentModalPress}
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "#c1121f",
                  borderRadius: 20,
                  padding: 8,
                }}
              >
                <PencilIcon size={20} color="white" />
              </TouchableOpacity>
            </View>

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

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={["75%", "95%"]}
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
                <View className="flex-row mb-10 mt-10">
                  <TouchableOpacity
                    className={`flex-1 py-3 ${
                      activeTab === "color"
                        ? "bg-[#c1121f]"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={{
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                    onPress={() => setActiveTab("color")}
                  >
                    <ThemedText
                      className={`text-center ${
                        activeTab === "color"
                          ? "text-white font-semibold"
                          : "text-white"
                      }`}
                    >
                      Color
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 ${
                      activeTab === "logo"
                        ? "bg-[#c1121f]"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    onPress={() => setActiveTab("logo")}
                  >
                    <ThemedText
                      className={`text-center ${
                        activeTab === "logo" ? "text-white font-semibold" : ""
                      }`}
                    >
                      Logo
                    </ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 py-3 ${
                      activeTab === "template"
                        ? "bg-[#c1121f]"
                        : "bg-gray-200 dark:bg-gray-700"
                    }`}
                    style={{
                      borderTopRightRadius: 8,
                      borderBottomRightRadius: 8,
                    }}
                    onPress={() => setActiveTab("template")}
                  >
                    <ThemedText
                      className={`text-center ${
                        activeTab === "template"
                          ? "text-white font-semibold"
                          : ""
                      }`}
                    >
                      Templates
                    </ThemedText>
                  </TouchableOpacity>
                </View>

                {activeTab === "color" ? (
                  <View className="flex flex-col py-4">
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
                    </ColorPicker>
                  </View>
                ) : activeTab === "logo" ? (
                  <View className="flex flex-col py-4">
                    <ThemedText className="mb-4 text-base">
                      Choose a logo for your QR Code or you can upload your own
                      logo
                    </ThemedText>

                    <View className="flex-row flex-wrap justify-between">
                      {logos.map((logo, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`w-[48%] mb-4 p-3 rounded-lg ${
                            selectedTemplate === index
                              ? "border-2 border-[#c1121f]"
                              : "border border-gray-300 dark:border-gray-600"
                          }`}
                          onPress={() => {
                            // setSelectedTemplate(index);
                            // setQrCodeColor(logo.color);
                            // setShowLogo(template.showLogo);
                          }}
                        >
                          <View className="items-center">
                            <View className="w-20 h-20 mb-2 items-center justify-center">
                              <Image
                                source={logo.logo}
                                className="w-full h-20 rounded-lg"
                              />
                            </View>
                            <ThemedText className="text-center font-medium">
                              {logo.name}
                            </ThemedText>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ) : (
                  <View className="flex flex-col py-4">
                    <ThemedText className="mb-4 text-base">
                      Choose a template for your QR code:
                    </ThemedText>

                    <View className="flex-row flex-wrap justify-between">
                      {templates.map((template, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`w-[48%] mb-4 p-3 rounded-lg ${
                            selectedTemplate === index
                              ? "border-2 border-[#c1121f]"
                              : "border border-gray-300 dark:border-gray-600"
                          }`}
                          onPress={() => {
                            setSelectedTemplate(index);
                            setQrCodeColor(template.color);
                            setShowLogo(template.showLogo);
                          }}
                        >
                          <View className="items-center">
                            <View className="w-20 h-20 mb-2 items-center justify-center">
                              <QRCode
                                value="template"
                                size={70}
                                color={template.color}
                                backgroundColor="white"
                                logo={
                                  template.showLogo
                                    ? require("@/assets/images/react-logo.png")
                                    : null
                                }
                                logoSize={20}
                              />
                            </View>
                            <ThemedText className="text-center font-medium">
                              {template.name}
                            </ThemedText>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </View>

                    <TouchableOpacity
                      className="mt-4 p-3 bg-[#c1121f] rounded-lg"
                      onPress={() => {
                        const template = templates[selectedTemplate];
                        setQrCodeColor(template.color);
                        setShowLogo(template.showLogo);
                        bottomSheetModalRef.current?.close();
                      }}
                    >
                      <Text className="text-white text-center font-semibold">
                        Apply Template
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
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
