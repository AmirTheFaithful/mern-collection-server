/* Object that holds user authentication credentials */
declare interface UserAuthInterface {
  salt: string;
  password: string;
  sessionToken: string;
}

/* The object that represents user's account structure */
declare interface UserInterface {
  username: string;
  email: string;
  avatarURL: string;
  auth: UserAuthInterface;
}
