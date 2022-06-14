/* 
@컴포넌트 이름: 카메라 페이지
@관련된 컴포넌트: Home, WorkItem, WorkList
*/

// import React from "react";
// import { View, Text } from "react-native";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useState } from "react";
import { LogBox, Platform, StyleSheet, View, Text } from "react-native";
import * as FaceDetector from "expo-face-detector";
import * as tf from "@tensorflow/tfjs";

const TensorCamera = cameraWithTensors(Camera);

const height = 320;
const width = 320;
const channel = 3;

var nextImageTensor;

LogBox.ignoreAllLogs(true);

const CameraFocus = ({ route }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [faceData, setFaceData] = React.useState([]);

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  useEffect(() => {
    (async () => {
      // 카메라 권한
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      await tf.ready(); // tensorcamera를 사용하기 위함
    })();
  }, []);

  const getApi = async (asdf) => {
    // 딥러닝 서버
    const response = await fetch("http://172.26.21.108:8000/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: asdf,
    });

    const json = await response.json();

    console.log(json); // 딥러닝 json 확인
  };

  // faceData와 imageData의 일괄 처리를 위한 함수
  function getData() {
    if (faceData != null && nextImageTensor != null) {
      // console.log('f', faceData[0]);
      // console.log('i', nextImageTensor['id']);
      const tensor = nextImageTensor;
      const tensorJson = convertTenorToJson(tensor, faceData); // 카메라 스트림 및 얼굴 정보 json화
      // console.log(typeof height)
      getApi(tensorJson);
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
      faceData,
    });
    // const b = JSON.parse(jtensor)

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

  return (
    <View style={styles.container}>
      <View>
        <Text>Camera Page : {route.params.id} </Text>
      </View>
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
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 5000,
          tracking: true,
        }}
      />
      {getData()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    width: "100%",
    height: "100%",
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
