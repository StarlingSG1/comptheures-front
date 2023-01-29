import axios from "axios";
import getFormattedToken from "../../helpers/getFormattedToken";

export async function usersList(id) {
    const response = await axios.get(
        `${process.env.NEXT_PUBLIC_LOCAL_BACK_URL}/users/enterprise/${id}`,
        getFormattedToken()
    );
    return response.data
}