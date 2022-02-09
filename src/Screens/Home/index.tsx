import React from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';

import {
   Container,
   Header,
   TotalCars,
   HeaderContent
} from './styles';

import { Car } from '../../Components/Car';

export function Home(){

   const CarData = {
      brand: 'AUDI',
      name: 'RS 5 Coupé',
      rent: {
          period: 'AO DIA',
          price: 120,
      },
      thumbnail: 'https://images-ext-2.discordapp.net/external/bwumaL3tGp9p9XiCjbi9BgO_jgrd00BmeKLLv30OaKw/https/www.pngmart.com/files/4/Chevrolet-Camaro-PNG-Image.png',
   }


   return(
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

         <Car  data={CarData}/>

     </Container>
   );
}