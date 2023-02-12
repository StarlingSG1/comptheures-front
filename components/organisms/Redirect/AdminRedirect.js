import { useRouter } from "next/router";
import { useUserContext } from "../../../context";
import { Button, OrbitronTitle, Title } from "../../atoms";
import { BigLogo, SmallStraightLogo } from "../../molecules";

export function AdminRedirect({setAccess = () => {}}) {

    const router = useRouter()

    return (
        
            <div className='h-full flex flex-col justify-between md:py-0 py-10'>
                <div className="w-full h-full flex flex-col items-center gap-20 md:justify-between md:gap-0 gap-20">
                    <BigLogo />
                    <Title className="text-center">Vous n'avez pas accès à cette page</Title>
                    <Button onClick={() => { router.push("/")}}>Retourner en lieu sûr</Button>
                </div>
            </div>
    )
}