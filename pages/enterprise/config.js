import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, OrbitronTitle } from "../../components/atoms";

import { Breadcrumb, NewTemplate } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function EnterpriseConfig() {
  const { theme, setBurgerOpen, user } = useUserContext();
  const [homeOpen, setHomeOpen] = useState(false);
  const [step, setStep] = useState(0);
  const enterprise = {
    name: "Maison de la Barbe à Papa",
  };

  const router = useRouter();

  const goToComptheures = () => {
    router.push("/comptheures");
  };

  useEffect(() => {
    setHomeOpen(false);
    setBurgerOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>Comptheures.fr - Configurer votre entreprise</title>
      </Head>
      <NewTemplate>
        <OrbitronTitle className="text-center">{enterprise.name}</OrbitronTitle>
        <Breadcrumb
          steps={["Définir mois", "Jours spéciaux", "Horaires", "Inviter"]}
          currentStep={step}
          onChooseStep={setStep}
        />
      </NewTemplate>
    </>
  );
}
