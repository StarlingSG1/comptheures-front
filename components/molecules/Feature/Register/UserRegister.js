import { Button, Input, Paragraph, ParagraphLink } from "../../../atoms";

export function UserRegister({ show = false, onSubmit, credentials, setCredentials }) {
    return (
        <form onSubmit={onSubmit} className={`w-full h-full ${show ? "block" : "hidden"}`}>
            <div className="flex flex-col gap-[15px] md:mt-10">
                <Input defaultValue={credentials?.user?.firstName} onChange={(e) => setCredentials(
                    {
                        ...credentials,
                        user: {
                            ...credentials.user,
                            firstName: e.target.value
                        }
                    }
                )} placeholder={"Prénom"} />
                <Input defaultValue={credentials?.user?.lastName} onChange={(e) => setCredentials({ ...credentials, user : {...credentials.user, lastName: e.target.value} })} placeholder={"Nom"} />
                <Input defaultValue={credentials?.user?.email} onChange={(e) => setCredentials({ ...credentials, user : {...credentials.user, email: e.target.value} })} type="email" placeholder={"Adresse email"} />
                <Input defaultValue={credentials?.user?.password} onChange={(e) => setCredentials({ ...credentials, user : {...credentials.user, password: e.target.value} })} type="password" placeholder={"Mot de passe"} />
                <Input defaultValue={credentials?.user?.confirmPassword} onChange={(e) => setCredentials({ ...credentials, user : {...credentials.user, confirmPassword: e.target.value} })} type="password" placeholder={"Confirmer mot de passe"} />
            </div>
            <Paragraph className="mt-[15px] mb-[60px] md:mb-10">En m’inscrivant, je consens à la <ParagraphLink href="mentions-legales">politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
            <Button type="submit">Étape suivante</Button>
            <div className="flex items-center justify-center gap-1.5 mb-[100px] md:mb-0 mt-[15px]">
                <Paragraph>Déjà un compte ?</Paragraph>
                <ParagraphLink href="/login">Se connecter</ParagraphLink>
            </div>
        </form>
    )
}