export interface GStore {
  /**
   * @description 项目路径
   */
  rootPath: string;
}

// .Props<GStore> 表示将类型参数 GStore 传递给 TSRcReduxModel 模块中导出的 Props 接口
const globalModel: TSRcReduxModel.Props<GStore> = {
  namespace: 'globalModel',
  openSeamlessImmutable: true,
  state: { // rc-redex-model可以让我们在model中只写state,action以及reducer都可以不写
    rootPath: '',
  },
};

export default globalModel;
