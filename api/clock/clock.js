import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function getClocks() {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/clock`,
        getFormattedToken()
    );
    return response.data
}

export async function addClocks(data) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/clock`,
        data,
        getFormattedToken()
    );
    return response.data
}

export async function getProfileClock(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/clock/profile`,
        payload,
        getFormattedToken()
    );
    return response.data
}