import {useAppSelector} from "./redux";
import {RootState} from "../../store";

export const useAuth = () => {
    const authToken = useAppSelector((state: RootState) => state.auth.token)
    const userEmail = useAppSelector((state: RootState) => state.user.email)
    return authToken || userEmail
}