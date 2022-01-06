import { UserApiService } from "./user.api.service";

export const createUserApiService = () => {
  return new UserApiService();
};
