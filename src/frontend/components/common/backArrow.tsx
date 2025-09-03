import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BackArrow({ height, onPress }: { height?: number; onPress?: () => void }) {
    return (
        <View style={[styles.container, { marginTop: height ? height : 0 }]}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.arrow}>←</Text>
            </TouchableOpacity>
        </View>
    );
    }

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: '-5%',
    left: '5%',
  },
  button: {
    padding: 8,
  },
  arrow: {
    fontSize: 24,
    color: "black",
  },
});
