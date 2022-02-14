import React from 'react';
import { StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import { BackButton } from '../../Components/BackButton';
import { ImageSlider } from '../../Components/ImageSlider';
import { Accessory } from '../../Components/Accessory';
import { Button } from '../../Components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';

import { useTheme } from 'styled-components';
import { useNavigation } from '@react-navigation/native';

import {
    Container,
    Header,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    Footer,
    RentalPeriod,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    RentalPrice,
    RentalPriceLabel,
    RentalPriceDetails,
    RentalPriceQuota,
    RentalPriceTotal,

} from './styles';


export function SchedulingDetails() {

    const theme = useTheme();
    const navigate = useNavigation<any>();


    return (
        <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
            />


            <Header>
                <BackButton onPress={() => navigate.goBack()} />
            </Header>


            <ImageSlider
                imagesUrl={['https://images-ext-2.discordapp.net/external/bwumaL3tGp9p9XiCjbi9BgO_jgrd00BmeKLLv30OaKw/https/www.pngmart.com/files/4/Chevrolet-Camaro-PNG-Image.png']}
            />

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Accessories>
                    <Accessory name="380Km/h" icon={speedSvg} />
                    <Accessory name="3.2s" icon={accelerationSvg} />
                    <Accessory name="800 HP" icon={forceSvg} />
                    <Accessory name="Gasoline" icon={gasolineSvg} />
                    <Accessory name="Auto" icon={exchangeSvg} />
                    <Accessory name="2 Pessoas" icon={peopleSvg} />
                </Accessories>

                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>12/02/2022</DateValue>
                    </DateInfo>

                    <Feather
                        name="chevron-right"
                        size={RFValue(10)}
                        color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>12/02/2022</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>Total</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x 3 diárias</RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>

            <Footer>
                <Button
                    title='Confirmar'
                    color={theme.colors.success}
                    onPress={() => navigate.navigate('SchedulingComplete')}
                />
            </Footer>
        </Container>
    );
}