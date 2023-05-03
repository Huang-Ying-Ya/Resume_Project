/**
 * @description 编辑简历-工具条模块
 */
import React, { useEffect, useState } from "react";
import "./index.less";
import MyScrollBox from "@common/components/MyScrollBox";
import RESUME_TOOLBAR_LIST from "@common/constants/resume"; // 简历模块列表
import { onAddToolbar, onDeleteToolbar } from "./utils";
import { useDispatch } from "react-redux";
import Messager, { MESSAGE_EVENT_NAME_MAPS } from "@common/messager";

function ResumeToolbar() {
  const dispatch = useDispatch();
  const height = document.body.clientHeight;

  // 定义已添加模块和未添加模块
  // useState 是 React 中的一个 Hook，用于为函数组件引入局部状态。它返回一个数组，该数组包含两个元素：状态变量和一个用于更新它的函数，我们可以使用数组解构来进行赋值操作。
  // useState后面可以跟初始值或者匿名函数（通过函数来计算初始值）
  const [addToolbarList, setAddToolbarList] = useState<TSResume.SliderItem[]>(
    []
  ); // [] 表示初始状态值为空数组，即 addToolbarList 的初始值为 []，并且该变量的类型是 TSResume.SliderItem[]
  const [unAddToolbarList, setUnAddToolbarList] = useState<
    TSResume.SliderItem[]
  >([]);

  // 第一个参数是一个函数，用于执行副作用代码
  // 第二个参数是一个可选的数组，用于指定 useEffect 的依赖项。当这些依赖项发生变化时，useEffect 会重新执行副作用代码
  // 如果省略了该参数，则每次组件更新时都会重新执行副作用代码。如果传递了空数组（[]）作为依赖项，则副作用代码只会在组件挂载和卸载时执行一次，不会在更新时执行。
  useEffect(() => {
    if (RESUME_TOOLBAR_LIST.length > 0) {
      // : 是 TypeScript 中用于注解变量类型的符号
      let _addToolbarList: TSResume.SliderItem[] = [];
      let _unAddToolbarList: TSResume.SliderItem[] = [];
      RESUME_TOOLBAR_LIST.forEach((s: TSResume.SliderItem) => {
        if (s.require) _addToolbarList.push(s);
        if (!s.require) _unAddToolbarList.push(s);
      });
      setAddToolbarList(_addToolbarList);// 只传递了一个常量或变量，React 会将这个值直接作为组件的下一个状态，即整个状态对象都被用这个值替换
      setUnAddToolbarList(_unAddToolbarList);
      changeResumeToolbarKeys(_addToolbarList.map((s) => s.key));// 挂载时更新数据
    }
  }, []);

  // 发起一个 Action，修改 redux 中的数据值 改变简历模块的 keys
  const changeResumeToolbarKeys = (moduleKeys: string[]) => {
    if (moduleKeys.length > 0) {
      // 向 store 发送 action
      dispatch({
        // type 字段用来描述这个 action 发生了什么，需要一个字符串常量
        type: "templateModel/setStore",
        // payload 字段用来描述这个 action 需要发送的数据，可以是任意类型的数据
        payload: {
          // resumeToolbarKeys用来让展示简历的部分看是否需要展示
          key: "resumeToolbarKeys",
          values: moduleKeys,
        },
      });
    }
  };

  // 添加模块
  const onAddSliderAction = (moduleToolbar: TSResume.SliderItem) => {
    // 向已添加模块中添加新item
    const nextAddSliderList = onAddToolbar(addToolbarList, moduleToolbar);
    setAddToolbarList(nextAddSliderList);
    // 向未添加模块中删除该item
    const nextUnAddSliderList = onDeleteToolbar(
      unAddToolbarList,
      moduleToolbar
    );
    setUnAddToolbarList(nextUnAddSliderList);
    // 修改redux数值
    changeResumeToolbarKeys(
      nextAddSliderList.map((s: TSResume.SliderItem) => s.key)
    );
  };

  // 删除模块
  const onDeleteSliderAction = (moduleSlider: TSResume.SliderItem) => {
    const nextAddSliderList = onDeleteToolbar(addToolbarList, moduleSlider);
    setAddToolbarList(nextAddSliderList);
    const nextUnAddSliderList = onAddToolbar(unAddToolbarList, moduleSlider);
    setUnAddToolbarList(nextUnAddSliderList);
    changeResumeToolbarKeys(
      nextAddSliderList.map((s: TSResume.SliderItem) => s.key)
    );
  };

  return (
    <div styleName="slider">
      <MyScrollBox maxHeight={height - 180}>
        {!!addToolbarList.length && (
          <div styleName="module">
            <div styleName="title">
              <span styleName="line" />
              已添加模块
            </div>
            <div styleName="content">
              {addToolbarList.map((addSlider: TSResume.SliderItem) => {
                return (
                  <div
                    styleName="box"
                    key={addSlider.key}
                    onClick={() => {
                      // 表示是对简历的增添事件
                      Messager.send(MESSAGE_EVENT_NAME_MAPS.OPEN_FORM_MODAL, {
                        form_name: addSlider.key,
                      });
                    }}
                  >
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{addSlider.name}</div>
                        <div styleName="summary">{addSlider.summary}</div>
                      </div>
                      {addSlider.require && <div styleName="tips">必选项</div>}
                      {!addSlider.require && (
                        <div styleName="action">
                          <i
                            styleName="edit"
                            onClick={(e: React.MouseEvent) => {}}
                          />
                          <i
                            styleName="delete"
                            onClick={(e: React.MouseEvent) => {
                              e.stopPropagation && e.stopPropagation();
                              onDeleteSliderAction(addSlider);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!!unAddToolbarList.length && (
          <div styleName="module">
            <div styleName="title un-first">
              <span styleName="line" />
              未添加模块
            </div>
            <div styleName="content">
              {unAddToolbarList.map((unAddSlider: TSResume.SliderItem) => {
                return (
                  <div
                    styleName="box"
                    key={unAddSlider.key}
                    onClick={() => onAddSliderAction(unAddSlider)}
                  >
                    <div styleName="info">
                      <i styleName="icon" />
                      <div styleName="text">
                        <div styleName="name">{unAddSlider.name}</div>
                        <div styleName="summary">{unAddSlider.summary}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </MyScrollBox>
    </div>
  );
}

export default ResumeToolbar;
