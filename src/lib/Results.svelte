<script lang="ts">
	import type { FuseResult } from 'fuse.js'
	import type { Item } from './types'
	import { Cake, Phone, SquareUserRound, User } from '@lucide/svelte'
	import Highlight from './Highlight.svelte'

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
	{#each results.slice(0, 20) as { matches, item }, index (item.id)}
		{@const isSelected = index === focusIndex}

		{#if item.type === 'client'}
			{@const { client, employe } = item}
			<button
				onmouseenter={() => (focusIndex = index)}
				onfocus={() => (focusIndex = index)}
				onclick={() => onSelectItem(item)}
				class="rounded-md border border-base-300 bg-base-100 px-4 py-2 shadow ring-accent"
				class:shadow-lg={isSelected}
				class:ring={isSelected}
			>
				<h4 class="mb-1 flex items-center font-bold">
					<User class="h-5 opacity-70" />
					<Highlight key="client.name" value={client.name} {matches} />
				</h4>
				<div class="flex flex-wrap gap-2 text-xs">
					<div class="flex items-center">
						<Cake class="h-3 opacity-70" />
						<div class="font-mono whitespace-nowrap">
							<Highlight key="client.birthday" value={client.birthday} {matches} />
						</div>
					</div>
					{#if client.phone}
						<div class="flex items-center gap-1">
							<Phone class="w-3 opacity-70" />
							<div class="font-mono whitespace-nowrap">
								<Highlight key="client.phone" value={client.phone} {matches} />
							</div>
						</div>
					{/if}
					<div class="flex items-center whitespace-nowrap" title="Assisté par {employe.name}">
						<SquareUserRound class="h-3 opacity-70" />
						<div>
							<Highlight key="employe.name" value={employe.name} {matches} />
						</div>
						{employe.phone}
					</div>
				</div>
			</button>
		{/if}
	{:else}
		<div class="grid place-content-center opacity-40 bg-base-200 min-h-32 rounded-md font-light">
			<span>Pas de résultat :(</span>
		</div>
	{/each}
</div>
