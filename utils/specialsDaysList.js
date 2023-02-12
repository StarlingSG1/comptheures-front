import { BedIcon, HospitalCaseIcon, AlarmIcon, UnknowIcon } from "../components/atoms";

const SPECIAL_DAYS = [
    {
        name: "recup",
        icon: <AlarmIcon />
    },
    {
        name: "maladie",
        icon: <HospitalCaseIcon />
    },
    {
        name: "congé",
        icon: <BedIcon />
    },
    {
        name: "event",
        icon: <UnknowIcon />
    },
    {
        name: "séminaire",
        icon: <UnknowIcon />
    },
    {
        name: "sans solde",
        icon: <UnknowIcon />
    },
    {
        name: "RTT",
        icon: <UnknowIcon />
    },
    {
        name: "remplacement",
        icon: <UnknowIcon />
    },
    {
        name: "urgence",
        icon: <UnknowIcon />
    },
    {
        name: "astreinte",
        icon: <UnknowIcon />
    },
];

export default SPECIAL_DAYS;