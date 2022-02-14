import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import Gasoline from '../../assets/gasoline.svg';

import { carDTO } from '../../dtos/carDto';

import {
    Container,
    Details,
    Brand,
    Name,
    About,
    Rent,
    Period,
    Price,
    Type,
    CarImage,
} from './styles';



interface Props extends TouchableOpacityProps {
    data: carDTO;
}



export function Car({ data, ...rest }: Props) {
    return (
        <Container {...rest}>
            <Details>
                <Brand>{data.brand}</Brand>
                <Name>{data.name}</Name>

                <About>
                    <Rent>
                        <Period>{data.rent.period}</Period>
                        <Price>{`R$ ${data.rent.price}`}</Price>
                    </Rent>

                    <Type>
                        <Gasoline
                        // width={20}
                        // height={20}
                        />
                    </Type>
                </About>
            </Details>


            <CarImage
                source={{ uri: data.thumbnail }}
                resizeMode='contain'
            />

        </Container>
    );
}