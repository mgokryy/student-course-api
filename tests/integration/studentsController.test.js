const request = require("supertest");
const app = require("../../src/app");
const storage = require("../../src/services/storage");

describe("Students Controller Integration", () => {
  beforeEach(() => {
    storage.reset();
    storage.seed();
  });

  // Liste filtrée (tests supplémentaires pour listStudents)
  test("GET /students should filter by name", async () => {
    const res = await request(app).get("/students?name=Alice");
    expect(res.statusCode).toBe(200);
    res.body.students.forEach((st) => {
      expect(st.name).toContain("Alice");
    });
  });

  test("GET /students should filter by email", async () => {
    const res = await request(app).get("/students?email=example.com");
    expect(res.statusCode).toBe(200);
    res.body.students.forEach((st) => {
      expect(st.email).toContain("example.com");
    });
  });

  //  Récupérer un étudiant précis
  test("GET /students/:id should return student with courses", async () => {
    const res = await request(app).get("/students/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.student).toBeDefined();
    expect(res.body.courses).toBeInstanceOf(Array);
  });

  test("GET /students/:id should return 404 if not found", async () => {
    const res = await request(app).get("/students/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });

  // Création : déjà testée dans app.test.js, donc on garde seulement le cas manquant
  test("POST /students should return 400 if missing name or email", async () => {
    const res = await request(app).post("/students").send({ name: "" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("name and email required");
  });

  // Suppression d’un étudiant
  test("DELETE /students/:id should delete existing student", async () => {
    const newStudent = storage.create("students", {
      name: "Temp",
      email: "temp@example.com",
    });
    const res = await request(app).delete(`/students/${newStudent.id}`);
    expect(res.statusCode).toBe(204);
  });

  test("DELETE /students/:id should return 404 if not found", async () => {
    const res = await request(app).delete("/students/999");
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });

  test("DELETE /students/:id should return 400 if enrolled in a course", async () => {
    const student = storage.list("students")[0];
    const course = storage.list("courses")[0];
    storage.enroll(student.id, course.id); // inscrit l’étudiant à un cours
    const res = await request(app).delete(`/students/${student.id}`);
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Cannot delete student: enrolled in a course");
  });

  //  Mise à jour
  test("PUT /students/:id should update name and email", async () => {
    const student = storage.list("students")[0];
    const res = await request(app)
      .put(`/students/${student.id}`)
      .send({ name: "Updated", email: "updated@example.com" });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated");
    expect(res.body.email).toBe("updated@example.com");
  });

  test("PUT /students/:id should return 404 if not found", async () => {
    const res = await request(app)
      .put("/students/999")
      .send({ name: "DoesNotExist" });
    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe("Student not found");
  });

  test("PUT /students/:id should return 400 if email already exists", async () => {
    const students = storage.list("students");
    const student1 = students[0];
    const student2 = students[1];
    const res = await request(app)
      .put(`/students/${student2.id}`)
      .send({ email: student1.email }); // doublon d’email
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe("Email must be unique");
  });
});
