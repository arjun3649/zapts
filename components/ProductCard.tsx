import { Product } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  updateQuantity,
} from "@/redux/cartSlice";



export const ProductCard = ({ item }: { item: Product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: any) =>
    state.cart.items.find((cartItem:any) => cartItem.id === item.id)
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...item,
        quantity: 1,
      })
    );
  };

  const handleIncrement = () => {
    if (cartItem) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: cartItem.quantity + 1,
        })
      );
    }
  };

  const handleDecrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        dispatch(
          updateQuantity({
            id: item.id,
            quantity: cartItem.quantity - 1,
          })
        );
      } else {
        dispatch(removeFromCart(item.id));
      }
    }
  };

  return (
    <View
      className="bg-white rounded-lg shadow-sm mb-4"
      style={{ width: "48%" }}
    >
      <Link href={""} asChild>
        <TouchableOpacity activeOpacity={0.7}>
          <Image
            source={{ uri: item.thumbnail }}
            className="w-full h-48 rounded-t-lg"
            resizeMode="cover"
          />
        </TouchableOpacity>
      </Link>

      <View className="p-3">
        <Text className="text-sm font-semibold mb-1" numberOfLines={1}>
          {item.title}
        </Text>

        <Text className="text-xs text-gray-500 mb-2" numberOfLines={2}>
          {item.description}
        </Text>

        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-green-600 font-bold text-base">
            ${item.price.toFixed(2)}
          </Text>

          <View className="flex-row items-center">
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text className="ml-1 text-xs">{item.rating}</Text>
          </View>
        </View>

        {!cartItem ? (
          <TouchableOpacity
            onPress={handleAddToCart}
            activeOpacity={0.7}
            className="flex-row items-center justify-center bg-blue-500 py-2 px-4 rounded-lg"
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="cart-outline" size={16} color="white" />
              <Text className="text-white text-sm font-medium ml-2">
                Add to Cart
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <View className="flex-row items-center justify-between px-4">
            <TouchableOpacity
              onPress={handleDecrement}
              activeOpacity={0.7}
              className="w-8 h-8 items-center justify-center bg-green-100 rounded-full"
            >
              <Ionicons name="remove" size={20} color="#15803d" />
            </TouchableOpacity>

            <Text className="text-sm font-medium">{cartItem.quantity}</Text>

            <TouchableOpacity
              onPress={handleIncrement}
              activeOpacity={0.7}
              className="w-8 h-8 items-center justify-center bg-green-100 rounded-full"
            >
              <Ionicons name="add" size={20} color="#15803d" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
