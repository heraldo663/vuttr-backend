const supertest = require("supertest");
const { server: app } = require("../../src/app");

const server = supertest(app);
const user = {
  email: "tester@teste.com",
  name: "Tester",
  password: "123456abc"
};

describe("/sessions", () => {
  beforeAll(async () => {
    await server.post("/api/v1/users").send(user);
  });

  it("Should receive a JWT token", async done => {
    const res = await server.post("/api/v1/sessions").send(user);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");

    done();
  });

  it("Should fail to get a JWT token with wrong password", async done => {
    const res = await server.post("/api/v1/sessions").send({
      ...user,
      password: "1234"
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    done();
  });

  it("Should fail to get a JWT token without email", async done => {
    const res = await server.post("/api/v1/sessions").send({
      ...user,
      email: ""
    });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("errors");

    done();
  });
});
