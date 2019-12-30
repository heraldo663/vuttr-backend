const faker = require("faker");
const mongoose = require("mongoose");
const Tool = require("../../../src/app/model/Tool");
const toolFactory = require("../../helpers/factories/tools");

const database = require("../../../src/database");

const tool = {
  tags: ["node", faker.lorem.word(), faker.lorem.word(), faker.lorem.word()]
};

describe("Model Tool", () => {
  let connection;
  beforeAll(async () => {
    connection = await database();
    await toolFactory(tool, 3);
    await toolFactory({}, 3);
  });

  afterAll(async done => {
    await mongoose.disconnect();
    done();
  });

  it("Shold get all tools with a given tag", async done => {
    const tools = await Tool.searchByTag(["node"]);

    expect(tools.length).toBe(3);

    done();
  });
});
