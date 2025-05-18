import React, { useState, useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from "react-native";
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

const Tips = () => {
  const { userToken, userInfo } = useContext(AuthContext);
  const router = useRouter();

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
  }, [userInfo]);

  // Ne déclenche la récupération des tips qu'après que les préférences sont chargées
  useEffect(() => {
      console.log("🚀 ~ Tips ~ tipPreferences:", Array.from(tipPreferences))

    if (preferencesLoaded) {
      setTipsParams({
        page: 1,
        limit: 100,
        preferences: Array.from(tipPreferences),
      });
    }
  }, [preferencesLoaded, tipPreferences]);

  if (!userToken) return <Redirect href="/(auth)/login" />;
  if (!preferencesLoaded) return <LoadingState />;

  const tipsList = Array.isArray(tips) ? tips : [];

  const handleTipClick = (tip: Tip) => {
    router.push({
      pathname: "/tiptab/tip",
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
    <SafeAreaView className="flex-1 bg-white">
      <RenderHeaderTab title="Ti'conseils" />
      <View className="h-full bg-white">
        {(!preferencesLoaded || loading) ? (
  <LoadingState />
) : error ? (
  <ErrorState message={error} />
) : tipsList.length > 0 ? (
  <FlatList
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
    padding: 16,
  },
});
