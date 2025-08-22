<script lang="ts">
	import PhoneForm from '$lib/phone/PhoneForm.svelte'
	import { parseCSV } from '$lib/parseCSV'
	import SearchItem from '$lib/SearchItems.svelte'
	import type { Item } from '$lib/types'
	import { Inbox, PhoneIncoming } from '@lucide/svelte'
	import { onMount } from 'svelte'
	import type { FormEventHandler } from 'svelte/elements'

	let action = $state<'phoneIncoming' | 'mailIncoming'>('phoneIncoming')
	let items = $state<Item[]>([])
	let phoneForm = $state<PhoneForm>()

	onMount(() => {
		function handleShortcut(event: KeyboardEvent) {
			const { metaKey, ctrlKey, key } = event
			if (!metaKey && !ctrlKey) {
				return
			}
			if (key === 'i') {
				event.preventDefault()
				action = 'phoneIncoming'
				return
			}
			if (key === 'o') {
				event.preventDefault()
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

	function onSelectItem(item: Item) {
		if (action === 'phoneIncoming') {
			phoneForm?.setItem(item)
		}
	}
</script>

<main class="flex h-screen items-start gap-4 p-4">
	<div class="flex h-full flex-col gap-6">
		<SearchItem {items} {onSelectItem} />
		<input type="file" class="file-input m-2" oninput={handleInputFile} />
	</div>

	<div class="flex flex-col gap-6 pt-2">
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
			<PhoneForm bind:this={phoneForm} />
		{:else if action === 'mailIncoming'}
			<span>TODO</span>
		{/if}
	</div>
</main>
