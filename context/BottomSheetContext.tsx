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
import { ScrollView, View } from "react-native";

type BottomSheetContextType = {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
  bottomSheetRef: any;
  isOpen: boolean;
  isScanning: boolean;
  setIsScanning: Dispatch<SetStateAction<boolean>>;
  scannedBarcode: string | null;
  setScannedBarcode: Dispatch<SetStateAction<string | null>>;
  productName: string | null;
  setProductName: Dispatch<SetStateAction<string | null>>;
  hasRequested: boolean;
  setHasRequested: (value: boolean) => void;
  isCourager: boolean;
  setIsCourager: (value: boolean) => void;
  isModalEncourager: boolean;
  setIsModalEncourager: (value: boolean) => void;
  isModalNutrition: boolean;
  setIsModalNutrition: (value: boolean) => void;
  isModalAdditif: boolean;
  setIsModalAdditif: (value: boolean) => void;
  isModalContact: boolean;
  setIsModalContact: (value: boolean) => void;
  isModalContactTico: boolean;
  setIsModalContactTico: (value: boolean) => void;
  scrollRef: React.RefObject<ScrollView | null>;
  targetRef: React.RefObject<View | null>;
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
  const [productName, setProductName] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(true);
  const [hasRequested, setHasRequested] = useState(false);
  const [isCourager, setIsCourager] = useState(false);
  const [isModalEncourager, setIsModalEncourager] = useState(false);
  const [isModalNutrition, setIsModalNutrition] = useState(false);
  const [isModalAdditif, setIsModalAdditif] = useState(false);
  const [isModalContact, setIsModalContact] = useState(false);

  const [isModalContactTico, setIsModalContactTico] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const targetRef = useRef<View>(null);

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
        isModalEncourager,
        setIsModalEncourager,
        productName,
        setProductName,
        isModalNutrition,
        setIsModalNutrition,
        isModalAdditif,
        setIsModalAdditif,
        scrollRef,
        targetRef,
        isModalContact,
        setIsModalContact,
        isModalContactTico,
        setIsModalContactTico,
      }}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};
