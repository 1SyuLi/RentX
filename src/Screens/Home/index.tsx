import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar, TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';


import { Car } from '../../Components/Car';
import { CarDetails } from '../CarDetails';

import {
    Container,
    Header,
    TotalCars,
    HeaderContent,
    CardList
} from './styles';


export function Home() {

    const navigation = useNavigation<any>();

    function HandleCarDetails() {
        navigation.navigate('CarDetails');
    }

    const CarData = {
        brand: 'AUDI',
        name: 'RS 5 Coupé',
        rent: {
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://images-ext-2.discordapp.net/external/bwumaL3tGp9p9XiCjbi9BgO_jgrd00BmeKLLv30OaKw/https/www.pngmart.com/files/4/Chevrolet-Camaro-PNG-Image.png',
    }


    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />

            <Header>
                <HeaderContent>
                    <Logo
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />

                    <TotalCars>
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <CardList
                data={[1, 2,]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) =>
                    <Car
                        onPress={HandleCarDetails}
                        data={CarData}
                    />}
            />

        </Container>
    );
}