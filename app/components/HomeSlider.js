import { useRef } from "react";
import { StyleSheet, FlatList, Dimensions, Image, Text, View, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import useInAppBrowser from "../libs/useInAppBrowser";
import useAppTranslation from "../libs/useAppTranslation";

const DATA = [
    {
        id: 1,
        titleKey: "slider.aluminyum",
        img: require("../../assets/home/home-ekstruzyon.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-ekstruzyon.jpg"),
        permalink_tr: "https://saray.com/anasayfa/aluminyum-ekstruzyon/",
        permalink_en: "https://saray.com/en/home/aluminum-extrusion/",
    },
    {
        id: 2,
        titleKey: "slider.pvc",
        img: require("../../assets/home/home-pvc.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-pvc.jpg"),
        permalink_tr: "https://saray.com/anasayfa/pvc-sistemleri/",
        permalink_en: "https://saray.com/en/home/pvc-systems/",
    },
    {
        id: 3,
        titleKey: "slider.kompozit",
        img: require("../../assets/home/home-kompozit.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-kompozit.jpg"),
        permalink_tr: "https://saray.com/anasayfa/kompozit-panel/",
        permalink_en: "https://saray.com/en/home/composite-panel/",
    },
    {
        id: 4,
        titleKey: "slider.panjur",
        img: require("../../assets/home/home-panjur.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-panjur.jpg"),
        permalink_tr: "https://saray.com/anasayfa/panjur-sistemleri/",
        permalink_en: "https://saray.com/en/home/shutter-systems/",
    },
    {
        id: 5,
        titleKey: "slider.turizm",
        img: require("../../assets/home/home-turizm.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-turizm.jpg"),
        permalink_tr: "https://saray.com/anasayfa/turizm/",
        permalink_en: "https://saray.com/en/home/tourism/",
    },
    {
        id: 6,
        titleKey: "slider.enerji",
        img: require("../../assets/home/home-enerji.jpg"),
        bgimage: require("../../assets/home/bg/home-bg-enerji.jpg"),
        permalink_tr: "https://saray.com/anasayfa/enerji/",
        permalink_en: "https://saray.com/en/home/energy/",
    },
];


//const { width } = pixelDp();
const { width } = Dimensions.get('window');
const ITEM_WIDTH =  width * 0.8;



function Item({ titleKey, index, img, permalink }) {
    const openLink = useInAppBrowser();  
    const { t } = useAppTranslation();

    return (
        <TouchableOpacity onPress={() => openLink(permalink)} style={{...styles.item, marginRight: index === DATA.length-1 ? 15 : 15, marginLeft: index=== 0 ? 15 : 0}}>
            <Image source={img} alt={t(titleKey)} style={styles.image} resizeMode="cover"></Image>
            
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']} style={{...styles.overlayTitle, width: ITEM_WIDTH}}>
                <Text style={styles.title}>{t(titleKey)}</Text>
            </LinearGradient>            
        </TouchableOpacity>
    );
}
export default function HomeSlider({ setActive }) {
    const viewabilityConfig = {
        itemVisiblePercentThreshold: 60, 
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const firstVisibleItem = viewableItems[0].item;
            setActive(firstVisibleItem);
        }
    }).current;

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={DATA}
                renderItem={({item, index}) => <Item index={index} titleKey={item.titleKey} img={item.img} permalink={item.permalink_tr} />}
                keyExtractor={(item, index) => index}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_WIDTH + 20}
                snapToAlignment="center"
                pagingEnabled
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}                
            />  
        </View>      
    );
}

const styles = StyleSheet.create({
    container: {
      marginTop: 0,
    },
    item: {
      marginVertical: 8,
      marginHorizontal: 0,    
      width: ITEM_WIDTH,
      marginRight: 15,
      position: 'relative',            
    },
    title: {
      fontSize: 32,
    },
    image: {
        borderRadius: 30,
        marginLeft: 0,
        width: ITEM_WIDTH,
        height: "100%"
    },
    overlayTitle: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        height: "100%",
        padding: 20,
        justifyContent: 'flex-end',    
        borderRadius: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: 600,
        color: 'white',
    }
  });