import { Dimensions,PixelRatio } from "react-native";

const { width, height } = Dimensions.get('window');
const pixelRatio = PixelRatio.get();

export default function pixelDp() {
    return {
        width: width * pixelRatio,
        height: height * pixelRatio,
        pixelRatio
    };
}