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

export { formatAreaCode };
