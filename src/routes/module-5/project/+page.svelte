<script lang="ts">
	// --- Types ---
	interface FormState {
		name: string;
		email: string;
		password: string;
		confirmPassword: string;
		interests: string[];
		notifications: 'all' | 'important' | 'none';
		terms: boolean;
	}

	type FieldKey = keyof FormState;

	interface FieldErrors {
		name?: string;
		email?: string;
		password?: string;
		confirmPassword?: string;
		interests?: string;
		notifications?: string;
		terms?: string;
	}

	type ToastKind = 'success' | 'error';
	interface Toast {
		id: number;
		kind: ToastKind;
		text: string;
	}

	// --- State ---
	let form = $state<FormState>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		interests: [],
		notifications: 'important',
		terms: false
	});

	let touched = $state<Set<FieldKey>>(new Set<FieldKey>());
	let errors = $state<FieldErrors>({});
	let toasts = $state<Toast[]>([]);
	let toastId = 0;

	// --- Validators (pure) ---
	function validate(state: FormState): FieldErrors {
		const e: FieldErrors = {};
		if (state.name.trim().length < 2) e.name = 'Name must be at least 2 characters.';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email)) e.email = 'Enter a valid email address.';
		if (state.password.length < 8) e.password = 'Password must be at least 8 characters.';
		if (state.confirmPassword !== state.password)
			e.confirmPassword = 'Passwords do not match.';
		if (state.interests.length === 0) e.interests = 'Pick at least one interest.';
		if (!state.terms) e.terms = 'You must accept the terms.';
		return e;
	}

	// --- Debounced validation: 300ms after any form change ---
	$effect(() => {
		// Read all fields so effect re-runs on any change.
		const snap: FormState = {
			name: form.name,
			email: form.email,
			password: form.password,
			confirmPassword: form.confirmPassword,
			interests: [...form.interests],
			notifications: form.notifications,
			terms: form.terms
		};
		const handle = setTimeout(() => {
			errors = validate(snap);
		}, 300);
		return () => clearTimeout(handle);
	});

	// --- Password strength (reused concept from 4.1) ---
	function strength(pw: string): { score: number; label: string } {
		let score = 0;
		if (pw.length >= 8) score++;
		if (pw.length >= 12) score++;
		if (/[A-Z]/.test(pw)) score++;
		if (/[0-9]/.test(pw)) score++;
		if (/[^A-Za-z0-9]/.test(pw)) score++;
		const labels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];
		return { score, label: labels[score] ?? 'Empty' };
	}
	const pwStrength = $derived(strength(form.password));

	// --- Touched tracking ---
	function markTouched(key: FieldKey): void {
		if (touched.has(key)) return;
		const next = new Set(touched);
		next.add(key);
		touched = next;
	}

	function fieldError(key: FieldKey): string | undefined {
		if (!touched.has(key)) return undefined;
		return errors[key];
	}

	function fieldValid(key: FieldKey): boolean {
		return touched.has(key) && !errors[key];
	}

	// --- Typed event handlers ---
	function handleBlur(key: FieldKey): (e: FocusEvent) => void {
		return (_e: FocusEvent) => {
			markTouched(key);
		};
	}

	function handleInterestChange(_e: Event): void {
		markTouched('interests');
	}

	const isFormValid = $derived(Object.keys(validate(form)).length === 0);

	function addToast(kind: ToastKind, text: string): void {
		const id = ++toastId;
		toasts = [...toasts, { id, kind, text }];
	}

	$effect(() => {
		const current = toasts;
		const timers = current.map((t) =>
			setTimeout(() => {
				toasts = toasts.filter((x) => x.id !== t.id);
			}, 3000)
		);
		return () => {
			for (const h of timers) clearTimeout(h);
		};
	});

	function handleSubmit(e: SubmitEvent): void {
		e.preventDefault();
		// Mark everything touched so errors show.
		touched = new Set<FieldKey>([
			'name',
			'email',
			'password',
			'confirmPassword',
			'interests',
			'notifications',
			'terms'
		]);
		errors = validate(form);
		if (Object.keys(errors).length > 0) {
			addToast('error', 'Please fix the errors above.');
			return;
		}
		addToast('success', `Welcome, ${form.name}! Account created.`);
	}

	function handleReset(): void {
		form = {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
			interests: [],
			notifications: 'important',
			terms: false
		};
		touched = new Set<FieldKey>();
		errors = {};
	}

	const prettyJson = $derived(JSON.stringify($state.snapshot(form), null, 2));
</script>

<!-- Per-page color personality: mint green. Explored further in Module 6.9. -->
<section class="page form-project">
	<h1>Module 5 Project — Interactive Form</h1>
	<p class="concept">
		<strong>Capstone.</strong> This form composes every Module 5 concept: typed event handlers, callback
		patterns, bindings (<code>bind:value</code>, <code>bind:group</code>), debounced validation, focus
		management, and keyboard accessibility. Mint-green brand tokens are scoped to
		<code>.form-project</code> — we will generalize this pattern in Module 6.9.
	</p>

	<div class="layout">
		<form class="form" onsubmit={handleSubmit} novalidate>
			<div class="field">
				<label for="f-name">Name</label>
				<input
					id="f-name"
					type="text"
					autocomplete="name"
					bind:value={form.name}
					onblur={handleBlur('name')}
					aria-invalid={fieldError('name') ? true : undefined}
					aria-describedby={fieldError('name') ? 'e-name' : undefined}
				/>
				{#if fieldValid('name')}<span class="check" aria-hidden="true">✓</span>{/if}
				<p id="e-name" class="err" aria-live="polite">{fieldError('name') ?? ''}</p>
			</div>

			<div class="field">
				<label for="f-email">Email</label>
				<input
					id="f-email"
					type="email"
					autocomplete="email"
					bind:value={form.email}
					onblur={handleBlur('email')}
					aria-invalid={fieldError('email') ? true : undefined}
					aria-describedby={fieldError('email') ? 'e-email' : undefined}
				/>
				{#if fieldValid('email')}<span class="check" aria-hidden="true">✓</span>{/if}
				<p id="e-email" class="err" aria-live="polite">{fieldError('email') ?? ''}</p>
			</div>

			<div class="field">
				<label for="f-pw">Password</label>
				<input
					id="f-pw"
					type="password"
					autocomplete="new-password"
					bind:value={form.password}
					onblur={handleBlur('password')}
					aria-invalid={fieldError('password') ? true : undefined}
					aria-describedby={fieldError('password') ? 'e-pw' : 'pw-strength'}
				/>
				{#if fieldValid('password')}<span class="check" aria-hidden="true">✓</span>{/if}
				<div id="pw-strength" class="strength" data-score={pwStrength.score}>
					<div class="bars">
						{#each [1, 2, 3, 4, 5] as n (n)}
							<span class="bar" class:on={n <= pwStrength.score}></span>
						{/each}
					</div>
					<span class="strength-label">{pwStrength.label}</span>
				</div>
				<p id="e-pw" class="err" aria-live="polite">{fieldError('password') ?? ''}</p>
			</div>

			<div class="field">
				<label for="f-pw2">Confirm password</label>
				<input
					id="f-pw2"
					type="password"
					autocomplete="new-password"
					bind:value={form.confirmPassword}
					onblur={handleBlur('confirmPassword')}
					aria-invalid={fieldError('confirmPassword') ? true : undefined}
					aria-describedby={fieldError('confirmPassword') ? 'e-pw2' : undefined}
				/>
				{#if fieldValid('confirmPassword')}<span class="check" aria-hidden="true">✓</span>{/if}
				<p id="e-pw2" class="err" aria-live="polite">{fieldError('confirmPassword') ?? ''}</p>
			</div>

			<fieldset class="group">
				<legend>Interests</legend>
				<label class="chk">
					<input
						type="checkbox"
						bind:group={form.interests}
						value="svelte"
						onchange={handleInterestChange}
						onblur={handleBlur('interests')}
					/>
					Svelte
				</label>
				<label class="chk">
					<input
						type="checkbox"
						bind:group={form.interests}
						value="typescript"
						onchange={handleInterestChange}
						onblur={handleBlur('interests')}
					/>
					TypeScript
				</label>
				<label class="chk">
					<input
						type="checkbox"
						bind:group={form.interests}
						value="design"
						onchange={handleInterestChange}
						onblur={handleBlur('interests')}
					/>
					Design
				</label>
				<label class="chk">
					<input
						type="checkbox"
						bind:group={form.interests}
						value="a11y"
						onchange={handleInterestChange}
						onblur={handleBlur('interests')}
					/>
					Accessibility
				</label>
				<p class="err" aria-live="polite">{fieldError('interests') ?? ''}</p>
			</fieldset>

			<fieldset class="group">
				<legend>Notifications</legend>
				<label class="chk">
					<input type="radio" bind:group={form.notifications} value="all" /> All updates
				</label>
				<label class="chk">
					<input type="radio" bind:group={form.notifications} value="important" /> Important only
				</label>
				<label class="chk">
					<input type="radio" bind:group={form.notifications} value="none" /> None
				</label>
			</fieldset>

			<div class="field terms-field">
				<label class="chk">
					<input
						type="checkbox"
						bind:checked={form.terms}
						onblur={handleBlur('terms')}
					/>
					I accept the terms and conditions
				</label>
				<p class="err" aria-live="polite">{fieldError('terms') ?? ''}</p>
			</div>

			<div class="actions">
				<button type="submit" class="submit" disabled={!isFormValid}>Create account</button>
				<button type="button" class="reset" onclick={handleReset}>Reset</button>
			</div>
		</form>

		<aside class="preview" aria-label="Form state preview">
			<h2>Live state</h2>
			<pre>{prettyJson}</pre>
			<p class="meta">Form valid: <code>{isFormValid}</code></p>
			<p class="meta">Touched fields: <code>{touched.size}</code></p>
		</aside>
	</div>

	<footer class="footer">
		<h3>Module 5 concepts used</h3>
		<ul>
			<li>5.1 Event handlers with <code>onclick</code>, <code>oninput</code>.</li>
			<li>5.2 Handler functions extracted and named.</li>
			<li>5.3 Typed events: <code>SubmitEvent</code>, <code>FocusEvent</code>, <code>Event</code>.</li>
			<li>5.4 <code>e.preventDefault()</code> on submit.</li>
			<li>5.7 Closures that capture the field key in <code>handleBlur</code>.</li>
			<li>5.8 Debounced validation with <code>$effect</code> + <code>setTimeout</code> cleanup.</li>
			<li>5.9 Callback pattern for toast dispatch.</li>
			<li>5.10 <code>bind:value</code>, <code>bind:group</code>, <code>bind:checked</code>.</li>
			<li>5.12 Keyboard labels, <code>aria-live</code>, <code>aria-invalid</code>, disabled submit.</li>
		</ul>
	</footer>

	<div class="toast-stack" aria-live="polite">
		{#each toasts as t (t.id)}
			<div class="toast" data-kind={t.kind} role="status">{t.text}</div>
		{/each}
	</div>
</section>

<style>
	.form-project {
		/* Per-page color personality (Module 6.9 generalizes this). */
		--color-brand: oklch(62% 0.19 155);
		--color-brand-dim: oklch(52% 0.16 155);
	}
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	.layout {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		margin-block: var(--space-lg);
	}
	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}
	.field {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field label {
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	input[type='text'],
	input[type='email'],
	input[type='password'] {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-base);
		min-block-size: 44px;
	}
	input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	input[aria-invalid='true'] {
		border-color: var(--color-error);
	}
	.check {
		position: absolute;
		inset-inline-end: var(--space-sm);
		inset-block-start: calc(var(--space-lg) + 4px);
		color: var(--color-brand);
		font-weight: 700;
	}
	.err {
		margin: 0;
		min-block-size: 1.2em;
		font-size: var(--text-xs);
		color: var(--color-error);
	}
	.strength {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.bars {
		display: flex;
		gap: 3px;
		flex: 1;
	}
	.bar {
		flex: 1;
		block-size: 4px;
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
	}
	.bar.on {
		background: var(--color-brand);
	}
	.strength-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-family: var(--font-mono);
		min-inline-size: 5rem;
		text-align: end;
	}
	.group {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
	}
	.group legend {
		font-size: var(--text-sm);
		color: var(--color-text);
		padding-inline: var(--space-xs);
	}
	.chk {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
		min-block-size: 36px;
	}
	.terms-field {
		gap: 0;
	}
	.actions {
		display: flex;
		gap: var(--space-sm);
	}
	.submit {
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-base);
		font-weight: 600;
		cursor: pointer;
		min-block-size: 44px;
	}
	.submit:disabled {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border-color: var(--color-border);
		cursor: not-allowed;
	}
	.reset {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-base);
		cursor: pointer;
		min-block-size: 44px;
	}
	.preview {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.preview h2 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	pre {
		margin: 0;
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text);
		overflow-x: auto;
		line-height: 1.5;
	}
	.meta {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	.footer {
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-lg);
		border-block-start: 1px solid var(--color-border);
	}
	.toast-stack {
		position: fixed;
		inset-block-end: var(--space-lg);
		inset-inline-end: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 100;
	}
	.toast {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		box-shadow: var(--shadow-lg);
		color: var(--color-text);
		animation: slide-in var(--dur-base) var(--ease-out);
	}
	.toast[data-kind='success'] {
		border-inline-start: 4px solid var(--color-success);
	}
	.toast[data-kind='error'] {
		border-inline-start: 4px solid var(--color-error);
	}
	@keyframes slide-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.layout {
			grid-template-columns: 1.2fr 1fr;
			align-items: start;
		}
	}
</style>
