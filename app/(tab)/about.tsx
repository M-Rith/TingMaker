import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
export default function AboutScreen() {
  return (
    <ThemedView className="flex flex-col items-center justify-center">
      <ThemedText>Hello world</ThemedText>
    </ThemedView>
  );
}
