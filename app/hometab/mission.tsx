import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Mission() {
  return (
    <View className="p-4 flex flex-col h-full">
    {/* En-tête avec image de fond */}
    <ImageBackground
      source={require('@/assets/images/headers/background.png')}
      resizeMode="contain"
      style={{
        minHeight:70,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
      }}
    >
      <Text className="text-center text-custom-green-text text-[1.7rem] font-bold">
        La&nbsp;mission&nbsp;de&nbsp;
        <Text className="font-extrabold tracking-tight">
          Ti
          <Text className="tracking-tight">CO</Text>
        </Text>
      </Text>
    </ImageBackground>

    <View className="mt-2 flex-grow flex flex-col text-custom-green-text font-light space-y-5 justify-start text-lg px-3">
      <Text>
        Chez TiCO, nous avons une mission:
        {'\n'}
        faire de la transparence alimentaire une réalité. Pour que nous puissions choisir en toute
        confiance ce qu’on met dans nos assiettes.
      </Text>
      <Text>
        Vous avez un rôle clé ! En scannant vos produits du quotidien,
        vous envoyez un message clair aux marques :
        {'\n'} nous voulons des
        informations fiables et accessibles.
      </Text>
      <Text>
        Un geste simple, anonyme et sécurisé. Plus nous serons nombreux,
        plus les marques devront agir.
      </Text>
      <Text>Ensemble, faisons de la transparence la norme !</Text>
    </View>
  </View>
  )
}