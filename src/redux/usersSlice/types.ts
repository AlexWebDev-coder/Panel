interface IUsersCompanyState {
    name: string
}

export interface IUsersAddressState {
    street: string
    city: string
}

export interface IUsersState {
    id: number
    name: string
    username: string
    email: string
    address: IUsersAddressState
    phone: string
    website: string
    company: IUsersCompanyState
}

export interface IUsers {
    users: IUsersState[]
    status: string | null
    error: string | null
}