import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function updateEnterprise(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/enterprise/update`,
        payload,
        getFormattedToken()
    );
    return response.data
}


// get specialDays
export async function getSpecialDays() {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/enterprise/specialDays`,
        getFormattedToken()
    );
    return response.data
}

export async function deleteUsersFromEnterprise(payload){
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/enterprise/users/delete`,
        payload,
        getFormattedToken()
    );
    return response.data
}