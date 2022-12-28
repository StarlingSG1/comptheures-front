import Head from "next/head";
import { Paragraph, ParagraphLink } from "../components/atoms";
import { BigLogo, SmallStraightLogo, StraightLogo } from "../components/molecules";
import { MobileTemplate, NewTemplate, Template } from "../components/organisms";
import { useUserContext } from "../context";

export default function MentionsLegales() {

    const { theme } = useUserContext()

    return (
        <>
            <Head>
                <title>Mentions légales - Comptheures</title>
                <meta
                    name="description"
                    content="Mentions légales de l'application Comptheures."
                />
            </Head>
            <NewTemplate>
            <StraightLogo className="hidden sm:flex justify-center" theme={theme} />
            <SmallStraightLogo className=" sm:hidden" theme={theme} />
            <div className="flex flex-col sm:mt-10 gap-4">
                <Paragraph>Nous recueillons vos données dans l'unique but de rendre votre expérience la plus unique possible. Elles ne seront pas transmisse à un quelconque tier.</Paragraph>
                <Paragraph>Vous ne recevrez aucun mail, ni aucune publicité, votre email, nom, prénom servent simplement à vous identifier à Comptheures.fr et connaître ou modifier vos informations dans votre profil.</Paragraph>
                <Paragraph>Si vous avez une question ou souhaitez supprimer votre compte, n'hésitez pas nous contacter par mail : <ParagraphLink>barriere.jeremie@gmail.com</ParagraphLink></Paragraph>
            </div>
            </NewTemplate>
        </>
    )
}