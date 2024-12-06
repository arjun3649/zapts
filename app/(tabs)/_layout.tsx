import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

interface CartIconProps {
  color?: string;
  size?: number;
}

const CartIcon: React.FC<CartIconProps> = ({ color = "black", size = 24 }) => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const itemCount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <View style={{ position: "relative" }}>
      <Ionicons name="cart-outline" size={size} color={color} />
      {itemCount > 0 && (
        <View
          style={{
            position: "absolute",
            top: -1,
            right: -7,
            backgroundColor: "red",
            borderRadius: 10,
            minWidth: 15,
            height: 15,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
              paddingHorizontal: 4,
            }}
          >
            {itemCount}
          </Text>
        </View>
      )}
    </View>
  );
};

export default function Layout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);
  const itemCount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerTintColor: "black",
          headerShadowVisible: true,
          headerRight: () =>
            route.name === "cart" && itemCount > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearCart());
                }}
                style={{ marginRight: 15 }}
              >
                <Ionicons name="trash-outline" size={24} color="black" />
              </TouchableOpacity>
            ) : undefined,
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="categorypage"
          options={{
            headerShown: false,
            title: "Category",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="reorder"
          options={{
            headerShown: false,
            title: "Reorder",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="repeat-outline" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            headerShown: true,
            title: "Cart",
            tabBarIcon: ({ color, size }) => (
              <CartIcon color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
