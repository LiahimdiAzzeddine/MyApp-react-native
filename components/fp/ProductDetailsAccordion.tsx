import React, { useState, useMemo, useContext, useRef, useEffect } from "react";
import { Alert, Button, ScrollView, View } from "react-native";
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
import NutriInfo from "@/components/Modals/NutriInfo";
import ContactAdditif from "../Modals/ContactAdditif";
import { ContactModal } from "../Modals/ContactModal";
import ContactTiCO from "../Modals/ContactTiCO";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "expo-router";

interface ProductDetailsAccordionProps {
  product: any; // Consider creating a proper Product type interface
}

export default function ProductDetailsAccordion({
  product,
}: ProductDetailsAccordionProps) {
  const { userInfo } = useContext(AuthContext);
  const isAuthenticated: boolean = !!userInfo;
  const router = useRouter();
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: View | null }>({});
  
  const {
    isModalNutrition,
    setIsModalNutrition,
    isModalAdditif,
    setIsModalAdditif,
    isModalContact,
    setIsModalContact,
    isModalContactTico,
    setIsModalContactTico,
    setIsModalEncourager,
    scrollRefpage,
    scrollRef
  } = useBottomSheet();

  const togglePanel = (id: string) => {
    // Si le panneau est déjà ouvert, le fermer, sinon l'ouvrir
    setOpenPanel(prevOpenPanel => prevOpenPanel === id ? null : id);
  };

  const OnlyOpen = (id: string) => {
    if (id) {
      // Force l'ouverture même si déjà ouvert
      if (openPanel !== id) {
        setOpenPanel(id);
      } else {
        // Si c'est le même panneau, forcer la fermeture puis réouverture
        //setOpenPanel('0');
        setTimeout(() => {
          setOpenPanel(id);
        }, 50);
      }
      
      // Delay scroll to allow rendering first
      setTimeout(() => {
        const ref = sectionRefs.current[id];
        if (ref && 'measure' in ref) {
          (ref as any).measure((_fx: any, _fy: any, _width: any, _height: any, _px: any, py: number) => {
            if (scrollRefpage?.current) {
              scrollRefpage?.current?.scrollTo({ y: py - 50, animated: true });
            }
            if (scrollRef?.current) {
              scrollRef?.current?.scrollTo({ y: py - 50, animated: true });
            }
          });
        } else {
          console.log("🚀 ~ OnlyOpen ~ ref non trouvé pour id:", id);
        }
      }, 500); // Augmenté pour laisser le temps à la réouverture
    }
  };

  const openContactSolliciter = (): void => {
    if (!isAuthenticated) {
      Alert.alert("Attention", "Se connecter pour encourager la marque", [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Se connecter",
          onPress: () => router.push("/login"),
        },
      ]);
    } else {
      setIsModalEncourager(true);
    }
  };

  // Memoize accordion sections configuration to avoid recreating on each render
  const accordionSections = useMemo(() => [
    {
      id: "1",
      title: "Informations nutritionnelles",
      isEnabled: true,
      component: (
        <NutritionalInfo product={product} onToggle={togglePanel} />
      ),
    },
    {
      id: "2",
      title: "Ingrédients, additifs",
      isEnabled: true,
      component: (
        <IngredientsInfo
          ingredients={product?.ingredients}
          allergenesArray={product?.allergens}
          additifsArray={product?.additifs}
          onToggle={togglePanel}
        />
      ),
    },
    {
      id: "3",
      title: "Impact environnemental",
      isEnabled: !!product?.scores?._scoreEnv,
      component: (
        <TransformationInfo
          togglePanel={() => togglePanel("3")}
          scoreEnv={product?.scores?._scoreEnv}
        />
      ),
    },
    {
      id: "4",
      title: "Origines",
      isEnabled: !!product?.scores?._scoreEnv,
      component: (
        <OriginsInfo
          togglePanel={() => togglePanel("4")}
          scoreEnv={product?.scores?._scoreEnv}
          scoreOrigin={product?.scores?._scoreOrigin}
          transformation={product?.transformation}
          transcondi={product?.transcondi}
        />
      ),
    },
    {
      id: "5",
      title: "Labels et mentions",
      isEnabled: !!product?.engagements,
      component: (
        <LabelsInfo
          togglePanel={() => togglePanel("5")}
          engagements={product?.engagements}
        />
      ),
    },
    {
      id: "6",
      title: "Marque & entreprise",
      isEnabled: !!product?.provider,
      component: (
        <BrandInfo
          togglePanel={() => togglePanel("6")}
          markInfo={product?.markInfo}
          provider={product?.provider}
        />
      ),
    },
    {
      id: "7",
      title: "Utilisation & conservation",
      isEnabled: !!product?.conservation,
      component: (
        <UsageInfo
          togglePanel={() => togglePanel("7")}
          conservation={product?.conservation}
          utilisation={product?.utilisation}
        />
      ),
    },
    {
      id: "8",
      title: "Naturalité des ingrédients",
      isEnabled: !!product?.scores?._scoreNat,
      component: (
        <Naturalite
          togglePanel={() => togglePanel("8")}
          scoreNat={product?.scores?._scoreNat}
        />
      ),
    },
    {
      id: "9",
      title: "Emballage",
      isEnabled: !!product?.scores?._pack,
      component: (
        <PackagingInfo
          togglePanel={() => togglePanel("9")}
          pack={product?.scores?._pack}
        />
      ),
    },
  ], [product]); // Only recreate when product changes

  const handleToggle = (section: (typeof accordionSections)[0]) => {
    if (section.isEnabled) {
      togglePanel(section.id);
    }
  };

  const findFirstInactiveItem = (sections: any[]) => {
    return sections.find((section) => !section.isEnabled);
  };

  const firstInactiveItem = useMemo(() => findFirstInactiveItem(accordionSections), [accordionSections]);

  return (
    <>
      <ScrollView>
        {accordionSections.map((section) => (
          <View
            key={section.id}
            ref={(ref) => {
              sectionRefs.current[section.id] = ref;
            }}
          >
            <AccordionItem
              title={section.title}
              isOpen={openPanel === section.id}
              onToggle={() => handleToggle(section)}
              disabled={!section.isEnabled}
              showBubble={firstInactiveItem?.id === section.id}
              onBubblePress={openContactSolliciter}
            >
              {section.isEnabled && section.component}
            </AccordionItem>
          </View>
        ))}
      </ScrollView>
      <NutriInfo
        isOpen={isModalNutrition}
        setIsOpen={setIsModalNutrition}
        nutriscore={product?.nutriscore ? product?.nutriscore : "E"}
        togglePanel={() => OnlyOpen("1")}
      />
      <ContactAdditif
        isOpen={isModalAdditif}
        setIsOpen={setIsModalAdditif}
        additifs={product?.additifs}
        togglePanel={() => OnlyOpen("2")}
      />
      <ContactModal isOpen={isModalContact} setIsOpen={setIsModalContact} />
      <ContactTiCO
        isOpen={isModalContactTico}
        setIsOpen={setIsModalContactTico}
        gtin={product?.gtin}
      />
    </>
  );
}