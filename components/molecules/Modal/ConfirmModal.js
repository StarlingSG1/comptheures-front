import { useEffect, useState } from "react";
import { Button, Cross, Paragraph, SubTitle } from "../../atoms";

export function ConfirmModal({ modal, user, type, crossClick, onClick, checkbox = false, checkboxClick, checkboxState}) {

    const [texts, setTexts] = useState({
        title: "",
        text: "",
        button: ""
    })

    useEffect(() => {
        switch (type) {
            case "deleteUser":
                setTexts({
                    title: "Suppression d'utilisateur(s)",
                    text: "Les utilisateurs selectionnés seront supprimés définitivement de l'entreprise et toutes leurs données avec. Êtes-vous sûr ?",
                    button: "Oui, supprimer"
                })
                break;
            case "time":
                setTexts({
                    title: "Valider un horaire",
                    text: "Vos horaires pour ce jour seront envoyés à un administrateur de l’entreprise pour validation.",
                    button: "Oui, valider"
                })
                break;
            }
    }, [type])




    return (
        modal && user?.userEnterprise?.role?.isAdmin === 2 &&
        <div className="fixed w-full h-full top-0 left-0 bottom-O right-0 bg-black/[0.3] flex justify-center items-center rounded-2xl z-20">
            <div className="sm:min-h-[240px] sm:w-[70%] w-[90%] sm:max-w-[600px] bg-white relative dark:bg-blue rounded-xl flex flex-col sm:justify-between sm:gap-0 gap-5 p-5">
                <Cross width="32" height="32" className="absolute top-3 sm:left-3 right-3 " onClick={crossClick} />
                <SubTitle className="sm:text-center sm:px-5 sm:mt-0 mt-4 ">{texts.title}</SubTitle>
                <Paragraph className="sm:text-center">{texts.text}</Paragraph>
                <div className="flex flex-col gap-2.5">
                    {checkbox &&
                     <div className="flex gap-2.5 cursor-pointer" onClick={checkboxClick}>
                        <input type="checkbox" checked={checkboxState} />
                        <Paragraph>Ne plus me demander</Paragraph>
                     </div>
                    }
                    <Button onClick={onClick}>{texts.button}</Button>
                </div>
            </div>
        </div>
    )
}