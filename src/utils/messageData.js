const generateMessageData = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessageData,
};
