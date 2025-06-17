import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { SafeAreaView } from "react-native-safe-area-context";

import Item from "@/components/tips/ItemTipfa";
import { FormattedTip, Tip } from "@/types/tip";
import LoadingState from "@/components/tips/LoadingState";
import ErrorState from "@/components/tips/ErrorState";

import { getFavorites } from "@/utils/favoritesController";
import { Ionicons } from "@expo/vector-icons";
import { useAppContext } from "@/context/AppContext";

const Favorites = () => {
  const router = useRouter();

  const [tips, setTips] = useState<FormattedTip[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const [errorTips, setErrorTips] = useState<string | null>(null);
  const { lastUpdatedF } = useAppContext();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        setLoadingTips(true);
        const favorites = await getFavorites();
        setTips(favorites);
        setErrorTips(null);
      } catch (error) {
        setErrorTips("Erreur lors du chargement des favoris.");
      } finally {
        setLoadingTips(false);
      }
    };

    fetchFavorites();
  }, [lastUpdatedF]);

  const OpenTip = (tip: FormattedTip) => {
    router.push({
      pathname: "/tiptab/tip/[id]",
      params: { id: tip.id?.toString() ?? 0 },
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: FormattedTip;
    index: number;
  }) => (
    <Item
      tip={item}
      index={index}
      length={tips.length}
      OpenTip={() => OpenTip(item)}
    />
  );

  return (
    <SafeAreaView
      className="flex-1 bg-[#ffeda3]"
      edges={["bottom", "left", "right"]}
    >
      <View style={styles.Radius}>
        <RenderHeaderTab title="Mes Ti’Conseils favoris" />

        <View className="h-full bg-white">
          {loadingTips ? (
            <LoadingState />
          ) : errorTips ? (
            <ErrorState message={errorTips} />
          ) : tips.length > 0 ? (
            <FlatList
              data={tips}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.container}>
              <Ionicons name={"alert-circle"} size={64} color={"#ff8200"} style={{paddingBottom:10}} />

              <Text style={[styles.title, { color: "#FF8200" }]} className="leading-archivo">
                Vous n’avez pas encore de Ti'Conseils{'\n'} enregistrés en favoris
              {'\n'} 
                Pour retrouver facilement vos astuces et conseils préférés,
                pensez à les ajouter en favori.
             {'\n'} 
                Vous y aurez accès à tout moment,{'\n'} même hors ligne !
              </Text>
            </View>
          )}
        </View>
      </View>

      <View id="footer" style={{ minHeight: 70 }} />
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
  container: {
    alignItems: "center",
    padding: 16,
    textAlign: "center",
    width: "100%",
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontFamily: "ArchivoLight",
    marginVertical: 2,
    textAlign: "center",
  },
  subtitle: {
    color: "#6B7280",
    maxWidth: 300,
    textAlign: "center",
  },
  Radius: {
    flex: 1,
    backgroundColor: "white",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  offlineMessage: {
    backgroundColor: "#FFD2D2",
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  offlineText: {
    color: "#900",
    fontSize: 14,
    fontFamily: "ArchivoBold",
    textAlign: "center",
  },
});
