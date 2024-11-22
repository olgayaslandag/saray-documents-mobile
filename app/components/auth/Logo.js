import { StyleSheet, View, Image } from 'react-native';

export default function Logo() {
    return (
        <View style={styles.container}>
            <Image source={require('../../../assets/icon.png')} alt="" style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    image: {
        width: 145,
        height: 30
    },
});