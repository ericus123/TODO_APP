import request from "supertest";
import server from "../../src/app";
import User from "../models/User";
import Todo from "../models/Todo";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let token;
let todoId;
let deletedId;
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
    mongoose.connection.close();
    done();
  });

  it("Should create a todo", async (done) => {
    try {
      const todo = {
        title: "Learning",
        description: "Learn to prepare for exams",
        priority: "HIGH",
      };
      const res = await request(server)
        .post("/api/todos")
        .set("auth-token", token)
        .send(todo);
      todoId = res.body.todo._id;
      await request(server)
        .post("/api/todos")
        .set("auth-token", token)
        .send(todo);
     const response =  await request(server)
        .post("/api/todos")
        .set("auth-token", token)
        .send(todo);
    deletedId = response.body.todo._id;
    await Todo.deleteOne({_id:deletedId});
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should get a todo", async (done) => {
    try {
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
  it("Can't get a todo if not logged in ", async (done) => {
    try {
      const res = await request(server).get(`/api/todos/${todoId}`);
      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should get all todos", async (done) => {
    try {
      const res = await request(server)
        .get(`/api/todos`)
        .set("auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("todos");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should update a todo", async (done) => {
    try {
      const todo = {
        title: "Learning updated",
        description: "Learn to prepare for exams updated",
        priority: "MEDIUM",
      };
      const res = await request(server)
        .patch(`/api/todos/${todoId}`)
        .send(todo)
        .set("auth-token", token);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });
  
  it("Can't update a todo which doesn't exist", async (done) => {
    try {
      const todo = {
        title: "Learning updated",
        description: "Learn to prepare for exams updated",
        priority: "MEDIUM",
      };
      const res = await request(server)
        .patch(`/api/todos/${deletedId}`)
        .send(todo)
        .set("auth-token", token);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error","Todo not found");
      done();
    } catch (error) {
      done(error);
    }
  });

  it("Should delete a todo", async (done) => {
    try {
      const res = await request(server)
        .delete(`/api/todos/${todoId}`)
        .set("auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });

  it("Can't delete a todo which doen't exist", async (done) => {
    try {
      const res = await request(server)
        .delete(`/api/todos/${deletedId}`)
        .set("auth-token", token);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error","Todo not found");
      done();
    } catch (error) {
      done(error);
    }
  });
  it("Should delete all todos", async (done) => {
    try {
      const res = await request(server)
        .delete(`/api/todos`)
        .set("auth-token", token);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("msg");
      done();
    } catch (error) {
      done(error);
    }
  });
    it("Can't delete all todos if no todo exist", async (done) => {
    try {
      const res = await request(server)
        .delete(`/api/todos`)
        .set("auth-token", token);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error","Todos not found");
      done();
    } catch (error) {
      done(error);
    }
  });
});
