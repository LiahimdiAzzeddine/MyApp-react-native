import { createContext, useContext, useRef, useState, useMemo, useCallback, ReactNode } from "react";
import BottomSheet from "@gorhom/bottom-sheet";
import ScannerBottomSheet from "@/components/ScannerBottomSheet";

type ScannerBottomSheetContextType = {
    openSheet: (data: string) => void;
    closeSheet: () => void;
    resetScanner: () => void;
    isScanning: boolean;
    barcode: string | null;
};

const ScannerBottomSheetContext = createContext<ScannerBottomSheetContextType | null>(null);

type ScannerBottomSheetProviderProps = {
    children: ReactNode;
};

export function ScannerBottomSheetProvider({ children }: ScannerBottomSheetProviderProps) {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [index, setIndex] = useState<number>(-1);
    const [barcode, setBarcode] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState<boolean>(true);

    const snapPoints = useMemo(() => ["35%", "50%", "100%"], []);

    const openSheet = useCallback((data: string) => {
        setBarcode(data);
        setIsScanning(false);
        setIndex(1);
    }, []);

    const closeSheet = useCallback(() => {
        setIndex(-1);
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
    }, []);

    const resetScanner = useCallback(() => {
        closeSheet();
        setTimeout(() => {
            setBarcode(null);
            setIsScanning(true);
        }, 300);
    }, [closeSheet]);

    const handleIndexChange = useCallback((i: number) => {
        setIndex(i);
        if (i === -1) {
            resetScanner();
        }
    }, [resetScanner]);

    return (
        <ScannerBottomSheetContext.Provider 
            value={{ 
                openSheet, 
                closeSheet, 
                resetScanner, 
                isScanning,
                barcode 
            }}
        >
            {children}
            <ScannerBottomSheet
                bottomSheetRef={bottomSheetRef}
                index={index}
                snapPoints={snapPoints}
                barcode={barcode}
                onClose={resetScanner}
                onIndexChange={handleIndexChange}
            />
        </ScannerBottomSheetContext.Provider>
    );
}

export function useScannerBottomSheet() {
    const context = useContext(ScannerBottomSheetContext);
    if (!context) {
        throw new Error("useScannerBottomSheet doit être utilisé dans ScannerBottomSheetProvider");
    }
    return context;
}