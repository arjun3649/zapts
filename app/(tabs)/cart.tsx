import LocationSelector from "@/components/LocationSelector";
import { setAddress } from "@/redux/addressSlice";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import { toggleReorder } from "@/redux/reorderSlice";
import { Product } from "@/types/types";
import BottomSheet from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useRef } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import "../../global.css";

// Interfaces
interface CartItem extends Product {
  quantity: number;
}

interface RootState {
  cart: {
    items: CartItem[];
  };
  address: {
    title: string;
  };
}

const cart: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const currentAddress = useSelector((state: RootState) => state.address.title);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleAddressSelect = useCallback(
    (selectedAddress: string) => {
      dispatch(setAddress(selectedAddress));
      bottomSheetRef.current?.close();
    },
    [dispatch]
  );

  const handlePresentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleIncrement = (id: number, quantity: number): void => {
    dispatch(
      updateQuantity({
        id,
        quantity: quantity + 1,
      })
    );
  };

  const handleDecrement = (id: number, quantity: number): void => {
    if (quantity > 1) {
      dispatch(
        updateQuantity({
          id,
          quantity: quantity - 1,
        })
      );
    } else {
      dispatch(removeFromCart(id));
    }
  };

  const calculateItemTotal = (price: number, quantity: number): number => {
    return price * quantity;
  };

  const calculateSubTotal = (): number => {
    return cartItems.reduce((total: number, item: CartItem) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const calculateTax = (): number => {
    return calculateSubTotal() * 0.18; // Assuming 18% tax
  };

  const calculateTotal = (): number => {
    return calculateSubTotal() + calculateTax();
  };

  if (cartItems.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <View className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <Text className="text-blue-500 text-5xl">🛒</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </Text>
        <Text className="text-gray-600 mb-8 text-center px-4">
          Looks like you haven't added any items to your cart yet.
        </Text>
        <TouchableOpacity
          className="bg-blue-500 px-8 py-3 rounded-full"
          onPress={() => router.navigate("/")}
        >
          <Text className="text-white font-semibold text-lg">
            Start Shopping
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="green" style="light" />
      <ScrollView className="flex-1">
        {cartItems.map((item: CartItem) => (
          <View
            key={item.id}
            className="flex-row p-4 bg-white mb-2 mx-2 rounded-lg"
          >
            <Image
              source={{ uri: item.thumbnail }}
              className="w-20 h-20 rounded-md"
            />

            <View className="flex-1 ml-4">
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{item.title}</Text>
                  <Text className="text-gray-500 mt-1">
                    Quantity: {item.quantity}
                  </Text>
                </View>
                <Text className="text-lg font-semibold">
                  ₹{calculateItemTotal(item.price, item.quantity).toFixed(2)}
                </Text>
              </View>

              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  onPress={() => handleDecrement(item.id, item.quantity)}
                  className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                >
                  <Text className="text-lg">-</Text>
                </TouchableOpacity>

                <Text className="mx-4 text-lg">{item.quantity}</Text>

                <TouchableOpacity
                  onPress={() => handleIncrement(item.id, item.quantity)}
                  className="w-8 h-8 bg-gray-200 rounded-full items-center justify-center"
                >
                  <Text className="text-lg">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View className="bg-white p-4 shadow-lg">
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Subtotal</Text>
          <Text className="font-semibold">
            ₹{calculateSubTotal().toFixed(2)}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Tax (18%)</Text>
          <Text className="font-semibold">₹{calculateTax().toFixed(2)}</Text>
        </View>

        <View className="h-[1px] bg-gray-200 my-2" />

        <View className="flex-row justify-between mb-2">
          <Text className="text-lg font-bold">Total</Text>
          <Text className="text-lg font-bold">
            ₹{calculateTotal().toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg mt-4"
          onPress={handlePresentBottomSheet}
        >
          <Text className="text-white text-center font-semibold text-lg">
            {currentAddress
              ? `Deliver to: ${currentAddress}`
              : "Select Address"}
          </Text>
        </TouchableOpacity>

        {currentAddress && (
          <TouchableOpacity
            className="bg-green-500 p-4 rounded-lg mt-4"
            onPress={() => {
              dispatch(toggleReorder(cartItems));
            }}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <LocationSelector
        ref={bottomSheetRef}
        onAddressSelect={handleAddressSelect}
      />
    </View>
  );
};

export default cart;
