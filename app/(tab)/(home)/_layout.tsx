import { Stack } from "expo-router";
import React from "react";

export default function HomepageLayout() {
  return (
    <Stack>
      <Stack.Screen name="Home" options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="removeBg"></Stack.Screen>
      <Stack.Screen name="qrCodeGenerator"></Stack.Screen>
    </Stack>
  );
}
