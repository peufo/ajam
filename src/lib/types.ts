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

export type Call = {
	subject: string
	from: User
	to: User
}

export type CallArchived = Call & {
	createdAt: Date
}

export type EntryClient = {
	type: 'client'
	client: User
	employ: User
}

export type EntryEmploy = {
	type: 'employe'
	employ: User
}

export type EntryAddress = {
	type: 'address'
	address: Address
}

export type Entry = EntryClient | EntryEmploy | EntryAddress
export type EntryType = Entry['type']
