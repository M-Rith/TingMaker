import React from "react";
import { Stack } from "expo-router";
export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Your App",
      }}
    >
      <Stack.Screen name="qrcode" />
      <Stack.Screen name="removeBg" />
    </Stack>
  );
}
