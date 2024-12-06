import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";

interface CartComponentProps {}

const CartComponent: FC<CartComponentProps> = () => {
  const cartItems = useSelector((state: any) => state.cart.items);
  const itemcount = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );
  

  const handleCartPress = () => {
    router.push("/cart");
  };

  // Render nothing if itemcount is 0
  if (itemcount === 0) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerGreenContainer}>
        <Text style={styles.itemCountText}>{itemcount} Item(s) added</Text>
        <TouchableOpacity
          style={styles.viewCartButton}
          onPress={handleCartPress}
        >
          <Text style={styles.buttonText}>View Cart</Text>
          <Feather name="chevron-right" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute", // Position it absolutely
    bottom: 0, // Align to the bottom
    left: 0, // Align to the left
    width: "100%", // Make it span the full width
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: "#66c33e",
  },
  innerGreenContainer: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  itemCountText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  viewCartButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#388E3C",
    paddingHorizontal: 17,
    paddingVertical: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
});

export default CartComponent;