import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Platform } from 'react-native';
import { imageNames } from '../constants/Images';
import { COLORS } from '../constants/Colors';
import IconRowData from "../components/IconRowData";
import IconColumnData from "../components/IconColumnData";

export default function Details({ route }) {

    React.useEffect(() => {
        console.log()
    }, [])

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                initialRegion={{
                    latitude: route.params.item.latitude,
                    longitude: route.params.item.longitude,
                    latitudeDelta: 0.6,
                    longitudeDelta: 0.6,
                }}
            >
                <Marker
                    coordinate={{ latitude: route.params.item.latitude, longitude: route.params.item.longitude }}
                    title={'Sismo'}
                    description={route.params.item.geo_reference}
                />
            </MapView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 40, alignItems: 'center', marginVertical: 20 }}>
                <IconRowData
                    title={'Fecha'}
                    imageText={imageNames.Calendario}
                    subText={route.params.item.local_date.split(" ")[0]}
                />
                <IconRowData
                    title={'Profundidad'}
                    imageText={imageNames.Magnitud}
                    subText={route.params.item.depth}
                />
                <IconRowData
                    title={'Magnitud'}
                    imageText={imageNames.Profundidad}
                    subText={route.params.item.magnitude.value}
                />
            </View>

            <View style={{ width: '100%', backgroundColor: COLORS.Secundary, borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 20, height: '35%', justifyContent: 'space-between', paddingTop: 15, paddingBottom: 30 }}>
                <IconColumnData
                    title={'Hora'}
                    imageText={imageNames.Hora}
                    subText={route.params.item.local_date.split(" ")[1]}
                />
                <IconColumnData
                    title={'Georeferencia'}
                    imageText={imageNames.Georeferencia}
                    subText={route.params.item.geo_reference}
                />
                <IconColumnData
                    title={'Coordenadas'}
                    imageText={imageNames.Coordenadas}
                    subText={route.params.item.latitude + ", " + route.params.item.longitude}
                />
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    mapStyle: {
        width: Dimensions.get('window').width,
        height: '40%',
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        justifyContent: 'space-between'
    },
});
