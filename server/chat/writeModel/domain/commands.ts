const commands = {
  types: {
    SEND_MESSAGE: '[chat] send a message',
  },
  sendMessage({ chatId, userId, content, sentAt }: any) {
    return Object.freeze({
      type: commands.types.SEND_MESSAGE,
      payload: {
        chatId,
        userId,
        content,
        sentAt,
      },
    });
  },
};

module.exports = {
  commands,
};