import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";

import { Product } from "@/types/types";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  const { width } = useWindowDimensions(); // Use hook instead of static Dimensions
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate layout values
  const gap = 12;
  const numColumns = width > 640 ? 3 : 2; // 3 columns on wider screens, 2 on smaller
  const padding = 16;
  const itemWidth = (width - padding * 2 - gap * (numColumns - 1)) / numColumns;

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await axios.get(
        `https://dummyjson.com/products/search?q=${searchQuery}`
      );
      return response.data.products;
    },
    enabled: searchQuery.length > 0,
  });

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => {}}
      className="bg-white rounded-lg shadow-sm"
      style={{
        width: itemWidth,
        marginBottom: gap,
      }}
    >
      <Image
        source={{ uri: item.thumbnail }}
        className="w-full rounded-t-lg"
        style={{
          height: itemWidth * 0.75, // Make height proportional to width
          resizeMode: "cover",
        }}
      />
      <View className="p-3">
        <Text className="text-sm font-semibold mb-1" numberOfLines={1}>
          {item.title}
        </Text>
        <Text className="text-xs text-gray-500 mb-2" numberOfLines={2}>
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between">
          <Text className="text-green-600 font-bold text-base">
            ${item.price}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="ml-1 text-xs">{item.rating}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center p-4">
      <Ionicons name="search-outline" size={48} color="gray" />
      <Text className="text-center text-gray-500 mt-2">
        {searchQuery
          ? "No products found matching your search"
          : "Search for products"}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Search Header */}
      <View className="bg-white p-4 shadow-sm">
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2">
          <Ionicons name="search-outline" size={20} color="gray" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Results */}
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-red-500 text-center">
            Error loading products. Please try again.
          </Text>
        </View>
      ) : (
        <FlatList
          key={`${numColumns}`} // Add key to force re-render when columns change
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            padding: padding,
            paddingBottom: padding + gap,
          }}
          ListEmptyComponent={renderEmptyState}
          numColumns={numColumns}
          ListHeaderComponent={
            products?.length ? (
              <Text className="text-gray-500 mb-4">
                {products.length} products found
              </Text>
            ) : null
          }
          columnWrapperStyle={{
            gap: gap,
            justifyContent:
              products?.length < numColumns ? "flex-start" : "space-between",
          }}
        />
      )}
    </SafeAreaView>
  );
}
