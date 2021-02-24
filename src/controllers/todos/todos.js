import Todo from "../../models/Todo";

class TodosController {
  static async getTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, user: req.user.id }).populate(
        "user"
      );
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      return res
        .status(200)
        .json({ msg: "Todo fetched successfuly", todo: todo });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async getTodos(req, res) {
    try {
      const todos = await Todo.find({ user: req.user.id }).populate("user");
      if (!todos) {
        return res.status(404).json({ error: "Todos not found" });
      }
      return res
        .status(200)
        .json({ msg: "Todos fetched successfuly", todos: todos });
    } catch (error) {
      console.log(error.body, error.res);
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async createTodo(req, res) {
    try {
      const { title, description, priority } = req.body;
      const todo = new Todo({
        user: req.user.id,
        title: title,
        desrcription: description,
        priority: priority,
      });
      await todo.save();
      return res
        .status(201)
        .json({ msg: "Todo created successfuly", todo: todo });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, user: req.user.id });
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      todo.updatedAt = Date.now();
      await todo.save();
      await todo.updateOne({ $set: req.body });
      return res
        .status(201)
        .json({ msg: "Todo updated successfuly", todo: todo });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async deleteTodo(req, res) {
    try {
      const { id } = req.params;
      const todo = await Todo.findOne({ _id: id, user: req.user.id });
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }

      await todo.deleteOne();
      return res.status(200).json({ msg: "Todo deleted successfuly" });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
  static async deleteTodos(req, res) {
    try {
      const todos = await Todo.find({ user: req.user.id });
      if (!todos.length) {
        return res.status(404).json({ error: "Todos not found" });
      }
      await Todo.deleteMany({ user: req.user.id });
      return res.status(200).json({ msg: "Todos deleted successfuly" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: "Something went wrong", err: error });
    }
  }
}
export default TodosController;
