import CustomHeader from "@/components/CustomHeader";
import { Stack } from "expo-router";

export default function TicoLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="change_password"
        options={{
          animation: "fade",
          header: (props) => <CustomHeader color="#ffeda3" />,
        }}
      />
      <Stack.Screen
        name="validation/[token]"
        options={{
          animation: "fade",
          header: (props) => <CustomHeader />,
        }}
      />
    </Stack>
  );
}
