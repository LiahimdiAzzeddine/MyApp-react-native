import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBar from '@/components/TabBar';
import CustomHeader from '@/components/CustomHeader';

export default function TabLayout() {
  return (
    <Tabs
   tabBar={props=><TabBar {...props}/>}
    >   <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          header: () => <CustomHeader title="Home" />,

        }}
      /> 
      <Tabs.Screen
        name="helpTico"
        options={{
          title: 'HelpTicp',
          header: () => <CustomHeader title="HelpTicp" />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scanner',
          header: () => <CustomHeader title="Scanner" />,

        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: 'Recipes',
          header: () => <CustomHeader title="Recipes" />,

        }}
      />
       <Tabs.Screen
        name="tips"
        options={{
          title: 'Tips',
          header: () => <CustomHeader title="Tips" />,

        }}
      />
     
    </Tabs>
  );
}
