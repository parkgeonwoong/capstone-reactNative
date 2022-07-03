// 통신 API
const BackApi = (url) => {
  const BackGetApi = async () => {
    const response = await fetch(`http://diligentp.com/${url}`);
    const json = await response.json();

    console.log(`🌊백엔드 통신: ${JSON.stringify(json)}`);
  };

  BackGetApi();
  return json;
};

export default BackApi;
