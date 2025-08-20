import type { Entry, EntryEmploy, EntryType } from './types'

const valueToEntryType: Record<string, EntryType> = {
	'Client/e': 'client',
	Collaborateur: 'employe',
	'Adr. de facturation': 'address'
}

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

type Column = keyof typeof colsHeader

function parseCSV(content: string): Entry[] {
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
	const useColumn = (row: string[]) => (key: Column) => row[cols[key]]

	const entries: Entry[] = []

	const parser: { [T in EntryType]: (row: string[]) => Entry & { type: T } } = {
		employe: (row) => {
			const col = useColumn(row)
			return {
				type: 'employe',
				employ: {
					name: `${col('firstName')} ${col('lastName')}`,
					email: col('email'),
					phone: col('phone') || col('phone2'),
					birthday: col('birthday')
				}
			}
		},
		address: (row) => {
			const col = useColumn(row)
			return {
				type: 'address',
				address: {
					name: col('firstName'),
					street: col('street'),
					zipCode: col('zipCode'),
					city: col('city')
				}
			}
		},
		client: (row) => {
			const col = useColumn(row)
			return {
				type: 'client',
				client: {
					name: `${col('firstName')} ${col('lastName')}`,
					email: col('email'),
					phone: col('phone') || col('phone2'),
					birthday: col('birthday')
				},
				employ: {
					name: col('manager'),
					email: '',
					phone: '',
					birthday: ''
				}
			}
		}
	}

	for (const line of rows) {
		const row = line.split(';')
		const entryType = valueToEntryType[row[cols.type]]
		if (!entryType) {
			// console.warn(`The value "${row[typeIndex]}" can't be parsed on entryType`)
			continue
		}
		entries.push(parser[entryType](row))
	}

	return entries
}
