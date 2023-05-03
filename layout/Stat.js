/**
 * @desc : 통계 레이아웃
 */

import styled from "styled-components/native";

export const CalendarBox = styled.View`
  flex: 1.8;
`;

export const SelectBtn = styled.TouchableOpacity`
  flex: 1;
  background-color: white;
  margin: 10px;
  padding: 20px;
  border-radius: 15px;
  justify-content: center;
  align-items: flex-start;
`;

export const Box = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SelectItem = styled.View`
  flex: 1;
  margin-left: 15px;
  justify-content: center;
`;

export const ApiBox = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
  align-items: center;
`;

export const TextTitle = styled.Text`
  font-size: 15px;
  padding: 3px;
  margin-right: 10px;
  font-family: "BMHANNAPro";
  opacity: 0.8;
`;

export const TextContext = styled.Text`
  font-size: 15px;
  color: ${(props) => props.theme.RED};
  font-family: "BMHANNAPro";
`;

// const styles = StyleSheet.create({
//   fullScreen: {
//     flex: 1,
//     backgroundColor: BG_COLOR,
//   },
//   monthBox: {
//     flex: 1,
//     flexDirection: "row",
//   },
//   leftMonth: {
//     flex: 1,
//     justifyContent: "flex-start",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   leftText: {
//     fontSize: 20,
//     fontFamily: "BMHANNAPro",
//     color: "#00BBF2",
//     letterSpacing: 1,
//   },
//   rightMonth: {
//     flex: 4,
//     marginRight: 10,
//     marginBottom: 40,
//     padding: 20,
//     borderRadius: 15,
//     backgroundColor: "white",
//   },
//   leftWrapper: {
//     flex: 1,
//     marginLeft: 15,
//     marginBottom: 5,
//   },
// });
