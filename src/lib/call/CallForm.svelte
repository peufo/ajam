<script lang="ts">
	import { Archive } from '@lucide/svelte'
	import type { Call } from '$lib/types'
	import CallActions from './CallActions.svelte'

	const emptyCall: Call = {
		subject: '',
		from: {
			name: '',
			phone: '',
			birthday: '',
			email: ''
		},
		to: {
			name: '',
			phone: '',
			birthday: '',
			email: 'prout@gmail.com'
		}
	}

	let call = $state(structuredClone(emptyCall))

	function archiveCall() {
		console.log('TODO: do something with call')
		call = structuredClone(emptyCall)
	}
</script>

<form class="rounded-lg border border-base-200 p-4 shadow-xl">
	<div class="flex flex-col gap-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">Appelant</legend>
			<div class="grid grid-cols-2 gap-2">
				<input type="text" class="input" placeholder="Nom" bind:value={call.from.name} />
				<input type="tel" class="input" placeholder="Téléphone" bind:value={call.from.phone} />
			</div>
		</fieldset>

		<textarea class="textarea w-full" placeholder="Sujet" bind:value={call.subject}></textarea>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">Destinataire</legend>
			<input type="text" class="input w-full" placeholder="Nom" bind:value={call.to.name} />
		</fieldset>

		<CallActions {call}>
			<button class="btn col-span-2" onclick={archiveCall}>
				<Archive class="h-5" />
				Archiver
			</button>
		</CallActions>
	</div>
</form>
