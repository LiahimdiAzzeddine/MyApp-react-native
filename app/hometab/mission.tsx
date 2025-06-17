import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

export default function Mission() {
  return (
    <View className=" flex flex-col h-full bg-white ">
    {/* En-tête avec image de fond */}
    <ImageBackground
      source={require('@/assets/images/headers/background.png')}
      resizeMode="contain"
      style={{
        minHeight:80,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}
    >
      <Text className="text-center text-custom-green-text text-2xl ClashDisplayBold">
        La mission de 
        <Text className=" tracking-normal ClashDisplayBold">
          Ti
          <Text className="tracking-[-.075em]">CO</Text>
        </Text>
        
      </Text>
    </ImageBackground>

    <View className="flex-1 mt-8 justify-start px-6">
      <Text className='ArchivoLight text-base text-custom-green-text pb-5'>
        Chez TiCO, nous avons une mission :
        {'\n'}
        faire de la transparence alimentaire une réalité. Pour que nous puissions choisir en toute
        confiance ce qu’on met dans nos assiettes.
      </Text>
      <Text className='ArchivoLight text-base text-custom-green-text pb-5'>
        Vous avez un rôle clé ! En scannant vos produits du quotidien,
        vous envoyez un message clair aux marques :
        <Text className='ArchivoBold text-base text-custom-green-text pb-5'> nous voulons des
        informations fiables et accessibles.</Text>
      </Text>
      <Text className='ArchivoLight text-base text-custom-green-text pb-5'>
        Un geste simple, anonyme et sécurisé. Plus nous serons nombreux,
        plus les marques devront agir.
      </Text>
      <Text className='ArchivoLight text-base text-custom-green-text pb-4'>Ensemble, faisons de la transparence la norme !</Text>
    </View>
  </View>
  )
}