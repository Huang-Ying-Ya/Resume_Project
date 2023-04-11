// global.d.ts
// 用于扩充window对象上的值
declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}
