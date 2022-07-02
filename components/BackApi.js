import React, { useState } from "react";

// 통신 API
const BackApi = async (url) => {
  //   const [data, setData] = useState("");
  //   console.log(url);
  const response = await fetch(`http://diligentp.com/${url}`);

  const json = await response.json();

  //   setData(json);
  console.log(`🌊백엔드 통신: ${JSON.stringify(json)}`);

  return json;
};

export default BackApi;
