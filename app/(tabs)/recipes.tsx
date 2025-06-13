import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { AppContext } from "@/context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";

const Recipes = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const backgroundImage = require("@/assets/images/recipes/background.png");


  if (!context) {
    throw new Error("TipContext must be used within a TipProvider");
  }

  const isOnline = context.isOnline;
  
   const AlertOffLine=()=>{
    Alert.alert("Hore Ligne","Vous êtes hors ligne. Certaines fonctionnalités sont désactivées.")
   }

  return (
    <SafeAreaView
      className="flex-1 bg-[#fdf2f0]"
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.Radius}>
         <RenderHeaderTab
          title="Tit'recettes"
          titleColor="#c32721"
          backgroundImage={backgroundImage}
        />
        {!isOnline && (
          <View style={styles.offlineMessage}>
            <Text style={styles.offlineText}>
              Vous êtes hors ligne.{'\n'} Certaines fonctionnalités sont désactivées.
            </Text>
          </View>
        )}

        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.button]}
             onPressIn={() =>{
              isOnline?(router.push("/recipetab/favorites")):(AlertOffLine())
            } }
            
          >
            <Text style={styles.buttonText}>Ma Sélection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, !isOnline && styles.buttonDisabled]}
            onPressIn={() =>{
              isOnline?(router.push("/recipetab/recipes")):(AlertOffLine())
            } }
          >
            <Text style={styles.buttonText}>Toutes les Tit'Recettes</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View id="footer" style={{ minHeight: 70 }}></View>
    </SafeAreaView>
  );
};

export default Recipes;

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#c32721",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 16,
    marginBottom: 30,
    width: 260,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc", // gris clair pour indiquer désactivé
    opacity: 0.6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "ArchivoBold",
  },
  Radius: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  offlineMessage: {
    backgroundColor: "#FFD2D2", // Rouge clair ou alerte
    padding: 10,
    margin: "auto",
    borderRadius: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "#900", // Rouge foncé
    fontSize: 14,
    fontFamily: "ArchivoBold",
    textAlign: "center",
  },
});
