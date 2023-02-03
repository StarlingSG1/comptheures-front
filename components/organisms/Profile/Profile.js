import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { updateUserProfile } from "../../../api/users/user"
import { useUserContext } from "../../../context"
import { Button, OpenInput, OpenInputPassword, OrbitronTitle } from "../../atoms"



export function Profile() {

    const { setBurgerOpen, user, setUser } = useUserContext()

    const [currentUser, setCurrentUser] = useState({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        enterprise: user?.userEnterprise?.enterprise?.name,
        password: {
            old: "",
            new: "",
            confirm: ""
        }
    })

    const validateUpdateUser = async (e) => {
        e.preventDefault()
        if (currentUser.firstName === "" || currentUser.lastName === "" || currentUser.email === "") {
            toast.error("Veuillez remplir tous les champs")
        }
        else if (currentUser.password.new !== currentUser.password.confirm) {
            toast.error("Les mots de passe ne correspondent pas")
        }
        else if (currentUser.password.old === currentUser.password.new && currentUser.password.new === currentUser.password.confirm && currentUser.password.old !== "") {
            toast.error("Le nouveau mot de passe doit être différent de l'ancien")
        }
        else {
            const response = await updateUserProfile(currentUser)
            if (response.error === false) {
                setUser({...user,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                    email: currentUser.email,
                })
                toast.success(response.message)
                const newUser = currentUser
                setCurrentUser({
                    firstName: newUser?.firstName,
                    lastName: newUser?.lastName,
                    email: newUser?.email,
                    password: {
                        old: "",
                        new: "",
                        confirm: ""
                    }
                })
            }
        }
    }


    useEffect(() => {
        setBurgerOpen(false);
        console.log(user)
    }, [user])

    return (
        <form onSubmit={validateUpdateUser} className="">
            <OrbitronTitle className="text-center !font-normal">Profil</OrbitronTitle>
            <div className="flex flex-col mt-10 gap-[30px] wp-full">
                <OpenInput onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })} defaultValue={user?.firstName} placeholder="Prénom" />
                <OpenInput onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })} defaultValue={user?.lastName} placeholder="Nom" />
                <OpenInput editable={false} defaultValue={user?.userEnterprise?.enterprise?.name} placeholder="Entreprise" />
                <OpenInput editable={false} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} defaultValue={user?.email} placeholder="Adresse email" />
                <OpenInputPassword currentUser={currentUser} setCurrentUser={setCurrentUser} />
            </div>
            <Button type="submit" className="mt-60 md:mb-0 mb-60">Enregistrer</Button>
        </form>
    )
}   