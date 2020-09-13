import AreaCode from '@/data/area/area-code';

// 将 AreaCode 树形结构改为同级
const formatAreaCode = (() => {
  let areaList = [];
  const getCode = list => {
    list.forEach(item => {
      areaList.push(item);
      if (item.children && item.children.length) {
        getCode(item.children);
      }
    });
  };
  getCode(AreaCode);

  return areaList;
})();

// 根据区域 name 获取 code
const getAreaCode = (areaName, defCode = '100000') => {
  let code = defCode;

  if (areaName) {
    formatAreaCode.forEach(item => {
      if (item.name.includes(areaName.slice(0, 2))) {
        code = item.code;
      }
    });

    for (let i = 0; i < 6; i++) {
      if (code && code.length < 6) {
        code += '0';
      }
    }
  }

  return code;
};

export { formatAreaCode, getAreaCode };
