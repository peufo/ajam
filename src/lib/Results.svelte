<script lang="ts">
	import type { FuseResult } from 'fuse.js'
	import type { Item } from './types'
	import ItemClient from './ItemClient.svelte'
	import ItemEmploye from './ItemEmploye.svelte'
	import ItemAddress from './ItemAddress.svelte'

	let {
		results,
		focusIndex = $bindable(),
		onSelectItem
	}: {
		results: FuseResult<Item>[]
		focusIndex: number
		onSelectItem: (item: Item) => void
	} = $props()
</script>

<div class="flex min-h-0 flex-col gap-4">
	{#each results.slice(0, 20) as { matches, item, score }, index (item.id)}
		{@const isFocused = index === focusIndex}

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onmouseenter={() => (focusIndex = index)}
			onfocus={() => (focusIndex = index)}
			onclick={() => onSelectItem(item)}
			class="rounded-md border border-base-300 bg-base-100 px-4 py-2 shadow ring-accent"
			class:shadow-lg={isFocused}
			class:ring={isFocused}
		>
			{#if item.type === 'client'}
				<ItemClient {item} {matches} />
			{:else if item.type === 'employe'}
				<ItemEmploye {item} {matches} />
			{:else if item.type === 'address'}
				<ItemAddress {item} {matches} />
			{/if}
		</div>
	{:else}
		<div class="grid place-content-center opacity-40 bg-base-200 min-h-32 rounded-md font-light">
			<span>Pas de résultat :(</span>
		</div>
	{/each}
</div>
