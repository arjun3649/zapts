import { Feather } from "@expo/vector-icons"; // Import Feather from @expo/vector-icons
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView className="flex-1 px-4 bg-white">
        <Text className="text-2xl font-bold mt-4">My account</Text>
        <Text className="text-lg text-gray-600 mb-4">9622384974</Text>

        {/* Replace Lucide Icons with Feather Icons */}
        <View className="flex-row justify-between bg-amber-50 p-4 rounded-lg mb-4">
          <TouchableOpacity className="items-center">
            <Feather name="credit-card" size={24} color="black" />
            <Text className="mt-1">Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="message-square" size={24} color="black" />
            <Text className="mt-1">Support</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Feather name="dollar-sign" size={24} color="black" />
            <Text className="mt-1">Payments</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-4">
          <Text className="text-gray-500 mb-2">YOUR INFORMATION</Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather
                name="package"
                size={24}
                color="black"
                className="mr-2"
              />
              <Text>Your orders</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather name="book" size={24} color="black" className="mr-2" />
              <Text>Address book</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather name="tag" size={24} color="black" className="mr-2" />
              <Text>Collected coupons</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <Text className="text-gray-500 mb-2">OTHER INFORMATION</Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
            <View className="flex-row items-center">
              <Feather name="share" size={24} color="black" className="mr-2" />
              <Text>Share the app</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center justify-between py-3 border-b border-gray-200"
            onPress={() => router.navigate("/aboutus")}
          >
            <View className="flex-row items-center">
              <Feather name="info" size={24} color="black" className="mr-2" />
              <Text>About us</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});
