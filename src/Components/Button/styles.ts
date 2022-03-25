import styled from 'styled-components/native'
import { TouchableOpacityProps } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

interface ButtonProps extends TouchableOpacityProps {
    color?: string;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
   width: 100%;
   padding: 19px;
   align-items: center;
   justify-content: center;
   background-color: ${({ color, theme }) => color ? color : theme.colors.main};
`;


interface TitleProps {
    light: boolean;
}

export const Title = styled.Text<TitleProps>`
    font-family: ${({ theme }) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({ theme, light }) => light ? theme.colors.header : theme.colors.shape};
`;