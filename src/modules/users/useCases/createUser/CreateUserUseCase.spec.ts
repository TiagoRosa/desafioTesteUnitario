import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Create User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create an user", async () => {
    const user = await createUserUseCase.execute({
      name: "Tiago",
      email: "tiago@teste.com.br",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to register two users with same e-mail", () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "Tiago",
        email: "tiago@teste.com.br",
        password: "123456",
      });

      await createUserUseCase.execute({
        name: "Tiago",
        email: "tiago@teste.com.br",
        password: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
