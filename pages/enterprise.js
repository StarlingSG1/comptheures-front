import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { OrbitronTitle, ParagraphLink } from "../components/atoms";
import { AdminRedirect, NewTemplate } from "../components/organisms";
import { useUserContext } from "../context";


export default function Enterprise() {
    const { theme, setBurgerOpen, user, enterprise, contentLoading, setContentLoading } = useUserContext();

    const [pages, setPages] = useState([
        { name: "Configuration de l’entreprise", link: "/enterprise/config", role: 2 },
        { name: "Info entreprise", link: "/enterprise/info", role: 1 },
        { name: "Horaires à valider", link: "/enterprise/times/validation", role: 1 },
        { name: "Statistiques / Export des données", link: "/enterprise/times/data", role: 2 },
        { name: "Liste des utilisateurs", link: "/enterprise/users", role: 1 },
    ]);

    useEffect(() => {
        setBurgerOpen(false);
        setContentLoading(false);
    }, []);

    return (
        <>
            <Head>
                <title>Comptheures.fr - Configurer votre entreprise</title>
            </Head>
            <NewTemplate>
                            {contentLoading ? <div className="flex items-center justify-center h-full"><div className="loader"></div></div> : (user && user?.userEnterprise?.role?.isAdmin <= 1) ? <AdminRedirect/>  :<>
                        <OrbitronTitle className="text-center">{enterprise?.name}</OrbitronTitle>
                        <ul className="flex flex-col md:items-start items-center gap-[58px] w-full md:mt-10">
                            {pages.map((page, index) => (
                                user?.userEnterprise?.role?.isAdmin >= page.role && <li key={index}>
                                    <ParagraphLink href={page.link}>{page.name}</ParagraphLink>
                                </li>
                            ))}
                        </ul>
                    </>}

            </NewTemplate>
        </>
    );
}
