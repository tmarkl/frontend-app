import message from './Message';

export default function showTips(tipsType, msg) {
  if (tipsType === 'error') {
    return message.error(msg);
  } else if (tipsType === 'warn') {
    return message.warning(msg);
  } else if (tipsType === 'succ') {
    return message.success(msg);
  }
}
