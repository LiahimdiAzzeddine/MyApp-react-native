import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get('window');

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
  
  logo: {
    width: 300,
    height: 142,
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
    fontFamily: 'Archivo-Light', // Remplace par une police custom si dispo
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  tight: {
    letterSpacing: -1,
  },
  strong: {
    fontWeight: 'bold',
    fontFamily: 'Archivo',
  },
  loupe: {
    width: 144,
    height: 144,
    position: 'absolute',
    left: 56,
    bottom: -16,
  },
  spacing: {
    height: height * 0.08,
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
  },
  paginationDot: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#ffc080',
    marginHorizontal: 4,
  },
  paginationDotActive: {
      width: 17,
    height: 17,
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
  loupeImage: {
    width: 144,
    height: 144,
    position: 'absolute',
    left: 56,
    bottom: -16,
  },
  spacer: {
    minHeight: '8%',
  },
});
