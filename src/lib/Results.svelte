<script lang="ts">
	import type { FuseResult } from 'fuse.js'
	import type { Entry } from './types'
	import { Cake, Phone } from '@lucide/svelte'
	import Highlight from './Highlight.svelte'

	let { results }: { results: FuseResult<Entry>[] } = $props()
</script>

<div class="grid grow grid-cols-2 gap-x-0.5 gap-y-2 p-4">
	<h3 class="text-center">Bénéficiaire</h3>
	<h3 class="text-center">Assistant</h3>

	{#each results.slice(0, 20) as { matches, item: { user, employ } }}
		<div class="rounded-l-md bg-base-300 px-4 py-2">
			<h4 class="font-bold">
				<Highlight key="user.name" value={user.name} {matches} />
			</h4>
			<div class="flex items-center gap-1 text-xs">
				<Phone class="w-3" />
				<span>{user.tel}</span>
				<Cake class="h-4" />
				<span>{user.birthday}</span>
			</div>
		</div>
		<div class="rounded-r-md bg-base-300 px-4 py-2">
			<h4 class="font-bold">{employ.name}</h4>

			<div class="flex items-center gap-1 text-xs">
				<Phone class="w-3" />
				<span>{employ.tel}</span>
			</div>
		</div>
	{:else}
		<div class="col-span-2 grid place-content-center opacity-40 bg-base-200 min-h-52 rounded-lg">
			No results
		</div>
	{/each}
</div>
