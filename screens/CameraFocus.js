// /**
//  * @컴포넌트 : 카메라 페이지
//  * @관련된컴포넌트 : Home, WorkItem, WorkList, Timer
//  *
//  * @아쉽게도
//  * - tensorflow 부분은 내 파트가 아니기 때문에 이해가 부족함
//  * - 또한 코드를 고쳐볼려고 해도 서버가 없어서 테스트가 불가능함, 텐서플로우 라이브러리에 문제가 많아보임
//  */

// import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
// import { Camera, CameraType } from "expo-camera";
// import React, { useEffect, useState } from "react";
// import { LogBox, Platform, View, Vibration } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import SetTimer from "../components/Timer";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { DEEP_URL } from "../api/api";
// import styled from "styled-components/native";

// const TensorCamera = cameraWithTensors(Camera);

// const height = 320;
// const width = 320;
// const channel = 3;

// let nextImageTensor;

// LogBox.ignoreAllLogs(true);

// const CameraFocus = ({ route }) => {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [faceData, setFaceData] = useState([]);
//   const [getCount, setGetCount] = useState(0); // Timer.js에서 시간 state
//   const [getuserNo, setGetuserNo] = useState(0);
//   const [Ready, setReady] = useState(false);

//   const getTimer = (countData) => {
//     setGetCount(countData);
//   };

//   const getReady = (ready) => {
//     setReady(ready);
//   };

//   let textureDims =
//     Platform.OS == "ios"
//       ? { height: 1920, width: 1080 }
//       : { height: 1200, width: 1600 };

//   useEffect(() => {
//     async function loadData() {
//       try {
//         const getId = await AsyncStorage.getItem("id");
//         const userNo = JSON.parse(getId).userno;
//         setGetuserNo(userNo);
//       } catch (e) {
//         console.log("못불러옴");
//       }
//     }
//     loadData();
//   }, []);

//   // 카메라 권한
//   useEffect(() => {
//     const permissionCamera = async () => {
//       await Camera.requestCameraPermissionsAsync();
//       // const { status } = await Camera.requestCameraPermissionsAsync();
//       // setHasPermission(status === "granted");
//       await tf.ready(); // tensorcamera를 사용하기 위함
//     };
//     permissionCamera();
//   }, []);

//   // 딥러닝 서버 비동기 연결 처리
//   const getApi = async (tensorJson) => {
//     const response = await fetch(`${DEEP_URL}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: tensorJson,
//     });

//     const json = await response.json();
//     const conper = json.con_per;
//     if (conper <= 40) {
//       alert("🔥 집중력이 낮습니다!!");
//       Vibration.vibrate();
//     }
//   };

//   // faceData와 imageData의 일괄 처리를 위한 함수
//   function getData() {
//     if (faceData != null && nextImageTensor != null) {
//       const tensor = nextImageTensor;
//       const tensorJson = convertTenorToJson(tensor, faceData); // 카메라 스트림 및 얼굴 정보 json화
//       if (Ready === true) {
//         getApi(tensorJson);
//       }
//     }
//   }

//   // Tensor 파일에서 Image
//   function convertTenorToJson(tensor) {
//     const imageData = tensor.dataSync();
//     const tensorJson = JSON.stringify({
//       imageData,
//       width,
//       height,
//       channel,
//       getCount,
//       getuserNo,
//       Ready,
//     });
//     return tensorJson;
//   }

//   // 카메라 스트림 얻기
//   function handleCameraStream(images) {
//     const loop = async () => {
//       nextImageTensor = images.next().value;
//       requestAnimationFrame(loop);
//     };
//     loop();
//   }

//   return (
//     <Container>
//       <TimerBox>
//         <SetTimer getTimer={getTimer} data={route.params} getReady={getReady} />
//       </TimerBox>
//       <CameraBox>
//         <TensorCamera
//           style={{ width: "100%", height: "100%" }}
//           type={CameraType.front}
//           cameraTextureHeight={textureDims.height}
//           cameraTextureWidth={textureDims.width}
//           resizeHeight={height}
//           resizeWidth={width}
//           resizeDepth={channel}
//           onReady={handleCameraStream}
//           autorender={true}
//           useCustomShadersToResize={false}
//         />
//         {getData()}
//       </CameraBox>
//       <View style={{ flex: 0.5 }}></View>
//     </Container>
//   );
// };

// const Container = styled.View`
//   flex: 1;
//   background-color: #fff;
//   justify-content: center;
//   align-items: center;
// `;

// const TimerBox = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   margin-top: 10px;
// `;

// const CameraBox = styled.View`
//   flex: 6;
//   width: 90%;
//   height: 90%;
//   margin-top: 20px;
//   border-radius: 20px;
//   overflow: hidden;
// `;

// export default CameraFocus;

const CameraFocus = ({ route }) => {
  return <>view</>;
};
export default CameraFocus;
