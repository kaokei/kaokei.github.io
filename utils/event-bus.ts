import mitt from 'mitt';

// 虽然事件总线很好用
// 但是建议只用于全局事件通信，而非组件间通信
// 比如全局定时任务触发的事件或者websocket接收到特定消息触发的事件
export const EventBus = mitt();
