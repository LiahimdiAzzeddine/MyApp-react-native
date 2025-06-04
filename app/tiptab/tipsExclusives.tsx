import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { AppContext } from "@/context/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetTotalRequests from "@/hooks/demand/useGetTotalRequests";
import useRandomTips from "@/hooks/tips/useRandomTips";
import EmptyState from "@/components/recipes/EmptyState";
import Item from "@/components/tips/ItemTip";
import { Tip } from "@/types/tip";
import LoadingState from "@/components/tips/LoadingState";
import ErrorState from "@/components/tips/ErrorState";

const Tips = () => {
  const router = useRouter();
  const context = useContext(AppContext);
  const { fetchTotalRequests } = useGetTotalRequests();
  const { tips, loading: loadingTips, error: errorTips } = useRandomTips();

  const stripHtml = (html: any) => {
    return html.replace(/<[^>]*>?/gm, '');
  };

  useEffect(() => {
    fetchTotalRequests();
  }, []);

  if (!context) {
    throw new Error("TipContext must be used within a TipProvider");
  }

  const isOnline = context.isOnline;

  const OpenTip = (tip: any) => {
    router.push({
      pathname: "/tiptab/tip/[id]",
      params: { id: tip.id.toString() },
    });
  };
  const renderItem = ({ item, index }: { item: Tip; index: number }) => (
    <Item
      tip={item}
      index={index}
      length={tips.length}
      OpenTip={() => OpenTip(item)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-[#ffeda3]" edges={["bottom", "left", "right"]}>
      <View style={styles.Radius}>
        <RenderHeaderTab title="Mes Ti'conseils exclusifs" />

        {!isOnline && (
          <View style={styles.offlineMessage}>
            <Text style={styles.offlineText}>
              Vous êtes hors ligne. Certaines fonctionnalités sont désactivées.
            </Text>
          </View>
        )}

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
          <EmptyState
            title="Aucun conseil pour le moment"
            iconName="alert-circle"
            iconColor="#ff8200"
            textColor="#FF8200"
          />
        )}
        </View>
      </View>

      <View id="footer" style={{ minHeight: 70 }} />
    </SafeAreaView>
  );
};

export default Tips;

const styles = StyleSheet.create({
 listContent: {
    padding: 10,
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