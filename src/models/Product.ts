export interface ProductProps {
    id?: number;
    name: string;
    price: number;
    description: string;
    photoUrl?: string | null;
    category?: string | null;
    umkmId?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
}

export default class Product {
    private _id?: number;
    private _name: string;
    private _price: number;
    private _description: string;
    private _photoUrl?: string | null;
    private _category?: string | null;
    private _umkmId?: number | null;
    private _createdAt?: Date | string;
    private _updatedAt?: Date | string;

    constructor({
        id,
        name,
        price,
        description,
        photoUrl = null,
        category = null,
        umkmId = null,
        createdAt,
        updatedAt,
    }: ProductProps) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._photoUrl = photoUrl;
        this._category = category;
        this._umkmId = umkmId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    // ===== Getters =====
    get id(): number | undefined {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get description(): string {
        return this._description;
    }

    get photoUrl(): string | null | undefined {
        return this._photoUrl;
    }

    get category(): string | null | undefined {
        return this._category;
    }

    get umkmId(): number | null | undefined {
        return this._umkmId;
    }

    get createdAt(): Date | string | undefined {
        return this._createdAt;
    }

    get updatedAt(): Date | string | undefined {
        return this._updatedAt;
    }

    // ===== Setters =====
    set name(value: string) {
        this._name = value;
    }

    set price(value: number) {
        this._price = value;
    }

    set description(value: string) {
        this._description = value;
    }

    set photoUrl(value: string | null | undefined) {
        this._photoUrl = value;
    }

    set category(value: string | null | undefined) {
        this._category = value;
    }

    set umkmId(value: number | null | undefined) {
        this._umkmId = value;
    }

    toJson(): Record<string, any> {
        return {
            id: this._id,
            name: this._name,
            price: this._price,
            description: this._description,
            photoUrl: this._photoUrl,
            category: this._category,
            umkmId: this._umkmId,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }

    static fromJson(json: any): Product {
        return new Product({
            id: json.id,
            name: json.name,
            price: json.price,
            description: json.description,
            photoUrl: json.photoUrl ?? null,
            category: json.category ?? null,
            umkmId: json.umkmId ?? null,
            createdAt: json.createdAt,
            updatedAt: json.updatedAt,
        });
    }
}
