export type User = {
	name: string
	phone: string
	birthday: string
	email: string
	street: string
	zipCode: string
	city: string
}

export type Employe = User & {
	jobTitle: string
	jobGroup: string
}

export type Address = {
	name: string
	street: string
	zipCode: string
	city: string
}

export type Phone = {
	subject: string
	from: User
	to: User
}

export type PhoneArchived = Phone & {
	createdAt: Date
}

export type ItemClient = {
	type: 'client'
	client: User
	employe: Employe
}

export type ItemEmploye = {
	type: 'employe'
	employe: Employe
}

export type ItemAddress = {
	type: 'address'
	address: Address
}

export type Item = (ItemClient | ItemEmploye | ItemAddress) & {
	id: number
}
