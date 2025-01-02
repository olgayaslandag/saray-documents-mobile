import { useEffect, useState } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { useSelector } from "react-redux";

export default function UserAvatar() {
    const [message, setMessage] = useState("");
    const auth = useSelector(state => state.auth.value);
    useEffect(() => {
        const currentHour = new Date().getHours();

        let greeting;
        if (currentHour >= 5 && currentHour < 12) {
            greeting = "Günaydın";
        } else if (currentHour >= 12 && currentHour < 18) {
            greeting = "Merhaba";
        } else {
            greeting = "İyi Akşamlar";
        }
        setMessage(greeting);
    }, []);
    

    return (
        <>
            <Image source={require('../../../assets/user-icon.jpg')} alt="" size={70} style={styles.image} borderRadius={100} />
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