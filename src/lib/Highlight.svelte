<script lang="ts">
	import type { FuseResultMatch } from 'fuse.js'

	type Span = { value: string; isMatch: boolean }

	let {
		key,
		matches,
		value
	}: { key: string; value: string; matches?: readonly FuseResultMatch[] } = $props()
	let spans = $derived.by<Span[]>(() => {
		const { indices } = matches?.find((m) => m.key === key) || {}
		if (!indices?.length) {
			return [{ value, isMatch: false }]
		}
		const _spans: Span[] = []
		if (indices[0][0] !== 0) {
			_spans.push({ value: value.slice(0, indices[0][0]), isMatch: false })
		}
		const len = indices.length
		for (let index = 0; index < len; index++) {
			const [start, end] = indices[index]
			const nextStart = index === len - 1 ? undefined : indices[index + 1][0]
			_spans.push({ value: value.slice(start, end + 1), isMatch: true })
			console.log({ value, start, end, nextStart, index })
			if (end < value.length) {
				_spans.push({ value: value.slice(end + 1, nextStart), isMatch: false })
			}
		}
		return _spans
	})
</script>

<span>{value}</span>
{#each spans as { value, isMatch }}
	<span class={isMatch ? 'rounded-xs bg-accent/50 text-accent-content' : ''}>
		{value}
	</span>
{/each}
