import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Redirect, useRouter } from 'expo-router';

import useLastTips from '@/hooks/tips/useLastTips';

import LoadingState from '@/components/tips/LoadingState';
import ErrorState from '@/components/tips/ErrorState';
import EmptyState from '@/components/recipes/EmptyState';
import Item from '@/components/tips/ItemTip';
import { Tip } from '@/types/tip';

const Tips = () => {
  const { userToken } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const router = useRouter();

  const { tips, loading, error } = useLastTips(page, 100,['4']);

  if (!userToken) return <Redirect href="/(auth)/login" />;

  const tipsList = Array.isArray(tips) ? tips : [];


  const handleTipClick = (tip: any) => {
    router.push({
      pathname: "/tiptab/tip",
      params: { id: tip.id.toString() }, // Assurez-vous que c'est une string
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="h-[17%] justify-center items-center backgroundTips">
        <Text className="text-custom-text-orange text-2xl font-bold">Ti'conseils</Text>
      </View>

      {/* Content */}
      <View className="h-[83%] bg-white">
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} />
          ) : tipsList.length > 0 ? (
            tipsList.map((tip, index) => (
              <TouchableOpacity key={tip.id} onPress={() => handleTipClick(tip)}>
                <Item tip={tip} index={index} length={tipsList.length} OpenTip={() => handleTipClick(tip)} />
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState />
          )}
        </ScrollView>
      </View>

     
    </SafeAreaView>
  );
};

export default Tips;
