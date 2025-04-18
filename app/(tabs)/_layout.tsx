import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import CustomHeader from "@/components/CustomHeader";
import ScanHeader from "@/components/headers/ScanHeader";

export default function TabLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      {" "}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          header: () => <CustomHeader title="Home" />,
        }}
      />
      <Tabs.Screen
        name="helpTico"
        options={{
          title: "HelpTico",
          header: () => <CustomHeader title="HelpTico" />,
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
          header: () => <CustomHeader title="Recipes" />,
        }}
      />
      <Tabs.Screen
        name="tips"
        options={{
          title: "Tips",
          header: () => <CustomHeader title="Tips" />,
        }}
      />
    </Tabs>
  );
}
