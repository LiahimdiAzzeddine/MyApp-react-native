import React from "react";
import { ScrollView, View, Text, Linking, StyleSheet } from "react-native";

const CGUConfidentialiteScreen = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text className="text-2xl font-bold text-center text-custom-blue mb-8 ArchivoBold">
        CGU-Confidentialité
      </Text>

      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          1. Préambule
        </Text>
        <Text style={styles.paragraph}>
          TiCO est une application permettant d’accéder à des informations
          claires et centralisées sur les produits alimentaires, afin de
          permettre à chacun.e.s de faire des choix éclairés et responsables.
          Notre mission est de garantir la transparence, tout en favorisant une
          consommation plus simple, durable et accessible à tous.tes.
        </Text>
        <Text style={styles.paragraph}>
          La SAS FEELOFOOD, R.C.S. de Poitiers n°883 111 528,
          7 avenue du Tour de France BP 70183 86961 FUTUROSCOPE
          CHASSENEUIL CEDEX, ci-après désigné Foodhea, est l’éditeur de
          l’application TiCO. N° SIRET : 883 111 528 00021
          N° TVA Intracommunautaire : FR 883 111 528. Contact :{" "}
          <Text
            style={styles.link}
            onPress={() => openLink("mailto:contact@foodhea.com")}
          >
            contact@foodhea.com
          </Text>
        </Text>

        <Text style={styles.paragraph}>
          En utilisant l’application TiCO, les utilisateurs acceptent les
          Conditions Générales d’Utilisation (CGU). Nous invitons tous les
          utilisateurs à les lire attentivement pour comprendre leurs droits et
          obligations.
        </Text>
      </View>

      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          2. Objet des CGU
        </Text>
        <Text style={styles.paragraph}>
          Les Conditions Générales d’Utilisation (CGU) définissent les règles
          d’utilisation de l’application TiCO, précisant les droits et
          responsabilités des utilisateurs ainsi que ceux de l’éditeur.
        </Text>
      </View>

      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          3. Description des services
        </Text>
        <Text style={styles.paragraph}>
          L’application TiCO est accessible gratuitement en téléchargement sur
          les principales plateformes de distribution (App Store et Google
          Play).
        </Text>
        <Text style={styles.paragraph}>
          TiCO propose un service de scan pour accéder à des informations
          complètes sur les produits alimentaires, ainsi que des recettes
          inspirantes et des conseils de consommation et nutrition.
          L’utilisateur a la possibilité de proposer des recettes.
        </Text>
        <Text style={styles.paragraph}>
          L’éditeur s’engage à mettre à jour régulièrement l’application pour
          garantir son bon fonctionnement et son accessibilité. Il veille à
          fournir des informations objectives et complètes, mais ne peut être
          tenu responsable des erreurs ou omissions. L’utilisation de
          l’application à des fins frauduleuses ou illégales est strictement
          interdite, et toute violation des conditions d’utilisation pourra
          entraîner la suspension ou la suppression de l’accès à l’application.
        </Text>
        <Text style={styles.paragraph}>
          L’utilisateur a la possibilité de soumettre ses propres recettes via
          l’application. Chaque recette soumise sera vérifiée par TiCO pour
          s’assurer qu’elle respecte les critères de l’application avant d’être
          publiée. Dans le cas contraire, la recette pourrait ne pas être
          publiée. En soumettant une recette, l’utilisateur garantit être le
          créateur original du contenu et accorde à TiCO une licence non
          exclusive pour l’utiliser dans le cadre de ses services.
        </Text>
        <Text style={styles.paragraph}>
          L’application encourage l’utilisateur à inviter les marques à
          améliorer la transparence de leurs produits. L’utilisateur peut
          solliciter une marque directement depuis le produit de son choix en
          utilisant un curseur dédié. Les demandes recueillies sont ensuite
          regroupées, et dès qu’un nombre suffisant de sollicitations est
          atteint, TiCO contacte la marque concernée pour l’encourager à rendre
          ses informations plus accessibles.
        </Text>
        <Text style={styles.paragraph}>
          Les données de base relatives aux produits alimentaires présentes dans
          l’application proviennent de sources ouvertes, telles qu’Open Food
          Facts. Ces données sont complétées. avec les marques puis décryptées
          et validées indépendamment par notre équipe. TiCO s’assure de la
          qualité et de la précision des informations fournies après
          vérifications des données, mais ne peut être tenu responsable des
          erreurs ou omissions provenant de ces sources.
        </Text>
      </View>
      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          4. Compte utilisateur
        </Text>
        <Text style={styles.paragraph}>
          Lors de la création d’un compte utilisateur, l’utilisateur doit
          fournir une adresse e-mail, un pseudo et un mot de passe.
          L’utilisateur est responsable de la confidentialité de ses
          identifiants de connexion et doit prendre toutes les mesures
          nécessaires pour garantir la sécurité de son compte. En cas de
          suspicion d’utilisation non autorisée de son compte, l’utilisateur
          s’engage à informer immédiatement l’éditeur. Toute activité réalisée à
          partir d’un compte utilisateur est de la responsabilité de
          l’utilisateur.
        </Text>
        {/* Ajoute ici les autres paragraphes comme dans les sections précédentes */}
      </View>
      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          5. Données personnelles
        </Text>
        <Text style={styles.paragraph}>
          TiCO s’engage à respecter la confidentialité des données personnelles
          des utilisateurs et à les traiter conformément au Règlement Général
          sur la Protection des Données (RGPD). Les données sont collectées
          uniquement pour les besoins de l’application et ne sont partagées avec
          des tiers qu’avec le consentement explicite des utilisateurs.
        </Text>
        <Text style={styles.paragraph}>
          L’utilisateur dispose de droits d’accès, de rectification, de
          suppression et d’opposition sur ses données, qu’il pourra exercer en
          contactant notre service dédié à la protection des données (
          <Text
            style={styles.link}
            onPress={() => openLink("mailto:dpo@foodhea.com")}
          >
            dpo@foodhea.com
          </Text>
          ). Il est possible qu’un justificatif d’identité soit demandé.
          L’utilisateur peut également transmettre une réclamation à la
          Commission Nationale de l’Informatique et des Libertés (
          <Text
            style={styles.link}
            onPress={() => openLink("https://www.cnil.fr")}
          >
            CNIL
          </Text>
          ), au sujet du traitement des données à caractère personnel par TiCO.
        </Text>
      </View>
        <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          6. Propriété intellectuelle
        </Text>
        <Text style={styles.paragraph}>
         Le contenu de l’application, y compris son logo, son design, et
              tous les éléments visuels, textuels et graphiques, est protégé par
              des droits de propriété intellectuelle. Toute reproduction,
              distribution ou utilisation non autorisée de ces éléments est
              strictement interdite sans l’accord préalable de TiCO.
        </Text>
      
      </View>
       <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          7. Responsabilité et garanties
        </Text>
        <Text style={styles.paragraph}>
         TiCO met tout en œuvre pour fournir des informations précises et
              actualisées, mais ne saurait être tenu responsable des erreurs,
              inexactitudes ou omissions présentes dans les données affichées
              sur l’application, provenant notamment des sources externes comme
              Open Food Facts et autres bases de données open data.
        </Text>
         <Text style={styles.paragraph}>
              En cas d’erreur dans les informations fournies, TiCO s’engage à
              corriger les données dans les plus brefs délais, mais n’assume
              aucune responsabilité quant à l’utilisation des informations
              affichées.
            </Text>
            <Text style={styles.paragraph}>
              TiCO se réserve le droit de suspendre ou de résilier l’accès à
              l’application en cas d’utilisation abusive, frauduleuse ou non
              conforme aux Conditions Générales d’Utilisation. Toute activité
              illégale ou contraire à l’éthique, y compris la manipulation des
              données ou l’utilisation de l’application à des fins commerciales
              non autorisées, entraînera des sanctions appropriées, pouvant
              aller de la suspension temporaire à la suppression définitive du
              compte utilisateur.
            </Text>
      
      </View>
      <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
          8. Engagements de l’utilisateur
        </Text>
       <Text style={styles.paragraph}>
            Les utilisateurs s’engagent à utiliser l’application TiCO
            conformément aux lois et règlements en vigueur, en respectant
            notamment la législation relative à la protection des données
            personnelles, à la propriété intellectuelle et à la consommation
            responsable.
          </Text>
         <Text style={styles.paragraph}>
            Les utilisateurs s’engagent à adopter un comportement respectueux
            envers TiCO et les autres utilisateurs de l’application. Toute
            conduite abusive, insultante, discriminatoire ou perturbatrice sera
            considérée comme une violation des Conditions Générales
            d’Utilisation et pourra entraîner la suspension ou la suppression du
            compte utilisateur.
          </Text>
         <Text style={styles.paragraph}>
            Les utilisateurs s’engagent à ne pas perturber, altérer ou
            compromettre le bon fonctionnement de l’application, que ce soit par
            l’utilisation de logiciels malveillants, de techniques de piratage
            ou toute autre méthode susceptible de causer des dommages à
            l’infrastructure ou à la sécurité de TiCO. Toute tentative de
            hacking, d’attaque ou de manipulation de l’application entraînera
            des sanctions et des poursuites légales.
          </Text>
      </View>

 <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
        9. Mise à jour des CGU
        </Text>
       <Text style={styles.paragraph}>
           Foodhea se réserve le droit de modifier, à tout moment, les
            Conditions Générales d’Utilisation de l’application TiCO. Les
            modifications entreront en vigueur dès leur publication sur
            l’application ou sur le site web associé.
          </Text>
         <Text style={styles.paragraph}>
            Les utilisateurs seront informés des modifications des CGU par
            notification dans l’application ou par publication d’une version
            mise à jour sur le site ou l’application. Il est de la
            responsabilité de l’utilisateur de consulter régulièrement ces
            conditions afin de prendre connaissance des éventuelles
            modifications. En continuant à utiliser l’application après la mise
            à jour des CGU, l’utilisateur accepte tacitement les nouvelles
            conditions.
          </Text>
        
      </View>

      
 <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
        10. Durée et résiliation
        </Text>
      
           <Text style={styles.paragraph}>
            Les Conditions Générales d’Utilisation (CGU) sont applicables dès
            leur acceptation, ce qui se fait par l’utilisation de l’application.
            En utilisant l’application, l’utilisateur reconnaît avoir pris
            connaissance des CGU et les accepte sans réserve.
          </Text>
           <Text style={styles.paragraph}>
            Foodhea se réserve le droit de résilier l’accès à l’application ou
            aux services associés en cas de non-respect des CGU. Toute violation
            des conditions d’utilisation pourra entraîner la suspension
            temporaire ou définitive d’un compte utilisateur, sans préjudice des
            actions légales pouvant être engagées en fonction de la gravité de
            l’infraction.
          </Text>
        
      </View>
            
 <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
        11. Loi applicable et juridiction compétente
        </Text>
      
           <Text style={styles.paragraph}>
            Les présentes Conditions Générales d’Utilisation sont régies par la
            loi française. En cas de litige, les parties conviennent que la
            législation française sera applicable.
          </Text>
           <Text style={styles.paragraph}>
            En cas de différend relatif à l’interprétation ou à l’application
            des CGU, les tribunaux compétents seront ceux du ressort du siège
            social de Foodhea, sauf disposition légale impérative contraire.
          </Text>
        
      </View>
                  
 <View style={styles.section}>
        <Text className="text-lg font-semibold text-custom-blue mb-4 ArchivoBold">
        12. Contact
        </Text>
      
           <Text style={styles.paragraph}>
            Pour toute question ou problème concernant les présentes Conditions
            Générales d’Utilisation ou l’utilisation de l’application, vous
            pouvez nous contacter à l’adresse suivante : 

           <Text
            style={styles.link}
            onPress={() => openLink("mailto:contact@foodhea.com")}
          >
            contact@foodhea.com
          </Text>
            , ou directement via le formulaire de contact disponible dans
            l’application.
          </Text>
           
        
      </View>
    </ScrollView>
  );
};

export default CGUConfidentialiteScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },

  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004080",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 24,
    fontFamily: "Archivo",
  },
  link: {
    fontSize: 16,
    color: "#004080",
    textDecorationLine: "underline",
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
});
