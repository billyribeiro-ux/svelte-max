<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let name = $state('');
	let email = $state('');

	/* Restore field values from server on failed validation (progressive enhancement) */
	$effect(() => {
		if (form && !form.success) {
			name = form.name ?? '';
			email = form.email ?? '';
		}
	});
	let submitting = $state(false);
	let touched = $state({ name: false, email: false });

	/* Client-side validation */
	let nameError = $derived(touched.name && !name.trim() ? 'Name is required' : '');
	let emailError = $derived(
		touched.email
			? !email.trim()
				? 'Email is required'
				: !/^[^@]+@[^@]+\.[^@]+$/.test(email)
					? 'Invalid email format'
					: ''
			: ''
	);
	let isValid = $derived(name.trim() !== '' && /^[^@]+@[^@]+\.[^@]+$/.test(email));

	let serverErrors = $derived(form?.errors ?? {});

	/* Auto-trigger PDF download on success */
	$effect(() => {
		if (form?.success && form?.downloadUrl) {
			const link = document.createElement('a');
			link.href = form.downloadUrl;
			link.download = 'svelte-cheat-sheet.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	});

	function focusFirstError() {
		requestAnimationFrame(() => {
			const el = document.querySelector<HTMLElement>('[data-error="true"]');
			el?.focus();
		});
	}
</script>

<svelte:head>
	<title>Get the Svelte 5 Cheat Sheet</title>
</svelte:head>

<div class="cta-page">
	<div class="cta-card">
		{#if form?.success}
			<div class="success-state" role="status">
				<div class="success-icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
					</svg>
				</div>
				<h2 style="text-wrap: balance">You're in, {form.name}!</h2>
				<p style="text-wrap: pretty">Check your downloads -- the Svelte 5 Cheat Sheet is on its way. Welcome to the community.</p>
				<a href="/contact/cta" class="btn-secondary">Download again</a>
			</div>
		{:else}
			<div class="badge" aria-hidden="true">Free Resource</div>

			<h1 style="text-wrap: balance">Get the Svelte 5 Cheat Sheet</h1>
			<p class="subtitle" style="text-wrap: pretty">
				Runes, snippets, SvelteKit routing, OKLCH tokens, and more --
				everything you need on a single, beautifully designed PDF.
			</p>

			<div class="social-proof">
				<div class="avatars" aria-hidden="true">
					<span class="dot" style="background: oklch(70% 0.2 30)"></span>
					<span class="dot" style="background: oklch(70% 0.2 150)"></span>
					<span class="dot" style="background: oklch(70% 0.2 270)"></span>
				</div>
				<span>Join <strong>2,400+</strong> developers</span>
			</div>

			{#if form?.errors && Object.keys(form.errors).length > 0}
				<div class="error-banner" role="alert" aria-live="polite">
					<strong>Please fix the errors below</strong>
				</div>
			{/if}

			<form
				method="POST"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
						if (form?.errors) focusFirstError();
					};
				}}
				novalidate
			>
				<div class="field">
					<label for="cta-name">Name</label>
					<input
						id="cta-name"
						name="name"
						type="text"
						autocomplete="name"
						placeholder="Jane Doe"
						bind:value={name}
						onblur={() => (touched.name = true)}
						data-error={!!(nameError || serverErrors.name)}
						aria-describedby={nameError || serverErrors.name ? 'cta-name-error' : undefined}
						aria-invalid={!!(nameError || serverErrors.name)}
					/>
					{#if nameError || serverErrors.name}
						<p class="field-error" id="cta-name-error" role="alert" aria-live="polite">
							{nameError || serverErrors.name}
						</p>
					{/if}
				</div>

				<div class="field">
					<label for="cta-email">Email</label>
					<input
						id="cta-email"
						name="email"
						type="email"
						autocomplete="email"
						placeholder="jane@example.com"
						bind:value={email}
						onblur={() => (touched.email = true)}
						data-error={!!(emailError || serverErrors.email)}
						aria-describedby={emailError || serverErrors.email ? 'cta-email-error' : undefined}
						aria-invalid={!!(emailError || serverErrors.email)}
					/>
					{#if emailError || serverErrors.email}
						<p class="field-error" id="cta-email-error" role="alert" aria-live="polite">
							{emailError || serverErrors.email}
						</p>
					{/if}
				</div>

				<button type="submit" class="btn-cta" disabled={submitting}>
					{#if submitting}
						<span class="spinner" aria-hidden="true"></span>
						Processing...
					{:else}
						Download Free Cheat Sheet
					{/if}
				</button>

				<p class="disclaimer">No spam, ever. Unsubscribe anytime.</p>
			</form>
		{/if}
	</div>
</div>

<style>
	.cta-page {
		inline-size: 100%;
		max-inline-size: 36rem;
	}

	/* ── Card ── */
	.cta-card {
		position: relative;
		background:
			linear-gradient(
				135deg,
				oklch(from var(--color-brand) calc(l + 0.3) 0.04 h) 0%,
				var(--color-surface-1) 40%
			);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--space-xl) var(--space-lg);
		box-shadow: var(--shadow-lg);
		text-align: center;
	}

	.badge {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: oklch(from var(--color-brand) l c h / 0.12);
		color: var(--color-brand);
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		margin-block-end: var(--space-md);
	}

	.cta-card h1 {
		font-size: var(--text-xl);
		color: var(--color-text);
		margin-block-end: var(--space-sm);
	}

	.subtitle {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-block-end: var(--space-md);
	}

	/* ── Social proof ── */
	.social-proof {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-block-end: var(--space-lg);
	}

	.avatars {
		display: flex;

		& .dot {
			display: block;
			inline-size: 1.5rem;
			block-size: 1.5rem;
			border-radius: var(--radius-full);
			border: 2px solid var(--color-surface-1);
			margin-inline-start: -0.4rem;

			&:first-child {
				margin-inline-start: 0;
			}
		}
	}

	/* ── Error banner ── */
	.error-banner {
		background: oklch(from var(--color-error) l c h / 0.1);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		margin-block-end: var(--space-md);
		color: var(--color-error);
		font-size: var(--text-sm);
	}

	/* ── Fields ── */
	form {
		text-align: start;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-block-end: var(--space-md);
	}

	label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	input {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-base);
		transition: border-color var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out);

		&::placeholder {
			color: var(--color-text-muted);
			opacity: 0.5;
		}

		&:focus {
			outline: none;
			border-color: var(--color-brand);
			box-shadow: 0 0 0 3px oklch(from var(--color-brand) l c h / 0.15);
		}

		&[data-error='true'] {
			border-color: var(--color-error);

			&:focus {
				box-shadow: 0 0 0 3px oklch(from var(--color-error) l c h / 0.15);
			}
		}
	}

	.field-error {
		font-size: var(--text-xs);
		color: var(--color-error);
		margin: 0;
	}

	/* ── CTA Button ── */
	.btn-cta {
		inline-size: 100%;
		padding: var(--space-sm) var(--space-lg);
		border: none;
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: oklch(100% 0 0);
		font-size: var(--text-base);
		font-weight: 700;
		cursor: pointer;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		transition: background var(--dur-fast) var(--ease-out),
					opacity var(--dur-fast) var(--ease-out);

		&:hover:not(:disabled) {
			background: var(--color-brand-dim);
		}

		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
	}

	.disclaimer {
		text-align: center;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-block-start: var(--space-sm);
	}

	/* ── Spinner ── */
	.spinner {
		display: inline-block;
		inline-size: 1.25em;
		block-size: 1.25em;
		border: 2px solid oklch(100% 0 0 / 0.3);
		border-block-start-color: oklch(100% 0 0);
		border-radius: var(--radius-full);
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { rotate: 1turn; }
	}

	/* ── Success state ── */
	.success-state {
		animation: card-enter var(--dur-slow) var(--ease-spring) both;

		@starting-style {
			opacity: 0;
			translate: 0 1rem;
		}

		& h2 {
			font-size: var(--text-xl);
			margin-block-end: var(--space-xs);
		}

		& p {
			font-size: var(--text-sm);
			color: var(--color-text-muted);
			margin-block-end: var(--space-lg);
		}
	}

	@keyframes card-enter {
		from {
			opacity: 0;
			translate: 0 1rem;
		}
	}

	.success-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		inline-size: 4rem;
		block-size: 4rem;
		border-radius: var(--radius-full);
		background: oklch(from var(--color-success) l c h / 0.12);
		color: var(--color-success);
		margin-block-end: var(--space-md);

		& svg {
			inline-size: 2rem;
			block-size: 2rem;
		}
	}

	.btn-secondary {
		display: inline-block;
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		text-decoration: none;
		font-weight: 600;
		font-size: var(--text-sm);
		transition: background var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-border);
			color: var(--color-text);
		}
	}
</style>
