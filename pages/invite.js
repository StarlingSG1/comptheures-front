import Head from "next/head";
import { useEffect, useState } from "react";
import { verifyInvitation } from "../api/admin/invitation";
import { Button, Paragraph, ParagraphLink, Title } from "../components/atoms";
import { Footer, StraightLogo } from "../components/molecules";
import { InvitationRegister, InvitationLogin } from "../components/organisms";
import { useUserContext } from "../context";


export default function Invite() {

    const { setBurgerOpen } = useUserContext();

    const [tokenValid, setTokenValid] = useState(null);
    const [invitContent, setInvitContent] = useState(null);
    const [accepted, setAccepted] = useState(false);
    const [step, setStep] = useState(0);

    const verifyInvit = async () => {

        const urlSearchParams = new URLSearchParams(window.location.search);
        const token = urlSearchParams.get('token');

        if (!token) {
            return
        }

        const response = await verifyInvitation({ token: token });
        if (response.error === false) {
            setInvitContent(response.data);
            setTokenValid(true);
        }
        else {
            setTokenValid(false);
        }
    }

    useEffect(() => {
        setBurgerOpen(false);
        verifyInvit();
    }, []);

    return (
        <>
            <Head>
                <title>Comptheures.fr - Invitation acceptée</title>
            </Head>
            <div className="md:py-[150px] md:flex md:dark:bg-blue-dark md:bg-blue md:w-screen md:justify-center md:items-center md:min-h-screen">
                <div className="md:w-full md:max-w-[1030px] md:grid md:grid-cols-12 md:gap-[50px] md:items-start md:gap-[50px]">
                    <div className={`w-screen pb-10 flex flex-col justify-between px-[5%] min-h-screen dark:bg-blue bg-white relative   md:w-auto md:block md:col-span-8 md:col-start-3 md:min-h-[520px] md:h-full md:shadow md:px-[30px] md:rounded-2xl`}>
                        {!accepted ? <div className="md:h-full w-full flex flex-col items-center justify-between tokenMobile">
                            <StraightLogo className={"justify-center"} />
                            <div className="flex flex-col justify-between md:justify-start mt-12 gap-10 w-full h-full">
                                <div className="flex flex-col gap-10">
                                    <Title className={"text-center"}>{invitContent?.enterprise?.name}</Title>
                                    {!tokenValid ? <Paragraph>Vérification</Paragraph> : tokenValid === false ? <Paragraph>Pas bon</Paragraph> : tokenValid &&
                                        <Paragraph className="text-center">
                                            <strong>{invitContent.firstName + " " + invitContent.lastName}</strong>{" vous invite chez "}<strong>{invitContent.enterprise.name + " "}</strong>pour un role de <strong>{" " + invitContent.role.label}. </strong>
                                            Cliquez sur le bouton ci-dessous pour accepter l'invitation.
                                        </Paragraph>
                                    }
                                </div>
                                <Button className="mb-10" onClick={() => {setAccepted(true)}}>Accepter</Button>
                            </div>
                            <footer className="hidden md:flex items-center gap-4 ">
                                <div className="flex items-center gap-1.5">
                                    <Paragraph>Made by</Paragraph>
                                    <a href="https://github.com/StarlingSG1" target="_blank" className="text-center dark:text-white text-blue underline font-noto">Jérémie Barrière</a>
                                </div>
                                <div className={`w-[2px] h-4 dark:bg-white bg-blue  rounded-full`}></div>
                                <ParagraphLink href="/mentions-legales">Mentions légales</ParagraphLink>
                            </footer>
                            <Footer className="md:hidden" />
                        </div> : step === 0 ? <InvitationRegister enterprise={invitContent.enterprise} role={invitContent.role} setStep={setStep}/> : step === 1 && <InvitationLogin setStep={setStep} enterprise={invitContent?.enterprise.name}/> }
                    </div>
                </div>
            </div>
        </>
    );
}