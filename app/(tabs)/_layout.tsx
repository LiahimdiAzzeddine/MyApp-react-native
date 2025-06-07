import { Tabs, useRouter } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import ScanHeader from "@/components/headers/ScanHeader";
import TabBar from "@/components/TabBar";


export default function TabLayout() {

  return (
    <Tabs  initialRouteName="index" tabBar={(props) => <TabBar {...props} />} >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          header: () => <CustomHeader  color="#c7f0d9" image='vx' back={false} isHome={true}/>,
        }}
      />
      <Tabs.Screen
        name="helpTico"
        options={{
          title: "HelpTico",
          header: () => <CustomHeader color="#e1f5f5" image='bx' back={false} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Scanner",
          header: () => <ScanHeader />,
        }}
      />
      <Tabs.Screen
        name="recipes"
        options={{
          title: "Recipes",
          header: () => <CustomHeader image="rf"  />,
          tabBarStyle: { display: 'none' },
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: "Tips",
          header: () => <CustomHeader image="of" />,
          tabBarStyle: { display: 'none' },
        }}
        
      />
    </Tabs>
  );
}
