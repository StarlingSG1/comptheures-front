import { useRouter } from "next/router"
import { use, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { getProfileClock } from "../../../api/clock/clock"
import { updateUserProfile } from "../../../api/users/user"
import { useUserContext } from "../../../context"
import { useCalendarContext } from "../../../context/calendar"
import { Arrow, Button, Card, OpenInput, OpenInputPassword, OrbitronTitle, Paragraph, PencilIcon, Plus, ProfileIcon, RealArrow, ReverseParagraph, SubTitle, Title } from "../../atoms"
import { BackTitle, SmallStraightLogo, StraightLogo, TimeBlock, TimeInput } from "../../molecules"
import { Calendar } from "../Calendar/Calendar"

export function Infos({ }) {

    const { setBurgerOpen, user, setUser } = useUserContext()

    const [edit, setEdit] = useState(true)
    const [enterprise, setEnterprise] = useState({})

    const [enterpriseInfo, setEnterpriseInfo] = useState({})

    const router = useRouter()

    const validateUpdateUser = async (e) => {
        e.preventDefault()
    }

    useEffect(() => {
        setBurgerOpen(false);
        setEnterprise(user?.userEnterprise?.enterprise)
    }, [user])

    useEffect(() => {
        console.log(enterprise)
        setEnterpriseInfo(
            {
                name: enterprise?.name,
                adminName: enterprise?.firstName,
                adress: enterprise?.lastName,
                email: enterprise?.email,
                phone: enterprise?.phone,
                website: enterprise?.website,
            }
        )
    }, [enterprise])

    return (
        <form onSubmit={validateUpdateUser} className="">
            <OrbitronTitle className="text-center !font-normal">{enterprise?.name}</OrbitronTitle>
            <BackTitle>Informations de l'entreprise</BackTitle>
            <div className="flex flex-col mt-10 gap-[30px] wp-full">
                <OpenInput onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, adminName: e.target.value })} defaultValue={enterprise?.adminName} placeholder="Administrateur (createdBy userEnterpriseId)" />
                <OpenInput onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, adress: e.target.value })} defaultValue={enterprise?.adress} placeholder="Adresse" />
                <OpenInput onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, email: e.target.value })} defaultValue={enterprise?.email} placeholder="Adresse email" />
                <OpenInput onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, phone: e.target.value })} defaultValue={enterprise?.phone} placeholder="Téléphone" />
                <OpenInput onChange={(e) => setEnterpriseInfo({ ...enterpriseInfo, website: e.target.value })} defaultValue={enterprise?.website} placeholder="Site web" />
            </div>
            <Button type="submit" className="mt-60 md:mb-0 mb-60">Enregistrer</Button>
        </form>
    )
}   