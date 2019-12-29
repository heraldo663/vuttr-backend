const Tool = require("../../../src/app/model/Tool");
const faker = require("faker");

const toolFactory = async (tool = {}, qtd = 1) => {
  let fakeTool = {
    title: faker.lorem.sentence(1),
    link: faker.internet.url(),
    description: faker.lorem.sentences(4),
    tags: [
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word(),
      faker.lorem.word()
    ]
  };

  fakeTool = { ...fakeTool, ...tool };

  if (qtd === 1) {
    const newTool = await Tool.create(fakeTool);
    return newTool;
  }

  const tools = [];
  for (let index = 0; index < qtd; index++) {
    const newTool = await Tool.create(fakeTool);
    tools.push(newTool);
  }

  return tools;
};

module.exports = toolFactory;
