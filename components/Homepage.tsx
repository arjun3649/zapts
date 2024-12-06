import Address from "@/components/Address";
import HomeCategory from "@/components/HomeCategory";
import LocationSelector from "@/components/LocationSelector";
import { setAddress } from "@/redux/addressSlice";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import CartComponent from "./CartComponent";
import { RenderProducts } from "./RenderProducts";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  // Redux setup
  const dispatch = useDispatch();
  const currentAddress = useSelector((state: any) => state.address.title);

  // Bottom sheet ref and state
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["25%", "50%", "75%"];

  // Handlers
  const handlePresentBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleAddressSelect = useCallback(
    (selectedAddress: string) => {
      dispatch(setAddress(selectedAddress));
      bottomSheetRef.current?.close();
    },
    [dispatch]
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Address Selection Header */}
      <Address
        address={currentAddress}
        handleBottomBar={handlePresentBottomSheet}
      />

      {/* Main Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <HomeCategory />
        <RenderProducts
          title="Find Your Perfect Smartphone"
          url="https://dummyjson.com/products/category/smartphones"
        />
        <RenderProducts
          title="Stock Up on Freshness and Quality"
          url="https://dummyjson.com/products/category/groceries"
        />
        <RenderProducts
          title="Unleash the Power of Performance Bikes"
          url="https://dummyjson.com/products/category/motorcycle"
        />
        <RenderProducts
          title="Men Fashion"
          url="https://dummyjson.com/products/category/mens-shirts"
        />
        <RenderProducts url="https://dummyjson.com/products/category/mens-shoes" />
        <RenderProducts url="https://dummyjson.com/products/category/mens-watches" />
        <RenderProducts
          title=" Women Fashion"
          url="https://dummyjson.com/products/category/womens-bags"
        />
        <RenderProducts url="https://dummyjson.com/products/category/womens-shoes" />
        <RenderProducts url="https://dummyjson.com/products/category/tops" />
        <RenderProducts url="https://dummyjson.com/products/category/womens-dresses" />
        <CartComponent />
      </ScrollView>

      <LocationSelector
        ref={bottomSheetRef}
        onAddressSelect={handleAddressSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  selectorContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default Homepage;
