import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const scaleSizeUI = (param, isHeight) => {
    const widthDesign = 375;

    const heightDesign = 812;

    return isHeight
        ? (param * height) / heightDesign
        : (param * width) / widthDesign;
};
