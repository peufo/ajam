<script lang="ts">
	import type { Item } from '$lib/types'

	import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js'
	import Results from '$lib/Results.svelte'
	import { Search } from '@lucide/svelte'
	import { onMount } from 'svelte'

	let { items }: { items: Item[] } = $props()

	const options: IFuseOptions<Item> = {
		keys: ['client.name', 'client.phone', 'client.birthday', 'employ.name'],
		includeMatches: true,
		minMatchCharLength: 1,
		includeScore: true
	}

	let fuse = new Fuse([], options)
	$effect(() => {
		fuse.setCollection(items)
	})

	let results = $state<FuseResult<Item>[]>([])
	let searchInput = $state<HTMLInputElement>()
	let focusIndex = $state(0)

	function searchClient(value: string) {
		results = fuse.search(value)
		focusIndex = 0
	}

	onMount(() => {
		function handleShortcut(event: KeyboardEvent) {
			const { metaKey, ctrlKey, key } = event
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

	const selectChange: Record<string, () => void> = {
		ArrowUp: () => {
			focusIndex = Math.max(0, focusIndex - 1)
		},
		ArrowDown: () => {
			focusIndex = Math.min(results.length - 1, focusIndex + 1)
		}
	}

	function onkeydown(event: KeyboardEvent) {
		if (selectChange[event.key]) {
			event.preventDefault()
			selectChange[event.key]()
		}
	}
</script>

<div class="w-sm grow">
	<label class="input mb-6 w-full">
		<Search class="h-5 opacity-70" />
		<input
			bind:this={searchInput}
			oninput={(e) => searchClient(e.currentTarget.value)}
			{onkeydown}
			type="search"
			placeholder="Recherche"
		/>
		<kbd class="kbd kbd-xs text-base-content/50">⌘ K</kbd>
	</label>

	<Results {results} bind:focusIndex />
</div>
