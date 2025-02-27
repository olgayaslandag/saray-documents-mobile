import { ImageBackground, StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native"
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device"
import Contact from "../components/Contact";

const backgroundImage = 'https://saray.com/wp-content/uploads/2024/04/fabrika-1-1.jpg';

const { height } = Dimensions.get('window');

export default function CompanyView() {
    return (
        <ImageBackground 
            source={{uri: backgroundImage}} 
            style={styles.background} 
            imageStyle={{position: 'absolute', top: -100}}
            resizeMode="cover">                        
            <StaticHeader /> 
            <ScrollView bounces={false} alwaysBounceVertical={false}>                
                <View style={styles.contentBox}>
                    <Text style={{...styles.pageTitle, marginBottom: 0}}>1980 yılından bu yana </Text>
                    <Text style={{...styles.pageTitle, color: '#EA0029'}}>Saray Alüminyum,</Text>
                    <Text style={styles.text.content}>1980 yılından bu yana Saray Alüminyum, öncü ve yenilikçi iç ve dış mekan çözümleri ile geleceğin mimari yapılarını inşa etmede büyük bir rol oynamaktadır. Saray Alüminyum, sektörlerin ihtiyaç duyduğu endüstriyel ve standart kesitli profiller üreten kapı, pencere, cephe ve küpeşte sistemleri, alüminyum kompozit panel, PVC kapı ve pencere sistemleri, panjur sistemlerinin yanı sıra makine, aydınlatma, asansör vb. sektörlerine de üretim yapmaktadır.</Text>
                    <Image source={{uri: 'https://saray.com/wp-content/uploads/2024/04/fabrika-2.jpg'}} alt="" style={{marginTop: 10, width: 480, height: 320, maxWidth: '100%', marginBottom: 15, borderRadius: 10}} />

                    <Text style={styles.text.content}>Türkiye’nin en büyük 500 şirketi arasında yer alan Saray Alüminyum, dünya genelinde 60’tan fazla ülkeye ihracat yapmakta olup yüksek ihracat rakamları ile her yıl İhracatın Metalik Yıldızları ödülünü almaktadır.</Text>

                    <Text style={styles.text.content}>CE, ISO 9001, Qualanod, Qualicolat, TS EN 755, TS EN 12020,IATF 16949 ve SEPRO kalite sertifikalarına sahip olan Saray Alüminyum, İstanbul Güneşli ve Tekirdağ Çerkezköy’deki 175.000 metrekarelik kapalı alanda üretim yapmaktadır. Saray Alüminyum, alüminyum eloksal, alüminyum elektrostatik toz boya, alüminyum ekstrüzyon, alüminyum biyet döküm, alüminyum kompozit panel, alüminyum panjur ve PVC ekstrüzyon üretim tesisleri ile tam entegre bir şirkettir.</Text>

                    <Text style={{...styles.text.content, paddingBottom: 30}}>Saray Alüminyum’un proje ve AR-GE birimleri sayesinde, çok katlı ve nitelikli binalar için özel çözümler sunarak, cephe tasarımından uygulamaya kadar her aşamada teknik destek sağlayarak mimari ofislere ve bina yatırımcılarına katkıda bulunur. Saray Alüminyum, yüksek performanslı yenilikçi ürünleri ile geleceğin mimari yapılarını inşa etme ve yaşam kalitesini yükseltme konularında önemli bir rol oynamaktadır.</Text>                    
                    <Contact />
                    <View style={{paddingBottom: 120}}></View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    background: {
        width: '100%', 
        height: '45%', 
        flex: 1,        
        paddingTop: 0
    },
    contentBox: {
        backgroundColor: 'white', 
        borderTopLeftRadius: 30, 
        borderTopRightRadius: 30, 
        marginTop: Device.osName === "Android" ? '60%' :  '67%',
        padding: 30,        
    },
    pageTitle: {
        fontSize: 26, 
        paddingTop: 5, 
        marginBottom: 10, 
        lineHeight: 30, 
        fontWeight: 600
    },
    text: {
        title: {
            
        },
        content: {
            fontSize: 16,
            textAlign: 'justify',
            marginBottom: 15
        }
    }
})