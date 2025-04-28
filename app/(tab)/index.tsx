import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";

export default function Index() {
  return (
    <ThemedView className="flex flex-1 flex-col pt-20 px-4">
      <ThemedText>Hello world</ThemedText>
    </ThemedView>
  );
}
