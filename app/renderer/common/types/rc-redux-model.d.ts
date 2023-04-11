// declare namespace 是 TypeScript 中的一个语法，在一个独立的文件中声明一个命名空间。它用于划分一组具有相似特征的数据，函数，接口等的作用域范围。
declare namespace TSRcReduxModel {
  interface D {
    // 允许对象类型中包含任意数量的 string 类型的属性，并且这些属性值的类型可以是任意类型
    [key: string]: any;// 表示一个索引签名
  }
  // 三个泛型类型参数(S (State)、A (Actions) 和 R (ActionCreators))
  export interface Props<S = D, A = D, R = D> {
    /**
     * @description 命名空间，唯一，必须
     */
    namespace: string;
    /**
     * @description 数据状态，必须
     */
    state: S;
    /**
     * @description action，非必须
     */
    action?: A;
    /**
     * @description action，非必须
     */
    reducers?: R;
    /**
     * @description 是否开启 Immutable，非必须
     * Immutable 是一种函数式编程思想，是指在修改对象时不直接修改原对象，而是返回一个新的对象
     */
    openSeamlessImmutable?: boolean;
  }
}
