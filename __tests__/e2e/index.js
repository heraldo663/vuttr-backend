const supertest = require("supertest");
const { server: app } = require("../../src/app");

const server =  supertest(app);

describe("SERVER", () => {

  it("Should receive server status 200", async done => {
    const res = await server.get("/api/v1");
    expect(res.status).toBe(200);

    done();
  });
});
