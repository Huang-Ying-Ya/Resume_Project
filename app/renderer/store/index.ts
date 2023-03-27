// 主要引入我们所有的 model，经过 redux 的 API，导出一颗完整的数据状态树
import logger from 'redux-logger';
import RcReduxModel from 'rc-redux-model';
import { createStore, applyMiddleware, combineReducers } from 'redux';

// 👇 引入我们写好的 model
import globalModel from './globalModel';

// 👇 这里只需要调用 RcReduxModel 实例化一下得到最后的 reduxModel
const reduxModel = new RcReduxModel([globalModel]);

// 👇 无侵入式地使用 Redux，即使你写最原始的 reducer 也照样支持
const reducerList = combineReducers(reduxModel.reducers);

export default createStore(reducerList, applyMiddleware(reduxModel.thunk, logger));
