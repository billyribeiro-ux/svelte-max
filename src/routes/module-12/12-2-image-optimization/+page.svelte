<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let loaded = $state({ hero: false, gallery: false, icon: false });

	function markLoaded(key: 'hero' | 'gallery' | 'icon') {
		loaded[key] = true;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let loaded = $state({ hero: false, gallery: false, icon: false });\n" +
		"\n" +
		"	function markLoaded(key: 'hero' | 'gallery' | 'icon') {\n" +
		"		loaded[key] = true;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.2 — Image Optimization\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Every image on the web needs \u003cstrong\u003eexplicit width and height attributes\u003c/strong\u003e so the browser\n" +
		"		can reserve space before the image loads, preventing Cumulative Layout Shift (CLS).\n" +
		"		Combined with \u003ccode\u003eloading=\"lazy\"\u003c/code\u003e, \u003ccode\u003efetchpriority\u003c/code\u003e, \u003ccode\u003esrcset\u003c/code\u003e,\n" +
		"		and \u003ccode\u003esizes\u003c/code\u003e, you get optimal loading for every viewport.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhy Explicit Dimensions Matter\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Without \u003ccode\u003ewidth\u003c/code\u003e and \u003ccode\u003eheight\u003c/code\u003e, the browser doesn't know how much space\n" +
		"		to allocate. When the image finally loads, surrounding content shifts — causing a poor CLS score.\n" +
		"		The browser uses the aspect ratio from these attributes to calculate intrinsic size, even before\n" +
		"		the image downloads.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Attributes\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003ewidth\u003c/code\u003e / \u003ccode\u003eheight\u003c/code\u003e\u003c/strong\u003e — Prevents CLS by reserving space. Always include both.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003eloading=\"lazy\"\u003c/code\u003e\u003c/strong\u003e — Defers off-screen images until they approach the viewport.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003efetchpriority=\"high\"\u003c/code\u003e\u003c/strong\u003e — Tells the browser to prioritize this image (use on LCP element).\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003esrcset\u003c/code\u003e\u003c/strong\u003e — Provides multiple resolutions so the browser picks the best one.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003esizes\u003c/code\u003e\u003c/strong\u003e — Tells the browser how wide the image will display at various breakpoints.\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo: Three Optimized Images\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"image-demo\"\u003e\n" +
		"			\u003ch4\u003e1. Hero Image (fetchpriority=\"high\")\u003c/h4\u003e\n" +
		"			\u003cp class=\"image-note\"\u003eAbove-the-fold hero — loads with highest priority, no lazy loading.\u003c/p\u003e\n" +
		"			\u003cdiv class=\"image-placeholder\" class:loaded={loaded.hero}\u003e\n" +
		"				\u003cimg\n" +
		"					src=\"https://picsum.photos/seed/hero/800/400\"\n" +
		"					alt=\"Hero placeholder demonstrating fetchpriority high\"\n" +
		"					width=\"800\"\n" +
		"					height=\"400\"\n" +
		"					fetchpriority=\"high\"\n" +
		"					onload={() =\u003e markLoaded('hero')}\n" +
		"				/\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cpre\u003e{`\u003cimg\n" +
		"  src=\"hero.jpg\"\n" +
		"  alt=\"Hero banner\"\n" +
		"  width=\"800\"\n" +
		"  height=\"400\"\n" +
		"  fetchpriority=\"high\"\n" +
		"/\u003e`}\u003c/pre\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"image-demo\"\u003e\n" +
		"			\u003ch4\u003e2. Gallery Image (loading=\"lazy\" + srcset)\u003c/h4\u003e\n" +
		"			\u003cp class=\"image-note\"\u003eBelow-the-fold — lazy loaded with responsive srcset.\u003c/p\u003e\n" +
		"			\u003cdiv class=\"image-placeholder\" class:loaded={loaded.gallery}\u003e\n" +
		"				\u003cimg\n" +
		"					src=\"https://picsum.photos/seed/gallery/600/400\"\n" +
		"					alt=\"Gallery placeholder demonstrating lazy loading and srcset\"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>12.2 — Image Optimization</h1>

	<p class="concept">
		Every image on the web needs <strong>explicit width and height attributes</strong> so the browser
		can reserve space before the image loads, preventing Cumulative Layout Shift (CLS).
		Combined with <code>loading="lazy"</code>, <code>fetchpriority</code>, <code>srcset</code>,
		and <code>sizes</code>, you get optimal loading for every viewport.
	</p>

	<h3>Why Explicit Dimensions Matter</h3>
	<p class="concept">
		Without <code>width</code> and <code>height</code>, the browser doesn't know how much space
		to allocate. When the image finally loads, surrounding content shifts — causing a poor CLS score.
		The browser uses the aspect ratio from these attributes to calculate intrinsic size, even before
		the image downloads.
	</p>

	<h3>Key Attributes</h3>
	<div class="build">
		<ul>
			<li><strong><code>width</code> / <code>height</code></strong> — Prevents CLS by reserving space. Always include both.</li>
			<li><strong><code>loading="lazy"</code></strong> — Defers off-screen images until they approach the viewport.</li>
			<li><strong><code>fetchpriority="high"</code></strong> — Tells the browser to prioritize this image (use on LCP element).</li>
			<li><strong><code>srcset</code></strong> — Provides multiple resolutions so the browser picks the best one.</li>
			<li><strong><code>sizes</code></strong> — Tells the browser how wide the image will display at various breakpoints.</li>
		</ul>
	</div>

	<h3>Demo: Three Optimized Images</h3>
	<div class="build">
		<div class="image-demo">
			<h4>1. Hero Image (fetchpriority="high")</h4>
			<p class="image-note">Above-the-fold hero — loads with highest priority, no lazy loading.</p>
			<div class="image-placeholder" class:loaded={loaded.hero}>
				<img
					src="https://picsum.photos/seed/hero/800/400"
					alt="Hero placeholder demonstrating fetchpriority high"
					width="800"
					height="400"
					fetchpriority="high"
					onload={() => markLoaded('hero')}
				/>
			</div>
			<pre>{`<img
  src="hero.jpg"
  alt="Hero banner"
  width="800"
  height="400"
  fetchpriority="high"
/>`}</pre>
		</div>

		<div class="image-demo">
			<h4>2. Gallery Image (loading="lazy" + srcset)</h4>
			<p class="image-note">Below-the-fold — lazy loaded with responsive srcset.</p>
			<div class="image-placeholder" class:loaded={loaded.gallery}>
				<img
					src="https://picsum.photos/seed/gallery/600/400"
					alt="Gallery placeholder demonstrating lazy loading and srcset"
					width="600"
					height="400"
					loading="lazy"
					srcset="https://picsum.photos/seed/gallery/300/200 300w,
							https://picsum.photos/seed/gallery/600/400 600w,
							https://picsum.photos/seed/gallery/1200/800 1200w"
					sizes="(max-width: 600px) 100vw, 600px"
					onload={() => markLoaded('gallery')}
				/>
			</div>
			<pre>{`<img
  src="gallery.jpg"
  alt="Gallery photo"
  width="600"
  height="400"
  loading="lazy"
  srcset="gallery-300.jpg 300w,
          gallery-600.jpg 600w,
          gallery-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
/>`}</pre>
		</div>

		<div class="image-demo">
			<h4>3. Icon Image (small, lazy)</h4>
			<p class="image-note">Small decorative image — lazy loaded with fixed dimensions.</p>
			<div class="image-placeholder small" class:loaded={loaded.icon}>
				<img
					src="https://picsum.photos/seed/icon/100/100"
					alt="Icon placeholder demonstrating small lazy loading"
					width="100"
					height="100"
					loading="lazy"
					onload={() => markLoaded('icon')}
				/>
			</div>
			<pre>{`<img
  src="icon.png"
  alt="Feature icon"
  width="100"
  height="100"
  loading="lazy"
/>`}</pre>
		</div>
	</div>

	<h3>Modern Formats</h3>
	<div class="build">
		<p class="concept">
			WebP is ~25% smaller than JPEG at equivalent quality; AVIF is ~50% smaller. Use
			<code>&lt;picture&gt;</code> with <code>&lt;source&gt;</code> for format fallback:
		</p>
		<pre>{`<picture>
  <source srcset="hero.avif" type="image/avif">
  <source srcset="hero.webp" type="image/webp">
  <img src="hero.jpg" alt="Hero" width="800" height="400">
</picture>`}</pre>
		<p class="concept">
			Serve the smallest format the browser supports. The browser picks the first
			<code>&lt;source&gt;</code> it understands, falling back to the <code>&lt;img&gt;</code>.
		</p>
	</div>

	<h3>Load Status</h3>
	<div class="build">
		<ul>
			<li>Hero: {loaded.hero ? 'Loaded' : 'Loading...'}</li>
			<li>Gallery: {loaded.gallery ? 'Loaded' : 'Loading...'}</li>
			<li>Icon: {loaded.icon ? 'Loaded' : 'Loading...'}</li>
		</ul>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Explicit <code>width</code> and <code>height</code> attributes prevent CLS by reserving space before images load.</li>
		<li><code>fetchpriority="high"</code> prioritizes the LCP image; <code>loading="lazy"</code> defers off-screen images.</li>
		<li><code>srcset</code> and <code>sizes</code> let the browser pick the optimal resolution for each viewport.</li>
		<li>Use <code>&lt;picture&gt;</code> with AVIF/WebP sources for significant file-size savings over JPEG.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.image-demo {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.image-demo h4 { margin: 0; }
	.image-note {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.image-placeholder {
		max-width: 100%;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 2px dashed var(--color-border);
		transition: border-color 0.3s;
	}
	.image-placeholder.loaded {
		border-color: #2d8a4e;
		border-style: solid;
	}
	.image-placeholder img {
		display: block;
		width: 100%;
		height: auto;
	}
	.image-placeholder.small {
		max-width: 100px;
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
