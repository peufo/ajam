<script lang="ts">
	import CallForm from '$lib/call/CallForm.svelte'
	import { parseCSV } from '$lib/parseCSV'
	import SearchClient from '$lib/SearchItems.svelte'
	import type { Item } from '$lib/types'
	import { Inbox, PhoneIncoming } from '@lucide/svelte'
	import { onMount } from 'svelte'
	import type { FormEventHandler } from 'svelte/elements'

	let action = $state<'phoneIncoming' | 'mailIncoming'>('phoneIncoming')

	let items = $state<Item[]>([])

	onMount(() => {
		function handleShortcut(event: KeyboardEvent) {
			const { metaKey, ctrlKey, key } = event
			if (!metaKey && !ctrlKey) {
				return
			}
			if (key === 'i') {
				action = 'phoneIncoming'
				return
			}
			if (key === 'o') {
				action = 'mailIncoming'
			}
		}
		window.addEventListener('keydown', handleShortcut)
		return () => {
			window.removeEventListener('keydown', handleShortcut)
		}
	})

	const handleInputFile: FormEventHandler<HTMLInputElement> = async (event) => {
		const [file] = event.currentTarget.files ?? []
		if (!file) return
		const content = await file.text()
		items = parseCSV(content)
	}
</script>

<main class="flex h-screen items-start gap-6 p-4">
	<div class="flex h-full flex-col gap-6">
		<SearchClient {items} />
		<input type="file" class="file-input w-full" oninput={handleInputFile} />
	</div>

	<div class="flex flex-col gap-6">
		<div role="tablist" class="tabs-border tabs gap-2">
			<button
				role="tab"
				class="tab gap-2 ring ring-base-200"
				class:tab-active={action === 'phoneIncoming'}
				onclick={() => (action = 'phoneIncoming')}
			>
				<PhoneIncoming class="h-4" />
				<span>Appel entrant</span>

				<kbd class="kbd px-1 kbd-xs text-base-content/50">⌘ I</kbd>
			</button>
			<button
				role="tab"
				class="tab gap-2 ring ring-base-200"
				class:tab-active={action === 'mailIncoming'}
				onclick={() => (action = 'mailIncoming')}
			>
				<Inbox class="h-4" />
				<span>Courrier entrant</span>
				<kbd class="kbd px-1 kbd-xs text-base-content/50">⌘ O</kbd>
			</button>
		</div>

		{#if action === 'phoneIncoming'}
			<CallForm />
		{:else if action === 'mailIncoming'}
			<span>TODO</span>
		{/if}
	</div>
</main>
