import { Text, View, StyleSheet, Linking, TouchableOpacity } from "react-native"
import PlaceIcon from "./icons/PlaceIcon";

const infos = [
    {
        title: 'İstanbul Merkez Ofis',
        address: 'Bağlar Mah. Osmanpaşa Cad. No:89 34209 Güneşli - Bağcılar / İstanbul',
        phone: '+90 212 550 49 47',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/tJvbhQvZzZ8ztXHQ8'
    },  
    {
        title: 'İstanbul Ofis - Showroom',
        address: 'Yenibosna Merkez Mah. Yalçın Koreş Cad. No:14/1 34197 Bahçelievler / İstanbul',
        phone: '+90 212 665 65 64',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/ZkC5Ga1FaZfEGCiv7',        
    },
    {
        title: 'İstanbul Üretim Tesisi',
        address: 'Bağlar Mah. Osmanpaşa Cad. No:89 34209 Güneşli - Bağcılar / İstanbul',
        phone: '+90 212 550 49 47',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/tJvbhQvZzZ8ztXHQ8',
    },
    {
        title: 'Tekirdağ Ofis - Showroom',
        address: 'Veliköy Sanayi Bölgesi Sanayi Bulvarı 59500 Çerkezköy / Tekirdağ',
        phone: '+90 282 746 11 47',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/5gc6ipo3mdMxAogs5',
    },
    {
        title: 'Tekirdağ Üretim Tesisleri 1',
        address: 'Veliköy Sanayi Bölgesi Sanayi Bulvarı No:29 59500 Çerkezköy / Tekirdağ',
        phone: '+90 282 746 11 44',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/Yfo95MAe8518M3Fy9',
    },
    {
        title: 'Tekirdağ Üretim Tesisleri 2',
        address: 'Veliköy Sanayi Bölgesi Sanayi Bulvarı 59500 Çerkezköy / Tekirdağ',
        phone: '+90 282 746 11 47',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/Yfo95MAe8518M3Fy9',
    },
    {
        title: 'Tekirdağ Dökümhane Tesisi',
        address: 'Veliköy Sanayi Bölgesi Sanayi Bulvarı 59500 Çerkezköy / Tekirdağ',
        phone: '+90 282 746 11 48',
        email: 'info@saray.com',
        link: 'https://maps.app.goo.gl/pFkJE5CDvXhNqQJD9'
    },
];


export default function Contact() {
    return (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#666'}}>İletişim</Text>
            
            {infos.map((info, index) => (
                <View style={styles.container} key={index}>
                    <View style={styles.left}>
                        <Text style={styles.content.title}>{info.title}</Text>
                        <Text style={{color: '#444'}}>
                            {info.address}
                        </Text>
                        <TouchableOpacity onPress={() => Linking.openURL('mailto:' + info.email)}>
                            <Text style={{marginBottom: 0, marginTop: 10}}>{info.email}</Text>
                        </TouchableOpacity>                        
                        <TouchableOpacity onPress={() => Linking.openURL('tel:' + info.phone)}>
                            <Text>{info.phone}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL(info.link)} style={styles.right}>
                        <View style={styles.iconContainer}>
                            <PlaceIcon fill="#333" />
                        </View>
                    </TouchableOpacity>
                </View>
            ))}            

        </View>
    );
}

const styles = StyleSheet.create({    
    container: {
        flexDirection: 'row', 
        borderRadius: 10, 
        padding: 20,  
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginBottom: 30,

    },
    
    left: {
        flex: 2,
    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',            
    },
    content: {
        title: {
            fontSize: 15,
            fontWeight: 'bold',
            marginBottom: 10
        }
    },
    iconContainer: {
        borderWidth: 2,         
        borderColor: '#888',
        borderRadius: '50%', 
        width: 60, 
        height: 60, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
})