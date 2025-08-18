export type User = {
	name: string
	tel: string
}

export type Employ = User & {
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
