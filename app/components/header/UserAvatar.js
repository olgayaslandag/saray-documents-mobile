import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import MenuButton from "../icons/MenuButton";
import { useNavigation } from "@react-navigation/native";
import useAppTranslation from "../../libs/useAppTranslation";

export default function UserAvatar() {
    const [message, setMessage] = useState("");
    const auth = useSelector(state => state.auth.value);
    const navigation = useNavigation();
    const { t, lang } = useAppTranslation();


    useEffect(() => {
        const currentHour = new Date().getHours();

        let greeting;
        if (currentHour >= 5 && currentHour < 12) {
            greeting = t("header.good_morning");
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = t("header.good_afternoon");
        } else {
            greeting = t("header.good_evening");
        }
        setMessage(greeting);
    }, [lang]);
    

    return (
        <>
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginBottom: 15}}>
                <MenuButton />
            </TouchableOpacity>              
            <Text style={{fontSize: 20, marginBottom: 4}}>{message},</Text>
            <Text style={{fontSize: 20, fontWeight: 600}}>{auth?.name ?? 'Saray Alüminyum'}</Text>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
      borderWidth: 2,
      borderColor: '#F1F1F1', 
      overflow: 'hidden',
      marginBottom: 15,
      marginTop: -15,
      width: 70,
      height: 70,
      borderRadius: 70
    },
});