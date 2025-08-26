<script lang="ts">
	import { Archive } from '@lucide/svelte'
	import type { Phone, Item, User } from '$lib/types'
	import PhoneFormActions from './PhoneFormActions.svelte'

	const emptyUser: User = {
		name: '',
		phone: '',
		birthday: '',
		email: '',
		city: '',
		street: '',
		zipCode: ''
	}

	const emptyPhone: Phone = {
		subject: '',
		from: structuredClone(emptyUser),
		to: structuredClone(emptyUser)
	}
	let phone = $state(structuredClone(emptyPhone))
	let subjectInput = $state<HTMLTextAreaElement>()
	function archivePhone() {
		console.log('TODO: do something with phone')
		phone = structuredClone(emptyPhone)
	}

	export function setItem(item: Item) {
		if (item.type === 'client') {
			Object.assign(phone.from, item.client)
			Object.assign(phone.to, item.employe)
			subjectInput?.focus()
		}
	}
</script>

<form class="rounded-lg border border-base-200 p-4 shadow-xl">
	<div class="flex flex-col gap-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Bénéficiaire</legend>
			<div class="grid grid-cols-2 gap-2">
				<input type="text" class="input" placeholder="Nom" bind:value={phone.from.name} />
				<input type="tel" class="input" placeholder="Téléphone" bind:value={phone.from.phone} />
			</div>
		</fieldset>

		<textarea
			bind:this={subjectInput}
			class="textarea w-full"
			placeholder="Sujet"
			bind:value={phone.subject}
		></textarea>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Responsable</legend>
			<input type="text" class="input w-full" placeholder="Nom" bind:value={phone.to.name} />
		</fieldset>

		<PhoneFormActions {phone}>
			<button class="btn col-span-2" onclick={archivePhone}>
				<Archive class="h-5" />
				Archiver
			</button>
		</PhoneFormActions>
	</div>
</form>
