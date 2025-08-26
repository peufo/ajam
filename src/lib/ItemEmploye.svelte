<script lang="ts">
	import { BriefcaseBusiness, MapPin, Phone, SquareUserRound } from '@lucide/svelte'
	import type { ItemEmploye } from './types'
	import Highlight from './Highlight.svelte'
	import type { FuseResultMatch } from 'fuse.js'

	type Props = {
		item: ItemEmploye
		matches?: readonly FuseResultMatch[]
	}

	let { item, matches }: Props = $props()
	let { employe } = $derived(item)
</script>

<h4 class="mb-1 flex items-center font-bold">
	<SquareUserRound class="h-5 opacity-70" />
	<Highlight key="employe.name" value={employe.name} {matches} />
</h4>
<div class="flex flex-wrap gap-2 text-xs">
	{#if employe.phone}
		<div class="flex items-center gap-1">
			<Phone class="w-3 opacity-70" />
			<div class="font-mono whitespace-nowrap">
				<Highlight key="employe.phone" value={employe.phone} {matches} />
			</div>
		</div>
	{/if}
	{#if employe.email}
		<div class="flex items-center gap-1">
			<Phone class="w-3 opacity-70" />
			<div class="font-mono whitespace-nowrap">
				<Highlight key="employe.email" value={employe.email} {matches} />
			</div>
		</div>
	{/if}
	{#if employe.city || employe.street}
		<div class="flex items-center gap-1">
			<MapPin class="w-3 opacity-70" />
			<div class="whitespace-nowrap">
				<Highlight key="employe.city" value={employe.city} {matches} />
				<span class="mx-1"></span>
				<Highlight key="employe.street" value={employe.street} {matches} />
			</div>
		</div>
	{/if}
	{#if employe.jobGroup || employe.jobTitle}
		<div class="flex items-center gap-1">
			<BriefcaseBusiness class="w-3 opacity-70" />
			<div class="whitespace-nowrap">
				<Highlight key="employe.jobGroup" value={employe.jobGroup} {matches} />
				<span class="mx-1"></span>
				<Highlight key="employe.jobTitle" value={employe.jobTitle} {matches} />
			</div>
		</div>
	{/if}
</div>
