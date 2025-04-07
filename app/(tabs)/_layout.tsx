import { Tabs } from 'expo-router';
import React from 'react';
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
          title: 'HelpTico',
          header: () => <CustomHeader color="#e1f5f5" title="HelpTico" />,
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
