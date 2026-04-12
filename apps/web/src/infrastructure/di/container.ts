import { Container } from "inversify";

// Inversify IoC container.
// Register bindings as you create repository adapters.
//
// Example:
//   import { TYPES } from "./types";
//   import { HttpUserRepository } from "../api/http-user.repo";
//   container.bind<UserRepository>(TYPES.UserRepository).to(HttpUserRepository);

export const container = new Container();
