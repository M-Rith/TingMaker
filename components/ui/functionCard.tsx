import React, { ReactNode } from "react";
import { View } from "react-native";
import { ThemedText } from "../ThemedText";
import { QrCodeIcon, SparklesIcon } from "react-native-heroicons/outline";
import { Link } from "expo-router";
interface FunctionCardProps {
  icon: "qrcode" | "bgRemove";
  title: string;
  link: string;
}

export default function FunctionCard(props: FunctionCardProps) {
  const { icon, title, link } = props;
  return (
    <Link href={link as string} style={{ flex: 1 }}>
      <View className="flex-1 flex-col shadow-sm border border-white rounded-lg w-full">
        <View className="p-4 flex flex-col items-center justify-center">
          {/* Dynamically set the icon based on the `icon` prop */}
          {icon === "qrcode" && <QrCodeIcon size={54} color="white" />}
          {icon === "bgRemove" && <SparklesIcon size={54} color="white" />}

          <ThemedText className="text-slate-600 leading-normal font-light">
            {title} {/* Dynamically show the title */}
          </ThemedText>
        </View>
      </View>
    </Link>
  );
}
