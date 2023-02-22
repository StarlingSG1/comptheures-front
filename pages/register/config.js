import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createSpecialDay } from "../../api/admin/specialDay";
import { sendConfig } from "../../api/enterprise/enterprise";
import { BorderedButton, Button, OrbitronTitle } from "../../components/atoms";
import { Breadcrumb, ClocksStep, InvitationsStep, MonthStep, SpecialDaysStep } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function RegisterConfig() {
    const { theme, setBurgerOpen, user, enterprise, setEnterprise, setUser } = useUserContext();
    const [step, setStep] = useState(0);
    const [showCustomRole, setShowCustomRole] = useState(false);
    const [showCreateDay, setShowCreateDay] = useState(false)
    const [enterpriseConfig, setEnterpriseConfig] = useState({
        months: {
            start: 1,
            end: 31,
        },
        specialDays: [],
        time: "07:00",
        id: enterprise?.id,
    });

    const stepsName = ["Définir mois", "Jours spéciaux", "Horaires", "Inviter"];

    const router = useRouter();

    const handleNextStep = () => {
        if(enterpriseConfig.months.start === enterpriseConfig.months.end) return toast.error("Les mois de début et de fin doivent être différents")

        if (step >= 3) return;
        setStep(step + 1);
    }

    const handlePreviousStep = () => {
        if (step <= 0) return;
        setStep(step - 1);
    }

    const handleSubmit = async () => {
        const response = await sendConfig(enterpriseConfig);
        if (response.error === false) {
            toast.success(response.message);
            setEnterprise(response.data)
            // change enterprise in user.userEnterprise in state user
            setUser({
                ...user,
                userEnterprise: { ...user.userEnterprise, enterprise: response.data }
            })

            router.push("/enterprise");
        } else {
            toast.error(response.message);
        }
    }

    ///////// STEP 1 - Months /////////

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

    ///////// STEP 2 - Special Days /////////

    const handleSelectSpecialDay = (specialDay) => {
        const findSelectedSpecialDay = enterpriseConfig.specialDays.find((day) => day.name === specialDay.name);
        if (findSelectedSpecialDay) {
            setEnterpriseConfig({
                ...enterpriseConfig,
                specialDays: enterpriseConfig.specialDays.filter((day) => day.name !== specialDay.name),
            });
        }
        else {
            setEnterpriseConfig({
                ...enterpriseConfig,
                specialDays: [...enterpriseConfig.specialDays, specialDay],
            });
        }
    }

    ///////// STEP 3 - Times /////////

    const handleSelectClocks = (time) => {
        setEnterpriseConfig({
            ...enterpriseConfig,
            time: time
        });
    }

    ///////// STEP 4 - Invite /////////

    const createTheSpecialDays = async (payload) => {
        const response = await createSpecialDay(payload);
        if (response.error === false) {
            toast.success(response.message);
            setShowCreateDay(false)
            setEnterprise(response.data);
        }
    }

    //////////////////////////////////

    useEffect(() => {
        setBurgerOpen(false);
    }, []);

    return (
        <>
            <Head>
                <title>Comptheures.fr - Configurer votre entreprise pour la première fois</title>
            </Head>
            <div className="md:py-[150px] md:flex md:dark:bg-blue-dark md:bg-blue md:w-screen md:justify-center md:items-center md:min-h-screen">
                <div className="md:w-full md:max-w-[1030px] md:grid md:grid-cols-12 md:gap-[50px] md:items-start md:gap-[50px]">
                    <div className={`w-screen py-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue bg-white relative   md:w-auto md:block md:col-span-8 md:col-start-3 md:min-h-[520px] md:h-full md:shadow md:px-[30px] md:rounded-2xl overflow-y-auto`}>
                        <OrbitronTitle className="text-center">{enterprise?.name || "Configurer entreprise"}</OrbitronTitle>
                        <div>
                            <Breadcrumb
                                steps={stepsName}
                                currentStep={step}
                                onChooseStep={setStep}
                            />
                            <div>
                                {/* Pas les 2 memes nombre dans les input (+ vérif en back et erreur si filoutage) */}
                                <MonthStep
                                    show={step === 0}
                                    onSelectedMonths={handleSelectMonth}
                                    months={enterpriseConfig.months}
                                />
                                {/* Faire fonctionner */}
                                <SpecialDaysStep
                                    show={step === 1}
                                    config={true}
                                    selectedSpecialDays={enterpriseConfig?.specialDays}
                                    showCreateDay={showCreateDay}
                                    setShowCreateDay={setShowCreateDay}
                                    onSelectSpecialDay={handleSelectSpecialDay}
                                    createTheSpecialDays={createTheSpecialDays}
                                />
                                <ClocksStep
                                    show={step === 2}
                                    selectedTime={enterpriseConfig?.workHourADay}
                                    onSelectTime={handleSelectClocks}
                                />
                                {/* Récup les rôles de bases */}
                                <InvitationsStep
                                    showCustomRole={showCustomRole}
                                    setShowCustomRole={setShowCustomRole}
                                    show={step === 3}
                                />
                                {!showCustomRole && !showCreateDay && <div className="mt-10 flex items-center gap-5">
                                    {step > 0 && <BorderedButton onClick={handlePreviousStep} className="!w-max min-w-fit px-5 dark:bg-transparent">étape précédente</BorderedButton>}
                                    {step < stepsName.length - 1 && <Button onClick={handleNextStep}>étape suivante</Button>}
                                    {step === stepsName.length - 1 && <Button onClick={handleSubmit}>terminer</Button>}
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
