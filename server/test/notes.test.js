import request from "supertest";
import app from "../src/index";
import faker from "faker";

/**
 * Testing get all notes endpoint
 */

describe("GET /api/notes", () => {
  it("should GET all notes", (done) => {
    request(app)
      .get("/api/notes")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing notes endpoint by giving an existing note
 */

describe("GET /api/notes/:id", () => {
  it("should GET a notes", (done) => {
    request(app)
      .get("/api/notes/602deaed5671352c8c6d9d7e")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shouldn't GET a note, exercise doesn´t exist", (done) => {
    request(app)
      .get("/api/notes/5f7b5625e02e78380c91406e")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect('{"error":"Note not found"}')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shoudln´t GET a note, bad parameters", (done) => {
    request(app)
      .get("/api/notes/5f7")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing POST notes endpoint
 */

describe("POST /api/notes", () => {
  it("should POST a new note", (done) => {
    const note = {
      title: faker.lorem.word(),
      content: faker.lorem.text(),
      author: faker.internet.userName(),
      date: 1613620442237,
    };

    request(app)
      .post("/api/notes")
      .send(note)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shouldn´t POST a new notes, no parameters", (done) => {
    const exercise = {
      // no data
    };

    request(app)
      .post("/api/notes")
      .send(exercise)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing PUT notes endpoint
 */

describe("PUT /api/notes/:id", () => {
  it("should PUT an exercise", (done) => {
    const exercise = {
      title: faker.lorem.word(),
      content: faker.lorem.text(),
      author: faker.internet.userName(),
      date: 1613620442237,
    };

    request(app)
      .put("/api/notes/602deaed5671352c8c6d9d7e")
      .send(exercise)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shouldn´t PUT a note, note doesn´t exist", (done) => {
    const exercise = {
      title: faker.lorem.word(),
      content: faker.lorem.text(),
      author: faker.internet.userName(),
      date: 1613620442237,
    };

    request(app)
      .put("/api/notes/5f7b5625e02e78380c91406e")
      .send(exercise)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect('{"error":"Note not found"}')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shouldn´t PUT a note, note bad id", (done) => {
    const exercise = {
      title: faker.lorem.word(),
      content: faker.lorem.text(),
      author: faker.internet.userName(),
      date: 1613620442237,
    };

    request(app)
      .put("/api/notes/5f7")
      .send(exercise)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

/**
 * Testing DELETE notes endpoint
 */

describe("DELETE /api/notes/:id", () => {
  it("shouldn´t DELETE a note, note doesn´t exist", (done) => {
    request(app)
      .delete("/api/notes/5fe3cd7d94e54720f4d58915")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect('{"error":"Note not found"}')
      .expect(404)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("shouldn´t DELETE a note, note bad id", (done) => {
    request(app)
      .delete("/api/notes/5fe")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
