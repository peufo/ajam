import type { Item, ItemEmploye } from './types'

const colsHeader = {
	type: 'Type part.',
	id: 'N° int. partenaire',
	firstName: 'Prénom',
	lastName: 'Nom',
	manager: 'Coll.resp.',
	street: 'Rue',
	zipCode: 'NPA',
	city: 'Localité',
	avs: 'N° AVS',
	birthday: 'Dat.naiss.',
	phone: 'Tél. priv.',
	phone2: 'Téléphone prof.',
	email: 'e-mail',
	title: 'Titre',
	jobTitle: 'Titre prof.',
	jobGroup: 'Groupe de profession'
} satisfies Record<string, string>

const valueToEntryType: Record<string, Item['type']> = {
	'Client/e': 'client',
	Collaborateur: 'employe',
	'Adr. de facturation': 'address'
}

type Column = keyof typeof colsHeader
type Cell = (key: Column) => string

export function parseCSV(content: string): Item[] {
	const [firstRow, ...rows] = content.split('\n')
	const headers = firstRow.split(';')
	const cols = Object.entries(colsHeader).reduce(
		(acc, [key, label]) => {
			const index = headers.indexOf(label)
			if (index === -1) throw new Error(`Header "${label}" not found`)
			return { ...acc, [key]: index }
		},
		{} as Record<keyof typeof colsHeader, number>
	)
	const useCell = (row: string[]) => (key: Column) => row[cols[key]]
	const getName = (cell: Cell) => `${cell('lastName')} ${cell('firstName')}`.replace(/\(\w+\) /, '')

	const parser: { [T in Item['type']]: (cell: Cell, id: number) => Item & { type: T } } = {
		employe: (cell, id) => ({
			id,
			type: 'employe',
			employe: {
				name: getName(cell),
				email: cell('email'),
				phone: cell('phone') || cell('phone2'),
				birthday: cell('birthday'),
				street: cell('street'),
				zipCode: cell('zipCode'),
				city: cell('city'),
				jobTitle: cell('jobTitle'),
				jobGroup: cell('jobGroup')
			}
		}),
		address: (cell, id) => ({
			id,
			type: 'address',
			address: {
				name: cell('firstName'),
				street: cell('street'),
				zipCode: cell('zipCode'),
				city: cell('city')
			}
		}),
		client: (cell, id) => ({
			id,
			type: 'client',
			client: {
				name: getName(cell),
				email: cell('email'),
				phone: cell('phone').trim() || cell('phone2').trim(),
				birthday: cell('birthday'),
				street: cell('street'),
				zipCode: cell('zipCode'),
				city: cell('city')
			},
			employe: {
				name: cell('manager').replace(/\(\w+\) /, ''),
				email: '',
				phone: '',
				birthday: '',
				street: '',
				zipCode: '',
				city: '',
				jobTitle: '',
				jobGroup: ''
			}
		})
	}

	const items: Item[] = []
	let id = 0
	for (const row of rows) {
		const cell = useCell(row.split(';'))
		const type = valueToEntryType[cell('type')]
		if (!type) {
			// console.warn(`The value "${row[typeIndex]}" can't be parsed on entryType`)
			continue
		}
		items.push(parser[type](cell, id++))
	}

	// lookup employ fields in clients
	for (const item of items) {
		if (item.type === 'client') {
			const itemEmploye = items.find(
				(el) => el.type === 'employe' && el.employe.name === item.employe.name
			) as ItemEmploye | undefined
			if (itemEmploye) {
				item.employe = itemEmploye.employe
			}
		}
	}

	return items
}
