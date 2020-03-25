import Modal from "./Modal";

export default function showConfirm(options) {
  const { title, message, doneTitle, cancelTitle } = options;
  return new Promise(resolve => {
    Modal.confirm({
      title,
      content: message,
      okText: doneTitle,
      cancelText: cancelTitle,
      onOk: function() {
        resolve({ done: true });
      },
      onCancel: function() {
        resolve({ cancel: true });
      }
    });
  });
}
