import request from "supertest";
import server from "../../src/app";
import User from "../models/User";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

describe("Authentication", () => {
  beforeAll(async () => {
    const url = process.env.MONGO_TEST_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await User.deleteMany();
  });
  it("Should signup", async (done) => {
    try {
      const user = {
        username: "amani",
        email: "test@email.com",
        password: "Password123",
        passwordConf: "Password123",
      };
      const res = await request(server).post("/api/auth/signup").send(user);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Can't signup with wrong inputs", async (done) => {
    try {
      const user = {
        username: "amani",
        email: "",
        password: "Password123",
        passwordConf: "Password123",
      };
      const res = await request(server).post("/api/auth/signup").send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should login a user", async (done) => {
    try {
      const user = {
        email: "test@email.com",
        password: "Password123",
      };
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg", "Logged in successfuly");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Can't login with wrong credentials", async (done) => {
    try {
      const user = {
        email: "test@email.com",
        password: "Password1234",
      };
      const res = await request(server).post("/api/auth/login").send(user);
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error", "Incorrect credentials");
      done();
    } catch (error) {
      done(error);
    }
  });
  afterAll(async () => {
    await User.deleteMany();
    mongoose.connection.close();
    done();
  });
});
