import { View } from "react-native";
import LayoutAuth from "./LayoutAuth";
import BottomButton from "../../components/auth/BottomButton";
import styleAuth from "../../styles/styleAuth";


export default function LayoutForget({ children }) {
    return (
        <LayoutAuth>
            <View style={styleAuth.form.container}>
                {children}
            </View>

            <View style={{flex: 1, paddingBottom: 20}}>
                <BottomButton />
            </View>
        </LayoutAuth>
    );
}