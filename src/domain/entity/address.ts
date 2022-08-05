export default class Address {
    _street: string;
    _city: string;
    _number: string;
    _zip: string;

    constructor( street: string, city: string, number: string, zip: string) {
        this._street = street;
        this._city = city;
        this._number = number;
        this._zip = zip;

        this.validate();
    }

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get number(): string {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }


    validate() {
        if (this._street.length === 0) {
            throw new Error("Street is required");
        }
        if (this._city.length === 0) {
            throw new Error("City is required");
        }
        if (this._number.length === 0) {
            throw new Error("State is required");
        }
        if (this._zip.length === 0) {
            throw new Error("Zip is required");
        }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._city} ${this._zip}`;
    }
}
