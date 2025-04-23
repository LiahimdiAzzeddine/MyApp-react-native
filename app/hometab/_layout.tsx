import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen
        name="mission"
      />
      <Stack.Screen
        name="details"
      />
    </Stack>
  )
}