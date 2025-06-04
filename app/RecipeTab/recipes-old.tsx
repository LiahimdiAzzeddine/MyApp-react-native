import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { AppContext } from "@/context/AppContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from "@/context/AuthContext";
import CustomButton from "@/components/ui/CustomButton";


const Recipes = () => {
  const { colors } = useTheme();
  const router = useRouter();
  const backgroundImage = require("@/assets/images/recipes/background.png");

  const context = useContext(AppContext);
  const { userToken, userInfo } = useContext(AuthContext);
  if (!context) {
    throw new Error("AppContext must be used within a AppProvider");
  }





  return (
    <SafeAreaView className="flex-1 bg-[#fdf2f0]" edges={['bottom', 'left', 'right']}>
      <View style={styles.Radius}>
        {/* Header */}
        <RenderHeaderTab
          title="Tit'recettes"
          titleColor="#c32721"
          backgroundImage={backgroundImage}
        />
<View style={{flex:1,justifyContent:"center",alignItems:"center",gap:20}}>
   <CustomButton
          title="Mes Ti’conseils exclusifs"
          accessibilityLabel="Bouton pour partager TiCO"
          accessibilityHint="Ouvre les options de partage pour l'application TiCO"
          style={{
            width: "55%",
            maxWidth: 300,
            minWidth: 260,
            backgroundColor: (colors as any)["custom-red"],
          }} 
          onPress={function (event: GestureResponderEvent): void {
            throw new Error("Function not implemented.");
          } }                />
             <CustomButton
          title="Toutes les Tit’recettes"
          accessibilityLabel="Bouton pour partager TiCO"
          accessibilityHint="Ouvre les options de partage pour l'application TiCO"
          style={{
            width: "55%",
            maxWidth: 300,
            minWidth: 260,
            padding:10,
            backgroundColor: (colors as any)["custom-red"],
          }} 
          onPress={function (event: GestureResponderEvent): void {
            throw new Error("Function not implemented.");
          } }                />
</View>
      </View>
      <View className="bg-[#fdf2f0]" id="footer" style={{minHeight:80}}>
        

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  Radius: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
  },
  pageText: { fontSize: 16 },
  pageBtn: { fontSize: 20, color: "#007AFF" },
  disabled: { color: "#ccc" },
  addButton: {
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Recipes;
