export type User = {
	name: string
	phone: string
	birthday: string
	email: string
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
	employe: User
}

export type ItemEmploye = {
	type: 'employe'
	employe: User
}

export type ItemAddress = {
	type: 'address'
	address: Address
}

export type Item = (ItemClient | ItemEmploye | ItemAddress) & {
	id: number
}
