import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
// import { clearCart } from "../../Redux/cartSlice";

const CartIcon = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

//   return (
//     <View>
//       <Ionicons name="cart-outline" size={size} color={color} />
//       {itemCount > 0 && (
//         <View
//           style={{
//             position: "absolute",
//             top: -1,
//             right: -7,
//             backgroundColor: "red",
//             borderRadius: 10,
//             minWidth: 15,
//             height: 15,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Text
//             style={{
//               color: "white",
//               fontSize: 12,
//               fontWeight: "bold",
//               paddingHorizontal: 4,
//             }}
//           >
//             {itemCount}
//           </Text>
//         </View>
//       )}
//     </View>
//   );
 };

export default function Layout() {
  const dispatch = useDispatch();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerTintColor: "black",
          headerShadowVisible: true,
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                ("");
              }}
            >
              <Ionicons
                name="trash-outline"
                size={24}
                color="black"
                style={{ marginRight: 15 }}
              />
            </TouchableOpacity>
          ),
        }}
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
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}
