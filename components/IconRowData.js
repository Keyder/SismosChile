import { Text, View, Image } from 'react-native';
import { COLORS } from '../constants/Colors';

const IconRowData = ({ title, imageText, subText }) => {
    return (
        <View style={{ alignItems: 'center', flexDirection: 'column' }}>
            <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
            <Image source={imageText}
                style={{ width: 55, height: 55 }}
            />
            <Text style={{ fontFamily: 'Questrial', fontSize: 18, color: COLORS.Primary }}>{subText}</Text>
        </View>
    );
}

export default IconRowData;