import request from "supertest";
import server from "../../src/app";

describe("app", () => {
  it("Should get a message when on home route", async (done) => {
    try {
      const res = await request(server).get("/");
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("message");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should get errors when the route is not found", async (done) => {
    try {
      const res = await request(server).get("/asdf");
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
      done();
    } catch (error) {
      done(error);
    }
  });
});
