<script lang="ts">
	interface Settings {
		displayName: string;
		email: string;
		emailNotifications: boolean;
		theme: 'light' | 'dark' | 'auto';
		density: 'comfortable' | 'compact';
	}

	let settings = $state<Settings>({
		displayName: 'Ada Lovelace',
		email: 'ada@analytical.engine',
		emailNotifications: true,
		theme: 'auto',
		density: 'comfortable'
	});
</script>

<section class="page">
	<h1>2.3 — Object $state</h1>

	<p class="lede">
		Real apps don't store settings as six loose variables — they group them into an object.
		Svelte 5 makes that feel natural: objects passed to <code>$state</code> are
		<strong>deep-reactive</strong> by default.
	</p>

	<p>
		When you do <code>let user = $state(&#123; name: 'Ada' &#125;)</code>, Svelte wraps the
		outer object in a proxy — and any nested object, array, or value you reach through it
		gets wrapped too, lazily, as you touch it. That means
		<code>user.name = 'Billy'</code> triggers updates on everything that read
		<code>user.name</code>, even though you mutated a property instead of reassigning the
		whole object. No spread, no immutable update helpers.
	</p>

	<p>
		Type the shape with an <code>interface</code> and pass it as a generic:
		<code>$state&lt;Settings&gt;(&#123; … &#125;)</code>. TypeScript will then catch typos
		and wrong enum values across every field.
	</p>

	<p>
		Deep reactivity is what you want for UI-shaped data where you bind nested fields. For
		very large datasets where every read paying the proxy tax hurts, there's an escape
		hatch called <code>$state.raw</code> — we'll meet it in lesson 2.5.
	</p>

	<div class="demo">
		<form class="settings-form" onsubmit={(e) => e.preventDefault()}>
			<label class="field">
				<span>Display name</span>
				<input type="text" bind:value={settings.displayName} />
			</label>

			<label class="field">
				<span>Email</span>
				<input type="email" bind:value={settings.email} />
			</label>

			<label class="checkbox">
				<input type="checkbox" bind:checked={settings.emailNotifications} />
				<span>Email notifications</span>
			</label>

			<fieldset>
				<legend>Theme</legend>
				<label><input type="radio" bind:group={settings.theme} value="light" /> Light</label>
				<label><input type="radio" bind:group={settings.theme} value="dark" /> Dark</label>
				<label><input type="radio" bind:group={settings.theme} value="auto" /> Auto</label>
			</fieldset>

			<fieldset>
				<legend>Density</legend>
				<label>
					<input type="radio" bind:group={settings.density} value="comfortable" /> Comfortable
				</label>
				<label>
					<input type="radio" bind:group={settings.density} value="compact" /> Compact
				</label>
			</fieldset>
		</form>

		<aside class="preview" data-theme={settings.theme} data-density={settings.density}>
			<p class="preview-label">Live preview</p>
			<h4>{settings.displayName || 'Unnamed user'}</h4>
			<p class="email">{settings.email || 'no email set'}</p>
			<p class="meta">
				{settings.emailNotifications ? 'Emails: on' : 'Emails: off'} · theme:
				{settings.theme} · {settings.density}
			</p>
		</aside>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Objects in <code>$state</code> are deep-reactive — mutate nested fields directly.</li>
		<li>Type object state with an <code>interface</code> and a generic parameter.</li>
		<li><code>bind:value</code>, <code>bind:checked</code>, and <code>bind:group</code> all write back into the object.</li>
		<li>Grouping related fields into an object scales cleanly as the form grows.</li>
		<li>Deep reactivity is great for UI; <code>$state.raw</code> exists for huge payloads.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.lede {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	p {
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.92em;
		background: var(--color-surface-2);
		padding: 0.1em 0.35em;
		border-radius: var(--radius-sm);
		color: var(--color-text);
	}

	.demo {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.settings-form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	input[type='text'],
	input[type='email'] {
		font: inherit;
		font-size: var(--text-base);
		font-weight: 400;
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		transition: border-color var(--dur-fast) var(--ease-out);

		&:focus {
			outline: none;
			border-color: var(--color-brand);
		}
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
	}

	fieldset {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);

		& legend {
			font-size: var(--text-sm);
			font-weight: 600;
			padding: 0 var(--space-xs);
			color: var(--color-text);
		}

		& label {
			display: flex;
			align-items: center;
			gap: 0.35em;
			font-size: var(--text-sm);
			color: var(--color-text-muted);
		}
	}

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		border-radius: var(--radius-lg);
		border: 1px solid var(--color-border);
		background: var(--color-surface-2);
		color: var(--color-text);
		transition: background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out);

		&[data-theme='light'] {
			background: oklch(98% 0.01 270);
			color: oklch(20% 0.02 270);
		}

		&[data-theme='dark'] {
			background: oklch(22% 0.02 270);
			color: oklch(95% 0.01 270);
		}

		&[data-density='compact'] {
			gap: var(--space-xs);
			padding: var(--space-sm);
		}

		& h4 {
			font-size: var(--text-lg);
			margin: 0;
		}

		& .preview-label {
			font-size: var(--text-xs);
			text-transform: uppercase;
			letter-spacing: 0.08em;
			color: var(--color-text-muted);
			margin: 0;
		}

		& .email {
			font-family: var(--font-mono);
			font-size: var(--text-sm);
			margin: 0;
		}

		& .meta {
			font-size: var(--text-xs);
			opacity: 0.8;
			margin: 0;
		}
	}

	h3 {
		font-size: var(--text-lg);
		margin-top: var(--space-sm);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-left: var(--space-md);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.demo {
			grid-template-columns: 1fr 1fr;
			align-items: start;
			padding: var(--space-lg);
		}
	}
</style>
