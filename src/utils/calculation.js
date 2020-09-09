/**
 * 计算两个定位点间的直线距离
 * @param {Object} start  {longitude: 123, latitude: 80}
 * @param {Object} end  {longitude: 123, latitude: 80}
 * @return {} 单位 米
 */
const calculateLineDistance = (start, end) => {
  let d1 = 0.01745329251994329;
  let d2 = start.longitude;
  let d3 = start.latitude;
  let d4 = end.longitude;
  let d5 = end.latitude;
  d2 *= d1;
  d3 *= d1;
  d4 *= d1;
  d5 *= d1;
  let d6 = Math.sin(d2);
  let d7 = Math.sin(d3);
  let d8 = Math.cos(d2);
  let d9 = Math.cos(d3);
  let d10 = Math.sin(d4);
  let d11 = Math.sin(d5);
  let d12 = Math.cos(d4);
  let d13 = Math.cos(d5);
  let arrayOfDouble1 = [];
  let arrayOfDouble2 = [];
  arrayOfDouble1.push(d9 * d8);
  arrayOfDouble1.push(d9 * d6);
  arrayOfDouble1.push(d7);
  arrayOfDouble2.push(d13 * d12);
  arrayOfDouble2.push(d13 * d10);
  arrayOfDouble2.push(d11);
  let d14 = Math.sqrt(
    (arrayOfDouble1[0] - arrayOfDouble2[0]) * (arrayOfDouble1[0] - arrayOfDouble2[0]) +
      (arrayOfDouble1[1] - arrayOfDouble2[1]) * (arrayOfDouble1[1] - arrayOfDouble2[1]) +
      (arrayOfDouble1[2] - arrayOfDouble2[2]) * (arrayOfDouble1[2] - arrayOfDouble2[2])
  );

  return Math.asin(d14 / 2.0) * 12742001.579854401;
};

export { calculateLineDistance };
