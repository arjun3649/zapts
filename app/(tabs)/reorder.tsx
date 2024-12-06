import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import Address from "@/components/Address";
import CartComponent from "@/components/CartComponent";
import LocationSelector from "@/components/LocationSelector";
import { ProductCard } from "@/components/ProductCard";
import { setAddress } from "@/redux/addressSlice";
import { Product } from "@/types/types";
import { reorderList } from "@/utils/reorderList";

interface HomepageProps {}

const Homepage: React.FC<HomepageProps> = () => {
  const dispatch = useDispatch();
  const reorder = useSelector((state: any) => state.reorder.items);
  const currentAddress = useSelector((state: any) => state.address.title);

  // Combine and format data
  const formattedData: Product[] = [...reorder, ...reorderList];
  console.log(formattedData);

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

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => <ProductCard item={item} />,
    []
  );

  const renderEmptyList = useCallback(
    () => (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    ),
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Address Selection Header */}
      <Address
        address={currentAddress}
        handleBottomBar={handlePresentBottomSheet}
      />

      {/* Main Content */}
      <FlatList
        data={formattedData}
        keyExtractor={(item) => item.slug}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={renderEmptyList}
        initialNumToRender={6} 
      />
      <CartComponent />

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
    flex: 1,
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

export default Homepage;
