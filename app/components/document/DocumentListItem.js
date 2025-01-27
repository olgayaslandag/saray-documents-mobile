import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, StyleSheet, TouchableOpacity, View, Image, Text, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addToFav, removeFromFav } from "../../store/favSlice";
import FontAwesome from '@expo/vector-icons/FontAwesome';



const imageSize = Dimensions.get("window").width / 3 - 20;


export default function DocumentListItem({ item, setSelected, setSearch, setOpen }) {
    const favorites = useSelector(state => state.favorites.value);
    const auth = useSelector(state => state.auth.value);
    const [check, setCheck] = useState(false);

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        const findItem = favorites.findIndex(fav => fav.path === item.path)
        if(findItem > -1)
            setCheck(true);
    }, [favorites]);

    function cleaner() {
        if (setSearch) setSearch("");
        if (setOpen) setOpen(false);
        navigation.openDrawer();
    }

    function HandleAddOrRemove() {
        if(!auth) {
            Alert.alert(
                "Üyelik Gerekli", 
                "Sisteme giriş yapmalısınız!", 
                [
                    {text: 'İptal', style: 'cancel'},
                    {text: 'Giriş Yap', onPress: () => cleaner()},            
                ],
                {cancelable: false}
            );
            return;
        }

        Alert.alert(
            "",
            !check ? "Favori listesinize eklendi." : "Favori listenizden çıkarıldı"
        );
        setCheck(!check)
        dispatch(check ? removeFromFav(item) : addToFav(item))        
    }

    return (
        <View style={{position: 'relative', overflow: 'hidden', maxWidth: imageSize}}>
            {item.thumbnail && (
                <View>
                    <TouchableOpacity 
                        style={styles.item.container} 
                        onPress={() => setSelected("https://saray.com/drive/" + item.path)}>
                        <Image source={{uri: item.thumbnail}} alt="" style={styles.item.image} />
                        <Text style={styles.item.text}>{item.title}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item.favIcon.container} onPress={HandleAddOrRemove}>
                        <FontAwesome name={check && auth ? "star" : "star-o"} color="#EA0029" size={18} />
                    </TouchableOpacity>
                </View>
            )}

            {!item.thumbnail && 
                <View style={{width: imageSize}}></View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    item : {
      container: {
        flex: 1,         
      },
      image: {
        width: imageSize,
        height: imageSize * 1.5,
        borderRadius: 10,
  
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 10,
      },
      text: {
  
      },
      favIcon: {
        container: {
            position: 'absolute', 
            right: 0, 
            top: 0, 
            padding: 5, 
            zIndex: 2
        }
      }
    }  
  });