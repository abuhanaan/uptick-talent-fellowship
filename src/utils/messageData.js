const generateMessageData = (text) => {
  return {
    text,
    createdAt: new Date().getTime(),
  };
};

const generateLocationData = (url) => {
  return {
    url,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessageData,
  generateLocationData,
};
