import { Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { clearAuth } from "../store/authSlice";

export default function ProfileView() {
    const dispatch = useDispatch();

    function HandleLogout() {
        dispatch(clearAuth())
    }

    return (
        <TouchableOpacity onPress={HandleLogout}>
            <Text>Çıkış</Text>
        </TouchableOpacity>
    );
}