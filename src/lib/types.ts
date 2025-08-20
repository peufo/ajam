export type User = {
	name: string
	tel: string
	birthday: string
}

export type Employ = Omit<User, 'birthday'> & {
	email: string
}

export type Call = {
	subject: string
	from: User
	to: Employ
}

export type CallArchived = Call & {
	createdAt: Date
}

export type Entry = {
	user: User
	employ: Employ
}
