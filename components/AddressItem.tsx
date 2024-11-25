import { View, Text, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface AddressItemProps {
  type: "home" | "business"; // Matching the Address type we defined earlier
  title: string;
  distance: string;
  address: string;
  handleclick: () => void;
}

const AddressItem: React.FC<AddressItemProps> = ({
  type,
  title,
  distance,
  address,
  handleclick,
}) => (
  <Pressable
    className="flex-row items-center mb-4 bg-white rounded-lg shadow-sm"
    onPress={handleclick}
  >
    <Ionicons
      name={type as keyof typeof Ionicons.glyphMap}
      size={24}
      color="#FFA500"
      className="m-2"
    />
    <View className="flex-1 m-2">
      <Text className="font-bold text-base">{title}</Text>
      <Text className="text-green-600 text-sm">{distance}</Text>
      <Text className="text-gray-600 text-sm">{address}</Text>
    </View>
    <View className="flex-row">
      <TouchableOpacity className="p-2">
        <Ionicons name="ellipsis-vertical" size={20} color="#888" />
      </TouchableOpacity>
    </View>
  </Pressable>
);

export default AddressItem;
