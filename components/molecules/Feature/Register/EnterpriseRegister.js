import { BorderedButton, Button, Input, Paragraph, ParagraphLink } from "../../../atoms";

export function EnterpriseRegister({ show = false, onSubmit, credentials, setCredentials, handlePreviousStep }) {
    return (
        <form onSubmit={onSubmit} className={`w-full h-full ${show ? "block" : "hidden"}`}>
            <div className="flex flex-col gap-[15px] md:mt-10">
                <Input defaultValue={credentials?.enterprise?.name} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, name: e.target.value } })} placeholder={"Nom de l'entreprise"} />
                <Input defaultValue={credentials?.enterprise?.address} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, address: e.target.value } })} placeholder={"Adresse postal"} />
                <Input defaultValue={credentials?.enterprise?.postalCode} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, postalCode: e.target.value } })} placeholder={"Code postal"} />
                <Input defaultValue={credentials?.enterprise?.city} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, city: e.target.value } })} placeholder={"Ville"} />
                <Input defaultValue={credentials?.enterprise?.email} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, email: e.target.value } })} type="email" placeholder={"Adresse email"} />
                <Input defaultValue={credentials?.enterprise?.phone} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, phone: e.target.value } })} placeholder={"Téléphone"} />
                <Input defaultValue={credentials?.enterprise?.website} onChange={(e) => setCredentials({ ...credentials, enterprise: { ...credentials.enterprise, website: e.target.value } })} placeholder={"Site web"} />
            </div>
            <Paragraph className="mt-[15px] mb-[60px] md:mb-10">En m’inscrivant, je consens à la <ParagraphLink href="mentions-legales">politique de confidentialité</ParagraphLink>. Vos informations ne seront pas partagés à un tiers.</Paragraph>
            <div className="flex items-center gap-5">
                <BorderedButton onClick={handlePreviousStep} className="!w-max min-w-fit px-5 dark:bg-transparent">étape précédente</BorderedButton>
                <Button type="submit">S'inscrire</Button>
            </div>
        </form>
    )
}