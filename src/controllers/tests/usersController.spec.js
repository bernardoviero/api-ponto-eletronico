const UserController = require("../usersController");
const userModel = require("../../models/usersModel");

test("create a new user", async () => {
  const req = {
    body: {
      name: "Jhon",
      email: "jjhonteste@test.com",
      cpf: "456456458710",
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
      name: "Jhon",
      email: "jjhonteste@test.com",
      cpf: "456456458710",
      password: "password321",
      dateBirth: "1990-01-01",
      password: expect.anything(),
      dateAlteration: expect.any(String),
    })
  );

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({ success: "Usuário criado com sucesso." });
});

test("update a user", async () => {
  const req = {
    body: {
      id: 7,
      name: "Jhon Update",
      email: "jjhonNEW@test.com",
      cpf: "45645645871",
      password: "password123",
      dateBirth: "1990-01-01",
      active: 1,
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const mockUpdateUser = jest.spyOn(userModel, "putUpdateUser");
  const fakeInsertedId = 7;
  mockUpdateUser.mockResolvedValue({ id: fakeInsertedId });

  await UserController.putUpdateUser(req, res);

  expect(mockUpdateUser).toHaveBeenCalledWith(
    expect.objectContaining({
      id: 7,
      name: "Jhon Update",
      email: "jjhonNEW@test.com",
      cpf: "45645645871",
      dateBirth: "1990-01-01",
      active: 1,
      dateAlteration: expect.any(String),
    })
  );

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ success: "Usuário atualizado com sucesso." });
});

test("create a new user with missing parameter error", async () => {
  const req = {
    body: {
      email: "jjhon@test.com",
      password: "password321",
      dateBirth: "1990-01-01",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await UserController.postCreateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Faltam parâmetros obrigatórios.' });
});

test("create a new user with an existing email error.", async () => {
  const req = {
    body: {
      name: "Jhon",
      cpf: "456456458710",
      password: "password321",
      dateBirth: "1990-01-01",
      email: "email2@teste.com",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await UserController.postCreateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Email já cadastrado.' });
});

test("create a new user with an existing CPF error.", async () => {
  const req = {
    body: {
      name: "Jhon",
      cpf: "00000000002",
      password: "password123",
      dateBirth: "1990-01-01",
      email: "emailnovoteste@teste.com",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await UserController.postCreateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'CPF já cadastrado.' });
});

test("update a user with missing parameter error", async () => {
  const req = {
    body: {
      email: "jjhon@test.com",
      password: "password321",
      dateBirth: "1990-01-01",
    },
  };

  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await UserController.putUpdateUser(req, res);

  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({ error: 'Faltam parâmetros obrigatórios.' });
});