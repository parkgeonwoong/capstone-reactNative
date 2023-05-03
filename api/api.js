export const BASE_URL = "http://diligentp.com/";
export const DEEP_URL = "http://172.26.21.102:5000/test";
export const RANK_URL = `${BASE_URL}rank`;
export const PROFILE_URL = (userNo) => `${BASE_URL}get?userno=${userNo}`;
export const DELETE_URL = (userNo) => `${BASE_URL}deregister?userno=${userNo}`;
export const REGISTER_URL = `${BASE_URL}register`;
export const SIGNIN_URL = (id, pass) =>
  ` ${BASE_URL}login?id=${id}&pass=${pass}`;
export const DAY_URL = (userNo, date) =>
  `${BASE_URL}stats/day?userno=${userNo}&date=${date}`;
export const MONTH_URL = (userNo, date) =>
  `${BASE_URL}stats/month?userno=${userNo}&date=${date}`;
