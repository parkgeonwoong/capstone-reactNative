/**
 * @desc : 로그인, 회원가입 컴포넌트 재사용
 */

import styled from "styled-components/native";

export const FullScreen = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

export const BoxImage = styled.Image`
  flex: 1;
  width: 300px;
  height: 300px;
`;

export const FormBox = styled.View`
  flex: 1.3;
  width: 100%;
  align-items: center;
  margin-top: 32px;
`;

export const FormInput = styled.TextInput.attrs({ blurOnSubmit: false })`
  width: 60%;
  border-color: ${(props) => props.theme.BLACK};
  border-width: 1px;
  padding: 0 16px;
  border-radius: 5px;
  height: 48px;
  margin-bottom: 16px;
`;

export const FormButton = styled.TouchableOpacity`
  height: 48px;
  width: 60%;
  margin-top: 8px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.RED};
  box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`;

export const BtnText = styled.Text`
  font-size: 18px;
  color: white;
  letter-spacing: 1px;
  font-family: "BMHANNAPro";
`;
