import { Stack } from "expo-router";
import React from "react";

export default function HomepageLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home", headerShown: false }}
      />
      <Stack.Screen name="removeBg" options={{ title: "Remove Background" }} />
      <Stack.Screen
        name="qrCodeGenerator"
        options={{ title: "QR Code Generator" }}
      />
    </Stack>
  );
}
