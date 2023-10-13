export class User {
  id?: number;
  name?: string;
  email?: string;
  profilePicture?: string;
  role?: string;

  constructor(
    id?: number,
    name?: string,
    email?: string,
    profilePicture?: string,
    role?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.profilePicture = profilePicture;
    this.role = role;
  }
}
