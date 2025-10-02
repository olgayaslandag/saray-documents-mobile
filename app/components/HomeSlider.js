import { useRef } from "react";
import { StyleSheet, FlatList, Dimensions, Image, Text, View, TouchableOpacity, Linking } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import pixelDp from "../libs/pixelDp";
import useInAppBrowser from "../libs/useInAppBrowser";

const DATA = [
    {
        id: 1,
        title: 'Alüminyum Ekstrüzyon',
        img: require('../../assets/home/home-ekstruzyon.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-ekstruzyon.jpg'),
        permalink: "https://saray.com/anasayfa/aluminyum-ekstruzyon/"
    },
    {
        id: 3,
        title: 'PVC Sistemleri',
        img: require('../../assets/home/home-pvc.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-pvc.jpg'),
        permalink: "https://saray.com/anasayfa/pvc-sistemleri/"
    },
    {
        id: 4,
        title: 'Kompozit Panel',
        img: require('../../assets/home/home-kompozit.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-kompozit.jpg'),
        permalink: "https://saray.com/anasayfa/kompozit-panel/"
    },
    {
        id: 5,
        title: 'Panjur ve Kepenk Sistemleri',
        img: require('../../assets/home/home-panjur.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-panjur.jpg'),
        permalink: "https://saray.com/anasayfa/panjur-sistemleri/"
    },
    {
        id: 6,
        title: 'Turizm',
        img: require('../../assets/home/home-turizm.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-turizm.jpg'),
        permalink: "https://saray.com/anasayfa/turizm/"
    },
    {
        id: 7,
        title: 'Enerji',
        img: require('../../assets/home/home-enerji.jpg'),
        bgimage: require('../../assets/home/bg/home-bg-enerji.jpg'),
        permalink: "https://saray.com/anasayfa/enerji/"
    },
];


//const { width } = pixelDp();
const { width } = Dimensions.get('window');
const ITEM_WIDTH =  width * 0.8;
console.log(width)


function Item({ title, index, img, permalink }) {
    const openLink = useInAppBrowser();    

    return (
        <TouchableOpacity onPress={() => openLink(permalink)} style={{...styles.item, marginRight: index === DATA.length-1 ? 20 : 15, marginLeft: index===0 ? 20 : 0}}>
            <Image source={img} alt={title} style={styles.image} resizeMode="cover"></Image>
            
            <LinearGradient colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']} style={{...styles.overlayTitle, width: ITEM_WIDTH}}>
                <Text style={styles.title}>{title}</Text>
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
                renderItem={({item, index}) => <Item index={index} title={item.title} img={item.img} permalink={item.permalink} />}
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