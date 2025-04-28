import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
export default function AboutScreen() {
  return (
    <ThemedView className="flex flex-1 flex-col pt-20 px-4">
      <ThemedText type="title">About Us</ThemedText>
    </ThemedView>
  );
}
