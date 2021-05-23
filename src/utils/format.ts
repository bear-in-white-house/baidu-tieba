/**
 * 下划线转换驼峰
 */
function toHump(name: string) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

/**
 * 驼峰转换下划线
 */
function toLine(name: string) {
  return name.replace(/([A-Z])/g, '_$1').toLowerCase();
}

export default <T extends object>(obj: T, mode: 'toHump' | 'toLine'): T => {
  const newObj: Record<string, any> = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (key === undefined) {
      return;
    }
    const newKey = mode === 'toHump' ? toHump(key) : toLine(key);
    newObj[newKey] = value;
  });
  return newObj as T;
};
