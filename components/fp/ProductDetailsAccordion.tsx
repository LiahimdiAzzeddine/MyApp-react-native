import React, { useState } from "react";
import { ScrollView, Text } from "react-native";
import AccordionItem from "./AccordionItem";
import NutritionalInfo from "./accordion/NutritionalInfo";
import IngredientsInfo from "./accordion/IngredientsInfo";
import TransformationInfo from "./accordion/TransformationInfo";
import OriginsInfo from "./accordion/OriginsInfo";
import LabelsInfo from "./accordion/LabelsInfo";
import BrandInfo from "./accordion/BrandInfo";
import UsageInfo from "./accordion/UsageInfo";
import Naturalite from "./accordion/Naturalite";
import PackagingInfo from "./accordion/PackagingInfo";
import { useBottomSheet } from "@/context/BottomSheetContext";
import NutrriInfo from "@/components/Modals/NutrriInfo";

export default function ProductDetailsAccordion({ product }: any) {
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const {isModalNutrition,setIsModalNutrition,scrollRef } = useBottomSheet();

  const togglePanel = (id: string) => {
    setOpenPanel(openPanel === id ? null : id);
  };

  return (
    <>
    <ScrollView ref={scrollRef}>
      <AccordionItem
        title="Informations nutritionnelles"
        isOpen={openPanel === "1"}
        onToggle={() => togglePanel("1")}
      >
        <NutritionalInfo product={product} onToggle={() => togglePanel("1")} />
      </AccordionItem>

      <AccordionItem
        title="Ingrédients, additifs"
        isOpen={openPanel === "2"}
        onToggle={() => togglePanel("2")}
      >
        <>
          <IngredientsInfo
            ingredients={product?.ingredients}
            allergenesArray={product?.allergens}
            additifsArray={product?.additifs}
            onToggle={() => togglePanel("2")}
          />
        </>
      </AccordionItem>
      <AccordionItem
        title="Impact environnemental"
        isOpen={openPanel === "3"}
        onToggle={() => {
          if (product.scores?._scoreEnv) {
            togglePanel("3");
          }
        }}
        disabled={!product.scores?._scoreEnv} // (optionnel si ton AccordionItem supporte la prop `disabled`)
      >
        {product.scores?._scoreEnv && (
          <TransformationInfo
            togglePanel={() => togglePanel("3")}
            scoreEnv={product.scores._scoreEnv}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Origines"
        isOpen={openPanel === "4"}
        onToggle={() => {
          if (product.scores?._scoreEnv) {
            togglePanel("4");
          }
        }}
        disabled={!product.scores?._scoreEnv}
      >
        {product.scores?._scoreEnv && (
          <OriginsInfo
            togglePanel={() => togglePanel("4")}
            scoreEnv={product.scores._scoreEnv}
            scoreOrigin={product.scores?._scoreOrigin}
            transformation={product.transformation}
            transcondi={product.transcondi}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Labels et mentions"
        isOpen={openPanel === "5"}
        onToggle={() => {
          if (product?.engagements) {
            togglePanel("5");
          }
        }}
        disabled={!product?.engagements}
      >
        {product?.engagements && (
          <LabelsInfo
            togglePanel={() => togglePanel("5")}
            engagements={product.engagements}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Marque & entreprise"
        isOpen={openPanel === "6"}
        onToggle={() => {
          if (product?.provider) {
            togglePanel("6");
          }
        }}
        disabled={!product?.provider}
      >
        {product?.provider && (
          <BrandInfo
            togglePanel={() => togglePanel("6")}
            markInfo={product.markInfo}
            provider={product?.provider}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Utilisation & conservation"
        isOpen={openPanel === "7"}
        onToggle={() => {
          if (product?.conservation) {
            togglePanel("7");
          }
        }}
        disabled={!product?.conservation}
      >
        {product?.conservation && (
          <UsageInfo
            togglePanel={() => togglePanel("7")}
            conservation={product?.conservation}
            utilisation={product?.utilisation}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Naturalité des ingrédients"
        isOpen={openPanel === "8"}
        onToggle={() => {
          if (product?.scores) {
            togglePanel("8");
          }
        }}
        disabled={!product?.scores}
      >
        {product?.scores && (
          <Naturalite
            togglePanel={() => togglePanel("8")}
            scoreNat={product.scores?._scoreNat}
          />
        )}
      </AccordionItem>
      <AccordionItem
        title="Emballage"
        isOpen={openPanel === "9"}
        onToggle={() => {
          if (product?.scores) {
            togglePanel("9");
          }
        }}
        disabled={!product?.scores}
      >
        {product?.scores && (
          <PackagingInfo
            togglePanel={() => togglePanel("9")}
            pack={product.scores?._pack}
          />
        )}
      </AccordionItem>
    </ScrollView>
    
    <NutrriInfo isOpen={isModalNutrition} setIsOpen={setIsModalNutrition } nutriscore={"A"} togglePanel={()=>togglePanel("1") }/>
    </>
  );
}
