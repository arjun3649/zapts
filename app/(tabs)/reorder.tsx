import Address from "@/components/Address";
import LocationSelector from "@/components/LocationSelector";
import { setAddress } from "@/redux/addressSlice";
import BottomSheet from "@gorhom/bottom-sheet";
import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

interface HomepageProps {}

const reorder: React.FC<HomepageProps> = () => {
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

      <LocationSelector
        ref={bottomSheetRef}
        onAddressSelect={handleAddressSelect}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

export default reorder;
