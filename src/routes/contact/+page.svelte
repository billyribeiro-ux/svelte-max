<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	interface Props {
		form: ActionData;
	}

	let { form }: Props = $props();

	let name = $state('');
	let email = $state('');
	let subject = $state('');
	let message = $state('');

	/* Restore field values from server on failed validation (progressive enhancement) */
	$effect(() => {
		if (form && !form.success) {
			name = form.name ?? '';
			email = form.email ?? '';
			subject = form.subject ?? '';
			message = form.message ?? '';
		}
	});
	let submitting = $state(false);
	let touched = $state({ name: false, email: false, subject: false, message: false });

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
	let subjectError = $derived(touched.subject && !subject ? 'Please select a subject' : '');
	let messageError = $derived(
		touched.message
			? !message.trim()
				? 'Message is required'
				: message.trim().length < 20
					? 'Message must be at least 20 characters'
					: ''
			: ''
	);
	let isValid = $derived(
		name.trim() !== '' &&
		/^[^@]+@[^@]+\.[^@]+$/.test(email) &&
		subject !== '' &&
		message.trim().length >= 20
	);

	/* Server errors from form action */
	let serverErrors = $derived(form?.errors ?? {});

	function focusFirstError() {
		requestAnimationFrame(() => {
			const el = document.querySelector<HTMLElement>('[data-error="true"]');
			el?.focus();
		});
	}
</script>

<svelte:head>
	<title>Contact Us</title>
</svelte:head>

<div class="contact-page">
	{#if form?.success}
		<div class="success-card" role="status">
			<div class="success-icon" aria-hidden="true">
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="M20 6 9 17l-5-5" />
				</svg>
			</div>
			<h1 style="text-wrap: balance">Thank you, {form.name}!</h1>
			<p style="text-wrap: pretty">Your message has been sent successfully. We'll get back to you as soon as possible.</p>
			<a href="/contact" class="btn-reset">Send another message</a>
		</div>
	{:else}
		<div class="form-card">
			<header class="form-header">
				<h1 style="text-wrap: balance">Get in Touch</h1>
				<p style="text-wrap: pretty">Have a question, idea, or just want to say hello? We'd love to hear from you.</p>
			</header>

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
				<div class="field-row">
					<div class="field">
						<label for="name">Name</label>
						<input
							id="name"
							name="name"
							type="text"
							autocomplete="name"
							bind:value={name}
							onblur={() => (touched.name = true)}
							data-error={!!(nameError || serverErrors.name)}
							aria-describedby={nameError || serverErrors.name ? 'name-error' : undefined}
							aria-invalid={!!(nameError || serverErrors.name)}
						/>
						{#if nameError || serverErrors.name}
							<p class="field-error" id="name-error" role="alert" aria-live="polite">
								{nameError || serverErrors.name}
							</p>
						{/if}
					</div>

					<div class="field">
						<label for="email">Email</label>
						<input
							id="email"
							name="email"
							type="email"
							autocomplete="email"
							bind:value={email}
							onblur={() => (touched.email = true)}
							data-error={!!(emailError || serverErrors.email)}
							aria-describedby={emailError || serverErrors.email ? 'email-error' : undefined}
							aria-invalid={!!(emailError || serverErrors.email)}
						/>
						{#if emailError || serverErrors.email}
							<p class="field-error" id="email-error" role="alert" aria-live="polite">
								{emailError || serverErrors.email}
							</p>
						{/if}
					</div>
				</div>

				<div class="field">
					<label for="subject">Subject</label>
					<select
						id="subject"
						name="subject"
						bind:value={subject}
						onblur={() => (touched.subject = true)}
						data-error={!!(subjectError || serverErrors.subject)}
						aria-describedby={subjectError || serverErrors.subject ? 'subject-error' : undefined}
						aria-invalid={!!(subjectError || serverErrors.subject)}
					>
						<option value="">Choose a topic...</option>
						<option value="General">General</option>
						<option value="Support">Support</option>
						<option value="Partnership">Partnership</option>
						<option value="Feedback">Feedback</option>
					</select>
					{#if subjectError || serverErrors.subject}
						<p class="field-error" id="subject-error" role="alert" aria-live="polite">
							{subjectError || serverErrors.subject}
						</p>
					{/if}
				</div>

				<div class="field">
					<label for="message">Message</label>
					<textarea
						id="message"
						name="message"
						rows="5"
						bind:value={message}
						onblur={() => (touched.message = true)}
						data-error={!!(messageError || serverErrors.message)}
						aria-describedby={messageError || serverErrors.message ? 'message-error' : undefined}
						aria-invalid={!!(messageError || serverErrors.message)}
					></textarea>
					<span class="char-count" class:warn={message.trim().length > 0 && message.trim().length < 20}>
						{message.trim().length}/20 min
					</span>
					{#if messageError || serverErrors.message}
						<p class="field-error" id="message-error" role="alert" aria-live="polite">
							{messageError || serverErrors.message}
						</p>
					{/if}
				</div>

				<button type="submit" class="btn-submit" disabled={submitting}>
					{#if submitting}
						<span class="spinner" aria-hidden="true"></span>
						Sending...
					{:else}
						Send Message
					{/if}
				</button>
			</form>
		</div>
	{/if}
</div>

<style>
	.contact-page {
		inline-size: 100%;
		max-inline-size: 40rem;
	}

	/* ── Form card ── */
	.form-card {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-md);
	}

	.form-header {
		margin-block-end: var(--space-lg);

		& h1 {
			font-size: var(--text-xl);
			color: var(--color-text);
			margin-block-end: var(--space-xs);
		}

		& p {
			font-size: var(--text-sm);
			color: var(--color-text-muted);
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
	.field-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin-block-end: var(--space-md);
		position: relative;
	}

	label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}

	input,
	select,
	textarea {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-base);
		transition: border-color var(--dur-fast) var(--ease-out),
					box-shadow var(--dur-fast) var(--ease-out);

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

	textarea {
		resize: vertical;
		min-block-size: 7rem;
	}

	select {
		cursor: pointer;
	}

	.field-error {
		font-size: var(--text-xs);
		color: var(--color-error);
		margin: 0;
	}

	.char-count {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: end;

		&.warn {
			color: var(--color-warning);
		}
	}

	/* ── Button ── */
	.btn-submit {
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

	/* ── Success card ── */
	.success-card {
		text-align: center;
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-xl) var(--space-lg);
		box-shadow: var(--shadow-md);
		animation: card-enter var(--dur-slow) var(--ease-spring) both;

		@starting-style {
			opacity: 0;
			translate: 0 1rem;
		}

		& h1 {
			font-size: var(--text-xl);
			margin-block-end: var(--space-xs);
		}

		& p {
			color: var(--color-text-muted);
			font-size: var(--text-sm);
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

	.btn-reset {
		display: inline-block;
		padding: var(--space-sm) var(--space-lg);
		border-radius: var(--radius-md);
		background: var(--color-brand);
		color: oklch(100% 0 0);
		text-decoration: none;
		font-weight: 700;
		font-size: var(--text-sm);
		transition: background var(--dur-fast) var(--ease-out);

		&:hover {
			background: var(--color-brand-dim);
			color: oklch(100% 0 0);
		}
	}
</style>
