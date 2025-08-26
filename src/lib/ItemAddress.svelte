<script lang="ts">
	import { Building2, Mailbox, MapPin } from '@lucide/svelte'
	import type { ItemAddress } from './types'
	import Highlight from './Highlight.svelte'
	import type { FuseResultMatch } from 'fuse.js'

	type Props = {
		item: ItemAddress
		matches?: readonly FuseResultMatch[]
	}

	let { item, matches }: Props = $props()
	let { address } = $derived(item)
</script>

<h4 class="mb-1 flex items-center font-bold">
	<MapPin class="h-5 opacity-70" />
	<Highlight key="address.name" value={address.name} {matches} />
</h4>
<div class="flex flex-wrap gap-2 text-xs">
	{#if address.street}
		<div class="flex items-center gap-1">
			<Mailbox class="w-3 opacity-70" />
			<div class="whitespace-nowrap">
				<Highlight key="address.street" value={address.street} {matches} />
			</div>
		</div>
	{/if}
	{#if address.city || address.zipCode}
		<div class="flex items-center gap-1">
			<Building2 class="w-3 opacity-70" />
			<div class="whitespace-nowrap">
				<Highlight key="address.zipCode" value={address.zipCode} {matches} />
				<span class="ml-1"></span>
				<Highlight key="address.city" value={address.city} {matches} />
			</div>
		</div>
	{/if}
</div>
