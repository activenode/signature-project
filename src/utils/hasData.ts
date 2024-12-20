export function objectHasData(obj: any, ignoreFields: string[] = []) {
  const keys = Object.keys(obj);
  return keys.some(key => {
    if (ignoreFields.includes(key)) return false;
    return !!obj[key];
  })
}
