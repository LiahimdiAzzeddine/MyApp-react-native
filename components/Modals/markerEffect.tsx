import { StyleSheet } from "react-native";

export const markerStyle = StyleSheet.create({
     marker: {
    position: 'relative',
    alignSelf: 'flex-start', // adapte selon le layout
    margin: 10,
  },
  highlight: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    height: 22,
    backgroundColor: '#66ccc2', // cyan/mint marker color
    borderRadius: 10,
    transform: [{ rotate: '-2deg' }],
    zIndex: 0,
  },
  text: {
    fontFamily:"ArchivoBold",
    zIndex: 1,
    fontSize:26
  },
});