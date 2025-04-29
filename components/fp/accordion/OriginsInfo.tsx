import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const TransCondi = {
  T: 'transformation',
  C: 'conditionnement',
  E: 'embouteillage',
};

export default function OriginsInfo({ togglePanel, scoreOrigin, transformation, transcondi }: any) {
  const [showInfo, setShowInfo] = useState(false);
  const matieres = scoreOrigin?._mpas?.filter((item: any) => item !== null) || [];

  return (
    <View style={{ backgroundColor: '#EAF5E9', borderTopRightRadius: 32, paddingBottom: 24, minHeight: 300 }}>
      <View style={{ paddingHorizontal: 16, paddingVertical: 24 }}>
        {!showInfo ? (
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={() => setShowInfo(true)}>
              <Text style={{ fontSize: 12, color: '#4B8C4B', textDecorationLine: 'underline' }}>
                Comprendre les origines d’un produit
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={{ fontSize: 12, color: '#4B8C4B', marginBottom: 4 }}>
              Bienvenue dans le merveilleux onglet des origines ! L’origine d’un produit est un sujet complexe qui
              repose sur trois éléments :
            </Text>
            <Text style={{ fontSize: 12 }}>- Le lieu de production du produit</Text>
            <Text style={{ fontSize: 12 }}>- Les lieux de production des ingrédients</Text>
            <Text style={{ fontSize: 12 }}>- Les lieux de production des matières premières</Text>
            <Text style={{ fontSize: 12, marginTop: 6 }}>
              Le <Text style={{ fontWeight: 'bold' }}>lieu de production du produit</Text> est l’endroit où le produit
              final est fabriqué...
            </Text>
            <Text style={{ fontSize: 12 }}>
              <Text style={{ fontWeight: 'bold' }}>Les lieux de production des ingrédients</Text> sont les endroits où
              chaque ingrédient est cultivé...
            </Text>
            <Text style={{ fontSize: 12, marginBottom: 6 }}>
              <Text style={{ fontWeight: 'bold' }}>Les lieux de production des matières premières</Text> sont les sites
              où les matières premières...
            </Text>
            <TouchableOpacity onPress={() => setShowInfo(false)}>
              <Text style={{ fontSize: 12, color: '#4B8C4B', textDecorationLine: 'underline' }}>Fermer</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={{ marginTop: 16 }}>
          {(transcondi || transformation) && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Image source={require('@/assets/images/fp/factory.png')} style={{ width: 32, height: 32 }} />
              <Text style={{ fontSize: 16, color: '#204C8C' }}>
                Lieu de {transcondi ? TransCondi[transcondi] : 'Incertain'} :
              </Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#1C3C6C' }}>{transformation || 'Incertain'}</Text>
            </View>
          )}

          {scoreOrigin?._ing?.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#204C8C' }}>
                Ingrédients – <Text style={{ color: '#1C3C6C' }}>leurs origines</Text>
              </Text>
              {scoreOrigin._ing.map((item: any, index: number) => (
                <View key={index} style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 14, color: '#204C8C', fontWeight: 'bold' }}>
                    {item?._label}{' '}
                    <Text style={{ color: '#1C3C6C' }}>- {item?._country || 'Inconnu'}</Text>
                  </Text>
                  {item?._com && (
                    <Text style={{ fontSize: 13, paddingLeft: 8, color: '#4B8C4B' }}>{item._com}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {scoreOrigin?._ing_comment && (
            <Text style={{ fontSize: 13, color: '#4B8C4B', marginTop: 8 }}>{scoreOrigin._ing_comment}</Text>
          )}

          {matieres.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#204C8C' }}>
                Matières premières – <Text style={{ color: '#1C3C6C' }}>leurs origines</Text>
              </Text>
              {matieres.length >= 3 && (
                <Text style={{ fontSize: 12, fontStyle: 'italic', color: '#204C8C' }}>
                  Les 3 matières premières principales
                </Text>
              )}
              {matieres.slice(0, 3).map((item: any, index: number) => (
                <View key={index} style={{ marginTop: 8 }}>
                  {item?._label && (
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#204C8C' }}>{item._label}</Text>
                  )}
                  {item?._com && (
                    <Text style={{ fontSize: 13, paddingLeft: 8, color: '#4B8C4B' }}>{item._com}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {scoreOrigin?._mpa_comment && (
            <Text style={{ fontSize: 13, color: '#4B8C4B', marginBottom: 16 }}>{scoreOrigin._mpa_comment}</Text>
          )}
        </View>

        <TouchableOpacity
          style={{ position: 'absolute', bottom: 0, right: 0 }}
          onPress={() => togglePanel(4)}
        >
          <Image source={require('@/assets/images/fp/FICHETOP.png')} style={{ width: 48, height: 48 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
