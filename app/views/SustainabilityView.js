import { ImageBackground, StyleSheet, Text, View, ScrollView, Image } from "react-native"
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device";
import { SafeAreaView } from "react-native-safe-area-context";
import useAppTranslation from "../libs/useAppTranslation";

const backgroundImage = 'https://saray.com/wp-content/uploads/2024/04/enerji-content.jpg';

export default function SustainabilityView() {

    const { t } = useAppTranslation();
    
    return (
        <ImageBackground 
            source={{uri: backgroundImage}} 
            style={styles.background} resizeMode="cover"
            imageStyle={{position: 'absolute', top: 0}}> 
            <SafeAreaView>
                <StaticHeader /> 
                <ScrollView bounces={false} alwaysBounceVertical={false}>                 
                    <View style={styles.contentBox}>
                        <Text style={styles.pageTitle}>{t("sustainability.title_1")}</Text>
                        <Text style={styles.text.content}>{t("sustainability.desc_1")}</Text>
                        <Image source={{uri: 'https://saray.com/wp-content/uploads/2024/04/enerji-featured.jpg'}} alt="" style={{marginTop: 10, width: 480, height: 320, maxWidth: '100%', marginBottom: 15, borderRadius: 10}} />

                        <Text style={styles.text.title}>{t("sustainability.title_2")}</Text>
                        <Text style={styles.text.content}>{t("sustainability.desc_2_1")}</Text>
                        <Text style={styles.text.content}>{t("sustainability.desc_2_2")}</Text>
                        

                        <Text style={styles.text.title}>{t("sustainability.title_3")}</Text>
                        <Text style={styles.text.content}>{t("sustainability.desc_3")}</Text>

                        <Text style={styles.text.title}>{t("sustainability.title_4")}</Text>
                        <Text style={{...styles.text.content, paddingBottom: 120}}>{t("sustainability.desc_4")}</Text>
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
        padding: 30
    },
    pageTitle: {
        fontSize: 26, 
        paddingTop: 5, 
        marginBottom: 10, 
        lineHeight: 30, 
        fontWeight: 600,
        
    },
    text: {
        title: {
            fontSize: 16,
            textAlign: 'justify',
            marginBottom: 15,
            fontWeight: 'bold',
            marginBottom: 5
        },
        content: {
            fontSize: 16,
            textAlign: 'justify',
            marginBottom: 15
        }
    }
})