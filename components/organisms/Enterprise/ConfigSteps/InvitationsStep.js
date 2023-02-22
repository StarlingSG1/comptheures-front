import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createInvitation } from "../../../../api/admin/invitation";
import { createRole } from "../../../../api/admin/role";
import { useUserContext } from "../../../../context";
import joinClasses from "../../../../helpers/joinClasses";
import DEFAULT_ROLES from "../../../../utils/defaultRoles";
import { Button, SubTitle, Arrow, Input, CopyIcon, Paragraph, CheckIcon } from "../../../atoms";
import { BackTitle } from "../../../molecules";

export function InvitationsStep({ show = false, showCustomRole, setShowCustomRole = () => { } }) {

    const { enterprise, setEnterprise } = useUserContext();

    const [roles, setRoles] = useState([]);
    const [tokenGenerated, setTokenGenerated] = useState(false);
    const [url, setUrl] = useState("");
    const [customRoles, setCustomRoles] = useState({
        name: "",
        type: "",
    });
    const [copy, setCopy] = useState(false);
    const handleSelectRole = (e) => {
        roles?.forEach((role) => role.selected = false);
        const newRoles = roles?.map((role) => {
            if (role.label === e.target.value) role.selected = true;
            return role;
        });
        setRoles(newRoles);
    }

    const handleAddCustomRole = async () => {
        if (!customRoles.name || customRoles.type < 0) return;
        if (roles?.find((role) => role.label === customRoles.name)) {
            toast.error("Un rôle avec le même nom existe déjà");
            return;
        }
        setCustomRoles({ ...customRoles, name: customRoles.name.charAt(0).toUpperCase() + customRoles.name.slice(1) });

        const response = await createRole({ name: customRoles.name, adminLevel: customRoles.type });
        if (response.error) {
            toast.error(response.message);
            return;
        }
        else {
            toast.success(response.message);
            setShowCustomRole(false);
            const newRoles = response.data.map((role) => {
                const selected = role.label === customRoles?.name ? true : role.label === "Collaborateur" ? true : false;
                return { ...role, selected };
            });
            console.log(newRoles)
            setEnterprise({ ...enterprise, EnterpriseRoleLink: newRoles });
            roles?.forEach((role) => role.selected = false);
        }
    }

    const handlecopyInvitation = () => {
        navigator.clipboard.writeText(url);
        setCopy(true);
        setTimeout(() => setCopy(false), 2000);
    }

    const getRoles = () => {
        if (!enterprise) return;
        // for each in enterprise?.roleEnterprise, add selected: false (and true if name = Collaborateur)
        const newRoles = enterprise?.EnterpriseRoleLink?.map((role) => {
            const selected = role.Role.label === customRoles?.name ? true : role.Role.label === "Collaborateur" ? true : false;
            return { ...role.Role, selected };
        });
        setRoles(newRoles);
        setCustomRoles({
            name: "",
            type: "",
        })
    }

    const generateInvitation = async () => {
        const response = await createInvitation({ name: roles?.find((role) => role.selected)?.label });
        if (response.error) {
            toast.error(response.message);
            return;
        }
        else {
            setTokenGenerated(true);
            // setUrl(`https://comptheures.fr/invite?token=${response.data}`)
            setUrl(`http://localhost:3000/invite?token=${response.data}`)
        }
    }

    useEffect(() => {
        getRoles();
    }, [enterprise])

    return (
        <div className={joinClasses("animate__animated animate__slideInRight", show ? "block" : "hidden")}>
            {/* Show select role or custom role */}
            {!showCustomRole ? (
                <div>
                    <SubTitle className="mb-[30px]">Choisir un rôle pour une invitation</SubTitle>
                    <div className="flex justify-between items-center">
                        <label htmlFor="role" className="flex gap-3 items-center dark:text-white">Rôle :
                            <select className="bg-blue py-1.5 px-4 rounded-md text-white dark:bg-white dark:text-black"
                                onChange={handleSelectRole}
                                value={roles?.find((role) => role.selected)?.label}
                            >
                                {roles?.map((role, index) => (
                                    <option value={role.label} key={index}>{role.label}</option>
                                ))}
                            </select>
                        </label>
                        <button onClick={() => setShowCustomRole(true)} className="underline dark:text-white">
                            Créer un rôle personnalisé
                        </button>
                    </div>
                    {tokenGenerated ? <>
                        <Paragraph className="mt-5 mb-2">Copier l'invitation </Paragraph>
                        <div className="flex items-center justify-between bg-blue dark:bg-white px-4 py-2 rounded-md">
                            <p className="text-white dark:text-black lowercase  truncate">{url}</p>
                            <button className="text-white dark:text-blue"
                                onClick={handlecopyInvitation}
                            >{!copy ? <CopyIcon /> : <CheckIcon />}</button>
                        </div>
                        <div className="w-full flex justify-end  mt-3">
                            <button onClick={() => generateInvitation()} className="underline dark:text-white">
                                Générer un nouveau lien d'invitation
                            </button>
                        </div>
                    </> :
                        <div className="w-full flex justify-end mb-[75px] mt-9">
                        <button onClick={() => generateInvitation()} className="underline  dark:text-white">
                            Générer un lien d'invitation
                        </button>
                    </div>}
                </div>
            ) : (
                <div className="">
                    <BackTitle className="!mb-[30px]" state={true} onClick={() => setShowCustomRole(false)}>Créer un rôle personnalisé</BackTitle>
                    <Input placeholder="Nom du rôle" onChange={(e) => setCustomRoles({ ...customRoles, name: e.target.value })} />
                    <div className="flex gap-6 items-center mt-3 mb-16 dark:text-white">
                        <label className="flex gap-1 item-center" htmlFor="user">
                            <input type="radio" className="mr-2" name="role" id="user"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: 0 })}
                            />
                            Utilisateur
                            <div className="m-auto relative group ml-1">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue top-6 animate__animated animate__fadeIn">
                                    Le rôle utilisateur permet uniquement de gérer ses propres heures.
                                </div>
                            </div>
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="admin">
                            <input type="radio" className="mr-2" name="role" id="admin"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: 1 })}
                            />
                            Administateur
                            <div className="m-auto relative group ml-1">
                                <div className="h-[19px] w-[19px] border flex justify-center items-center border-blue text-blue text-sm rounded-full cursor-pointer dark:bg-white">?</div>
                                <div className="absolute w-[250px] group-hover:block hidden bg-white px-2 py-2 rounded-md shadow-lg text-sm text-blue top-6 animate__animated animate__fadeIn">
                                    Le rôle administateur permet de consulter et gérer les heures de tous les utilisateurs.
                                </div>
                            </div>
                        </label>

                        <label className="flex gap-1 item-center" htmlFor="superAdmin">
                            <input type="radio" className="mr-2" name="role" id="superAdmin"
                                onChange={(e) => setCustomRoles({ ...customRoles, type: 2 })}
                            />
                            SuperAdmin
                            <div className="m-auto relative group ml-1">
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
