import React, { ReactNode } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SwipeRow, IPropsSwipeRow } from "react-native-swipe-list-view";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";
import styles from "./style";

// ✅ Wrapper corrigé pour autoriser les children
type FixedSwipeRowProps<T> = Partial<IPropsSwipeRow<T>> & {
  children?: ReactNode;
};

const FixedSwipeRow = <T,>(props: FixedSwipeRowProps<T>) => {
  return <SwipeRow {...props} />;
};

// Props de Item
interface ItemProps {
  product: Product;
  index: number;
  OpenFb: (product: any) => void;
  handleDelete: (gtin: string) => void;
}

const Item: React.FC<ItemProps> = ({
  product,
  index,
  OpenFb,
  handleDelete,
}) => {
  const defaultImage = require("@/assets/images/recipes/64.png");
  const produitFleche = require("@/assets/images/history/productFlech.png");

  if (!product) return null;

  return (
    <FixedSwipeRow<Product> rightOpenValue={-75} leftOpenValue={75}>
      {/* Hidden Row */}
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backLeftBtn, styles.backBtn]}
          onPress={() => handleDelete(product.gtin)}
        >
          <Ionicons name="trash-bin-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backBtn]}
          onPress={() => OpenFb(product)}
        >
          <Ionicons name="eye-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Visible Row */}
      <TouchableOpacity style={styles.rowFront} onPress={() => OpenFb(product)}>
        <View style={styles.imageContainer}>
          <Image
            source={require("@/assets/images/recipes/productBg.png")}
            style={styles.backgroundImage}
            resizeMode="contain"
          />
          <Image
            source={product.image ? { uri: product.image } : defaultImage}
            defaultSource={defaultImage}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text className="text-custom-green-text leading-archivo ArchivoExtraBold text-sm">
            {product.name}
          </Text>
          <Text className="text-custom-green-text text-xs ArchivoLight leading-archivo italic">
            {product.trademark}
          </Text>
        </View>
        <Image
          source={produitFleche}
          style={styles.arrowIcon}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </FixedSwipeRow>
  );
};


export default Item;
