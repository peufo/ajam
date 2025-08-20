<script lang="ts">
	import { Mail, Phone as PhoneIcon } from '@lucide/svelte'
	import type { Phone } from '$lib/types'
	import type { Snippet } from 'svelte'

	let { phone, children }: { phone: Phone; children?: Snippet } = $props()

	function getPhoneIncommingMail(phone: Phone): string {
		if (!phone.to.email || !phone.from.name) return ''
		const to = phone.to.email
		const subject = `Appel de ${phone.from.name}`
		let body = `Salut,\n\n${phone.from.name} `
		if (!phone.subject) {
			body += 'a tenter de te contacter par téléphone.'
		} else {
			body += 'souhaite de te contacter à ce sujet :\n\n\t'
			body += phone.subject.replaceAll('\n', '\n\t')
		}
		body += '\n\nCordialement\n\nJonas Voisard (Le nouveau civiliste admin)'
		return encodeURI(`mailto:${to}?subject=${subject}&body=${body}`)
	}
</script>

<div class="grid grid-cols-2 gap-2">
	<a class="btn gap-4" href="tel:{phone.to.phone}">
		<PhoneIcon class="h-5" />
		{phone.to.phone}
	</a>
	<a href={getPhoneIncommingMail(phone)} class="btn">
		<Mail class="h-5" />
		Notifier par mail
	</a>

	{@render children?.()}
</div>
