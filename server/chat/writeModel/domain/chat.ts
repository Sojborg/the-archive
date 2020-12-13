const invariant = require('invariant');
const { Message } = require('./message');

const Chat = ({ id, isClosed } = {} as any) =>
  Object.freeze({
    id,
    isClosed,
  });

const sendMessage = ({ chatState, messageId, userId, content, sentAt }: any) => {
  invariant(!chatState.isClosed, "can't post in a closed chat");
  return Message({ id: messageId, chatId: chatState.id, userId, content, sentAt });
};