/* Object that holds user authentication credentials */
export default interface UserAuthInterface {
  salt: string;
  password: string;
  sessionToken: string;
}
