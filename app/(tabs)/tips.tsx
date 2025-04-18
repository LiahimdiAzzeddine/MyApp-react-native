import React, { useState, useContext } from 'react';
import { View, SafeAreaView, ScrollView, Text, TouchableOpacity, Modal } from 'react-native';
import { AuthContext } from '@/context/AuthContext';
import { Redirect } from 'expo-router';

import useLastTips from '@/hooks/tips/useLastTips';

import LoadingState from '@/components/tips/LoadingState';
import ErrorState from '@/components/tips/ErrorState';
import EmptyState from '@/components/recipes/EmptyState';
import Item from '@/components/tips/ItemTip';
import TipDetails from '@/components/tips/TipDetails';
import { Tip } from '@/types/tip';

const Tips = () => {
  const { userToken } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { tips, loading, error } = useLastTips(page, 100,['4']);

  if (!userToken) return <Redirect href="/(auth)/login" />;

  const tipsList = Array.isArray(tips) ? tips : [];


  const handleTipClick = (tip: any) => {
    setSelectedTip(tip);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTip(null);
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
                <Item tip={tip} index={index} length={tipsList.length} OpenTip={function (tip: Tip): void {
                  throw new Error('Function not implemented.');
                } } />
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState />
          )}
        </ScrollView>
      </View>

      {/* Modal pour les détails */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={handleCloseModal}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '90%' }}>
            {selectedTip && <TipDetails />}
            <TouchableOpacity onPress={handleCloseModal}>
              <Text style={{ color: 'blue', marginTop: 10 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Tips;
