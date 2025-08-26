<script lang="ts">
	import type { Item } from '$lib/types'

	import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js'
	import Results from '$lib/Results.svelte'
	import { Search } from '@lucide/svelte'
	import { onMount } from 'svelte'

	let { items, onSelectItem }: { items: Item[]; onSelectItem: (item: Item) => void } = $props()
	let isFocus = $state(false)

	const optionsClients: IFuseOptions<Item> = {
		keys: ['client.name', 'client.phone', 'client.birthday', 'employe.name'],
		includeMatches: true,
		minMatchCharLength: 2,
		includeScore: true,
		threshold: 0.6
	}
	const optionsEmployes: IFuseOptions<Item> = {
		keys: [
			'employe.name',
			'employe.city',
			'employe.street',
			'employe.phone',
			'employe.email',
			'employe.jobGroup',
			'employe.jobTitle'
		],
		includeMatches: true,
		minMatchCharLength: 2,
		includeScore: true,
		threshold: 0.6
	}

	const optionsAddresses: IFuseOptions<Item> = {
		keys: ['address.name', 'address.zipCode', 'address.city', 'address.street'],
		includeMatches: true,
		minMatchCharLength: 2,
		includeScore: true,
		threshold: 0.6
	}

	let fuseClients = new Fuse([], optionsClients)
	let fuseEmployes = new Fuse([], optionsEmployes)
	let fuseAddresses = new Fuse([], optionsAddresses)
	$effect(() => {
		fuseClients.setCollection(items.filter(({ type }) => type === 'client'))
		fuseEmployes.setCollection(items.filter(({ type }) => type === 'employe'))
		fuseAddresses.setCollection(items.filter(({ type }) => type === 'address'))
	})

	let results = $state<FuseResult<Item>[]>([])
	let searchInput = $state<HTMLInputElement>()
	let focusIndex = $state(0)

	function searchClient(value: string) {
		const clients = fuseClients.search(value)
		const employes = fuseEmployes.search(value)
		const addresses = fuseAddresses.search(value)
		results = [...clients, ...employes, ...addresses].sort(
			(a, b) => (a.score || 0) - (b.score || 0)
		)
		focusIndex = 0
	}

	onMount(() => {
		function handleShortcut(event: KeyboardEvent) {
			const { metaKey, ctrlKey, key } = event
			if (isFocus && key === 'Enter') {
				event.preventDefault()
				onSelectItem(results[focusIndex].item)
				return
			}

			if ((metaKey || ctrlKey) && key === 'k') {
				searchInput?.select()
				return
			}
		}
		window.addEventListener('keydown', handleShortcut)
		return () => {
			window.removeEventListener('keydown', handleShortcut)
		}
	})

	const focusChange: Record<string, () => void> = {
		ArrowUp: () => {
			focusIndex = Math.max(0, focusIndex - 1)
		},
		ArrowDown: () => {
			focusIndex = Math.min(results.length - 1, focusIndex + 1)
		}
	}

	function onkeydown(event: KeyboardEvent) {
		if (focusChange[event.key]) {
			event.preventDefault()
			focusChange[event.key]()
		}
	}
</script>

<div class="min-h-0 w-sm grow overflow-auto p-2">
	<label class="input sticky top-0 z-10 mb-6 w-full bg-base-100/50 backdrop-blur-xs">
		<Search class="h-5 opacity-70" />
		<input
			bind:this={searchInput}
			oninput={(e) => searchClient(e.currentTarget.value)}
			onfocus={() => (isFocus = true)}
			onblur={() => (isFocus = false)}
			{onkeydown}
			type="search"
			placeholder="Recherche"
		/>
		<kbd class="kbd kbd-xs text-base-content/50">⌘ K</kbd>
	</label>

	<Results {results} {onSelectItem} bind:focusIndex />
</div>
