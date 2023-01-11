import { UserEntity } from "../../data/models";

export class User {
  private Id: number;
  private Name: string;

  private constructor(
    name: string,
    id?: number
  ) {
    this.Name = name;

    if (id !== null && id !== undefined) {
      this.Id = id;
    }
  }

  get UserId(): number {
    return this.Id;
  }

  get UserName(): string {
    return this.Name;
  }

  public static Create(
    name: string,
    id?: number
  ): User {
    if (name === "") {
      throw new Error('name is required');
    }

    return new User(name, id);
  }

  public static toDomain(entity: UserEntity): User {
    return User.Create(entity.Name, entity.Id);
  }

  public static toEntity(domain: User): UserEntity {
    let user = new UserEntity();

    user.Id = domain.UserId;
    user.Name = domain.UserName;

    return user;
  }
}