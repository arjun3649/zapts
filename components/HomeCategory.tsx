import { fetchCategories } from "@/api/api";
import { categoryImages } from "@/utils/categoryImages";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function HomeCategory() {
  interface Category {
    name: string;
    slug: string;
    url: string;
  }

  const {
    data: categories,
    isLoading,
    error,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading categories...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Error loading categories</Text>
      </View>
    );
  }

  function handleclick(category: Category) {
    router.push(`/categoryproducts/${category.slug}`);
  }

  return (
    <View className="mb-1 mt-3">
      <Text className="text-xl font-bold px-4">Shop by category</Text>
      <View className="flex-row flex-wrap">
        {categories?.map((category) => (
          <TouchableOpacity
            key={category.slug}
            className="items-center mb-4"
            style={{ width: "22%", margin: "1%" }}
            onPress={() => handleclick(category)} 
          >
            <Image
              source={{ uri: categoryImages[category.slug] }}
              className="w-20 h-24 rounded-lg"
            />
            <Text className="text-center text-sm mt-2">
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}