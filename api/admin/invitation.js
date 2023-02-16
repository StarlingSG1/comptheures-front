import axios from "axios";
import getFormatedToken from "../../helpers/getFormattedToken";

export async function createInvitation(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/admin/invitation/`,
        payload,
        getFormatedToken()
    );
    return response.data;
}

export async function verifyInvitation(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/invitation/`,
        payload,
        getFormatedToken()
    );
    return response.data;
}