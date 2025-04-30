import React, { ReactNode } from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { QrCodeIcon, SparklesIcon } from "react-native-heroicons/outline";
import { Link } from "expo-router";
import { ThemedView } from "../ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
interface FunctionCardProps {
  icon: "qrcode" | "bgRemove";
  title: string;
  link: string;
  viewAsList: boolean;
}

export default function FunctionCard(props: FunctionCardProps) {
  const { icon, title, link, viewAsList } = props;

  const borderColor = useThemeColor({}, "border");
  return (
    <ThemedView
      style={{ borderColor: borderColor, borderWidth: 1 }}
      className={`h-48 flex flex-col items-center justify-center rounded-lg ${
        viewAsList && "flex-1"
      }`}
    >
      <Link href={link}>
        <View className="p-2 flex flex-col items-center justify-center">
          {icon === "qrcode" && <QrCodeIcon size={48} color="#c1121f" />}
          {icon === "bgRemove" && <SparklesIcon size={48} color="#c1121f" />}

          <ThemedText style={{ paddingTop: 15 }} type="default">
            {title}
          </ThemedText>
        </View>
      </Link>
    </ThemedView>
  );
}
