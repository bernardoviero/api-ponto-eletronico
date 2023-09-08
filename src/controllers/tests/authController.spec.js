const AuthController = require("../authController");
const userModel = require("../../models/usersModel");

test("auth user", async () => {
    const req = {
        body: {
            email: "jjhonNEW@test.com",
            password: "password123",
        },
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    const mockAuthUser = jest.spyOn(userModel, "postAuthenticateUser");
    const fakeUserId = 2;

    mockAuthUser.mockResolvedValue(fakeUserId);

    await AuthController.postAuthenticateUser(req, res);

    expect(mockAuthUser).toHaveBeenCalledWith("jjhonNEW@test.com", "password123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
});

test("authenticate user with invalid credentials", async () => {
    const req = {
        body: {
            email: "jjhonNEW@test.com",
            password: "password123",
        },
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };

    const mockAuthUser = jest.spyOn(userModel, "postAuthenticateUser");
    const fakeUserId = null;

    mockAuthUser.mockResolvedValue(fakeUserId);

    await AuthController.postAuthenticateUser(req, res);

    expect(mockAuthUser).toHaveBeenCalledWith("jjhonNEW@test.com", "password123");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas.' });
});