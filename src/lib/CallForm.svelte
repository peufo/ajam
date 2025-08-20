<script lang="ts">
	import { Archive } from '@lucide/svelte'
	import type { FormEventHandler } from 'svelte/elements'
	import type { Call } from './types'
	import CallActions from './CallActions.svelte'

	let { onsearch }: { onsearch: (value: string) => void } = $props()

	const emptyCall: Call = {
		subject: '',
		from: {
			name: '',
			tel: '',
			birthday: ''
		},
		to: {
			name: '',
			tel: '',
			email: 'prout@gmail.com'
		}
	}

	let call = $state(structuredClone(emptyCall))

	function archiveCall() {
		console.log('TODO: do something with call')
		call = structuredClone(emptyCall)
	}

	const oninput: FormEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
		onsearch(value)
	}
</script>

<form class="rounded-lg border border-base-200 p-4 shadow-xl">
	<div class="flex flex-col gap-4">
		<fieldset class="fieldset">
			<legend class="fieldset-legend">To</legend>
			<input
				type="text"
				class="input w-full"
				placeholder="Name"
				bind:value={call.to.name}
				{oninput}
			/>
		</fieldset>

		<fieldset class="fieldset">
			<legend class="fieldset-legend">From</legend>
			<div class="grid grid-cols-2 gap-2">
				<input type="text" class="input" placeholder="Name" bind:value={call.from.name} {oninput} />
				<input type="tel" class="input" placeholder="Phone" bind:value={call.from.tel} />
			</div>
		</fieldset>

		<textarea class="textarea w-full" placeholder="Subject" bind:value={call.subject}></textarea>

		<CallActions {call}>
			<button class="btn col-span-2" onclick={archiveCall}>
				<Archive class="h-5" />
				Archive
			</button>
		</CallActions>
	</div>
</form>
