const UserController = require("../usersController");
const userModel = require("../../models/usersModel");

test("create a new user", async () => {
  const request = {
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

  await UserController.postCreateUser(request, res);
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
  expect(res.json).toHaveBeenCalledWith(fakeInsertedId);
});