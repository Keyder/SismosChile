import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, RefreshControl, StatusBar, View, TouchableOpacity, Platform, ActivityIndicator, Alert } from 'react-native';
import { COLORS } from '../constants/Colors';
import { imageNames } from '../constants/Images';
import LottieView from 'lottie-react-native';
import axios from 'axios';

export default function Home({ navigation }) {
    const [Posts, setPosts] = useState(new Array());
    const [TitleRefresh, setTitleRefresh] = useState('Actualizar')
    const [refreshing, setRefreshing] = React.useState(false);
    const [HeaderPlatfrom, setHeaderPlatfrom] = useState(null)
    const [Loading, setLoading] = useState(true)

    useEffect(() => {
        ConnectApi();

        if (Platform.OS === 'android') {
            setHeaderPlatfrom(StatusBar.currentHeight)
        } else {
            setHeaderPlatfrom(35)
        }

    }, []);

    const ConnectApi = async () => {
        try {
            await axios.get('https://api.xor.cl/sismo/recent')
                .then(response => {
                    setPosts(response.data)
                    if (response.status === 200) {
                        setLoading(false)
                    } else {
                        Alert.alert('Ups, ha ocurrido un error! :(')
                    }
                })
                .catch(err => console.log(err));
        } catch (error) {
            console.log('Fetch Error:', error)
        }
    }

    const _onRefresh = async () => {
        setTitleRefresh('Actualizando')
        await ConnectApi();
        setTitleRefresh('Actualizar')
    }

    return (
        <View style={[styles.container, { paddingTop: HeaderPlatfrom }]}>
            <View style={{ width: '100%', backgroundColor: COLORS.Secundary, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, paddingHorizontal: 20 }}>
                <Text style={styles.title1}>Bienvenido a</Text>
                <Text style={styles.title2}>Sismos Chile</Text>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <LottieView
                        source={imageNames.GloboHome}
                        style={{
                            width: 150,
                            height: 150,
                            alignSelf: 'center',
                            marginBottom: 20
                        }}
                        autoPlay
                        loop
                    />
                </View>
            </View>

            <Text style={{ fontFamily: 'Roboto', fontSize: 24, fontWeight: 'bold', margin: 20 }}>Recientes</Text>

            {Loading ?
                <ActivityIndicator color={COLORS.Primary} />
                :
                <FlatList
                    data={Posts.events}
                    refreshControl={
                        <RefreshControl
                            tintColor={COLORS.Primary}
                            colors={[COLORS.Primary]}
                            title={TitleRefresh}
                            refreshing={refreshing}
                            onRefresh={_onRefresh.bind()}
                        />}
                    renderItem={RenderPost}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={150}
                />
            }

        </View>
    );

    function RenderPost({ item }) {
        return (
            <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Details', { item: item })}>
                <View style={styles.card}>
                    <View style={styles.containerPost}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={styles.boxMagnitude}>
                                <Text style={styles.textMagnitude}>{item.magnitude.value}</Text>
                                <Text style={{ fontFamily: 'Roboto', fontSize: 14, color: COLORS.Secundary }}>{item.magnitude.measure_unit}</Text>
                            </View>
                            <View>
                                <Text style={[styles.textMagnitude, { marginLeft: 10, }]}>{item.geo_reference.split(" ").splice(-1)[0]}</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: COLORS.Secundary }}>{item.local_date}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    title1: {
        fontSize: 40,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: COLORS.Titles
    },
    title2: {
        fontSize: 40,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: COLORS.Primary
    },

    card: {
        backgroundColor: COLORS.Primary,
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        marginHorizontal: 15,
    },
    containerPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    boxMagnitude: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.PurpleSecundary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    textMagnitude: {
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: COLORS.Secundary,
    }

});
