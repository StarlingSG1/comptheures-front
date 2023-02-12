import { useState } from "react";
import joinClasses from "../../../../helpers/joinClasses";
import DEFAULT_ROLES from "../../../../utils/defaultRoles";
import { Button, SubTitle, Arrow, Input, CopyIcon, Paragraph, CheckIcon } from "../../../atoms";

export function InvitationsStep({ show = false }) {
    const [roles, setRoles] = useState(DEFAULT_ROLES);
    const [customRoles, setCustomRoles] = useState({
        name: "",
        type: "",
    });
    const [copy, setCopy] = useState(false);
    const [showCustomRole, setShowCustomRole] = useState(false);
    const handleSelectRole = (e) => {
        roles.forEach((role) => role.selected = false);
        const newRoles = roles.map((role) => {
            if (role.name === e.target.value) role.selected = true;
            return role;
        });
        setRoles(newRoles);
    }

    const handleAddCustomRole = () => {
        if (!customRoles.name || !customRoles.type) return;
        if (roles.find((role) => role.name === customRoles.name)) {
            alert("Un rôle avec le même nom existe déjà");
            return;
        }


        roles.forEach((role) => role.selected = false);
        setRoles([...roles, { ...customRoles, selected: true }]);
        setShowCustomRole(false);
    }

    const handlecopyInvitation = () => {
        navigator.clipboard.writeText("https://comptheures.fr/invite/admin?token=123456789");
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    }
    return (
        <div className={joinClasses("animate__animated animate__slideInRight", show ? "block" : "hidden")}>
            {/* Show select role or custom role */}
            {!showCustomRole ? (
                <div>
                    <SubTitle>Choisir un rôle pour une invitation</SubTitle>
                    <div className="flex justify-between items-center">
                        <select className="bg-blue py-1.5 px-4 rounded-md text-white dark:bg-white dark:text-black"
                            onChange={handleSelectRole}
                            value={roles.find((role) => role.selected).name}
                        >
                            {roles.map((role, index) => (
                                <option value={role.name} key={index}>{role.name}</option>
                            ))}
                        </select>
                        <button onClick={() => setShowCustomRole(true)} className="underline dark:text-white">
                            Créer un rôle personnalisé
                        </button>
                    </div>
                    <Paragraph className="mt-5 mb-2">Copier l'invitation </Paragraph>
                    <div className="flex items-center justify-between bg-white px-4 py-2 rounded-md">
                        <p>https://comptheures.fr/invite/admin?token=123456789</p>
                        <button className="text-blue"
                            onClick={handlecopyInvitation}
                        >{!copy ? <CopyIcon /> : <CheckIcon />}</button>
                    </div>
                </div>
            ) : (

                <div className="border-b border-black pb-10">
                    <button className="flex items-center gap-3 dark:text-white" onClick={() => setShowCustomRole(false)}><Arrow className="tranform rotate-180 scale-75" /> retour</button>
                    <SubTitle className="mb-3">Créer un rôle personnalisé</SubTitle>
                    <Input placeholder="Nom du rôle" onChange={(e) => setCustomRoles({ ...customRoles, name: e.target.value })} />
                    <div className="flex gap-5 items-center mt-3 mb-11 dark:text-white">
                        <label className="flex gap-1 item-center" htmlFor="user">
                            <input type="radio" name="role" id="user"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: e.target.value })}
                            />
                            Utilisateur
                            <div className="m-auto relative group">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue top-6 animate__animated animate__fadeIn">
                                    Le rôle utilisateur permet uniquement de gérer ses propres heures.
                                </div>
                            </div>
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="admin">
                            <input type="radio" name="role" id="admin"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: e.target.value })}
                            />
                            Administateur
                            <div className="m-auto relative group">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue top-6 animate__animated animate__fadeIn">
                                    Le rôle Admin permet de consulter et gérer les heures de tous les utilisateurs.
                                </div>
                            </div>
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="superAdmin">
                            <input type="radio" name="role" id="superAdmin"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: e.target.value })}
                            />
                            SuperAdmin
                            <div className="m-auto relative group">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue right-0 top-6 animate__animated animate__fadeIn">
                                    Le rôle SuperAdmin permet de consulter et gérer les heures de tous les utilisateurs et de gérer les informations de l'entreprise.
                                </div>
                            </div>
                        </label>
                    </div>
                    <Button onClick={handleAddCustomRole}>créer rôle</Button>
                </div>
            )
            }
        </div >
    );
}
