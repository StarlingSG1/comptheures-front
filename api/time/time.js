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