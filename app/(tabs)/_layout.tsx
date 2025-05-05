import { Tabs } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import ScanHeader from "@/components/headers/ScanHeader";
import TabBar from "@/components/TabBar";
import { ScannerBottomSheetProvider } from "@/context/ScannerBottomSheetContext";

export default function TabLayout() {
  return (

    <Tabs tabBar={(props) => <TabBar {...props} />} >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          header: () => <CustomHeader  color="#c7f0d9" image='vx' back={false}/>,
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
          header: () => <CustomHeader />,
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: "Tips",
          header: () => <CustomHeader image="of"/>,
        }}
      />
    </Tabs>
  );
}
