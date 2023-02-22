import Head from "next/head";
import { use, useEffect, useState } from "react";
import { Button, Cross, OrbitronTitle, Paragraph, SubTitle } from "../../components/atoms";
import { BackTitle, ConfirmModal } from "../../components/molecules";
import { AdminRedirect, Infos, NewTemplate, Profile, Redirect } from "../../components/organisms";
import { useUserContext } from "../../context";
import { usersList } from "../../api/enterprise/users";
import { toast } from "react-toastify";
import { deleteUsersFromEnterprise } from "../../api/enterprise/enterprise";

export default function EnterpriseUsers() {

    const { setBurgerOpen, theme, user, enterprise } = useUserContext()

    const [usersData, setUsersData] = useState([])
    const [allChecked, setAllChecked] = useState(false)
    const [modal, setModal] = useState(false)

    const users = async () => {
        const response = await usersList(enterprise?.id)
        if (response.error === false) {
            response.data.forEach((item, index) => {
                item.checked = false
            })
            setUsersData(response.data)
        } else {
            toast.error(response.message)
        }
    }

    const checkAllUsers = () => {
        let list = usersData
        const isChecked = allChecked
        if (isChecked === false) {
            list.forEach((item, index) => {
                item.checked = true
            })
            setUsersData(list)
            setAllChecked(true)
        } else {
            list?.forEach((item, index) => {
                item.checked = false
            })
            setUsersData(list)
            setAllChecked(false)
        }
    }

    const checkOneUser = (item, index) => {
        const items = { ...usersData, [index]: { ...usersData[index], checked: !item.checked } }
        let array = []
        Object.keys(items).forEach((key) => {
            array.push(items[key])
        })
        setUsersData(array)
    }

    const verifyAllIsChecked = () => {
        let total = 0
        usersData?.forEach((item, index) => {
            if (item.checked === true) {
                total += 1
            }
        }
        )
        if (total === usersData?.length) {
            setAllChecked(true)
        }
        if (total !== usersData?.length) {
            setAllChecked(false)
        }
    }

    const deleteSelectedUsers = async () => {
        let list = usersData
        let selectedUsers = []
        list.forEach((item, index) => {
            if (item.checked === true && (item.userId !== user.id && item.userId !== enterprise.createdById)) {
                selectedUsers.push(item.id)
            }
        })



        const response = await deleteUsersFromEnterprise({ usersIds: selectedUsers, enterpriseId: enterprise.id })
        if (response.error === false) {
            toast.success(response.message)
            setModal(false)
            users()
        } else {
            toast.error(response.message)
        }
    }


    useEffect(() => {
        setBurgerOpen(false);
    }, [])

    useEffect(() => {
        enterprise?.id !== "" && users()
    }, [enterprise])

    useEffect(() => {
        verifyAllIsChecked()
    }, [checkOneUser])


    return (
        <>
            <Head>
                <title>Liste des utilisateurs - Comptheures</title>
                <meta
                    name="description"
                    content="Avoir un récapitulatif de ses heures de travail grâce à un calendrier comptheures en ligne."
                />
            </Head>
            <NewTemplate>
                <ConfirmModal modal={modal} type="deleteUser" user={user} crossClick={() => {setModal(false)}} onClick={deleteSelectedUsers}/>
                {!user ? <Redirect /> :
                    user?.userEnterprise?.role?.isAdmin >= 1 ?
                        <div>
                            <OrbitronTitle className="text-center !font-normal">{enterprise?.name}</OrbitronTitle>
                            <BackTitle>Liste des utilisateurs</BackTitle>

                            {user?.userEnterprise?.role?.isAdmin === 2 && <div className="flex items-center gap-5 mb-5 flex-wrap">
                                <Paragraph>Actions sur les éléments sélectionnés :</Paragraph>
                                <div className="flex items-center gap-5 ">
                                    <button className="py-1 rounded-full dark:text-white font-noto capitalize font-bold outline dark:outline-white outline-blue bg-transparent px-4 text-blue" onClick={() => setModal(true)}>Supprimer</button>
                                </div>
                            </div>}
                            <table className="w-full border border-blue dark:border-white border-2">
                                <thead className="w-full text-left bg-blue dark:bg-blue-dark text-white">
                                    <tr className="h-10">
                                        <th className="pl-2.5 text-sm sm:text-base">Nom</th>
                                        <th className="pl-2.5 text-sm sm:text-base  hidden md:table-cell">Prénom</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Email</th>
                                        <th className="pl-2.5 text-sm sm:text-base">Rôle</th>
                                        <th className="pl-2.5 hidden md:table-cell">Date d'arrivée</th>
                                        {user?.userEnterprise?.role?.isAdmin === 2 && <th className="pl-2.5 pr-2.5 text-center flex items-center justify-center h-10"><input type="checkbox" defaultChecked={allChecked} checked={allChecked} onChange={checkAllUsers} className="w-4 h-4 dark:bg-white accent-blue-selected bg-blue" /></th>}
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersData.map((item, index) => (
                                        <tr className="dark:even:bg-blue-dark even:bg-blue odd:bg-transparent even:text-white dark:odd:text-white h-10 ">
                                            <td className="pl-2.5 text-sm sm:text-base">{item?.user?.lastName}</td>
                                            <td className="pl-2.5 text-sm sm:text-base  hidden md:table-cell">{item?.user?.firstName}</td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item?.user?.email}</td>
                                            <td className="pl-2.5 text-sm sm:text-base">{item?.role?.label}</td>
                                            <td className="pl-2.5 hidden md:table-cell">{item?.createdAt.split("T")[0].split("-").reverse().join("/")}</td>
                                            {user?.userEnterprise?.role?.isAdmin === 2 && <td className="pl-2.5 pr-2.5 flex items-center h-10 justify-center">{ (user.id !== item.userId  && item.userId !== enterprise.createdById) && <input type="checkbox" defaultChecked={allChecked} checked={item?.checked} value={item?.checked} onChange={() => { checkOneUser(item, index) }} className="w-4 h-4 dark:bg-white accent-blue-selected bg-blue" />}</td>}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        : <AdminRedirect />
                }
            </NewTemplate>
        </>

    )
}
