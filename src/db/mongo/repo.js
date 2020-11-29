const connect = require('./helper').connect;
const cnName = 'repos';

exports.getRepos = async (query={}) => {
  const collection = await connect(cnName);
  return await collection.find(query).toArray();
};

exports.getRepo = async (name) => {
  const collection = await connect(cnName);
  return await collection.findOne({name: name});
};

exports.createRepo = async (repo) => {
  repo.users = {
    canPush: [],
    canAuthorise: [],
  };

  const collection = await connect(cnName);
  await collection.insertOne(repo);
};

exports.addUserCanPush = async (name, user) => {
  const collection = await connect(cnName);
  await collection.updateOne(
      {name: name},
      {'$push': {'users.canPush': user}});
};

exports.addUserCanAuthorise = async (name, user) => {
  const collection = await connect(cnName);
  await collection.updateOne(
      {name: name},
      {'$push': {'users.canAuthorise': user}});
};

exports.deleteRepo = async (name) => {
  const collection = await connect(cnName);
  await collection.deleteMany({name: name});
};