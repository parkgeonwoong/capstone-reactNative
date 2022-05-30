/* 
@컴포넌트 이름: 카메라 페이지
@관련된 컴포넌트: Home, WorkItem, WorkList
*/

import React from "react";
import { View, Text } from "react-native";

const CameraFocus = ({ route }) => {
  return (
    <View>
      <Text>Camera Page : {route.params.id} </Text>
    </View>
  );
};

export default CameraFocus;
