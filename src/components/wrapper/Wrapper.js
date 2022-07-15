import { isLogged } from "../../utils/auth";
export const Wrapper = (props) => {
    return isLogged() ? props.component : props.navigate
}