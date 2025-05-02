import React, { useState, useMemo } from "react";
import { Button, Modal, StyleSheet, View } from "react-native";

import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from "reanimated-color-picker";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import QRCode from "react-native-qrcode-svg";
export default function RemoveBg() {
  const [showModal, setShowModal] = useState(false);


  const [qrCodeColor, setQrCodeColor] = useState("#000000");
  const [transparentBackground, setTransparentBackground] = useState(false);

  const StaticQRCode = useMemo(() => {
    return (
      <QRCode
        value={"https://example.com"}
        size={200}
        color={qrCodeColor}
        backgroundColor={transparentBackground ? "transparent" : "#ffffff"}
      />
    );
  }, [transparentBackground, qrCodeColor]);
  return (
    <View style={styles.container}>
      <Button title="Color Picker" onPress={() => setShowModal(true)} />
      {StaticQRCode}

      <Modal
        visible={showModal}
        animationType="slide"
        style={{ backgroundColor: "#000000" }}
      >
        <ColorPicker
          style={{ width: "70%" }}
          value="red"
          onChangeJS={(color) => {
            setQrCodeColor(color.hex);
          }}
        >
          <Preview />
          <Panel1 />
          <HueSlider />
          <OpacitySlider />
          <Swatches />
        </ColorPicker>

        <Button title="Ok" onPress={() => setShowModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
