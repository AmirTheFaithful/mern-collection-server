import UserAuthInterface from "./auth.interface";

/* The object that represents user's account structure */
export default interface UserInterface {
  username: string;
  email: string;
  avatarURL: string;
  auth: UserAuthInterface;
}
