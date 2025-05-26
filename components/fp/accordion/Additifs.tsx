import { useBottomSheet } from "@/context/BottomSheetContext";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

// SVGs via react-native-svg
const pastilleNote1 = require('@/assets/images/fp/pastille-note-1.png');
const pastilleNote2 =require('@/assets/images/fp/pastille-note-2.png');
const pastilleNote3 = require('@/assets/images/fp/pastille-note-3.png');
const pastilleNote4 =require('@/assets/images/fp/pastille-note-4.png');

type Additif = {
  noteUFC?: number;
  code?: string;
  label?: string;
  fonction1?: string;
  fonction2?: string;
};

type Props = {
  additifs?: Additif[];
};

const Additifs: React.FC<Props> = ({ additifs }) => {
  const { setIsCourager } = useBottomSheet();

  const getPastilleImage = (note: number = 4) => {
    switch (note) {
      case 1:
        return pastilleNote1;
      case 2:
        return pastilleNote2;
      case 3:
        return pastilleNote3;
      default:
        return pastilleNote4;
    }
  };

  const noteUFC: Record<number, string> = {
    1: "Acceptable",
    2: "Tolérable, vigilance pour certaines populations",
    3: "Peu recommandable",
    4: "À éviter",
  };

  const SelectedNoteUFC = (note?: number) => {
    return noteUFC[note ?? 4] || "Note inconnue";
  };

  return (
    <View>
      <Text
                className="text-xl text-custom-blue ArchivoBold "
                style={{ paddingVertical: 5 }}
              >
                <Text className="text-custom-blue ArchivoBold">Additifs</Text>
              </Text>

      {additifs && additifs.length > 0 ? (
        additifs.map((item, index) => (
          <View className="pt-4 pb-8" key={index}>
            <View className="flex-row items-start space-x-2 pb-1">
              <Image
                source={getPastilleImage(item?.noteUFC)}
                style={{ width: 16, height: 16 }}
              />
              <View className="flex-1">
                <View className="flex-row items-center flex-wrap">
                  <Text className="font-bold text-custom-blue text-sm">
                    {item?.code ?? "Code inconnu"}:
                  </Text>
                  <Text className="text-custom-blue ml-2 text-sm">
                    {item?.label ?? "Label indisponible"}
                  </Text>
                </View>
                <Text className="text-custom-blue text-sm italic">
                  {[
                    item?.fonction1,
                    item?.fonction2,
                    SelectedNoteUFC(item?.noteUFC),
                  ]
                    .filter(Boolean)
                    .join(" | ")}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View className="pt-4 pb-8">
          <View className="text-custom-blue tracking-normal text-sm space-y-1">
            <Text>Ne contient pas d'Additifs</Text>
            <TouchableOpacity onPress={() => setIsCourager(true)}>
              <Text className="underline font-bold">À confirmer par la marque</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Additifs;
