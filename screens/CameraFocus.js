/**
 * @컴포넌트 : 카메라 페이지
 * @관련된컴포넌트 : Home, WorkItem, WorkList, Timer
 */

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useContext, useEffect, useState } from "react";
import {
  LogBox,
  Platform,
  StyleSheet,
  View,
  Text,
  Vibration,
} from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as tf from "@tensorflow/tfjs";
import SetTimer from "../components/Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LogContext from "../contexts/LogContext";

const TensorCamera = cameraWithTensors(Camera);

const height = 320;
const width = 320;
const channel = 3;

let nextImageTensor;

LogBox.ignoreAllLogs(true);

const CameraFocus = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faceData, setFaceData] = React.useState([]);
  const [getCount, setGetCount] = useState(0); // Timer.js에서 시간 state
  const [getuserNo, setGetuserNo] = useState(0);
  const [Ready, setReady] = useState(false);

  const getTimer = (countData) => {
    setGetCount(countData);
  };

  const getReady = (ready) => {
    setReady(ready);
  };

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  useEffect(() => {
    async function loadData() {
      try {
        const getId = await AsyncStorage.getItem("id");
        const userNo = JSON.parse(getId).userno;
        setGetuserNo(userNo);
      } catch (e) {
        console.log("못불러옴");
      }
    }
    loadData();
  }, []);

  // 카메라 권한
  useEffect(() => {
    const permissionCamera = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await tf.ready(); // tensorcamera를 사용하기 위함
    };
    permissionCamera();
  }, []);

  // 딥러닝 서버 비동기 연결 처리
  const getApi = async (tensorJson) => {
    // 딥러닝 서버
    const response = await fetch("http://172.26.21.102:5000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: tensorJson,
    });

    const json = await response.json();
    console.log("🚨딥러닝 json 확인: ", json); // 딥러닝 json 확인
    // const mappedCon = json.map((item) => item.con_per);
    console.log("집중도:", json.con_per);
    const conper = json.con_per;
    if (conper <= 40) {
      alert("🔥 집중력이 낮습니다!!");
      Vibration.vibrate();
    }
  };

  // faceData와 imageData의 일괄 처리를 위한 함수
  function getData() {
    if (faceData != null && nextImageTensor != null) {
      // console.log('f', faceData[0]);
      // console.log('i', nextImageTensor['id']);
      const tensor = nextImageTensor;
      const tensorJson = convertTenorToJson(tensor, faceData); // 카메라 스트림 및 얼굴 정보 json화
      // console.log(typeof height)

      // 🚨 네트워크 호출
      if (Ready === true) {
        getApi(tensorJson);
      }
    }
  }

  // Tensor 파일에서 Image
  function convertTenorToJson(tensor, faceData) {
    const imageData = tensor.dataSync();
    const tensorJson = JSON.stringify({
      imageData,
      width,
      height,
      channel,
      // faceData,
      getCount,
      getuserNo,
      Ready,
    });
    // const b = JSON.parse(jtensor)

    // console.log("tensorJson: ", tensorJson);
    return tensorJson;
  }

  // Face데이터 얻기
  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  // 카메라 스트림 얻기
  function handleCameraStream(images, updatePreview, gl) {
    const loop = async () => {
      nextImageTensor = images.next().value;

      requestAnimationFrame(loop);
    };
    loop();
  }

  // console.log(route.params);

  return (
    <View style={styles.container}>
      <View style={styles.timerBox}>
        {/* <Text>Camera Page : {route.params} </Text> */}
        <SetTimer getTimer={getTimer} data={route.params} getReady={getReady} />
      </View>
      <View style={styles.cameraBox}>
        <TensorCamera
          style={styles.camera}
          type={CameraType.front}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={height}
          resizeWidth={width}
          resizeDepth={channel}
          onReady={handleCameraStream}
          autorender={true}
          useCustomShadersToResize={false}
          // onFacesDetected={handleFacesDetected}
          // faceDetectorSettings={{
          //   mode: FaceDetector.FaceDetectorMode.accurate,
          //   detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          //   runClassifications: FaceDetector.FaceDetectorClassifications.all,
          //   minDetectionInterval: 10000,
          //   tracking: true,
          // }}
        />
        {getData()}
      </View>
      <View style={{ flex: 0.5 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBox: {
    flex: 6,
    width: "90%",
    height: "90%",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  timerBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    // backgroundColor: "tomato",
  },
});

// 안쓰는 코드

// function getFaceDataView() {
//   if (faceData.length === 0) {
//     console.log('no face :(')
//   } else {
//     return faceData.map((face, index) => {
//       const eyesShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
//       const winking = !eyesShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
//       const smiling = face.smilingProbability > 0.7;
//       console.log(eyesShut)
//       console.log(winking)
//       console.log(smiling)
//     });
//   }
// }

export default CameraFocus;
