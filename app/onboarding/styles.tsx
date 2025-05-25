import { Dimensions, StyleSheet } from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
  },

  textWrapper: {
    width: '85%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
   textWrapper2: {
    width: '80%',
    alignItems: 'center',
    gap: 1,
  },
  title: {
    fontSize: 28,
    color: '#004B8D', // text-custom-blue
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textDecorationColor: '#FB923C', // decoration-orange-400
    textAlign: 'center',
    paddingTop: 8,
  },
  description: {
    fontSize: 18,
    color: '#004B8D',
    textAlign: 'center',
    lineHeight: 26,
    fontFamily: 'ArchivoLight', // Remplace par une police custom si dispo
    marginTop: 20,
  },
  spacing: {
    height: screenHeight * 0.08,
  },
   container: {
    flex: 1,
    backgroundColor: 'white',
  },
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom:40,
  },
  paginationDot: {
    width: 14,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#ffc17f',
    marginHorizontal: 2,
  },
  paginationDotActive: {
      width: 15,
    height: 15,
    backgroundColor: '#ff8300', // orange couleur
  },
  introContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40, // Ajustez selon le safe area
  },
  

  
  textContentContainer: {
    width: '83%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },

  brandText: {
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },

  spacer: {
    minHeight: '8%',
  },
 imageBackground: {
    width: '100%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    position: "absolute",
    width:340,
    marginTop:165
  },

  logo: {
    height: 142,
  },
  contentContainer0: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    
  },
 
  description0: {
    marginTop: 25,
  },
  bold: {
    fontFamily: "ArchivoBold",
  },
 
  strong: {
    fontFamily: "ArchivoBold",
  },
  loupe: {
    width: 144,
    height: 144,
    position: "absolute",
    left: 56,
    bottom: "-8%",
  },
  imageBackground1: {
    width: '100%',
    maxWidth: 350,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
   list: {
    width: '70%',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
  },


  imageBackground3: {
    width:350,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  textWrapper3: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    position: 'relative',
  },
  textBlock: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  boldTitle: {
    fontFamily: 'ArchivoBold',
    letterSpacing: 0,
  },
  tight: {
    letterSpacing: -1.5,
  },
  lightIcon: {
    position: 'absolute',
    top: 135, // Adapté pour iPhone XR / SE
    width: 140,
    height: 140,
  },
  
  barcode: {
    position: 'absolute',
    top: -screenHeight * 0.01,
    height: 80,
    zIndex: 10,
  },
  textContainer4: {
    width: '100%',
    paddingTop: 64,
    alignItems: 'center',
    gap: 20,
  },

  bottomIcon: {
    width: 48,
    height: 48,
  },
  
  textWrapper5: {
    width: '80%',
    alignItems: 'center',
    gap: 24,
  },

  listContainer: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  listItem5: {
    flexDirection: 'row',
    fontFamily:"ArchivoLight",
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
  },
 
  icon: {
    width: 24,
    height: 24,
  },
   textWrapper6: {
    position: 'absolute',
    width: '100%',
    flex:1,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent: "flex-start",
    gap: 2,
    paddingHorizontal: 16,
  },

  arrow: {
    position: 'absolute',
    width:150,
    bottom:-15,
    right: 12,
    height: undefined,
    aspectRatio: 1, // Maintient les proportions
  },
});
