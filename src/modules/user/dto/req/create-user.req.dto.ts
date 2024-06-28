export class CreateUserReqDto {
  public readonly name: string;

  public readonly email: string;

  public readonly password: string;

  public readonly avatar?: string;

  public readonly age?: number;
}
