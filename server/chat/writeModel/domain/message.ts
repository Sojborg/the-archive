export const Message = ({ id, chatId, userId, content, sentAt, messageLikes = [] } = {} as any) =>
  Object.freeze({
    id,
    chatId,
    userId,
    content,
    sentAt,
    messageLikes,
  });