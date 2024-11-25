import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function AboutUs() {
  return (
    <View className="flex-1 bg-white px-4 py-8">
      <View className="flex-1 items-center justify-center">
        <MaterialCommunityIcons
          name="close-circle"
          size={64}
          color="#f4511e"
          className="mb-8"
        />
        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Zapp - 10-Minute Delivery
        </Text>
        <Text className="text-lg text-gray-600 mb-8 text-center">
          Zapp is your lightning-fast delivery service, bringing everything you
          need, except food, right to your door in 10 minutes or less. We value
          speed, convenience, and sustainability.
        </Text>
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="clock-outline"
            size={24}
            color="#6b7280"
            className="mr-2"
          />
          <Text className="text-lg text-gray-600">
            Delivery in 10 minutes or less
          </Text>
        </View>
        <View className="flex-row items-center mt-4">
          <FontAwesome
            name="truck"
            size={24}
            color="#6b7280"
            className="mr-2"
          />
          <Text className="text-lg text-gray-600">
            Reliable and eco-friendly delivery
          </Text>
        </View>
      </View>
    </View>
  );
}
