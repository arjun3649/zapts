import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

interface ProductsResponse {
  products: Product[];
}

export default function Products() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery<ProductsResponse>({
    queryKey: ["products", slug],
    queryFn: async () => {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${slug}`
      );
      return response.data;
    },
    enabled: !!slug,
  });

  const products = response?.products || [];

  // Define title based on loading state
  const screenTitle = isLoading ? "loading...." : slug?.split("-").join(" ");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500 text-base">
          Error loading products. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: screenTitle,
          headerStyle: { backgroundColor: "#f8f9fa" },
          headerTintColor: "#000",
        }}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 py-4">
            No products available
          </Text>
        }
      />
    </View>
  );
}
