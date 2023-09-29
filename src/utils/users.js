const users = [];

const addUser = ({ id, username, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Data Validation
  if (!username || !room) {
    return {
      error: "Username and room are required",
    };
  }

  // Check For User Uniqueness in a room
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username;
  });
  if (existingUser) {
    return {
      error: "Username already in use",
    };
  }

  //   Store User
  const user = { id, username, room };
  users.push(user);
  return { user };
};

const removeUser = (id) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    return users.splice(userIndex, 1)[0];
  }
};

const getUser = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return {
      error: undefined,
    };
  }
  return { user };
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
