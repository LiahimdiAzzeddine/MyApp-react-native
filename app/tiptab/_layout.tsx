import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";


export default function _layout() {
  return (
    <Stack >
      <Stack.Screen name="tip/[id]"
        options={{
          header: (props) => <CustomHeader color={"#ffeda3"} image={"of"} />,
        }}
      />
      <Stack.Screen name="tipSettings"
        options={{
          header: (props) => <CustomHeader color={"#ffeda3"} image={"of"} />,
        }}
      />
      <Stack.Screen name="tips" 
        options={{
          header: (props) => <CustomHeader image="of" isTips={true} />,
        }}
      />
       <Stack.Screen name="tipsExclusives" 
        options={{
          header: (props) => <CustomHeader image="of" />,
        }}
      />
        <Stack.Screen name="favorites" 
        options={{
          header: (props) => <CustomHeader image="of" />,
        }}
      />
    </Stack>
  );
}
