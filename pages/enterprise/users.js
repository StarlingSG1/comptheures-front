import Head from "next/head";
import { useEffect, useState } from "react";
import { OrbitronTitle } from "../../components/atoms";
import { BackTitle } from "../../components/molecules";
import { Infos, NewTemplate, Profile, Redirect } from "../../components/organisms";
import { useUserContext } from "../../context";

export default function EnterpriseUsers() {

    const { setBurgerOpen, theme, user } = useUserContext()


    useEffect(() => {
        setBurgerOpen(false);
    }, [])

    const [usersData, setUsersData] = useState([
        {
            firstName: "John",
            lastName: "Doe",
            role: "Alternant",
            date: "12/12/2020",
            comptheuresLink: "comptheuresId"
        },
        {
            firstName: "John",
            lastName: "Doe",
            role: "Administrateur",
            date: "12/12/2020",
            comptheuresLink: "comptheuresId"
        },
        {
            firstName: "John",
            lastName: "Doe",
            role: "Employé",
            date: "12/12/2020",
            comptheuresLink: "comptheuresId"
        },
    ])

    return (
        <>
            <Head>
                <title>Profil - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                {!user ? <Redirect /> :
                    <div>
                        <OrbitronTitle className="text-center !font-normal">{"Maison de la Barbe à Papa"}</OrbitronTitle>
                        <BackTitle>Liste des utilisateurs</BackTitle>
                        <table className="w-full border border-blue border-2">
                            <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                <tr>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Rôle</th>
                                    <th>Date d'arrivée</th>
                                    <th>Comptheures</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.map((user, index) => (
                                    <tr className="even:bg-blue odd:bg-transparent dark:even-blue-dark  even:text-white">
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.date}</td>
                                        <td>{user.comptheuresLink}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </NewTemplate>
        </>

    )
}
