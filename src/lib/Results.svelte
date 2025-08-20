<script lang="ts">
	import type { FuseResult } from 'fuse.js'
	import type { Entry } from './types'
	import { Cake, Phone, SquareUserRound } from '@lucide/svelte'
	import Highlight from './Highlight.svelte'

	let { results, focusIndex = $bindable() }: { results: FuseResult<Entry>[]; focusIndex: number } =
		$props()
</script>

<div class="flex flex-col gap-4">
	{#each results.slice(0, 20) as { matches, item: { client, employ } }, index}
		{@const isSelected = index === focusIndex}

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			onmouseenter={() => (focusIndex = index)}
			class="rounded-md border border-base-300 bg-base-100 px-4 py-2 shadow ring-accent"
			class:shadow-lg={isSelected}
			class:ring={isSelected}
		>
			<h4 class="font-bold">
				<Highlight key="client.name" value={client.name} {matches} />
			</h4>
			<div class="flex gap-2 text-xs">
				<div class="flex items-center gap-1">
					<Phone class="w-3" />
					<div class="font-mono">
						<Highlight key="client.phone" value={client.phone} {matches} />
					</div>
				</div>
				<div class="flex items-center">
					<Cake class="h-4" />
					<div class="font-mono">
						<Highlight key="client.birthday" value={client.birthday} {matches} />
					</div>
				</div>
				<div class=" flex items-center" title="Assisté par {employ.name}">
					<SquareUserRound class="h-4" />
					<div>
						<Highlight key="employ.name" value={employ.name} {matches} />
					</div>
				</div>
			</div>
		</div>
	{:else}
		<div class="grid place-content-center opacity-40 bg-base-200 min-h-32 rounded-md font-light">
			<span>Pas de résultat :(</span>
		</div>
	{/each}
</div>
