import styled from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize';
import { FlatList, FlatListProps, TouchableOpacityProps } from 'react-native';
import { carDTO } from '../../dtos/carDto';


interface ButtonMycarsProps extends TouchableOpacityProps {
   onPress: () => any;
}


export const Container = styled.View`
   flex: 1;
   background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
   width: 100%;
   height: 113px;
   background-color: ${({ theme }) => theme.colors.header};
   justify-content: flex-end;
   padding: 32px 24px;

`;

export const HeaderContent = styled.View`
   flex-direction: row;
   justify-content: space-between;
   align-items: center;
`;


export const TotalCars = styled.Text`
   font-size: ${RFValue(15)}px;
   font-family: ${({ theme }) => theme.fonts.primary_400};
   color: ${({ theme }) => theme.colors.text};
`;


export const CardList = styled(
   FlatList as new (props: FlatListProps<carDTO>) => FlatList<carDTO>
).attrs({
   contentContainerStyle: {
      padding: 24,
   },
   showsVerticalScrollIndicator: false,
})``;


export const MycarsButton = styled.TouchableOpacity.attrs({
   activeOpacity: 0.5,
}) <ButtonMycarsProps>`

   width: 60px;
   height: 60px;
   background-color: ${({ theme }) => theme.colors.main};

   align-items: center;
   justify-content: center;
   border-radius: 30px;

   position: absolute;
   bottom: 13px;
   right: 22px;
`;