import { ProductCard } from "@/components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { FC } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface RenderProductsProps {
  title?: string;
  url: string;
}

export const RenderProducts: FC<RenderProductsProps> = ({ title, url }) => {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", url],
    queryFn: async () => {
      const response = await axios.get(url);
      return response.data;
    },
  });

  const products = response?.products || [];

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Error loading products. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard item={item} />}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  titleText: {
      fontSize: 20,
      padding: 16,
    textAlign: "left",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
  listContainer: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
  },
});
