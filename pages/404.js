import Head from "next/head"
import { useRouter } from "next/router"
import { Button, Title } from "../components/atoms"
import { BigLogo } from "../components/molecules"
import { NewTemplate } from "../components/organisms"
import { useUserContext } from "../context"

export default function Page404() {

    const { user, theme } = useUserContext();

    const router = useRouter();

    return (
        <>
            <Head>
                <title>Page introuvable - Comptheures</title>
                <meta
                    name="description"
                    content="Page introuvable."
                />
            </Head>
            <NewTemplate>
            <div className='h-full flex flex-col justify-between md:py-0 py-10'>
                <div className="w-full h-full flex flex-col items-center md:justify-between md:gap-0 gap-20">
                    <BigLogo theme={theme} />
                    <Title className="text-center">Page 404</Title>
                    <Button onClick={() => { user ? goToComptheures() : router.push("/") }}>Retourner en lieu sûr</Button>
                </div>
            </div>
            </NewTemplate>
        </>
    )
}