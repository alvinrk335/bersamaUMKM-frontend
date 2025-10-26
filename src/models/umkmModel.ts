export class Umkm {
  private _id?: string;
  private _type: string;
  private _name: string;
  private _photoUrl: string;
  private _description: string;
  private _latitude: number;
  private _longitude: number;
  private _userId: string;

  constructor(
    type: string,
    name: string,
    photoUrl: string,
    description: string,
    latitude: number,
    longitude: number,
    userId: string,
    id?: string
  ) {
    this._id = id;
    this._type = type;
    this._name = name;
    this._photoUrl = photoUrl;
    this._description = description;
    this._latitude = latitude;
    this._longitude = longitude;
    this._userId = userId;
  }

  // ✅ Getters
  get id(): string | undefined {
    return this._id;
  }

  get type(): string {
    return this._type;
  }

  get name(): string {
    return this._name;
  }

  get photoUrl(): string {
    return this._photoUrl;
  }

  get description(): string {
    return this._description;
  }

  get latitude(): number {
    return this._latitude;
  }

  get longitude(): number {
    return this._longitude;
  }

  get userId(): string {
    return this._userId;
  }

  // ✅ Setters
  set id(value: string | undefined) {
    this._id = value;
  }

  set type(value: string) {
    this._type = value;
  }

  set name(value: string) {
    this._name = value;
  }

  set photoUrl(value: string) {
    this._photoUrl = value;
  }

  set description(value: string) {
    this._description = value;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  set userId(value: string) {
    this._userId = value;
  }

  // ✅ Convert this object to JSON
  toJSON(): object {
    return {
      id: this._id,
      type: this._type,
      name: this._name,
      photoUrl: this._photoUrl,
      description: this._description,
      latitude: this._latitude,
      longitude: this._longitude,
      userId: this._userId,
    };
  }

  // ✅ Create a new instance from JSON
  static fromJSON(json: any): Umkm {
    return new Umkm(
      json.type,
      json.name,
      json.photoUrl,
      json.description,
      json.latitude,
      json.longitude,
      json.userId,
      json.id
    );
  }
}
