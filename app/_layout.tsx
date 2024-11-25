import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "../redux/store";

export default function Layout() {
  const queryclient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryclient}>
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
            <Stack.Screen name="search" options={{ headerShown: false }} />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </Provider>
  );
}
