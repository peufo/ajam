import type { Item, ItemEmploye } from './types'

const colsHeader = {
	type: 'Type part.',
	id: 'N°int. partenaire',
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
	title: 'Titre'
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
		(acc, [key, label]) => ({
			...acc,
			[key]: headers.indexOf(label)
		}),
		{} as Record<keyof typeof colsHeader, number>
	)
	if (cols.type === -1) {
		throw new Error('Header "Type part." not found')
	}
	const useCell = (row: string[]) => (key: Column) => row[cols[key]]
	const getName = (cell: Cell) => `${cell('firstName')} ${cell('lastName')}`.replace(/\(\w+\) /, '')

	const parser: { [T in Item['type']]: (cell: Cell) => Item & { type: T } } = {
		employe: (cell) => ({
			type: 'employe',
			employe: {
				name: getName(cell),
				email: cell('email'),
				phone: cell('phone') || cell('phone2'),
				birthday: cell('birthday')
			}
		}),
		address: (cell) => ({
			type: 'address',
			address: {
				name: cell('firstName'),
				street: cell('street'),
				zipCode: cell('zipCode'),
				city: cell('city')
			}
		}),
		client: (cell) => ({
			type: 'client',
			client: {
				name: getName(cell),
				email: cell('email'),
				phone: cell('phone').trim() || cell('phone2').trim(),
				birthday: cell('birthday')
			},
			employe: {
				name: cell('manager').replace(/\(\w+\) /, ''),
				email: '',
				phone: '',
				birthday: ''
			}
		})
	}

	const items: Item[] = []
	for (const row of rows) {
		const cell = useCell(row.split(';'))
		const type = valueToEntryType[cell('type')]
		if (!type) {
			// console.warn(`The value "${row[typeIndex]}" can't be parsed on entryType`)
			continue
		}
		items.push(parser[type](cell))
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
