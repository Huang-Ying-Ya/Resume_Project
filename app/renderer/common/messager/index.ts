export const MESSAGE_EVENT_NAME_MAPS = {
  OPEN_FORM_MODAL: 'open_form_modal', // 简历模块选择
};


// 实现弹窗显示功能（工具栏添加，简历有所显示）
class Messager {
  send = (eventName: string, payload: any) => {
    // document.dispatchEvent 方法会触发一个名为 eventName 的自定义事件
    // eventName 是由调用者传入的一个字符串参数，用于标识自定义事件的名称
    document.dispatchEvent(
      // new CustomEvent 则是创建了一个自定义事件对象，该事件对象包含了名称、事件配置以及任何其他的事件相关信息
      new CustomEvent(eventName, {
        // 在该自定义事件中，可以利用 detail 属性传递一个自定义的数据对象，这里的 payload 就是一个被传递的数据对象
        detail: {
          payload: payload,
        },
      })
    );
  };
  // 自定义事件的消息接收函数，用于接收通过 document.dispatchEvent 发送的自定义事件
  // 函数接收两个参数： e：表示触发事件的对象；messageHandler：表示处理事件数据的函数
  receive = (e: any, messageHandler: Function) => {
    if (messageHandler) {
      // ?. 表示可选链
      const payload = e?.detail?.payload;
      messageHandler(payload);
    }
  };
}

export default new Messager();
