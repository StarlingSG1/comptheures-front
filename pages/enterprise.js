import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrbitronTitle, ParagraphLink } from "../components/atoms";
import { NewTemplate } from "../components/organisms";
import { useUserContext } from "../context";


export default function Enterprise() {
    const { theme, setBurgerOpen, user } = useUserContext();
    const enterprise = {
        name: "Maison de la Barbe à Papa",
    };

    const [pages, setPages] = useState([
        { name: "Configuration de l’entreprise", link: "/enterprise/config" },
        { name: "Info entreprise", link: "/enterprise/info" },
        { name: "Horaires à valider", link: "/" },
        { name: "Statistiques / Export des données", link: "/" },
        { name: "Liste des utilisateurs", link: "/" },
    ]);

    useEffect(() => {
        setBurgerOpen(false);
    }, []);

    return (
        <>
            <Head>
                <title>Comptheures.fr - Configurer votre entreprise</title>
            </Head>
            <NewTemplate>
                <div className="h-full w-full flex flex-col">
                    <ul className="flex flex-col justify-between h-full w-full">
                        <li>
                            <OrbitronTitle className="text-center">{enterprise.name}</OrbitronTitle>
                        </li>
                        {pages.map((page, index) => (
                            <li key={index}>
                                <ParagraphLink href={page.link}>{page.name}</ParagraphLink>
                            </li>
                        ))}
                    </ul>
                </div>
            </NewTemplate>
        </>
    );
}
