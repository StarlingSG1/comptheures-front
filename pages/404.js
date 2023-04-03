import Head from "next/head"
import { useRouter } from "next/router"
import { Button, Title } from "../components/atoms"
import { BigLogo } from "../components/molecules"
import { NewTemplate } from "../components/organisms"
import { useUserContext } from "../context"

export default function Page404() {

    const { user, theme } = useUserContext();

    const router = useRouter();

    const goToComptheures = () => {
        router.push("/calendar");
      };
      
    return (
        <>
            <Head>
                <title>Page introuvable - Comptheures</title>
                <meta
                    name="description"
                    content="Page introuvable."
                />
            </Head>
            <div className='h-screen w-full flex flex-col justify-center items-center py-10'>
                <div className="w-4/5 md:w-1/2 flex flex-col items-center gap-10">
                    <BigLogo/>
                    <Title className="text-center">Page 404</Title>
                    <Button onClick={() => { user ? goToComptheures() : router.push("/") }}>Retourner en lieu sûr</Button>
                </div>
            </div>
        </>
    )
}