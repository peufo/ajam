<script lang="ts">
	import { Mail, Phone } from '@lucide/svelte'
	import type { Call } from './types'
	import type { Snippet } from 'svelte'

	let { call, children }: { call: Call; children?: Snippet } = $props()

	function getCallMail(call: Call): string {
		if (!call.to.email || !call.from.name) return ''
		const to = call.to.email
		const subject = `Appel de ${call.from.name}`
		let body = `Salut,\n${call.from.name}`
		if (!call.subject) {
			body += ` souhaite de te contacter par téléphone.\n\n`
		} else {
			body += ` souhaite de te contacter à ce sujet :\n\n${call.subject}`
		}
		body += 'Cordialement\nJonas Voisard (Le nouveau civiliste admin)'

		return encodeURI(`mailto:${to}?subject=${subject}&body=${body}`)
	}
</script>

<div class="grid grid-cols-2 gap-2">
	<a class="btn gap-4" href="tel:{call.to.tel}">
		<Phone class="h-5" />
		{call.to.tel}
	</a>
	<a href={getCallMail(call)} class="btn">
		<Mail class="h-5" />
		Notifiy
	</a>

	{@render children?.()}
</div>
