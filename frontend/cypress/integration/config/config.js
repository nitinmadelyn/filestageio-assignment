export const config = {
  url: "http://localhost:3000",
  todos: Array(60)
    .fill()
    .map((key, val) => "todos " + (val + 1)),
};
