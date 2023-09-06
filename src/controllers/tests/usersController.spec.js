const UserController = require("../usersController");
const userModel = require("../../models/usersModel");

test("create a new user", async () => {
  const req = {
    body: {
      name: "Jhon",
      email: "jjhon@test.com",
      cpf: "45645645871",
      password: "password321",
      dateBirth: "1990-01-01",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockPostCreateUser = jest.spyOn(userModel, "postCreateUser");
  const fakeInsertedId = 7;

  mockPostCreateUser.mockResolvedValue({ id: fakeInsertedId });

  await UserController.postCreateUser(req, res);
  expect(mockPostCreateUser).toHaveBeenCalledWith(
    expect.objectContaining({
      cpf: "45645645871",
      dateBirth: "1990-01-01",
      email: "jjhon@test.com",
      name: "Jhon",
      dateAlteration: expect.any(String),
    })
  );
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: "Usuário criado com sucesso." });
});

test("update a user", async () => {
  const req = {
    params: {
      id: 7,
    },
    body: {
      name: "Jhon",
      email: "jjhonnew@test.com",
      cpf: "45645645871",
      password: "newPassword321",
      dateBirth: "1990-01-01",
      active: 1,
    },
  };

  delete req.body.dateAlteration;

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockPutUpdateUser = jest.spyOn(userModel, "putUpdateUser");
  mockPutUpdateUser.mockResolvedValue({ success: "Usuário atualizado com sucesso." });

  await UserController.putUpdateUser(req, res);
  expect(mockPutUpdateUser).toHaveBeenCalledWith(
    expect.objectContaining({
      body: {
        name: "Jhon",
        email: "jjhonnew@test.com",
        cpf: "45645645871",
        password: "newPassword321",
        dateBirth: "1990-01-01",
        active: 1,
      },
      params: {
        id: 7,
      },
    }),
  );

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: "Usuário atualizado com sucesso." });
});