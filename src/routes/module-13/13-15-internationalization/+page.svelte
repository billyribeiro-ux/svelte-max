<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface Language {
		code: string;
		label: string;
		dir: 'ltr' | 'rtl';
		greeting: string;
		welcome: string;
		description: string;
	}

	const languages: readonly Language[] = [
		{
			code: 'en',
			label: 'English',
			dir: 'ltr',
			greeting: 'Hello, {name}!',
			welcome: 'Welcome to SvelteKit',
			description: 'Build fast, ship faster.'
		},
		{
			code: 'es',
			label: 'Espanol',
			dir: 'ltr',
			greeting: 'Hola, {name}!',
			welcome: 'Bienvenido a SvelteKit',
			description: 'Construye rapido, despliega mas rapido.'
		},
		{
			code: 'fr',
			label: 'Francais',
			dir: 'ltr',
			greeting: 'Bonjour, {name} !',
			welcome: 'Bienvenue sur SvelteKit',
			description: 'Construisez vite, deployez plus vite.'
		},
		{
			code: 'de',
			label: 'Deutsch',
			dir: 'ltr',
			greeting: 'Hallo, {name}!',
			welcome: 'Willkommen bei SvelteKit',
			description: 'Schnell bauen, schneller liefern.'
		},
		{
			code: 'ar',
			label: 'Arabic',
			dir: 'rtl',
			greeting: '{name} ,مرحبا!',
			welcome: 'SvelteKit مرحبا بك في',
			description: '.ابنِ بسرعة، أطلق أسرع'
		},
		{
			code: 'ja',
			label: 'Japanese',
			dir: 'ltr',
			greeting: 'こんにちは、{name}さん！',
			welcome: 'SvelteKitへようこそ',
			description: '速く作り、もっと速くリリース。'
		}
	];

	let selectedLang = $state<string>('en');
	let userName = $state<string>('Billy');

	const currentLang = $derived(languages.find((l) => l.code === selectedLang)!);
	const resolvedGreeting = $derived(currentLang.greeting.replace('{name}', userName));

	/* ── URL strategy examples ── */
	const urlStrategies = [
		{ strategy: 'Path prefix', example: '/en/about, /fr/a-propos', pros: 'SEO-friendly, easy to crawl', cons: 'Requires reroute hook' },
		{ strategy: 'Subdomain', example: 'en.example.com, fr.example.com', pros: 'Geo-targeting in Search Console', cons: 'DNS config, SSL certs per subdomain' },
		{ strategy: 'TLD', example: 'example.com, example.fr', pros: 'Strongest geo signal', cons: 'Expensive, separate deployments' },
		{ strategy: 'Query param', example: '?lang=en, ?lang=fr', pros: 'Simple to implement', cons: 'Not recommended — poor SEO' }
	];

	/* ── Paraglide setup code ── */
	const paraglideSetupCode = `# Add Paraglide to your SvelteKit project
npx sv add paraglide

# This creates:
# - project.inlang/settings.json (language config)
# - messages/en.json (English messages)
# - src/lib/paraglide/ (generated message functions)
# - Updates vite.config.js with the Paraglide plugin`;

	const inlangSettingsCode = `// project.inlang/settings.json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "sourceLanguageTag": "en",
  "languageTags": ["en", "es", "fr", "de", "ar", "ja"],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-empty-pattern/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/message-lint-rule-missing-translation/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{languageTag}.json"
  }
}`;

	const messagesEnCode = `// messages/en.json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "welcome_title": "Welcome to SvelteKit",
  "welcome_description": "Build fast, ship faster.",
  "greeting": "Hello, {name}!",
  "nav_home": "Home",
  "nav_about": "About",
  "nav_contact": "Contact",
  "items_count": "{count, plural, =0 {No items} one {1 item} other {{count} items}}"
}`;

	const messagesEsCode = `// messages/es.json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "welcome_title": "Bienvenido a SvelteKit",
  "welcome_description": "Construye rapido, despliega mas rapido.",
  "greeting": "Hola, {name}!",
  "nav_home": "Inicio",
  "nav_about": "Acerca de",
  "nav_contact": "Contacto",
  "items_count": "{count, plural, =0 {Sin elementos} one {1 elemento} other {{count} elementos}}"
}`;

	const usageCode = `<!-- src/routes/+page.svelte -->
${"<"}script lang="ts">
  // Import message functions — fully typed, tree-shakable
  import * as m from '$lib/paraglide/messages';
${"<"}/script>

<h1>{m.welcome_title()}</h1>
<p>{m.welcome_description()}</p>

<!-- Parameters are type-safe -->
<p>{m.greeting({ name: 'Billy' })}</p>

<!-- Plurals work automatically -->
<p>{m.items_count({ count: 0 })}</p>  <!-- "No items" -->
<p>{m.items_count({ count: 1 })}</p>  <!-- "1 item" -->
<p>{m.items_count({ count: 42 })}</p> <!-- "42 items" -->

<nav>
  <a href="/">{m.nav_home()}</a>
  <a href="/about">{m.nav_about()}</a>
  <a href="/contact">{m.nav_contact()}</a>
</nav>`;

	const hooksRerouteCode = `// src/hooks.ts
import type { Reroute } from '@sveltejs/kit';
import { i18n } from '$lib/paraglide/i18n';

// The reroute hook maps localized URLs to internal routes.
// /fr/a-propos -> /about (internally)
// /en/about    -> /about (internally)
export const reroute: Reroute = i18n.reroute();`;

	const hooksHandleCode = `// src/hooks.server.ts
import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/paraglide/i18n';

// The handle hook sets the lang attribute on the response
export const handle: Handle = i18n.handle();`;

	const languageSwitcherCode = `<!-- LanguageSwitcher.svelte -->
${"<"}script lang="ts">
  import { page } from '$app/state';
  import { availableLanguageTags, languageTag }
    from '$lib/paraglide/runtime';
  import { i18n } from '$lib/paraglide/i18n';

  // Build localized URLs for the current page
  const alternatives = $derived(
    availableLanguageTags.map((lang) => ({
      lang,
      href: i18n.resolveRoute(page.url.pathname, lang),
      active: lang === languageTag()
    }))
  );
${"<"}/script>

<nav aria-label="Language">
  {#each alternatives as alt (alt.lang)}
    <a
      href={alt.href}
      hreflang={alt.lang}
      aria-current={alt.active ? 'page' : undefined}
      class:active={alt.active}
    >
      {alt.lang.toUpperCase()}
    </a>
  {/each}
</nav>`;

	const seoHreflangCode = `<!-- src/routes/+layout.svelte -->
${"<"}script lang="ts">
  import { page } from '$app/state';
  import { availableLanguageTags, languageTag }
    from '$lib/paraglide/runtime';
  import { i18n } from '$lib/paraglide/i18n';

  const base = 'https://mysite.com';

  const hreflangTags = $derived([
    ...availableLanguageTags.map((lang) => ({
      hreflang: lang,
      href: base + i18n.resolveRoute(page.url.pathname, lang)
    })),
    {
      hreflang: 'x-default',
      href: base + i18n.resolveRoute(page.url.pathname, 'en')
    }
  ]);
${"<"}/script>

${"<"}svelte:head>
  {#each hreflangTags as tag (tag.hreflang)}
    <link rel="alternate" hreflang={tag.hreflang} href={tag.href} />
  {/each}
${"<"}/svelte:head>`;

	const appHtmlCode = `<!-- src/app.html -->
<!-- Set lang and dir dynamically via Paraglide -->
<!doctype html>
<html lang="%paraglide.lang%" dir="%paraglide.dir%">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body>
    %sveltekit.body%
  </body>
</html>`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"\timport CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"\n" +
		"\tinterface Language {\n" +
		"\t\tcode: string;\n" +
		"\t\tlabel: string;\n" +
		"\t\tdir: 'ltr' | 'rtl';\n" +
		"\t\tgreeting: string;\n" +
		"\t\twelcome: string;\n" +
		"\t\tdescription: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst languages: readonly Language[] = [\n" +
		"\t\t{ code: 'en', label: 'English', dir: 'ltr', greeting: 'Hello, {name}!', welcome: 'Welcome to SvelteKit', description: 'Build fast, ship faster.' },\n" +
		"\t\t{ code: 'es', label: 'Espanol', dir: 'ltr', greeting: 'Hola, {name}!', welcome: 'Bienvenido a SvelteKit', description: 'Construye rapido, despliega mas rapido.' },\n" +
		"\t\t{ code: 'fr', label: 'Francais', dir: 'ltr', greeting: 'Bonjour, {name} !', welcome: 'Bienvenue sur SvelteKit', description: 'Construisez vite, deployez plus vite.' },\n" +
		"\t\t{ code: 'de', label: 'Deutsch', dir: 'ltr', greeting: 'Hallo, {name}!', welcome: 'Willkommen bei SvelteKit', description: 'Schnell bauen, schneller liefern.' },\n" +
		"\t\t{ code: 'ar', label: 'Arabic', dir: 'rtl', greeting: '{name} ,مرحبا!', welcome: 'SvelteKit مرحبا بك في', description: '.ابنِ بسرعة، أطلق أسرع' },\n" +
		"\t\t{ code: 'ja', label: 'Japanese', dir: 'ltr', greeting: 'こんにちは、{name}さん！', welcome: 'SvelteKitへようこそ', description: '速く作り、もっと速くリリース。' }\n" +
		"\t];\n" +
		"\n" +
		"\tlet selectedLang = $state<string>('en');\n" +
		"\tlet userName = $state<string>('Billy');\n" +
		"\tconst currentLang = $derived(languages.find((l) => l.code === selectedLang)!);\n" +
		"\tconst resolvedGreeting = $derived(currentLang.greeting.replace('{name}', userName));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\">\n" +
		"\t\u003ch1\u003e13.15 — Internationalization (i18n)\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\">A restaurant with menus in different languages — same food, different descriptions.\u003c/p\u003e\n" +
		"\t\u003c!-- ...language explorer, Paraglide setup, message usage, SEO... --\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>13.15 — Internationalization (i18n)</h1>

	<p class="concept">
		<strong>Concept.</strong>
		Internationalization (i18n) is making your app work in multiple languages. Think of it as a
		restaurant with menus in different languages — the same food, different descriptions. The URL
		strategy (<code>/en/about</code>, <code>/fr/a-propos</code>) determines how users and search
		engines discover each language version. Paraglide, the PE7-recommended i18n solution for
		SvelteKit, is a compiler that generates tree-shakable, fully typed message functions with zero
		async waterfalls.
	</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 1: What i18n is                     -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>What i18n is</h2>
	<p class="prose">Internationalization is the process of designing your app so that it can be adapted to different languages and regions without code changes. The term "i18n" is an abbreviation: the letter "i", 18 letters, then "n". The related term "l10n" (localization) refers to the actual translation work — adapting content for a specific locale. Your code handles i18n; your translators handle l10n.</p>

	<p class="prose">The most important architectural decision is your URL strategy. Path-prefix routing (<code>/en/about</code>, <code>/fr/a-propos</code>) is the industry standard because it is SEO-friendly, easy to implement in SvelteKit, and allows all languages to share a single deployment. Subdomain routing (<code>en.example.com</code>) and TLD routing (<code>example.fr</code>) are alternatives for enterprise sites that need geo-targeting, but they add infrastructure complexity.</p>

	<div class="build">
		<h3>URL strategies</h3>
		<div class="table-wrapper">
			<table>
				<thead>
					<tr>
						<th>Strategy</th>
						<th>Example</th>
						<th>Pros</th>
						<th>Cons</th>
					</tr>
				</thead>
				<tbody>
					{#each urlStrategies as strategy (strategy.strategy)}
						<tr>
							<td><strong>{strategy.strategy}</strong></td>
							<td><code>{strategy.example}</code></td>
							<td>{strategy.pros}</td>
							<td>{strategy.cons}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 2: Paraglide (recommended)          -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Paraglide (PE7 recommended)</h2>
	<p class="prose">Paraglide is a compiler-based i18n solution from the Inlang ecosystem. Unlike runtime i18n libraries that load translation files asynchronously and parse them at runtime, Paraglide generates TypeScript functions at build time. Each message becomes a function: <code>m.welcome_title()</code> instead of <code>t('welcome_title')</code>. This approach provides three critical advantages.</p>

	<p class="prose"><strong>Full type safety.</strong> If you reference a message key that does not exist, TypeScript catches it at compile time — not at runtime in production. If a message expects a <code>name</code> parameter and you forget to pass it, the compiler tells you immediately. No more silent missing translations.</p>

	<p class="prose"><strong>Tree-shaking.</strong> Because messages are functions, unused messages are eliminated by the bundler. If a page only uses 5 of your 500 messages, only those 5 are included in the page's bundle. Runtime i18n libraries typically load all messages for the current locale, even if the page only needs a fraction of them.</p>

	<p class="prose"><strong>Zero async waterfalls.</strong> Message functions are synchronous. There is no <code>await loadTranslations()</code> call, no flash of untranslated content, no loading spinner while translations are fetched. The messages are compiled into the JavaScript bundle and available immediately.</p>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 3: Setting up                       -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Setting up Paraglide</h2>
	<p class="prose">The <code>npx sv add paraglide</code> command scaffolds the entire i18n setup: Inlang project settings, message files, the Vite plugin, and SvelteKit hooks. After running it, your project has a <code>project.inlang/settings.json</code> file that defines your source language and available languages, a <code>messages/</code> directory with one JSON file per language, and generated message functions in <code>src/lib/paraglide/</code>.</p>

	<div class="build">
		<h3>Installation</h3>
		<pre>{paraglideSetupCode}</pre>
	</div>

	<div class="build">
		<h3>Inlang project settings</h3>
		<pre>{inlangSettingsCode}</pre>
	</div>

	<div class="build">
		<h3>Message files</h3>
		<pre>{messagesEnCode}</pre>
		<pre>{messagesEsCode}</pre>
	</div>

	<p class="prose">The SvelteKit hooks integrate Paraglide with the routing system. The <code>reroute</code> hook in <code>src/hooks.ts</code> maps localized URLs to internal routes — <code>/fr/a-propos</code> becomes <code>/about</code> internally. The <code>handle</code> hook in <code>src/hooks.server.ts</code> sets the <code>lang</code> attribute on the HTML response. The <code>app.html</code> template uses <code>%paraglide.lang%</code> and <code>%paraglide.dir%</code> placeholders for the language and text direction.</p>

	<div class="build">
		<h3>Hooks setup</h3>
		<pre>{hooksRerouteCode}</pre>
		<pre>{hooksHandleCode}</pre>
	</div>

	<div class="build">
		<h3>app.html with language attributes</h3>
		<pre>{appHtmlCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 4: Using messages                   -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Using messages</h2>
	<p class="prose">Import message functions from <code>$lib/paraglide/messages</code> and call them in your templates. Messages with parameters are type-safe: <code>m.greeting({'{ name: "Billy" }'})</code> requires the <code>name</code> parameter. Plurals use ICU MessageFormat syntax: <code>{'{count, plural, =0 {No items} one {1 item} other {{count} items}}'}</code>. The message extraction workflow is simple: add a key to <code>messages/en.json</code>, use it in your code, then add translations to <code>messages/es.json</code>, <code>messages/fr.json</code>, etc.</p>

	<div class="build">
		<h3>Message usage in components</h3>
		<pre>{usageCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Language explorer (interactive)             -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Language explorer</h2>
	<p class="prose">Select a language below to see how the same content renders in different languages. Enter your name to see parameterized messages in action. Notice how Arabic switches to right-to-left text direction.</p>

	<div class="build">
		<div class="lang-controls">
			<div class="lang-selector">
				{#each languages as lang (lang.code)}
					<button
						class="lang-btn"
						class:active={selectedLang === lang.code}
						onclick={() => (selectedLang = lang.code)}
					>
						{lang.label}
					</button>
				{/each}
			</div>

			<label class="field">
				<span>Your name</span>
				<input type="text" bind:value={userName} placeholder="Enter your name" />
			</label>
		</div>

		<div class="preview" dir={currentLang.dir}>
			<div class="preview-header">
				<span class="lang-badge">{currentLang.code}</span>
				<span class="dir-badge">{currentLang.dir}</span>
			</div>
			<h3>{currentLang.welcome}</h3>
			<p>{currentLang.description}</p>
			<p class="greeting">{resolvedGreeting}</p>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 5: Language switching               -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Language switching</h2>
	<p class="prose">With Paraglide, language switching is just navigation. Each language has its own URL prefix, so switching from English to French is a link: <code>{'<a href="/fr/about">Francais</a>'}</code>. No JavaScript API call, no state mutation — just a standard HTML link. The SvelteKit router handles the rest. Paraglide provides a helper to resolve the current page's URL in any language, making it trivial to build a language switcher component.</p>

	<p class="prose">Persist the user's language preference in a cookie so returning visitors see their preferred language. The <code>handle</code> hook reads the cookie and sets the locale before rendering. For RTL languages (Arabic, Hebrew, Farsi), the <code>dir</code> attribute on <code>{'<html>'}</code> must be set to <code>rtl</code>. Paraglide handles this automatically via the <code>%paraglide.dir%</code> placeholder in <code>app.html</code>. Without the correct <code>dir</code> attribute, the entire page layout mirrors incorrectly — text alignment, flexbox direction, margin/padding placement all flip.</p>

	<div class="build">
		<h3>Language switcher component</h3>
		<pre>{languageSwitcherCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Section 6: SEO for multilingual sites       -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>SEO for multilingual sites</h2>
	<p class="prose">Search engines need explicit signals to understand your multilingual site. The <code>hreflang</code> link tags in <code>{'<svelte:head>'}</code> tell Google which language versions of each page exist. Every page must list every language variant — including itself — plus an <code>x-default</code> fallback. Paraglide makes this easy: derive the hreflang tags from the available languages and the current pathname using <code>i18n.resolveRoute()</code>.</p>

	<p class="prose">Canonical URLs prevent duplicate content penalties. Each language version should have its own canonical URL pointing to itself (not to the "default" language). The sitemap should include all language variants with <code>{'<xhtml:link rel="alternate">'}</code> entries. Search engines use these signals together — hreflang, canonical, sitemap — to build a complete picture of your multilingual site structure.</p>

	<div class="build">
		<h3>Hreflang tags in layout</h3>
		<pre>{seoHreflangCode}</pre>
	</div>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Break it on purpose                        -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a common i18n mistake. Try each one, observe the failure, then revert.</p>
	<ol class="experiments">
		<li><strong>Use a message key that does not exist in your code: <code>m.nonexistent_key()</code>.</strong> TypeScript immediately flags a compile-time error because Paraglide generates typed functions — there is no <code>nonexistent_key</code> function. This is the key advantage over runtime i18n libraries, where a missing key would silently render a fallback string or an empty string in production. Compile-time safety means you catch every missing translation before your code ships.</li>
		<li><strong>Add a new message key to <code>messages/en.json</code> but forget to add it to <code>messages/es.json</code>.</strong> The Paraglide build warns about missing translations for the Spanish locale. In production, the app would fall back to the source language (English) for that specific message, creating a jarring mix of languages on the page. The lint rule <code>@inlang/message-lint-rule-missing-translation</code> catches these gaps during development.</li>
		<li><strong>Use JavaScript string interpolation instead of message parameters: <code>{'`Hello, ${name}!`'}</code> instead of <code>m.greeting({'{ name }'})</code>.</strong> The string renders correctly in English, but it is impossible to translate because the word order differs between languages. In Japanese, the name comes before the greeting. In Arabic, the grammar is entirely different. Message parameters let translators reorder the pieces freely. String interpolation locks the word order to English grammar.</li>
		<li><strong>Forget to set <code>dir="rtl"</code> for Arabic.</strong> The page renders left-to-right, but Arabic text reads right-to-left. The result: text alignment is wrong (left-aligned instead of right-aligned), flexbox and grid layouts flow in the wrong direction, margins and padding are on the wrong side, and the entire UI feels broken to Arabic-speaking users. The <code>dir</code> attribute is not optional — it is a fundamental part of internationalization.</li>
	</ol>

	<!-- ═══════════════════════════════════════════ -->
	<!-- Having issues?                             -->
	<!-- ═══════════════════════════════════════════ -->
	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<!-- ═══════════════════════════════════════════ -->
	<!-- What you learned                           -->
	<!-- ═══════════════════════════════════════════ -->
	<h2>What you learned</h2>
	<p class="prose">Internationalization in SvelteKit starts with choosing a URL strategy — path prefixes (<code>/en/about</code>, <code>/fr/a-propos</code>) are the standard because they are SEO-friendly, crawlable, and work within a single deployment. Paraglide, the recommended i18n solution, is a compiler that generates typed, tree-shakable message functions from JSON files. Unlike runtime i18n libraries, Paraglide catches missing message keys at compile time, eliminates unused translations from the bundle, and loads messages synchronously without async waterfalls or flashes of untranslated content.</p>
	<p class="prose">Setting up Paraglide involves configuring the Inlang project settings (source language, available languages, lint rules), creating message files per language, and integrating with SvelteKit through two hooks: <code>reroute</code> (maps localized URLs to internal routes) and <code>handle</code> (sets the <code>lang</code> attribute on the HTML response). Messages are used by importing <code>* as m from '$lib/paraglide/messages'</code> and calling functions like <code>m.greeting({'{ name: "Billy" }'})</code>. Parameters are type-safe, and plurals use ICU MessageFormat syntax for correct plural rules across all languages.</p>
	<p class="prose">Language switching is link-based navigation — no JavaScript API calls needed. A language switcher component maps the current page's URL to each available language using <code>i18n.resolveRoute()</code>. For RTL languages like Arabic and Hebrew, the <code>dir="rtl"</code> attribute on <code>{'<html>'}</code> is mandatory — without it, the entire layout mirrors incorrectly. SEO for multilingual sites requires <code>hreflang</code> tags in every page's <code>{'<svelte:head>'}</code>, listing every language variant plus an <code>x-default</code> fallback. Together, these patterns give you a fully internationalized SvelteKit application with compile-time safety, optimal bundle size, and correct SEO signals.</p>
	<p class="next"><strong>Next:</strong> Apply i18n to your project — add Paraglide, create translations, and build a language switcher.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 { font-size: var(--text-xl); margin: 0; }
	h2 { font-size: var(--text-lg); margin: 0; margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text-muted); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; word-wrap: break-word; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── Table ── */
	.table-wrapper { overflow-x: auto; }
	table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
		min-inline-size: 500px;
	}
	th, td {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		text-align: left;
		vertical-align: top;
	}
	th {
		background: var(--color-surface-2);
		font-weight: 600;
	}

	/* ── Language selector ── */
	.lang-controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.lang-selector {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
	.lang-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: all 0.15s;
	}
	.lang-btn:hover { background: var(--color-surface); color: var(--color-text); }
	.lang-btn.active {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field span {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.08em;
	}
	input[type="text"] {
		padding: var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		font-family: inherit;
		font-size: var(--text-base);
		max-inline-size: 20rem;
	}

	/* ── Language preview ── */
	.preview {
		padding: var(--space-lg);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.preview-header {
		display: flex;
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}
	.lang-badge, .dir-badge {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
	}
	.lang-badge { background: var(--color-brand); color: var(--color-surface); }
	.dir-badge { background: var(--color-surface); color: var(--color-text-muted); border: 1px solid var(--color-border); }
	.preview h3 { color: var(--color-text); margin-block-end: var(--space-xs); }
	.preview p { color: var(--color-text-muted); margin: 0; }
	.greeting {
		margin-block-start: var(--space-md);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-brand);
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

	/* === RESPONSIVE BREAKPOINTS === */
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
