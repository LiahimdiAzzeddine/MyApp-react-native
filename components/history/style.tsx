import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  rowFront: {
    backgroundColor: "#fff",
    borderBottomColor: "#c7f0d8",
    borderBottomWidth: 1.2,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  imageContainer: {
    width: 64,
    height: 64,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    zIndex: 1,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },

  arrowIcon: {
    width: 40,
    height: 40,
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: "#ddd",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backBtn: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backLeftBtn: {
    backgroundColor: "#c42923",
    width: "100%",
  },
  backRightBtn: {
    backgroundColor: "#4b996c",
    width: "100%",
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 7,
    paddingHorizontal: 12,
  },
  imageBackground: {
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  productInfo: {
    flex: 1,
  },
  productGtin: {
    fontWeight: 'bold',
    color: '#16a34a',
    fontSize: 16,
  },
  productName: {
    color: '#6b7280',
  },
  iconButton: {
    padding: 8,
    marginLeft: 4,
  },
  disabledButton: {
    opacity: 0.4,
  },
});
export default styles;