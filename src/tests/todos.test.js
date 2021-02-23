import request from "supertest";
import server from "../../src/app";
import User from "../models/User";
import Todo from "../models/Todo";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let token;
let todoId;
describe("todos; '/api/todos'", () => {
  beforeAll(async () => {
    const url = process.env.MONGO_TEST_URL;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });
  it("Should create a user first", async (done) => {
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
  it("Should login a user first", async (done) => {
    try {
      const user = {
        email: "test@email.com",
        password: "Password123",
      };
      const res = await request(server).post("/api/auth/login").send(user);
      console.log(res.body);
      token = res.body.token;
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });

  afterAll(async () => {
    await User.deleteMany();
    await Todo.deleteMany();
  });

  it("Should create a todo", async (done) => {
    try {
      const todo = {
        title: "Learningg",
        description: "Learn to prepare for exams",
        priority: "HIGH",
      };
      const res = await request(server)
        .post("/api/todos")
        .set("auth-token", token)
        .send(todo);
      todoId = res.body.todo._id;
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should get a todo", async (done) => {
    try {
      console.log(todoId);
      const res = await request(server)
        .get(`/api/todos/${todoId}`)
        .set("auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("todo");
      done();
    } catch (error) {
      done(error);
    }
  });
});
