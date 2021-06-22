const config = require("../src/config/config");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../bin/www");
let should = chai.should();

chai.use(chaiHttp);
let insertedTodoId;
describe("CRUD TODO", () => {
  it("it should add new todo", (done) => {
    chai
      .request(server)
      .post("/todo")
      .send({ text: "Test Todo" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("completed");
        res.body.should.have.property("text");
        res.body.should.have.property("position");
        insertedTodoId = res.body.id;
        done();
      });
  });

  it("it should fetch first 20 todo list", (done) => {
    chai
      .request(server)
      .get("/todo")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("items");
        res.body.should.have.property("pagination");
        done();
      });
  });

  it("it should fetch todo list by page number 2", (done) => {
    chai
      .request(server)
      .get("/todo?page=2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("items");
        res.body.should.have.property("pagination");
        done();
      });
  });

  it("it should fetch todo list by due date 2021-06-25", (done) => {
    chai
      .request(server)
      .get("/todo?dueDate=2021-06-25")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("items");
        res.body.should.have.property("pagination");
        done();
      });
  });

  it("it should fetch todo list by due date 2021-06-25 and page number 1", (done) => {
    chai
      .request(server)
      .get("/todo?page=1&dueDate=2021-06-25")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("items");
        res.body.should.have.property("pagination");
        done();
      });
  });


  it("it should edit due date of todo", (done) => {
    chai
      .request(server)
      .put("/todo/" + insertedTodoId)
      .send({ dueDate: "2021-07-30" })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("dueDate");
        done();
      });
  });

  it("it should edit position of todo", (done) => {
    chai
      .request(server)
      .put("/todo/" + insertedTodoId)
      .send({ positionBetween: [1.08] })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("position");
        done();
      });
  });

  it("it should delete todo", (done) => {
    chai
      .request(server)
      .delete("/todo/" + insertedTodoId)
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
