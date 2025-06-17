import React, { useState, useContext, useEffect } from "react";
import { View, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { AuthContext } from "@/context/AuthContext";
import { Redirect, useRouter } from "expo-router";

import useLastTips from "@/hooks/tips/useLastTips";

import LoadingState from "@/components/tips/LoadingState";
import ErrorState from "@/components/tips/ErrorState";
import EmptyState from "@/components/recipes/EmptyState";
import Item from "@/components/tips/ItemTip";
import { Tip } from "@/types/tip";
import RenderHeaderTab from "@/components/ui/renderHeader";
import { getTipPreferences } from "@/utils/storage";
import { Text } from "react-native";
import { AppContext } from "@/context/AppContext";

const Tips = () => {
  const { userToken, userInfo } = useContext(AuthContext);
  const router = useRouter();
  const context = useContext(AppContext);
  

  if (!context) {
    throw new Error("TipContext must be used within a TipProvider");
  }

  const { lastUpdated } = context;

  const [page, setPage] = useState(1);
  const [tipPreferences, setTipPreferences] = useState<Set<number>>(new Set());
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  const [tipsParams, setTipsParams] = useState<{
    page: number;
    limit: number;
    preferences: number[];
  } | null>(null);

  const { tips, loading, error } = useLastTips(
    tipsParams?.page ?? 1,
    tipsParams?.limit ?? 100,
    tipsParams?.preferences ?? []
  );

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!userInfo?.id) return;
      const prefs = await getTipPreferences(Number(userInfo.id));
      setTipPreferences(prefs);
      setPreferencesLoaded(true);
    };
    fetchPreferences();
  }, [userInfo, lastUpdated]);

  // Ne déclenche la récupération des tips qu'après que les préférences sont chargées
  useEffect(() => {
    if (preferencesLoaded) {
      setTipsParams({
        page: 1,
        limit: 100,
        preferences: Array.from(tipPreferences),
      });
    }
  }, [tipPreferences]);

  if (!userToken) return <Redirect href="/(auth)/login" />;
  if (!preferencesLoaded) return <LoadingState />;

  const tipsList = Array.isArray(tips) ? tips : [];

  const handleTipClick = (tip: Tip) => {
    router.push({
      pathname: "/tiptab/tip/[id]",
      params: { id: tip.id.toString() },
    });
  };

  const renderItem = ({ item, index }: { item: Tip; index: number }) => (
    <Item
      tip={item}
      index={index}
      length={tipsList.length}
      OpenTip={() => handleTipClick(item)}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white"  style={{backgroundColor:"#fff"}}>
      <RenderHeaderTab title="Ti'Conseils" />
      <View className="h-full bg-white" style={{backgroundColor:"#fff"}}>
        {!preferencesLoaded || loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : tipsList.length > 0 ? (
          <FlatList
           style={{backgroundColor:"#fff"}}
            data={tipsList}
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
    </SafeAreaView>
  );
};

export default Tips;

const styles = StyleSheet.create({
  listContent: {
    padding: 10,
  },
});
