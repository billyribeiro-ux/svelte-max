<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// --- Types ---\n" +
		"\tinterface FormState {\n" +
		"\t\tname: string;\n" +
		"\t\temail: string;\n" +
		"\t\tpassword: string;\n" +
		"\t\tconfirmPassword: string;\n" +
		"\t\tinterests: string[];\n" +
		"\t\tnotifications: 'all' | 'important' | 'none';\n" +
		"\t\tterms: boolean;\n" +
		"\t}\n" +
		"\n" +
		"\ttype FieldKey = keyof FormState;\n" +
		"\n" +
		"\tinterface FieldErrors {\n" +
		"\t\tname?: string;\n" +
		"\t\temail?: string;\n" +
		"\t\tpassword?: string;\n" +
		"\t\tconfirmPassword?: string;\n" +
		"\t\tinterests?: string;\n" +
		"\t\tnotifications?: string;\n" +
		"\t\tterms?: string;\n" +
		"\t}\n" +
		"\n" +
		"\ttype ToastKind = 'success' | 'error';\n" +
		"\tinterface Toast {\n" +
		"\t\tid: number;\n" +
		"\t\tkind: ToastKind;\n" +
		"\t\ttext: string;\n" +
		"\t}\n" +
		"\n" +
		"\t// --- State ---\n" +
		"\tlet form = $state\u003cFormState\u003e({\n" +
		"\t\tname: '',\n" +
		"\t\temail: '',\n" +
		"\t\tpassword: '',\n" +
		"\t\tconfirmPassword: '',\n" +
		"\t\tinterests: [],\n" +
		"\t\tnotifications: 'important',\n" +
		"\t\tterms: false\n" +
		"\t});\n" +
		"\n" +
		"\tlet touched = $state\u003cSet\u003cFieldKey\u003e\u003e(new Set\u003cFieldKey\u003e());\n" +
		"\tlet errors = $state\u003cFieldErrors\u003e({});\n" +
		"\tlet toasts = $state\u003cToast[]\u003e([]);\n" +
		"\tlet toastId = 0;\n" +
		"\n" +
		"\t// --- Validators (pure) ---\n" +
		"\tfunction validate(state: FormState): FieldErrors {\n" +
		"\t\tconst e: FieldErrors = {};\n" +
		"\t\tif (state.name.trim().length \u003c 2) e.name = 'Name must be at least 2 characters.';\n" +
		"\t\tif (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(state.email)) e.email = 'Enter a valid email address.';\n" +
		"\t\tif (state.password.length \u003c 8) e.password = 'Password must be at least 8 characters.';\n" +
		"\t\tif (state.confirmPassword !== state.password)\n" +
		"\t\t\te.confirmPassword = 'Passwords do not match.';\n" +
		"\t\tif (state.interests.length === 0) e.interests = 'Pick at least one interest.';\n" +
		"\t\tif (!state.terms) e.terms = 'You must accept the terms.';\n" +
		"\t\treturn e;\n" +
		"\t}\n" +
		"\n" +
		"\t// --- Debounced validation: 300ms after any form change ---\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\t// Read all fields so effect re-runs on any change.\n" +
		"\t\tconst snap: FormState = {\n" +
		"\t\t\tname: form.name,\n" +
		"\t\t\temail: form.email,\n" +
		"\t\t\tpassword: form.password,\n" +
		"\t\t\tconfirmPassword: form.confirmPassword,\n" +
		"\t\t\tinterests: [...form.interests],\n" +
		"\t\t\tnotifications: form.notifications,\n" +
		"\t\t\tterms: form.terms\n" +
		"\t\t};\n" +
		"\t\tconst handle = setTimeout(() =\u003e {\n" +
		"\t\t\terrors = validate(snap);\n" +
		"\t\t}, 300);\n" +
		"\t\treturn () =\u003e clearTimeout(handle);\n" +
		"\t});\n" +
		"\n" +
		"\t// --- Password strength (reused concept from 4.1) ---\n" +
		"\tfunction strength(pw: string): { score: number; label: string } {\n" +
		"\t\tlet score = 0;\n" +
		"\t\tif (pw.length \u003e= 8) score++;\n" +
		"\t\tif (pw.length \u003e= 12) score++;\n" +
		"\t\tif (/[A-Z]/.test(pw)) score++;\n" +
		"\t\tif (/[0-9]/.test(pw)) score++;\n" +
		"\t\tif (/[^A-Za-z0-9]/.test(pw)) score++;\n" +
		"\t\tconst labels = ['Empty', 'Weak', 'Fair', 'Good', 'Strong', 'Excellent'];\n" +
		"\t\treturn { score, label: labels[score] ?? 'Empty' };\n" +
		"\t}\n" +
		"\tconst pwStrength = $derived(strength(form.password));\n" +
		"\n" +
		"\t// --- Touched tracking ---\n" +
		"\tfunction markTouched(key: FieldKey): void {\n" +
		"\t\tif (touched.has(key)) return;\n" +
		"\t\tconst next = new Set(touched);\n" +
		"\t\tnext.add(key);\n" +
		"\t\ttouched = next;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction fieldError(key: FieldKey): string | undefined {\n" +
		"\t\tif (!touched.has(key)) return undefined;\n" +
		"\t\treturn errors[key];\n" +
		"\t}\n" +
		"\n" +
		"\tfunction fieldValid(key: FieldKey): boolean {\n" +
		"\t\treturn touched.has(key) && !errors[key];\n" +
		"\t}\n" +
		"\n" +
		"\t// --- Typed event handlers ---\n" +
		"\tfunction handleBlur(key: FieldKey): (e: FocusEvent) =\u003e void {\n" +
		"\t\treturn (_e: FocusEvent) =\u003e {\n" +
		"\t\t\tmarkTouched(key);\n" +
		"\t\t};\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleInterestChange(_e: Event): void {\n" +
		"\t\tmarkTouched('interests');\n" +
		"\t}\n" +
		"\n" +
		"\tconst isFormValid = $derived(Object.keys(validate(form)).length === 0);\n" +
		"\n" +
		"\tfunction addToast(kind: ToastKind, text: string): void {\n" +
		"\t\tconst id = ++toastId;\n" +
		"\t\ttoasts = [...toasts, { id, kind, text }];\n" +
		"\t}\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tconst current = toasts;\n" +
		"\t\tconst timers = current.map((t) =\u003e\n" +
		"\t\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\t\ttoasts = toasts.filter((x) =\u003e x.id !== t.id);\n" +
		"\t\t\t}, 3000)\n" +
		"\t\t);\n" +
		"\t\treturn () =\u003e {\n" +
		"\t\t\tfor (const h of timers) clearTimeout(h);\n" +
		"\t\t};\n" +
		"\t});\n" +
		"\n" +
		"\tfunction handleSubmit(e: SubmitEvent): void {\n" +
		"\t\te.preventDefault();\n" +
		"\t\t// Mark everything touched so errors show.\n" +
		"\t\ttouched = new Set\u003cFieldKey\u003e([\n" +
		"\t\t\t'name',\n" +
		"\t\t\t'email',\n" +
		"\t\t\t'password',\n" +
		"\t\t\t'confirmPassword',\n" +
		"\t\t\t'interests',\n" +
		"\t\t\t'notifications',\n" +
		"\t\t\t'terms'\n" +
		"\t\t]);\n" +
		"\t\terrors = validate(form);\n" +
		"\t\tif (Object.keys(errors).length \u003e 0) {\n" +
		"\t\t\taddToast('error', 'Please fix the errors above.');\n" +
		"\t\t\treturn;\n" +
		"\t\t}\n" +
		"\t\taddToast('success', `Welcome, ${form.name}! Account created.`);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction handleReset(): void {\n" +
		"\t\tform = {\n" +
		"\t\t\tname: '',\n" +
		"\t\t\temail: '',\n" +
		"\t\t\tpassword: '',\n" +
		"\t\t\tconfirmPassword: '',\n" +
		"\t\t\tinterests: [],\n" +
		"\t\t\tnotifications: 'important',\n" +
		"\t\t\tterms: false\n" +
		"\t\t};\n" +
		"\t\ttouched = new Set\u003cFieldKey\u003e();\n" +
		"\t\terrors = {};\n" +
		"\t}\n" +
		"\n" +
		"\tconst prettyJson = $derived(JSON.stringify($state.snapshot(form), null, 2));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003c!-- Per-page color personality: mint green. Explored further in Module 6.9. --\u003e\n" +
		"\u003csection class=\"page form-project\"\u003e\n" +
		"\t\u003ch1\u003eModule 5 Project — Interactive Form\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eCapstone.\u003c/strong\u003e This form composes every Module 5 concept: typed event handlers, callback\n" +
		"\t\tpatterns, bindings (\u003ccode\u003ebind:value\u003c/code\u003e, \u003ccode\u003ebind:group\u003c/code\u003e), debounced validation, focus\n" +
		"\t\tmanagement, and keyboard accessibility. Mint-green brand tokens are scoped to\n" +
		"\t\t\u003ccode\u003e.form-project\u003c/code\u003e — we will generalize this pattern in Module 6.9.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"layout\"\u003e\n" +
		"\t\t\u003cform class=\"form\" onsubmit={handleSubmit} novalidate\u003e\n" +
		"\t\t\t\u003cdiv class=\"field\"\u003e\n" +
		"\t\t\t\t\u003clabel for=\"f-name\"\u003eName\u003c/label\u003e\n" +
		"\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\tid=\"f-name\"\n" +
		"\t\t\t\t\ttype=\"text\"\n" +
		"\t\t\t\t\tautocomplete=\"name\"\n" +
		"\t\t\t\t\tbind:value={form.name}\n" +
		"\t\t\t\t\tonblur={handleBlur('name')}\n" +
		"\t\t\t\t\taria-invalid={fieldError('name') ? true : undefined}\n" +
		"\t\t\t\t\taria-describedby={fieldError('name') ? 'e-name' : undefined}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\t{#if fieldValid('name')}\u003cspan class=\"check\" aria-hidden=\"true\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t\u003cp id=\"e-name\" class=\"err\" aria-live=\"polite\"\u003e{fieldError('name') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"field\"\u003e\n" +
		"\t\t\t\t\u003clabel for=\"f-email\"\u003eEmail\u003c/label\u003e\n" +
		"\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\tid=\"f-email\"\n" +
		"\t\t\t\t\ttype=\"email\"\n" +
		"\t\t\t\t\tautocomplete=\"email\"\n" +
		"\t\t\t\t\tbind:value={form.email}\n" +
		"\t\t\t\t\tonblur={handleBlur('email')}\n" +
		"\t\t\t\t\taria-invalid={fieldError('email') ? true : undefined}\n" +
		"\t\t\t\t\taria-describedby={fieldError('email') ? 'e-email' : undefined}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\t{#if fieldValid('email')}\u003cspan class=\"check\" aria-hidden=\"true\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t\u003cp id=\"e-email\" class=\"err\" aria-live=\"polite\"\u003e{fieldError('email') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"field\"\u003e\n" +
		"\t\t\t\t\u003clabel for=\"f-pw\"\u003ePassword\u003c/label\u003e\n" +
		"\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\tid=\"f-pw\"\n" +
		"\t\t\t\t\ttype=\"password\"\n" +
		"\t\t\t\t\tautocomplete=\"new-password\"\n" +
		"\t\t\t\t\tbind:value={form.password}\n" +
		"\t\t\t\t\tonblur={handleBlur('password')}\n" +
		"\t\t\t\t\taria-invalid={fieldError('password') ? true : undefined}\n" +
		"\t\t\t\t\taria-describedby={fieldError('password') ? 'e-pw' : 'pw-strength'}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\t{#if fieldValid('password')}\u003cspan class=\"check\" aria-hidden=\"true\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t\u003cdiv id=\"pw-strength\" class=\"strength\" data-score={pwStrength.score}\u003e\n" +
		"\t\t\t\t\t\u003cdiv class=\"bars\"\u003e\n" +
		"\t\t\t\t\t\t{#each [1, 2, 3, 4, 5] as n (n)}\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"bar\" class:on={n \u003c= pwStrength.score}\u003e\u003c/span\u003e\n" +
		"\t\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\u003cspan class=\"strength-label\"\u003e{pwStrength.label}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cp id=\"e-pw\" class=\"err\" aria-live=\"polite\"\u003e{fieldError('password') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"field\"\u003e\n" +
		"\t\t\t\t\u003clabel for=\"f-pw2\"\u003eConfirm password\u003c/label\u003e\n" +
		"\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\tid=\"f-pw2\"\n" +
		"\t\t\t\t\ttype=\"password\"\n" +
		"\t\t\t\t\tautocomplete=\"new-password\"\n" +
		"\t\t\t\t\tbind:value={form.confirmPassword}\n" +
		"\t\t\t\t\tonblur={handleBlur('confirmPassword')}\n" +
		"\t\t\t\t\taria-invalid={fieldError('confirmPassword') ? true : undefined}\n" +
		"\t\t\t\t\taria-describedby={fieldError('confirmPassword') ? 'e-pw2' : undefined}\n" +
		"\t\t\t\t/\u003e\n" +
		"\t\t\t\t{#if fieldValid('confirmPassword')}\u003cspan class=\"check\" aria-hidden=\"true\"\u003e✓\u003c/span\u003e{/if}\n" +
		"\t\t\t\t\u003cp id=\"e-pw2\" class=\"err\" aria-live=\"polite\"\u003e{fieldError('confirmPassword') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t\u003cfieldset class=\"group\"\u003e\n" +
		"\t\t\t\t\u003clegend\u003eInterests\u003c/legend\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\ttype=\"checkbox\"\n" +
		"\t\t\t\t\t\tbind:group={form.interests}\n" +
		"\t\t\t\t\t\tvalue=\"svelte\"\n" +
		"\t\t\t\t\t\tonchange={handleInterestChange}\n" +
		"\t\t\t\t\t\tonblur={handleBlur('interests')}\n" +
		"\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\tSvelte\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\ttype=\"checkbox\"\n" +
		"\t\t\t\t\t\tbind:group={form.interests}\n" +
		"\t\t\t\t\t\tvalue=\"typescript\"\n" +
		"\t\t\t\t\t\tonchange={handleInterestChange}\n" +
		"\t\t\t\t\t\tonblur={handleBlur('interests')}\n" +
		"\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\tTypeScript\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\ttype=\"checkbox\"\n" +
		"\t\t\t\t\t\tbind:group={form.interests}\n" +
		"\t\t\t\t\t\tvalue=\"design\"\n" +
		"\t\t\t\t\t\tonchange={handleInterestChange}\n" +
		"\t\t\t\t\t\tonblur={handleBlur('interests')}\n" +
		"\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\tDesign\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\ttype=\"checkbox\"\n" +
		"\t\t\t\t\t\tbind:group={form.interests}\n" +
		"\t\t\t\t\t\tvalue=\"a11y\"\n" +
		"\t\t\t\t\t\tonchange={handleInterestChange}\n" +
		"\t\t\t\t\t\tonblur={handleBlur('interests')}\n" +
		"\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\tAccessibility\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003cp class=\"err\" aria-live=\"polite\"\u003e{fieldError('interests') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/fieldset\u003e\n" +
		"\n" +
		"\t\t\t\u003cfieldset class=\"group\"\u003e\n" +
		"\t\t\t\t\u003clegend\u003eNotifications\u003c/legend\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.notifications} value=\"all\" /\u003e All updates\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.notifications} value=\"important\" /\u003e Important only\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput type=\"radio\" bind:group={form.notifications} value=\"none\" /\u003e None\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003c/fieldset\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"field terms-field\"\u003e\n" +
		"\t\t\t\t\u003clabel class=\"chk\"\u003e\n" +
		"\t\t\t\t\t\u003cinput\n" +
		"\t\t\t\t\t\ttype=\"checkbox\"\n" +
		"\t\t\t\t\t\tbind:checked={form.terms}\n" +
		"\t\t\t\t\t\tonblur={handleBlur('terms')}\n" +
		"\t\t\t\t\t/\u003e\n" +
		"\t\t\t\t\tI accept the terms and conditions\n" +
		"\t\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\t\u003cp class=\"err\" aria-live=\"polite\"\u003e{fieldError('terms') ?? ''}\u003c/p\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\t\u003cdiv class=\"actions\"\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"submit\" class=\"submit\" disabled={!isFormValid}\u003eCreate account\u003c/button\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" class=\"reset\" onclick={handleReset}\u003eReset\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/form\u003e\n" +
		"\n" +
		"\t\t\u003caside class=\"preview\" aria-label=\"Form state preview\"\u003e\n" +
		"\t\t\t\u003ch2\u003eLive state\u003c/h2\u003e\n" +
		"\t\t\t\u003cpre\u003e{prettyJson}\u003c/pre\u003e\n" +
		"\t\t\t\u003cp class=\"meta\"\u003eForm valid: \u003ccode\u003e{isFormValid}\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\t\t\u003cp class=\"meta\"\u003eTouched fields: \u003ccode\u003e{touched.size}\u003c/code\u003e\u003c/p\u003e\n" +
		"\t\t\u003c/aside\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003cfooter class=\"footer\"\u003e\n" +
		"\t\t\u003ch3\u003eModule 5 concepts used\u003c/h3\u003e\n" +
		"\t\t\u003cul\u003e\n" +
		"\t\t\t\u003cli\u003e5.1 Event handlers with \u003ccode\u003eonclick\u003c/code\u003e, \u003ccode\u003eoninput\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.2 Handler functions extracted and named.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.3 Typed events: \u003ccode\u003eSubmitEvent\u003c/code\u003e, \u003ccode\u003eFocusEvent\u003c/code\u003e, \u003ccode\u003eEvent\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.4 \u003ccode\u003ee.preventDefault()\u003c/code\u003e on submit.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.7 Closures that capture the field key in \u003ccode\u003ehandleBlur\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.8 Debounced validation with \u003ccode\u003e$effect\u003c/code\u003e + \u003ccode\u003esetTimeout\u003c/code\u003e cleanup.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.9 Callback pattern for toast dispatch.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.10 \u003ccode\u003ebind:value\u003c/code\u003e, \u003ccode\u003ebind:group\u003c/code\u003e, \u003ccode\u003ebind:checked\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\t\u003cli\u003e5.12 Keyboard labels, \u003ccode\u003earia-live\u003c/code\u003e, \u003ccode\u003earia-invalid\u003c/code\u003e, disabled submit.\u003c/li\u003e\n" +
		"\t\t\u003c/ul\u003e\n" +
		"\t\u003c/footer\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"toast-stack\" aria-live=\"polite\"\u003e\n" +
		"\t\t{#each toasts as t (t.id)}\n" +
		"\t\t\t\u003cdiv class=\"toast\" data-kind={t.kind} role=\"status\"\u003e{t.text}\u003c/div\u003e\n" +
		"\t\t{/each}\n" +
		"\t\u003c/div\u003e\n" +
		"\u003c/section\u003e";
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
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.layout {
			grid-template-columns: 1.2fr 1fr;
			align-items: start;
		}
	}

	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
