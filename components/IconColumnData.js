import { Text, View, Image } from 'react-native';
import { COLORS } from '../constants/Colors';

const IconRowData = ({ title, imageText, subText }) => {

    return (
        <View style={{ alignItems: 'center', flexDirection: 'row', marginVertical: 10 }}>
            <Image source={imageText}
                style={{ width: 50, height: 50 }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
                <Text style={{ fontFamily: 'Questrial', fontSize: 18, color: COLORS.Primary }}>{subText}</Text>
            </View>
        </View>
    );
}

export default IconRowData;