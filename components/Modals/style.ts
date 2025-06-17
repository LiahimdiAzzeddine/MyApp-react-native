import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: "100%",
    aspectRatio: 1, // makes it square
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 33,
    left: 33,
    zIndex: 10,
  },
  closeIcon: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent:"center"
  },
   modalContent: {
    alignItems: 'center',
    gap: 15,
    justifyContent: 'center',
  },
  contentInfo: {
    alignItems: 'center',
    gap: 10,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily:"ArchivoLight",
    maxWidth:310
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 8,
     shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(0, 123, 255, 0.1)',
    margin:"auto"
  },
  buttonText: {
    color: 'white',
    fontFamily:"ArchivoLight",
  },
  success: {
    fontFamily:"ArchivoLight",
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
    fontFamily:"ArchivoLight",
  },
   container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  arrowImage: {
    width: 32,
    height: 32,
    position: 'absolute',
    left: -38,
  },
});
export default  styles;