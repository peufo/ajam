<script lang="ts">
	import { Cake, Phone, SquareUserRound, User } from '@lucide/svelte'
	import type { ItemClient } from './types'
	import Highlight from './Highlight.svelte'
	import type { FuseResultMatch } from 'fuse.js'

	type Props = {
		item: ItemClient
		matches?: readonly FuseResultMatch[]
	}

	let { item, matches }: Props = $props()
	let { client, employe } = $derived(item)
</script>

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

		<Highlight key="employe.name" value={employe.name} {matches} />

		{#if employe.phone}
			<span class="ml-1 badge badge-ghost badge-xs">
				<Phone class="w-2 translate-x-0.5 opacity-70" />
				{employe.phone}
			</span>
		{/if}
	</div>
</div>
