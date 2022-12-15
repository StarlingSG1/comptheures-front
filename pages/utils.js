import { BurgerParagraph, BurgerSeparator, Button, Input, DarkLogo, Paragraph, ReverseParagraph, Logo } from "../components/atoms";
import { OrbitronTitle } from "../components/atoms/Texts/OrbitronTitle";

export default function Utils() {
  return (
    <div className="w-screen h-screen flex flex-col gap-5 dark:bg-blue-dark bg-blue">
      <Paragraph>Paragraph</Paragraph>
      <ReverseParagraph>ReverseParagraph</ReverseParagraph>
      <BurgerParagraph>Connexion</BurgerParagraph>
      <Button>Enregistrer</Button>
      <DarkLogo/>
      <Logo/>
      <OrbitronTitle>Mon Compt'heures</OrbitronTitle>
      <Input placeholder="Prénom"/>
      <BurgerSeparator/>  
    </div>
  );
}
