import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BorderedButton, Button, OrbitronTitle } from "../../components/atoms";

import { Breadcrumb, ClocksStep, InvitationsStep, MonthStep, NewTemplate, SpecialDaysStep } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function EnterpriseConfig() {
  const { theme, setBurgerOpen, user } = useUserContext();
  const [step, setStep] = useState(0);
  const [enterpriseConfig, setEnterpriseConfig] = useState({
    months: {
      start: 1,
      end: 2,
    },
    specialDays: ["recup", "maladie", "congé"],
    clocks: {
      hour: 7,
      minute: 0,
    }
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

    if (Number(start) > 12) start = 12;
    if (Number(start) < 1) start = 1;
    if (Number(end) > 12) end = 12;
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

  const handleSelectClocks = (hour, minute) => {
    if (Number(hour) > 23) hour = 23;
    if (Number(hour) < 0) hour = 0;
    if (Number(minute) > 59) minute = 59;
    if (Number(minute) < 0) minute = 0;

    console.log(hour, minute);

    setEnterpriseConfig({
      ...enterpriseConfig,
      clocks: {
        hour: Number(hour),
        minute: Number(minute),
      }
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
            show={step === 3}
          />
          <div className="mt-10 flex items-center gap-5">
            {step > 0 && <BorderedButton onClick={handlePreviousStep} className="!w-max min-w-fit px-5 dark:bg-transparent">étape précédente</BorderedButton>}
            {step < stepsName.length - 1 && <Button onClick={handleNextStep}>étape suivante</Button>}
            {step === stepsName.length - 1 && <Button onClick={handleSubmit}>terminer</Button>}
          </div>
        </div>
      </NewTemplate>
    </>
  );
}
