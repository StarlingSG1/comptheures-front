import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function updateEnterprise(payload) {
    console.log(payload)
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/enterprise/update`,
        payload,
        getFormattedToken()
    );
    return response.data
}