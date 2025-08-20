<script lang="ts">
	import CallForm from '$lib/call/CallForm.svelte'
	import SearchClient from '$lib/SearchClient.svelte'
	import { Inbox, PhoneIncoming } from '@lucide/svelte'
	import { onMount } from 'svelte'

	let action = $state<'phoneIncoming' | 'mailIncoming'>('phoneIncoming')

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
</script>

<main class="flex items-start gap-6 p-4">
	<SearchClient />

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
