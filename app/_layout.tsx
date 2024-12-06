// MainLayout.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../redux/store";

const MainLayout = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: "white",
              },
              headerTintColor: "black",
              headerTitleStyle: {
                color: "black",
              },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerTitle: "Profile" }} />
            <Stack.Screen name="aboutus" options={{ headerTitle: "AboutUs" }} />
            <Stack.Screen name="search" options={{ headerTitle: "Search" }} />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});

export default MainLayout;
