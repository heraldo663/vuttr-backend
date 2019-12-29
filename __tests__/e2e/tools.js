const supertest = require("supertest");

const toolFactory = require("../helpers/factories/tools");
const { server: app } = require("../../src/app");

const server = supertest(app);

let tool = {
  title: "hotel",
  link: "https://github.com/typicode/hotel",
  description:
    "Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.",
  tags: [
    "node",
    "organizing",
    "webapps",
    "domain",
    "developer",
    "https",
    "proxy"
  ]
};

describe("/tools", () => {


  beforeAll(async () => {
    await toolFactory({}, 3);
    await toolFactory({ tags: ["test1"] }, 3);
  });

  it("Should create a tool", async done => {
    const res = await server.post("/tools").send(tool);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(tool.title);
    expect(res.body.link).toBe(tool.link);
    expect(res.body.description).toBe(tool.description);
    expect(res.body.tags).toEqual(expect.arrayContaining(tool.tags));
    expect(res.body).toHaveProperty("_id");

    done();
  });

  it("Should get all tools", async done => {
    const res = await server.get("/tools");

    expect(res.status).toBe(200);
    expect(res.body.tools.length).toBeGreaterThan(2);
    expect(res.body.tools[0]).toHaveProperty("_id");
    expect(res.body.tools[0]).toHaveProperty("title");
    expect(res.body.tools[0]).toHaveProperty("link");
    expect(res.body.tools[0]).toHaveProperty("description");

    done();
  });

  it("Should get all tools that contains the given tag", async done => {
    const res = await server.get("/tools").query({ tag: "test1" });

    expect(res.status).toBe(200);
    expect(res.body.tools.length).toBeGreaterThan(2);
    expect(res.body.tools[0]).toHaveProperty("_id");
    expect(res.body.tools[0]).toHaveProperty("title");
    expect(res.body.tools[0]).toHaveProperty("link");
    expect(res.body.tools[0]).toHaveProperty("description");

    done();
  });

  it("Should delete a tool by id", async done => {
    const tool = await toolFactory();
    const res = await server.delete(`/tools/${tool._id}`);

    expect(res.status).toBe(204);

    done();
  });
});
