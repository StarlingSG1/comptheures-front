import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { usersList } from "../../../api/enterprise/users";
import { OrbitronTitle, RealArrow, SubTitle } from "../../../components/atoms";
import { BackTitle } from "../../../components/molecules";
import { Infos, NewTemplate, Redirect } from "../../../components/organisms";
import { useUserContext } from "../../../context";

export default function enterpriseValidation() {

    const { setBurgerOpen, theme, user } = useUserContext()

    const users = async () => {
        const response = await usersList("09a7b31f-2445-47b1-bda3-54674772b3ec")
        if (response.error === false) {
            const list = response.data
            list.forEach((item, index) => {
                let total = 0
                item.Stats.forEach((item, index) => {
                    if (item.realisationStatus === "IN_VALIDATION") {
                        total += 1
                    }
                })
                item.total = total
            })
            console.log(list)
            setUsersData(list)
        } else {
            toast.error(response.message)
        }
    }

    useEffect(() => {
        setBurgerOpen(false);
        users()
    }, [])

    const router = useRouter()

    const [usersData, setUsersData] = useState([])
    const [details, setDetails] = useState(false)
    const [selectedUser, setSelectedUser] = useState({})

    const handleDetails = (item) => {
        console.log(item)
        setDetails(true)
        setSelectedUser(item)
    }

    return (
        <>
            <Head>
                <title>Horaires à valider - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                {!user ? <Redirect /> :
                    !details ?
                        <div>
                            <OrbitronTitle className="text-center !font-normal">{"Maison de la Barbe à Papa"}</OrbitronTitle>
                            <BackTitle>Horaires à valider</BackTitle>
                            <table className="w-full border border-blue dark:border-white border-2">
                                <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                    <tr className="h-10">
                                        <th className="pl-2.5">Nom</th>
                                        <th className="pl-2.5">Prénom</th>
                                        <th className="pl-2.5">Rôle</th>
                                        <th className="pl-2.5">Horaires à valider</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData?.map((item, index) => (
                                        item.total > 0 &&
                                        <tr key={index} onClick={() => handleDetails(item)} className="cursor-pointer dark:hover:bg-blue-selected hover:bg-blue-selected hover:text-white dark:hover:text-white dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                            <td className="pl-2.5">{item.user.lastName}</td>
                                            <td className="pl-2.5">{item.user.firstName}</td>
                                            <td className="pl-2.5">{item.role.label}</td>
                                            <td className="pl-2.5">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        :
                        <div>
                            <OrbitronTitle className="text-center !font-normal">{"Maison de la Barbe à Papa"}</OrbitronTitle>
                            <div className="flex items-center justify-between mt-[25px] mb-[50px]">
                                <RealArrow onClick={() => setDetails(false)} width={40} height={40} className="cursor-pointer rotate-180" />
                                <SubTitle className="text-center ">{selectedUser?.user?.firstName}{" "}{selectedUser?.user?.lastName}</SubTitle>
                                <RealArrow width={40} height={40} className="invisible" />
                            </div>
                            <table className="w-full border border-blue dark:border-white border-2">
                                <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                    <tr className="h-10">
                                        <th className="pl-2.5">Date</th>
                                        <th className="pl-2.5">Nombre d'heures</th>
                                        <th className="pl-2.5">Type de journée</th>
                                        <th className="pl-2.5">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedUser?.Stats?.map((item, index) => (
                                        <tr key={index} className="dark:hover:text-white dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                            {item.realisationStatus === "IN_VALIDATION" &&
                                                <>
                                                    <td className="pl-2.5">{item.day}</td>
                                                    <td className="pl-2.5">{item.work}</td>
                                                    <td className="pl-2.5">{item?.CustomTime?.length > 0 ? "Personnalisé" : "Special"}</td>
                                                    <td className="pl-2.5">{item.week}</td>
                                                </>}
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