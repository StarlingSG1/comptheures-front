import joinClasses from "../../../helpers/joinClasses";
import { DarkLogo, Logo, OrbitronSubTitle, Paragraph, SubTitle } from "../../atoms";

export function BigLogo({ className, theme}) {

    return (
        <div className={joinClasses(className,'duration-200 w-full flex flex-col items-center gap-5')}>
            {theme ? <DarkLogo height={133} width={133} /> : <Logo height={133} width={133}/>}
            <div className='flex flex-col items-center'>
                <SubTitle className={"font-orbitron"}>Mon Compt'heures</SubTitle>
                <Paragraph>Parce que chaque heure compte</Paragraph>
            </div>
        </div>
    );
}