import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerImg: {
    alignItems: "center",
  },
  placeholder: {
    width: 160,
    height: 140,
    borderWidth: 1,
    borderColor: "#f3cfcf",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: 160,
    height: 140,
    borderRadius: 10,
    marginBottom: 20,
  },

  container: {
    flex: 1,
    padding: 18,
    backgroundColor: "#fff",
  },

  formContainer: {
    flex: 1,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FFCDD2", // custom-red-clear equivalent
    borderRadius: 12,
    padding: 12,
    fontFamily: "ArchivoLight",
    color: "#333",
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#B71C1C", // dark red for error
  },
  errorText: {
    color: "#B71C1C", // dark red for error
    fontSize: 14,
    marginTop: 4,
    fontFamily: "ArchivoLight",
  },
  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: "ArchivoLight",
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: "#FFF",
    fontFamily: "ArchivoLight",
  },
  activeButton: {
    backgroundColor: "#D32F2F",
    borderColor: "#D32F2F",
  },
  buttonText: {
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
  },
  activeButtonText: {
    color: "#FFF",
  },
  boldText: {
    fontWeight: "bold",
  },
  infoText: {
    color: "#666",
    fontSize: 14,
    padding: 10,
    fontFamily: "ArchivoLight",
  },
  ingredientInputGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  ingredientInput: {
    borderWidth: 1,
    borderColor: "#FFCDD2",
    borderRadius: 12,
    padding: 12,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#D32F2F", // rouge
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#FFF",
    fontFamily: "ArchivoLight",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
  },
  tag: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#D32F2F",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#D32F2F",
    fontFamily: "ArchivoLight",
    marginRight: 8,
  },
  removeTagButton: {
    backgroundColor: "#EF5350",
    width: 25,
    height: 25,
    justifyContent: "center",
    borderRadius: 12,
    margin: "auto",
  },
  removeTagButtonText: {
    color: "white",
    margin: "auto",
  },
  submitContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  visualizeButton: {
    backgroundColor: "#D32F2F",
  },

  submitButton: {
    backgroundColor: "#FAD4CE",
    borderColor: "#FAD4CE",
  },
  submitButtonText: {
    color: "#B71C1C",
    fontFamily: "ArchivoLight",
  },
});
export default styles;
