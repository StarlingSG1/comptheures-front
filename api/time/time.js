import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function createTime(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/time/create`,
        payload,
        getFormattedToken()
    );
    return response.data
}


// get all stats
export async function statsList() {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/stats/`,
        getFormattedToken()
    );
    return response.data
}

export async function recapList(payload) {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/stats/recap`,
        payload,
        getFormattedToken()
    );
    return response.data
}

export async function deleteStat(payload){
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/stats/delete`,
        payload,
        getFormattedToken()
    );
    return response.data
}

export async function validateStatStatus(payload){
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/time/status/update`,
        payload,
        getFormattedToken()
    );
    return response.data
}