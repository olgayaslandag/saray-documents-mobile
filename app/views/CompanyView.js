import { ImageBackground, StyleSheet, Text, View, ScrollView, Image, Dimensions } from "react-native"
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device"
import Contact from "../components/Contact";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppTranslation from "../libs/useAppTranslation";

const backgroundImage = 'https://saray.com/wp-content/uploads/2024/04/fabrika-1-1.jpg';

const { height } = Dimensions.get('window');

export default function CompanyView() {
    const { t } = useAppTranslation();

    return (
        <ImageBackground 
            source={{uri: backgroundImage}} 
            style={styles.background} 
            imageStyle={{position: 'absolute', top: 0}}
            resizeMode="cover">
            <SafeAreaView>
                <StaticHeader /> 
                <ScrollView bounces={false} alwaysBounceVertical={false}>                
                    <View style={styles.contentBox}>
                        <Text style={{...styles.pageTitle, marginBottom: 0}}> {t("about.title")} </Text>
                        <Text style={{...styles.pageTitle, color: '#EA0029'}}>{t("about.company_name")},</Text>
                        <Text style={styles.text.content}>{t("about.desc_1")}</Text>
                        <Image source={{uri: 'https://saray.com/wp-content/uploads/2024/04/fabrika-2.jpg'}} alt="" style={{marginTop: 10, width: 480, height: 320, maxWidth: '100%', marginBottom: 15, borderRadius: 10}} />

                        <Text style={styles.text.content}>{t("about.desc_2")}</Text>

                        <Text style={styles.text.content}>{t("about.desc_3")}</Text>

                        <Text style={{...styles.text.content, paddingBottom: 30}}>{t("about.desc_4")}</Text>                    
                        <Contact />
                        <View style={{paddingBottom: 120}}></View>
                    </View>
                </ScrollView>
            </SafeAreaView>                        
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