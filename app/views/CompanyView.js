import { Text, Box, ScrollView, Image } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device"

const backgroundImage = 'https://saray.com/wp-content/uploads/2024/04/fabrika-1-1.jpg';

export default function CompanyView() {
    return (
        <ImageBackground source={{uri: backgroundImage}} style={styles.background} resizeMode="cover">                        
            <StaticHeader />
            <ScrollView>                
                <Box style={styles.contentBox} p="5">
                    <Text style={styles.pageTitle}>1980 yılından bu yana Saray Alüminyum,</Text>
                    <Text fontSize="16">1980 yılından bu yana Saray Alüminyum, öncü ve yenilikçi iç ve dış mekan çözümleri ile geleceğin mimari yapılarını inşa etmede büyük bir rol oynamaktadır. Saray Alüminyum, sektörlerin ihtiyaç duyduğu endüstriyel ve standart kesitli profiller üreten kapı, pencere, cephe ve küpeşte sistemleri, alüminyum kompozit panel, PVC kapı ve pencere sistemleri, panjur sistemlerinin yanı sıra makine, aydınlatma, asansör vb. sektörlerine de üretim yapmaktadır.</Text>
                    <Image source={{uri: 'https://saray.com/wp-content/uploads/2024/04/fabrika-2.jpg'}} alt="" width="480" height="320" style={{marginTop: 20}} />

                    <Text fontSize="16">Türkiye’nin en büyük 500 şirketi arasında yer alan Saray Alüminyum, dünya genelinde 60’tan fazla ülkeye ihracat yapmakta olup yüksek ihracat rakamları ile her yıl İhracatın Metalik Yıldızları ödülünü almaktadır.</Text>

                    <Text fontSize="16">CE, ISO 9001, Qualanod, Qualicolat, TS EN 755, TS EN 12020,IATF 16949, SEPRO ve GOST-R kalite sertifikalarına sahip olan Saray Alüminyum, İstanbul Güneşli ve Tekirdağ Çerkezköy’deki 175.000 metrekarelik kapalı alanda üretim yapmaktadır. Saray Alüminyum, alüminyum eloksal, alüminyum elektrostatik toz boya, alüminyum ekstrüzyon, alüminyum biyet döküm, alüminyum kompozit panel, alüminyum panjur ve PVC ekstrüzyon üretim tesisleri ile tam entegre bir şirkettir.</Text>

                    <Text fontSize="16" style={{paddingBottom: 120}}>Saray Alüminyum’un proje ve AR-GE birimleri sayesinde, çok katlı ve nitelikli binalar için özel çözümler sunarak, cephe tasarımından uygulamaya kadar her aşamada teknik destek sağlayarak mimari ofislere ve bina yatırımcılarına katkıda bulunur. Saray Alüminyum, yüksek performanslı yenilikçi ürünleri ile geleceğin mimari yapılarını inşa etme ve yaşam kalitesini yükseltme konularında önemli bir rol oynamaktadır.</Text>                    
                </Box>
            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        width: '100%', 
        height: '45%', 
        flex: 1,
        paddingTop: Device.osName === "iOS" ? 30 : 0
    },
    contentBox: {
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        marginTop: '70%',
    },
    pageTitle: {
        fontSize: 26, 
        paddingTop: 5, 
        marginBottom: 10, 
        lineHeight: 30, 
        fontWeight: 600
    }
})