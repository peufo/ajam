<script lang="ts">
	import CallForm from '$lib/CallForm.svelte'
	import type { Entry } from '$lib/types'

	import { entries } from '$lib/entries'
	import Fuse, { type FuseResult, type IFuseOptions } from 'fuse.js'
	import Results from '$lib/Results.svelte'

	const options: IFuseOptions<Entry> = {
		keys: ['user.name', 'user.birthday', 'employ.name'],
		includeMatches: true,
		minMatchCharLength: 1,
		includeScore: true
	}
	const fuse = new Fuse(entries, options)
	let results = $state<FuseResult<Entry>[]>([])

	function onsearch(value: string) {
		results = fuse.search(value)
	}
</script>

<main class="flex items-start gap-6 p-4">
	<div class="flex max-w-lg flex-col gap-6">
		<CallForm {onsearch} />
	</div>
	<Results {results} />
</main>
