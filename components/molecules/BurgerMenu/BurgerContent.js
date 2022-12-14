import { useUserContext } from "../../../context";
import joinClasses from "../../../helpers/joinClasses";
import { BurgerSeparator } from "../../atoms";
import { BurgerItem } from "./BurgerItem";

export function BurgerContent({className = ""}){

    const { user, logoutTheUser } = useUserContext();

    return (
        <div className={joinClasses(className,`my-5`)}>
            {!user ? <><BurgerItem> Accueil</BurgerItem>
                <BurgerSeparator />
                <BurgerItem href="/login" icon="login">Connexion</BurgerItem>
                <BurgerSeparator />
                <BurgerItem href="/register" icon="register">Inscription</BurgerItem></> :
                <><BurgerItem>Accueil</BurgerItem>
                    <BurgerSeparator />
                    <BurgerItem href="/comptheures" icon="comptheures">Comptheures</BurgerItem>
                    <BurgerSeparator />
                    <BurgerItem href="/profile" icon="profile">Profile</BurgerItem>
                    <BurgerSeparator />
                    <BurgerItem href="/logout" icon="logout">Se deconnecter</BurgerItem></>
            }
        </div>
    )
}