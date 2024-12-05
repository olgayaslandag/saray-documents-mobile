import { Text, Box, ScrollView, Image } from "native-base"
import { ImageBackground, StyleSheet } from "react-native"
import StaticHeader from "../components/header/StaticHeader";
import * as Device from "expo-device";

const backgroundImage = 'https://saray.com/wp-content/uploads/2024/04/enerji-content.jpg';

export default function SustainabilityView() {
    return (
        <ImageBackground source={{uri: backgroundImage}} style={styles.background} resizeMode="cover">                      
            <StaticHeader /> 
            <ScrollView>                 
                <Box style={styles.contentBox} p="5">
                    <Text style={styles.pageTitle}>SARAY Sürdürülebilirlik Bir Geleceğe Yatırım Yapıyor</Text>
                    <Text fontSize="16">SARAY, sürdürülebilirlik ve çevre bilincini kurumsal misyonunun merkezine yerleştirerek, yenilenebilir enerji kaynaklarına önemli yatırımlar yapıyor. Bu yatırımlar, çevre dostu üretim süreçlerini desteklemekte ve karbon ayak izini belirgin bir şekilde azaltmaktadır.</Text>
                    <Image source={{uri: 'https://saray.com/wp-content/uploads/2024/04/enerji-featured.jpg'}} alt="" width="480" height="320" style={{marginTop: 20}} />

                    <Text fontSize="16" fontWeight="600" mt="3">SARAY: Yenilenebilir Enerji ile Sürdürülebilir Bir Geleceğe Yatırım Yapıyor</Text>
                    <Text fontSize="16">SARAY, sürdürülebilirlik ve çevre bilincini kurumsal misyonunun merkezine yerleştirerek, yenilenebilir enerji kaynaklarına önemli yatırımlar yapıyor. Bu yatırımlar, çevre dostu üretim süreçlerini desteklemekte ve karbon ayak izini belirgin bir şekilde azaltmaktadır.</Text>
                    <Text fontSize="16">Üretim tesislerinde kendi enerji santrallerinden elde ettiği temiz enerjiyle SARAY, sürdürülebilirlik konusunda önemli adımlar atmaktadır. RES ile 6 MW ve GES ile 5 MW elektrik enerjisi üreten SARAY, enerji üretiminde yenilenebilir kaynaklara olan bağımlılığı azaltarak, çevreye duyarlı bir üretim modeli benimsemektedir.</Text>

                    <Text fontSize="16" fontWeight="600" mt="3">Şanlıurfa Güneş Tarlası: Sürdürülebilir Enerji Üretiminde Yeni Dönem</Text>
                    <Text fontSize="16">Şanlıurfa’da gerçekleştirdiği güneş enerjisi yatırımıyla SARAY, yılda 12 MW ek elektrik enerjisi üretmeyi hedeflemektedir. Bu yatırım, sadece enerji ihtiyacını karşılamakla kalmayacak, aynı zamanda bölgesel sürdürülebilirliğe ve yeşil enerjiye olan bağımlılığın azaltılmasına da katkı sağlayacaktır.</Text>

                    <Text fontSize="16" fontWeight="600" mt="3">Karbon Ayak İzinde Önemli İyileşmeler</Text>
                    <Text fontSize="16" style={{paddingBottom: 120}}>Yenilenebilir enerji yatırımlarıyla birlikte SARAY, yılda 7 bin 900 ton karbon salınımının önüne geçerek, üretim kaynaklı sera gazı salınımında önemli bir iyileşme kaydetmektedir. Bu, SARAY’ın çevre duyarlılığı konusunda attığı büyük ve öncü adımların bir göstergesidir.</Text>
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