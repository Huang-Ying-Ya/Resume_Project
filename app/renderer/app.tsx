import React from "react";
import ReactDOM from "react-dom";
import Router from "./router";
import 'antd/dist/antd.css';

// 👇 引入 store
import store from './store';

// 引入 Provider
import { Provider } from 'react-redux';

const App: React.FC =()=> {
  return (
    // 在组件中使用redux 将经过createStore生成的store挂载到react-redux提供的Provider组件上,Provider通过context向子组件提供store
    <Provider store={store}> 
      <Router />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
