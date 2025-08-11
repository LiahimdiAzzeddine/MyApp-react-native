import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";

interface LineItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  vnr: number;
  parent?: number;
  forced?: boolean;
}

interface Product {
  lines: LineItem[];
}

interface Props {
  product: Product;
  portion: number;
}

const NutritionTable: React.FC<Props> = ({ product, portion }) => {
  const [unit, setUnit] = useState<"100g" | "portion">("100g");
  const [AGS, setAGS] = useState(false);

  const organizeHierarchicalData = (lines: LineItem[]) => {
    const hierarchy: any[] = [];
    const itemMap = new Map<number, any>();

    lines.forEach((line) => {
      itemMap.set(line.id, {
        ...line,
        children: [],
        value: {
          qt: line.quantity,
          unit: line.unit,
          vnr: line.vnr,
        },
      });
    });

    lines.forEach((line) => {
      const item = itemMap.get(line.id);
      if (line.parent && itemMap.has(line.parent)) {
        itemMap.get(line.parent).children.push(item);
      } else {
        hierarchy.push(item);
      }
    });

    return hierarchy;
  };

  const calculatePortionValue = (qt: number, portion: number) =>
    (qt / 100) * portion;
  const calculatePortionVNR = (vnr: number, portion: number, qt: number) =>
    qt > 0 && portion > 0 && vnr > 0 ? (qt * portion) / vnr : 0;
  const calculatePortionVNR100 = (vnr: number, qt: number) =>
    qt > 0 && vnr > 0 ? (qt * 100) / vnr : 0;

  const NutritionRow = ({
    item,
    level = 0,
    parentId = "",
  }: {
    item: any;
    level?: number;
    parentId?: string;
  }) => {
    useEffect(() => {
      if (item.name === "AGS") {
        setAGS(true);
      }
    }, [item.name]);

    const value =
      unit === "portion" && portion
        ? calculatePortionValue(item.value.qt, portion)
        : item.value.qt ?? 0;

    const vnr =
      unit === "portion" && portion
        ? calculatePortionVNR(item.value.vnr, portion, item.value.qt)
        : calculatePortionVNR100(item.value.vnr, item.value.qt);

    const formattedValue = Number.isInteger(value) ? value : value.toFixed(1);
    const formattedVNR = Number.isInteger(vnr) ? vnr : vnr.toFixed(1);

    return (
      <View key={`${parentId}-${item.id}`}>
        <View style={styles.row}>
          <Text
            style={[
              styles.cell,
              {
                paddingLeft: level * 12,
                color: item.parent === 0 ? "#0F548D" : "#333",
              },
            ]}
          >
            {item.name}
          </Text>

          <Text style={styles.cellRight}>
            {value ? (
              <>
                <Text>
                  {formattedValue} {item.value.unit}
                </Text>
                {item.value.unit === "kcal" && (
                  <Text>
                    {" "}
                    | {(parseFloat(formattedValue) * 4.184).toFixed(2)} kJ
                  </Text>
                )}
              </>
            ) : null}
          </Text>
          <Text style={[styles.cellRight, { color: "#6b7280" }]}>
            {vnr ? `${formattedVNR}%` : ""}
          </Text>
        </View>
        {item.children?.map((child: any) => (
          <NutritionRow
            key={`${item.id}-${child.id}`}
            item={child}
            level={level + 1}
            parentId={item.id}
          />
        ))}
        {item.parent === 0 && <View style={styles.divider} />}
      </View>
    );
  };

  const hierarchicalData = useMemo(
    () => organizeHierarchicalData(product?.lines || []),
    [product?.lines]
  );

  return (
    <ScrollView>
      {portion !== 0 && (
        <View style={styles.switchContainer}>
          <TouchableOpacity onPress={() => setUnit("100g")}>
            <Text
              style={unit === "100g" ? styles.activeText : styles.inactiveText}
            >
              Par 100g
            </Text>
          </TouchableOpacity>

          <Switch
            value={unit === "portion"}
            onValueChange={(val) => setUnit(val ? "portion" : "100g")}
          />

          <TouchableOpacity onPress={() => setUnit("portion")}>
            <Text
              style={
                unit === "portion" ? styles.activeText : styles.inactiveText
              }
            >
              Par portion
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.tableHeader}>
        <Text style={[styles.cell, styles.headerText]}>Général</Text>
        <Text style={[styles.cellRight, styles.headerText]}>
          {unit === "100g" ? "Pour 100g" : "Par portion"}
        </Text>
        <Text style={[styles.cellRight, styles.headerText]}>% VNR</Text>
      </View>

      {hierarchicalData
        .filter(
          (item) => item.forced || (item.quantity && item.quantity !== "")
        )
        .map((item) => (
          <NutritionRow key={`root-${item.id}`} item={item} portion={portion} />
        ))}

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          <Text style={styles.bold}>VNR</Text> : Valeur Nutritionnelles de
          Référence pour un adulte en bonne santé
        </Text>
        {AGS && (
          <Text style={styles.footerText}>
            <Text style={styles.bold}>AGS</Text> : Acide Gras Saturés
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

export default NutritionTable;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    paddingVertical: 4,
    alignItems: "center",
  },
  cell: {
    flex: 1.5,
    fontSize: 14,
    fontFamily: "Archivo",
  },
  cellRight: {
    flex: 1,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Archivo",
    color:"#2B6B67"
  },
  divider: {
    height: 1,
    backgroundColor: "#bde4e1",
    marginVertical: 8,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    gap: 12,
  },
  activeText: {
    color: "#0F548D",
    fontFamily: "ArchivoBold",
  },
  inactiveText: {
    color: "#888",
    fontFamily: "Archivo",
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  headerText: {
    fontFamily: "ArchivoBold",
    color: "#0F548D",
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 13,
    color: "#0F548D",
    marginBottom: 6,
    fontFamily: "Archivo",
  },
  bold: {
    fontFamily: "ArchivoBold",
  },
});
