import Head from "next/head";
import { MobileTemplate, NewTemplate, Template } from "../components/organisms";

export default function MentionsLegales() {
    return (
        <>
            <Head>
                <title>Mentions légales - Comptheures</title>
                <meta
                    name="description"
                    content="Mentions légales de l'application Comptheures."
                />
            </Head>
            <NewTemplate></NewTemplate>
        </>
    )
}