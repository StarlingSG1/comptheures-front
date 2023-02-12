import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BorderedButton, Button, OrbitronTitle } from "../../components/atoms";

import { Breadcrumb, ClocksStep, InvitationsStep, MonthStep, NewTemplate, SpecialDaysStep } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function EnterpriseConfig() {
  const { theme, setBurgerOpen, user } = useUserContext();
  const [step, setStep] = useState(0);
  const [showCustomRole, setShowCustomRole] = useState(false);
  const [enterpriseConfig, setEnterpriseConfig] = useState({
    months: {
      start: 1,
      end: 31,
    },
    specialDays: ["recup", "maladie", "congé"],
    time: "07:00"
  });


  const stepsName = ["Définir mois", "Jours spéciaux", "Horaires", "Inviter"];
  const enterprise = {
    name: "Maison de la Barbe à Papa",
  };

  const router = useRouter();

  const handleNextStep = () => {
    if (step >= 3) return;
    setStep(step + 1);
  }

  const handlePreviousStep = () => {
    if (step <= 0) return;
    setStep(step - 1);
  }

  const handleSubmit = () => {
    console.log("submit");
  }

  const handleSelectMonth = (start, end) => {
    if (!Number(start) || !Number(end)) return;

    if (Number(start) > 31) start = 31;
    if (Number(start) < 1) start = 1;
    if (Number(end) > 31) end = 31;
    if (Number(end) < 1) end = 1;

    setEnterpriseConfig({
      ...enterpriseConfig,
      months: {
        start: Number(start),
        end: Number(end),
      }
    });
  }

  const handleSelectSpecialDay = (specialDay) => {
    const findSelectedSpecialDay = enterpriseConfig.specialDays.find((day) => day === specialDay);
    if (findSelectedSpecialDay) {
      setEnterpriseConfig({
        ...enterpriseConfig,
        specialDays: enterpriseConfig.specialDays.filter((day) => day !== specialDay),
      });
    }
    else {
      setEnterpriseConfig({
        ...enterpriseConfig,
        specialDays: [...enterpriseConfig.specialDays, specialDay],
      });
    }
  }

  const handleSelectClocks = (time) => {
    setEnterpriseConfig({
      ...enterpriseConfig,
      time: time
    });
  }

  useEffect(() => {
    setBurgerOpen(false);
  }, []);

  return (
    <>
      <Head>
        <title>Comptheures.fr - Configurer votre entreprise</title>
      </Head>
      <NewTemplate className="overflow-y-auto">
        <OrbitronTitle className="text-center">{enterprise.name}</OrbitronTitle>
        <Breadcrumb
          steps={stepsName}
          currentStep={step}
          onChooseStep={setStep}
        />
        {/* steps container */}
        <div>
          <MonthStep
            show={step === 0}
            onSelectedMonths={handleSelectMonth}
            months={enterpriseConfig.months}
          />
          <SpecialDaysStep
            show={step === 1}
            selectedSpecialDays={enterpriseConfig.specialDays}
            onSelectSpecialDay={handleSelectSpecialDay}
          />
          <ClocksStep
            show={step === 2}
            selectedClocks={enterpriseConfig.clocks}
            onSelectClocks={handleSelectClocks}
          />
          <InvitationsStep
          showCustomRole={showCustomRole}
          setShowCustomRole={setShowCustomRole}
            show={step === 3}
          />
          {!showCustomRole && <div className="mt-10 flex items-center gap-5">
            {step > 0 && <BorderedButton onClick={handlePreviousStep} className="!w-max min-w-fit px-5 dark:bg-transparent">étape précédente</BorderedButton>}
            {step < stepsName.length - 1 && <Button onClick={handleNextStep}>étape suivante</Button>}
            {step === stepsName.length - 1 && <Button onClick={handleSubmit}>terminer</Button>}
          </div>}
        </div>
      </NewTemplate>
    </>
  );
}
