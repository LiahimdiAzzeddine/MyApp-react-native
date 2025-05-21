import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import BottomSheet from "@gorhom/bottom-sheet";

type BottomSheetContextType = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  bottomSheetRef: any;
  isOpen: boolean;
  isScanning: boolean;
  setIsScanning: Dispatch<SetStateAction<boolean>>;
  scannedBarcode: string | null;
  setScannedBarcode: Dispatch<SetStateAction<string | null>>;
  hasRequested: boolean;
  setHasRequested: (value: boolean) => void;
  isCourager: boolean;
  setIsCourager: (value: boolean) => void;
};

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(
  undefined
);

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("useBottomSheet must be used within a BottomSheetProvider");
  }
  return context;
};

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [hasRequested, setHasRequested] = useState(false);
  const [isCourager, setIsCourager] = useState(false);

  const openBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(0);
    setIsOpen(true);
    setIsScanning(false);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsOpen(false);
    setIsScanning(true);
  };

  return (
    <BottomSheetContext.Provider
      value={{
        bottomSheetRef,
        openBottomSheet,
        closeBottomSheet,
        isOpen,
        scannedBarcode,
        setScannedBarcode,
        isScanning,
        setIsScanning,
        hasRequested,
        setHasRequested,
        isCourager,
        setIsCourager,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
