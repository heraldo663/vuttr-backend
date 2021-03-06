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

let tools;

describe("/tools", () => {
  beforeAll(async () => {
    await toolFactory({}, 3);
    tools = await toolFactory({ tags: ["test1"] }, 3);
  });

  it("Should create a tool", async done => {
    const res = await server.post("/api/v1/tools").send(tool);

    expect(res.status).toBe(201);
    expect(res.body.title).toBe(tool.title);
    expect(res.body.link).toBe(tool.link);
    expect(res.body.description).toBe(tool.description);
    expect(res.body.tags).toEqual(expect.arrayContaining(tool.tags));
    expect(res.body).toHaveProperty("_id");

    done();
  });

  it("Should fail to create a tool without title", async done => {
    const res = await server.post("/api/v1/tools").send({ tool, title: "" });

    expect(res.status).toBe(400);

    done();
  });

  it("Should fail to create a tool without link", async done => {
    const res = await server.post("/api/v1/tools").send({ tool, link: "" });

    expect(res.status).toBe(400);

    done();
  });

  it("Should get all tools", async done => {
    const res = await server.get("/api/v1/tools");

    expect(res.status).toBe(200);
    expect(res.body.tools.length).toBeGreaterThan(2);
    expect(res.body.tools[0]).toHaveProperty("_id");
    expect(res.body.tools[0]).toHaveProperty("title");
    expect(res.body.tools[0]).toHaveProperty("link");
    expect(res.body.tools[0]).toHaveProperty("description");

    done();
  });

  it("Should get all tools that contains the given tag", async done => {
    const res = await server.get("/api/v1/tools").query({ tag: "test1" });

    expect(res.status).toBe(200);
    expect(res.body.tools.length).toBeGreaterThan(2);
    expect(res.body.tools[0]).toHaveProperty("_id");
    expect(res.body.tools[0]).toHaveProperty("title");
    expect(res.body.tools[0]).toHaveProperty("link");
    expect(res.body.tools[0]).toHaveProperty("description");

    done();
  });

  it("Should delete a tool by id", async done => {
    const res = await server.delete(`/api/v1/tools/${tools[0]._id}`);

    expect(res.status).toBe(204);

    done();
  });
});
