
interface IAddress {
    street: string;
    town: string;
    county: string;
    postcode: string;
}

interface IPreferences {
    contact: string[];
}

export interface IUser {
    id: string;
    first_name: string;
    other_names: string;
    address: IAddress;
    mobile: string;
    email: string;
    password: string;
    company: string;
    preferences: IPreferences;
}