import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  formContainer: {
    padding: 18,
    fontFamily: "ArchivoLight",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: "#D32F2F",
    fontSize: 16,
    fontWeight: '600',
  },
  required: {
    color: '#B71C1C',
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    backgroundColor: '#fff',
     fontFamily: "ArchivoLight",
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#B71C1C",
  },
  errorText: {
    color: "#B71C1C",
    fontSize: 14,
    marginTop: 6,
    fontFamily: "ArchivoLight",
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  timeInput: {
    flex:5,
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: "#333",
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    flex:4
  },
  picker: {
       overflow: 'hidden',
    maxHeight: 120, // Important pour iOS
    justifyContent: 'center',
  },
  boldText: {
    fontWeight: "bold",
    color: "#D32F2F",
  },
  infoText: {
    color: "#666",
    fontSize: 14,
    marginTop: 8,
    fontFamily:"ArchivoLightItalic",
 lineHeight: 16,
  },
  ingredientInputGroup: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  ingredientInput: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    color: "#333",
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "flex-start",
    marginTop: 8,
    fontFamily: "Archivo",
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: '600',
     fontFamily: "Archivo",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    gap: 8,
  },
  tag: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

    stepTag: {
    backgroundColor: '#f8f8f8',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: '#D32F2F',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  stepNumber: {
    color: "#D32F2F",
    fontWeight: 'bold',
    fontSize: 14,
    minWidth: 60,
  },

    stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  tagText: {
    color: "#D32F2F",
    fontSize: 14,

    fontFamily: "ArchivoLight",
  },
  removeTagButton: {
    backgroundColor: "#EF5350",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

   removeTagButtonStep: {
    backgroundColor: '#EF5350',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  removeTagButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 160,
    height: 140,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    borderColor: "#FFCDD2",
    borderWidth:1.5,
     borderRadius: 12,
  },
  imagePreview: {
    width: 160,
    height: 140,
    borderRadius: 12,
    marginBottom: 12,
    borderColor: "#FFCDD2",
    borderWidth:1.5,
  },
  imageButton: {
    backgroundColor: "#D32F2F",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cguContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 4,
  },
  noPhotoText: {
    color: "#666",
    fontSize: 14,
  },
  noPhotoSubtext: {
    color: "#666",
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    textAlign:'center',
    justifyContent:'center'
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D32F2F',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  checkedCheckbox: {
    backgroundColor: "#D32F2F",
  },
  cguText: {
    fontSize: 14,
    color: "#D32F2F",
    flex: 1,

  },
  linkText: {
    color: "#D32F2F",
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  visualizeButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 12,
    minWidth: 200,
  },
  visualizeButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: "Archivo",
  },
  submitButton: {
    backgroundColor: "#FAD4CE",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
    minWidth: 200,
  },
  submitButtonText: {
    color: "#B71C1C",
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: "Archivo",
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
   stepsContainer: {
    marginTop: 10,
    minHeight: 50,
  },
    draggableContainer: {
    flex: 2,
  },
    draggableContent: {
    paddingVertical: 5,
  },
});

export default styles;
