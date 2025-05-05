import React, { useState, useContext } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
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
import { FlatList } from "react-native-gesture-handler";

const Tips = () => {
  const { userToken } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const { tips, loading, error } = useLastTips(page, 100, ["4"]);

  if (!userToken) return <Redirect href="/(auth)/login" />;

  const tipsList = Array.isArray(tips) ? tips : [];

  const handleTipClick = (tip: any) => {
    router.push({
      pathname: "/tiptab/tip",
      params: { id: tip.id.toString() }, // Assurez-vous que c'est une string
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
      {/* Header */}
      <RenderHeaderTab title="Ti'conseils" />

      {/* Content */}
      <View className="h-full bg-white">
        {loading ? (
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
