
import { useSelector } from "react-redux";

export function authorize(){
    try {
        const username = useSelector(state => state.username);
        const userToken = useSelector(state => state.userToken);

        //!! checks for undefined, null, and empty values
        const isLoggedIn = !!username;

        return ({isLoggedIn, username, userToken});
    }
    catch (err) {
        console.log("Error in authorization", err);
        return false;
    }
};