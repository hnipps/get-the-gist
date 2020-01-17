export const isOfType = <T, P extends keyof T>(
  myVar: any,
  testKey: P
): myVar is T => (myVar as T)[testKey] !== undefined;
