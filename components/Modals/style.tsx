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
    gap: 30,
    justifyContent: 'center',
  },
  contentInfo: {
    alignItems: 'center',
    gap: 5,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily:"ArchivoLight"
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 10,
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
});
export default  styles;