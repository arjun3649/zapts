import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Product } from "@/types/types";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "@/components/ProductCard";

export default function Search() {
  const { width } = useWindowDimensions();
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate layout values
  const gap = 12;
  const numColumns = width > 640 ? 3 : 2;
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

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard item={item} key={item.id.toString()}/>
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
          key={`${numColumns}`}
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
              <Text className="text-gray-500 mb-4 ">
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
