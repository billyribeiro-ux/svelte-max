<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── CodeCanvas examples ── */
	const exampleViteImport =
		"// +page.svelte\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  // Vite resolves the import at build time.\n" +
		"  // The returned value is a hashed URL like /assets/logo-a1b2c3.png\n" +
		"  import logo from '$lib/assets/logo.png';\n" +
		"\u003c/script>\n" +
		"\n" +
		"<img src={logo} alt=\"Company logo\" width=\"200\" height=\"60\" />\n" +
		"\n" +
		"<!-- Vite also inlines small assets (< 4KB by default) as base64 data URIs.\n" +
		"     This saves an HTTP request for tiny icons and favicons.\n" +
		"     Configure the threshold in vite.config.ts:\n" +
		"     build: { assetsInlineLimit: 4096 } -->";

	const exampleViteConfig =
		"// vite.config.ts\n" +
		"import { enhancedImages } from '@sveltejs/enhanced-img';\n" +
		"import { sveltekit } from '@sveltejs/kit/vite';\n" +
		"import { defineConfig } from 'vite';\n" +
		"\n" +
		"export default defineConfig({\n" +
		"  plugins: [\n" +
		"    // MUST come BEFORE sveltekit()\n" +
		"    enhancedImages(),\n" +
		"    sveltekit()\n" +
		"  ]\n" +
		"});";

	const exampleEnhancedBasic =
		"<!-- Basic usage: auto-generates avif + webp + fallback -->\n" +
		"<!-- Sets width/height automatically from the source file -->\n" +
		"<enhanced:img\n" +
		"  src=\"./hero.jpg\"\n" +
		"  alt=\"Mountain landscape at sunrise\"\n" +
		"/>\n" +
		"\n" +
		"<!-- The compiler transforms this into a <picture> element:\n" +
		"  <picture>\n" +
		"    <source srcset=\"hero-480.avif 480w, hero-1024.avif 1024w\" type=\"image/avif\" />\n" +
		"    <source srcset=\"hero-480.webp 480w, hero-1024.webp 1024w\" type=\"image/webp\" />\n" +
		"    <img src=\"hero-1024.png\" width=\"1024\" height=\"768\"\n" +
		"         alt=\"Mountain landscape at sunrise\" />\n" +
		"  </picture>\n" +
		"-->";

	const exampleEnhancedSizes =
		"<!-- Responsive images with the sizes attribute -->\n" +
		"<!-- Tell the browser how wide the image will display at each breakpoint -->\n" +
		"<enhanced:img\n" +
		"  src=\"./product.jpg\"\n" +
		"  alt=\"Wireless headphones, matte black finish\"\n" +
		"  sizes=\"(min-width: 1280px) 1280px, 100vw\"\n" +
		"/>\n" +
		"\n" +
		"<!-- This tells the browser:\n" +
		"  - On viewports >= 1280px wide, the image displays at 1280px\n" +
		"  - On smaller viewports, the image fills 100% of the viewport width\n" +
		"  - The browser uses this + device pixel ratio to pick the best srcset candidate\n" +
		"\n" +
		"  IMPORTANT: use px in sizes, NOT em or rem.\n" +
		"  The browser evaluates sizes before CSS loads, so relative units are unreliable.\n" +
		"-->";

	const exampleEnhancedWidths =
		"<!-- Custom widths: control exactly which sizes are generated -->\n" +
		"<enhanced:img\n" +
		"  src=\"./banner.png?w=1280;640;400\"\n" +
		"  alt=\"Promotional banner for summer sale\"\n" +
		"  sizes=\"(min-width: 1280px) 1280px, (min-width: 640px) 640px, 400px\"\n" +
		"/>\n" +
		"\n" +
		"<!-- Without ?w=, the plugin generates widths based on the source dimensions.\n" +
		"     With ?w=, you specify exact breakpoints.\n" +
		"     Each width gets avif + webp + fallback variants.\n" +
		"     3 widths x 3 formats = 9 optimized images from 1 source file. -->";

	const exampleEnhancedDynamic =
		"\u003cscript lang=\"ts\">\n" +
		"  // Dynamic import for programmatic use\n" +
		"  import heroImg from './hero.jpg?enhanced';\n" +
		"\n" +
		"  // heroImg is an object with sources for each format:\n" +
		"  // { sources: { avif: '...', webp: '...' }, img: { src, width, height } }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<enhanced:img src={heroImg} alt=\"Dynamic hero\" />\n" +
		"\n" +
		"<!-- Gallery pattern with import.meta.glob -->\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  // Eagerly import all images in a folder\n" +
		"  const galleryModules = import.meta.glob(\n" +
		"    './gallery/*.{jpg,png}',\n" +
		"    {\n" +
		"      eager: true,\n" +
		"      query: { enhanced: true }\n" +
		"    }\n" +
		"  );\n" +
		"\n" +
		"  // Convert to an array for {#each}\n" +
		"  const images = Object.values(galleryModules)\n" +
		"    .map(mod => mod.default);\n" +
		"\u003c/script>\n" +
		"\n" +
		"{#each images as img}\n" +
		"  <enhanced:img src={img} alt=\"Gallery photo\" />\n" +
		"{/each}";

	const exampleCDN =
		"<!-- When images come from a CMS or CDN (not in your repo at build time),\n" +
		"     enhanced:img can't process them. Use @unpic/svelte instead. -->\n" +
		"\n" +
		"<!-- pnpm add @unpic/svelte -->\n" +
		"\u003cscript lang=\"ts\">\n" +
		"  import { Image } from '@unpic/svelte';\n" +
		"\u003c/script>\n" +
		"\n" +
		"<!-- @unpic detects the CDN from the URL and generates\n" +
		"     optimal srcset/sizes automatically -->\n" +
		"<Image\n" +
		"  src=\"https://cdn.example.com/photos/sunset.jpg\"\n" +
		"  alt=\"Sunset over the ocean\"\n" +
		"  width={800}\n" +
		"  height={600}\n" +
		"  layout=\"constrained\"\n" +
		"/>\n" +
		"\n" +
		"<!-- Supported CDNs: Cloudinary, Imgix, Contentful,\n" +
		"     Bunny.net, Cloudflare Images, Vercel, and many more.\n" +
		"     @unpic rewrites the src to include CDN-specific\n" +
		"     resize/format params automatically. -->";

	const exampleBestPractices =
		"<!-- LCP hero image: high priority, NO lazy loading -->\n" +
		"<enhanced:img\n" +
		"  src=\"./hero.jpg\"\n" +
		"  alt=\"Hero banner\"\n" +
		"  fetchpriority=\"high\"\n" +
		"  sizes=\"min(1280px, 100vw)\"\n" +
		"/>\n" +
		"\n" +
		"<!-- Below-the-fold images: lazy loaded (default browser behavior) -->\n" +
		"<enhanced:img\n" +
		"  src=\"./testimonial.jpg\"\n" +
		"  alt=\"Customer testimonial photo\"\n" +
		"  loading=\"lazy\"\n" +
		"  sizes=\"(min-width: 768px) 400px, 100vw\"\n" +
		"/>\n" +
		"\n" +
		"<!-- Source images should be 2x the display size for retina.\n" +
		"     If the image displays at 600px, your source should be 1200px.\n" +
		"     The enhanced:img plugin handles this automatically\n" +
		"     when generating srcset candidates. -->\n" +
		"\n" +
		"<!-- Constrain images with CSS to prevent CLS -->\n" +
		"<style>\n" +
		"  img {\n" +
		"    max-inline-size: 100%;\n" +
		"    block-size: auto; /* maintain aspect ratio */\n" +
		"  }\n" +
		"</style>";

	const examplePictureManual =
		"<!-- Manual <picture> for full control (no plugin needed) -->\n" +
		"<picture>\n" +
		"  <source\n" +
		"    srcset=\"/images/hero-480.avif 480w,\n" +
		"            /images/hero-800.avif 800w,\n" +
		"            /images/hero-1200.avif 1200w\"\n" +
		"    type=\"image/avif\"\n" +
		"    sizes=\"(min-width: 1200px) 1200px, 100vw\"\n" +
		"  />\n" +
		"  <source\n" +
		"    srcset=\"/images/hero-480.webp 480w,\n" +
		"            /images/hero-800.webp 800w,\n" +
		"            /images/hero-1200.webp 1200w\"\n" +
		"    type=\"image/webp\"\n" +
		"    sizes=\"(min-width: 1200px) 1200px, 100vw\"\n" +
		"  />\n" +
		"  <img\n" +
		"    src=\"/images/hero-800.jpg\"\n" +
		"    srcset=\"/images/hero-480.jpg 480w,\n" +
		"            /images/hero-800.jpg 800w,\n" +
		"            /images/hero-1200.jpg 1200w\"\n" +
		"    sizes=\"(min-width: 1200px) 1200px, 100vw\"\n" +
		"    alt=\"Hero banner\"\n" +
		"    width=\"1200\"\n" +
		"    height=\"600\"\n" +
		"    fetchpriority=\"high\"\n" +
		"    decoding=\"async\"\n" +
		"  />\n" +
		"</picture>\n" +
		"\n" +
		"<!-- The browser picks the first <source> whose type it supports,\n" +
		"     then uses sizes + srcset to pick the right resolution.\n" +
		"     AVIF is ~50% smaller than JPEG. WebP is ~25% smaller.\n" +
		"     The <img> fallback ensures universal compatibility. -->";

	/* ── Demo state ── */
	let loaded = $state({ hero: false, gallery: false, icon: false });
	let showNoDimensions = $state(false);
	let showOversized = $state(false);

	function markLoaded(key: 'hero' | 'gallery' | 'icon') {
		loaded[key] = true;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\">\n" +
		"  import CodeCanvas from '$lib/components/CodeCanvas.svelte';\n" +
		"  let loaded = $state({ hero: false, gallery: false, icon: false });\n" +
		"  let showNoDimensions = $state(false);\n" +
		"  let showOversized = $state(false);\n" +
		"\n" +
		"  function markLoaded(key: 'hero' | 'gallery' | 'icon') {\n" +
		"    loaded[key] = true;\n" +
		"  }\n" +
		"\u003c/script>\n" +
		"\n" +
		"<section class=\"page\">\n" +
		"  <h1>12.15 — Image Optimization</h1>\n" +
		"\n" +
		"  <p class=\"prose\">\n" +
		"    Images are the single largest payload on most web pages — typically accounting\n" +
		"    for 50% or more of total page weight. Every image decision you make (format,\n" +
		"    resolution, loading strategy, dimensions) directly affects two Core Web Vitals:\n" +
		"    Largest Contentful Paint (LCP) and Cumulative Layout Shift (CLS).\n" +
		"  </p>\n" +
		"\n" +
		"  <p class=\"prose\">\n" +
		"    Think of it like sending a photo via text message. You could send the original\n" +
		"    40 MB RAW file from your camera, but your friend's phone would take forever to\n" +
		"    download it — and they're viewing it on a 6-inch screen anyway. You'd resize it\n" +
		"    first. The web is the same: serve the right size, in the right format, at the\n" +
		"    right time.\n" +
		"  </p>\n" +
		"\n" +
		"  <h2>Section 1 — Why images matter</h2>\n" +
		"\n" +
		"  <div class=\"build\">\n" +
		"    <h3>Core Web Vitals affected by images</h3>\n" +
		"    <ul>\n" +
		"      <li><strong>LCP (Largest Contentful Paint)</strong> — measures when the largest\n" +
		"        visible element finishes rendering. For most pages, that's an image. A slow-loading\n" +
		"        hero image directly delays LCP.</li>\n" +
		"      <li><strong>CLS (Cumulative Layout Shift)</strong> — measures visual stability.\n" +
		"        When an image loads without reserved dimensions, content below it jumps down,\n" +
		"        creating a layout shift that frustrates users and hurts your CLS score.</li>\n" +
		"    </ul>\n" +
		"  </div>\n" +
		"\n" +
		"  <h2>Section 2 — Vite's built-in handling</h2>\n" +
		"  <p class=\"prose\">Vite processes imported images at build time, hashing filenames for\n" +
		"    long-term caching and inlining small assets as data URIs.</p>\n" +
		"\n" +
		"  <h2>Section 3 — @sveltejs/enhanced-img</h2>\n" +
		"  <p class=\"prose\">The official plugin that auto-generates avif/webp variants, sets\n" +
		"    width/height, and produces responsive srcset — all at build time.</p>\n" +
		"\n" +
		"  <h2>Section 4 — CDN images</h2>\n" +
		"  <p class=\"prose\">When images aren't available at build time (CMS, user uploads),\n" +
		"    use @unpic/svelte for CDN-agnostic optimization.</p>\n" +
		"\n" +
		"  <h2>Section 5 — Best practices</h2>\n" +
		"  <p class=\"prose\">Hero images need fetchpriority=\"high\" and no loading=\"lazy\".\n" +
		"    Always provide alt text. Use 2x source images for retina.</p>\n" +
		"</section>";
</script>

<section class="page">
	<h1>12.15 — Image Optimization</h1>

	<p class="prose">
		Images are the single largest payload on most web pages — typically accounting
		for 50% or more of total page weight. Every image decision you make (format,
		resolution, loading strategy, dimensions) directly affects two Core Web Vitals:
		<strong>Largest Contentful Paint (LCP)</strong> and <strong>Cumulative Layout Shift (CLS)</strong>.
		Getting images right is the single highest-impact performance optimization you
		can make on any website.
	</p>

	<p class="prose">
		Think of it like sending a photo via text message. You <em>could</em> send the original
		40 MB RAW file from your camera, but your friend's phone would take forever to
		download it — and they're viewing it on a 6-inch screen anyway. You'd resize it
		first. The web is the same: serve the right size, in the right format, at the
		right time.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 1 — WHY IMAGES MATTER
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 1 — Why images matter</h2>

	<div class="build">
		<h3>Core Web Vitals affected by images</h3>
		<ul>
			<li><strong>LCP (Largest Contentful Paint)</strong> — measures when the largest
				visible element finishes rendering. For most pages, that element is an image. A
				slow-loading, unoptimized hero image directly delays LCP. Google considers
				anything above 2.5 seconds a "poor" score.</li>
			<li><strong>CLS (Cumulative Layout Shift)</strong> — measures visual stability.
				When an image loads without reserved dimensions, content below it jumps down,
				creating a layout shift. A CLS score above 0.1 is "poor". The fix is always
				the same: give every image explicit <code>width</code> and <code>height</code>
				so the browser can reserve the exact space before the image downloads.</li>
		</ul>
		<p class="note">
			These two metrics directly affect Google's page experience ranking signal.
			Optimizing images is not just a performance concern — it is an SEO concern.
		</p>
	</div>

	<div class="build">
		<h3>The real cost of unoptimized images</h3>
		<div class="cost-grid">
			<div class="cost-card">
				<h4>File size</h4>
				<p>A 4000px JPEG hero image can be 2-5 MB. The same image as a 1200px AVIF is
					50-150 KB — a 20x reduction. On a 3G connection, that's the difference between
					0.5 seconds and 10+ seconds.</p>
			</div>
			<div class="cost-card">
				<h4>Format</h4>
				<p>AVIF is ~50% smaller than JPEG at equivalent quality. WebP is ~25% smaller.
					PNG is lossless but enormous for photos. Serving the right format per browser
					is free performance.</p>
			</div>
			<div class="cost-card">
				<h4>Resolution</h4>
				<p>A 4000px image displayed in a 400px container wastes 99% of its pixels.
					Responsive images via <code>srcset</code> let the browser download only what
					it needs for the current viewport and pixel density.</p>
			</div>
		</div>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 2 — VITE'S BUILT-IN HANDLING
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 2 — Vite's built-in handling</h2>

	<p class="prose">
		Before reaching for any plugin, understand what Vite already does for you. When you
		import an image in a Svelte component, Vite processes it at build time: it hashes
		the filename for aggressive long-term caching (<code>logo-a1b2c3.png</code>), and
		for very small images (under 4 KB by default), it inlines them as base64 data URIs
		to save an HTTP request entirely.
	</p>

	<div class="build">
		<CodeCanvas filename="+page.svelte" code={exampleViteImport} />
		<p class="note">
			The hashed filename means the browser can cache the image forever. When you
			change the image, the hash changes, and the browser fetches the new version
			automatically. No cache-busting headers needed.
		</p>
	</div>

	<p class="prose">
		However, Vite's built-in handling does <em>not</em> convert formats, generate
		multiple resolutions, or add <code>width</code>/<code>height</code> attributes
		for you. For that, you need <code>@sveltejs/enhanced-img</code>.
	</p>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 3 — @sveltejs/enhanced-img
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 3 — @sveltejs/enhanced-img (the PE7 way)</h2>

	<p class="prose">
		The official SvelteKit image plugin is <code>@sveltejs/enhanced-img</code>. It
		processes local images at build time, generating optimized AVIF and WebP variants,
		computing intrinsic <code>width</code> and <code>height</code>, and producing a
		<code>&lt;picture&gt;</code> element with responsive <code>srcset</code>. Install it
		with <code>pnpm add -D @sveltejs/enhanced-img</code>, then configure your Vite config.
	</p>

	<div class="build">
		<h3>Step 1 — Configure vite.config.ts</h3>
		<CodeCanvas filename="vite.config.ts" code={exampleViteConfig} />
		<div class="key-point">
			<strong>Critical:</strong> <code>enhancedImages()</code> must come <em>before</em>
			<code>sveltekit()</code> in the plugins array. The enhanced images plugin needs to
			process image imports before SvelteKit's Vite plugin handles the component compilation.
		</div>
	</div>

	<div class="build">
		<h3>Step 2 — Basic usage</h3>
		<CodeCanvas filename="+page.svelte" code={exampleEnhancedBasic} />
		<p class="note">
			The <code>src</code> path must be a relative path to a local file — it cannot be
			a URL or an alias. The plugin reads the actual file at build time to generate
			optimized variants.
		</p>
	</div>

	<div class="build">
		<h3>Step 3 — Responsive images with sizes</h3>
		<CodeCanvas filename="+page.svelte" code={exampleEnhancedSizes} />
		<p class="note">
			The <code>sizes</code> attribute tells the browser how wide the image will
			display. Without it, the browser assumes the image is <code>100vw</code> wide
			and may download a larger image than necessary. Always provide <code>sizes</code>
			for images that don't span the full viewport.
		</p>
	</div>

	<div class="build">
		<h3>Step 4 — Custom widths</h3>
		<CodeCanvas filename="+page.svelte" code={exampleEnhancedWidths} />
	</div>

	<div class="build">
		<h3>Step 5 — Dynamic imports and galleries</h3>
		<CodeCanvas filename="+page.svelte" code={exampleEnhancedDynamic} />
		<p class="note">
			The <code>?enhanced</code> query parameter tells the plugin to process the image
			and return a structured object instead of a plain URL string. Use
			<code>import.meta.glob</code> with <code>query: {'{ enhanced: true }'}</code> to
			batch-process entire directories of images — perfect for galleries, portfolios,
			and product listings.
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 4 — CDN IMAGES
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 4 — CDN images</h2>

	<p class="prose">
		<code>enhanced:img</code> works brilliantly for images that exist in your repository
		at build time. But what about images from a CMS, user uploads, or a third-party API?
		These URLs aren't known until runtime, so the build-time plugin can't process them.
		For this case, use <code>@unpic/svelte</code> — a CDN-agnostic image component that
		generates optimal <code>srcset</code> and <code>sizes</code> attributes by detecting
		the CDN from the image URL and rewriting it with CDN-specific resize parameters.
	</p>

	<div class="build">
		<CodeCanvas filename="+page.svelte" code={exampleCDN} />
		<p class="note">
			<code>@unpic/svelte</code> supports Cloudinary, Imgix, Contentful, Bunny.net,
			Cloudflare Images, Vercel Image Optimization, and many more. If your CDN isn't
			supported, you can always fall back to a manual <code>&lt;picture&gt;</code>
			element with explicit <code>srcset</code> values.
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     SECTION 5 — BEST PRACTICES
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Section 5 — Best practices from the official docs</h2>

	<p class="prose">
		The SvelteKit documentation lays out clear rules for image optimization. These are
		not suggestions — they are the practices that separate a "good enough" site from
		one that scores 100 on Lighthouse performance.
	</p>

	<div class="build">
		<CodeCanvas filename="+page.svelte" code={exampleBestPractices} />
		<h3>The rules</h3>
		<ul>
			<li><strong>2x resolution for HiDPI/retina.</strong> If an image displays at 600px
				on screen, your source file should be at least 1200px wide. The <code>enhanced:img</code>
				plugin handles this automatically when generating srcset candidates.</li>
			<li><strong><code>fetchpriority="high"</code> for LCP images.</strong> The hero image
				above the fold is almost always the LCP element. Tell the browser to prioritize
				it over other resources.</li>
			<li><strong>No <code>loading="lazy"</code> on the LCP image.</strong> Lazy loading defers
				the download until the image approaches the viewport. For the hero, it's already
				in the viewport — lazy loading only delays it.</li>
			<li><strong>Always provide <code>alt</code> text.</strong> The Svelte compiler warns
				when <code>alt</code> is missing. This is not just accessibility — screen readers,
				search engines, and broken image states all rely on it.</li>
			<li><strong>Don't use <code>em</code> or <code>rem</code> in <code>sizes</code>.</strong>
				The browser evaluates <code>sizes</code> before CSS loads, so relative units
				don't resolve correctly. Use <code>px</code> and <code>vw</code> only.</li>
			<li><strong>Constrain images with CSS</strong> to prevent CLS. Set
				<code>max-inline-size: 100%</code> and <code>block-size: auto</code> on all images
				so they scale down gracefully but never overflow their container.</li>
		</ul>
	</div>

	<div class="build">
		<h3>Manual &lt;picture&gt; for full control</h3>
		<p class="note">
			When you need complete control over formats, breakpoints, and art direction,
			use a manual <code>&lt;picture&gt;</code> element. This is also the pattern to use
			when you pre-generate your own optimized images via a build script.
		</p>
		<CodeCanvas filename="+page.svelte" code={examplePictureManual} />
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     LIVE DEMO
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Live demo — loading strategies</h2>

	<p class="prose">
		These images demonstrate the three loading strategies discussed above. Open your
		browser's Network tab and throttle to "Slow 3G" to see the differences in action.
	</p>

	<div class="build">
		<div class="image-demo">
			<h4>1. Hero Image (fetchpriority="high")</h4>
			<p class="image-note">Above-the-fold hero — loads with highest priority, no lazy loading.</p>
			<div class="image-placeholder" class:loaded={loaded.hero}>
				<img
					src="https://picsum.photos/seed/imgopt-hero/800/400"
					alt="Hero placeholder demonstrating fetchpriority high loading strategy"
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
					src="https://picsum.photos/seed/imgopt-gallery/600/400"
					alt="Gallery placeholder demonstrating lazy loading with srcset"
					width="600"
					height="400"
					loading="lazy"
					srcset="https://picsum.photos/seed/imgopt-gallery/300/200 300w,
							https://picsum.photos/seed/imgopt-gallery/600/400 600w,
							https://picsum.photos/seed/imgopt-gallery/1200/800 1200w"
					sizes="(max-width: 600px) 100vw, 600px"
					onload={() => markLoaded('gallery')}
				/>
			</div>
			<pre>{`<img
  src="gallery.jpg"
  alt="Gallery photo"
  width="600"  height="400"
  loading="lazy"
  srcset="gallery-300.jpg 300w,
          gallery-600.jpg 600w,
          gallery-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 600px"
/>`}</pre>
		</div>

		<div class="image-demo">
			<h4>3. Small icon (lazy, fixed)</h4>
			<p class="image-note">Small decorative image — lazy loaded with fixed dimensions.</p>
			<div class="image-placeholder small" class:loaded={loaded.icon}>
				<img
					src="https://picsum.photos/seed/imgopt-icon/100/100"
					alt="Icon placeholder demonstrating small lazy loading"
					width="100"
					height="100"
					loading="lazy"
					onload={() => markLoaded('icon')}
				/>
			</div>
		</div>

		<h4>Load status</h4>
		<ul>
			<li>Hero: {loaded.hero ? 'Loaded' : 'Loading...'}</li>
			<li>Gallery: {loaded.gallery ? 'Loaded' : 'Loading...'}</li>
			<li>Icon: {loaded.icon ? 'Loaded' : 'Loading...'}</li>
		</ul>
	</div>

	<!-- ═══════════════════════════════════════════════════════════════════
	     CLS DEMO
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Interactive demo — CLS in action</h2>

	<div class="build">
		<h3>Without dimensions (causes CLS)</h3>
		<p class="note">
			Click the button below to load an image without <code>width</code>/<code>height</code>.
			Watch the text below it jump when the image arrives.
		</p>
		<button class="cta" onclick={() => { showNoDimensions = !showNoDimensions; }}>
			{showNoDimensions ? 'Hide' : 'Show'} image without dimensions
		</button>
		{#if showNoDimensions}
			<div class="cls-demo">
				<img
					src="https://picsum.photos/seed/cls-demo/600/300"
					alt="Loaded without width or height to demonstrate CLS"
				/>
				<p class="below-image">This text shifts down when the image loads above. That shift is CLS.</p>
			</div>
		{/if}

		<h3>Oversized image demo</h3>
		<p class="note">
			Click below to load a 4000px image into a 400px container. Open the Network tab
			to see the wasted bandwidth.
		</p>
		<button class="cta" onclick={() => { showOversized = !showOversized; }}>
			{showOversized ? 'Hide' : 'Show'} oversized 4000px image
		</button>
		{#if showOversized}
			<div class="oversized-demo">
				<img
					src="https://picsum.photos/seed/oversized/4000/2000"
					alt="4000px asset crammed into a 400px container, wasting bandwidth"
					width="4000"
					height="2000"
				/>
				<p class="image-note">This 4000px image is displayed at 400px max. Open Network tab — look at the transfer size.</p>
			</div>
		{/if}
	</div>


	<!-- ═══════════════════════════════════════════════════════════════════
	     BREAK IT ON PURPOSE
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>width</code> and <code>height</code> from an <code>&lt;img&gt;</code> tag.</strong> Reload with the Network tab throttled to slow 3G and watch the content below the image jump down as it loads. The browser has no idea how much space to reserve, so it starts at 0px tall and expands when the image arrives. This is CLS — your Lighthouse score drops and users lose their scroll position.</li>
		<li><strong>Serve a 4000px image on mobile in a 400px container.</strong> Open the Network tab and note the transfer size: 2+ MB for an image the user sees at 400px. With a proper <code>srcset</code>, the browser would download a 400px variant at ~50 KB instead. That's a 40x difference in bandwidth — on a metered mobile connection, this is the difference between a usable page and an abandoned one.</li>
		<li><strong>Remove the <code>alt</code> attribute from an <code>&lt;img&gt;</code>.</strong> The Svelte compiler emits an accessibility warning: <code>A11y: &lt;img&gt; element should have an alt attribute</code>. Beyond accessibility, missing alt text means screen readers skip the image, search engines can't index it, and users on slow connections see nothing useful in the placeholder.</li>
		<li><strong>Add <code>loading="lazy"</code> to the hero image.</strong> Measure LCP before and after using Lighthouse or the Performance tab. With lazy loading, the browser defers downloading the hero until it scrolls into view — but it's already in the viewport on load, so lazy loading just adds unnecessary delay. LCP gets measurably worse, sometimes by 500ms or more.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>


	<!-- ═══════════════════════════════════════════════════════════════════
	     WHAT YOU LEARNED
	     ═══════════════════════════════════════════════════════════════════ -->
	<h2>What you learned</h2>

	<p class="prose">
		Images are the dominant factor in web page weight, and optimizing them is the
		single highest-impact performance improvement you can make. SvelteKit's
		<code>@sveltejs/enhanced-img</code> plugin handles the heavy lifting at build time:
		it generates AVIF and WebP variants, computes intrinsic <code>width</code> and
		<code>height</code> to prevent CLS, and produces responsive <code>srcset</code>
		attributes so the browser downloads only the resolution it needs. The key is
		configuring <code>enhancedImages()</code> before <code>sveltekit()</code> in your
		Vite plugins array and using relative paths in the <code>src</code> attribute.
	</p>

	<p class="prose">
		Loading strategy separates good performance from great performance. The hero image
		(your LCP element) needs <code>fetchpriority="high"</code> and must never be
		lazy-loaded — it is already in the viewport when the page loads. Every other
		below-the-fold image should use <code>loading="lazy"</code> to defer its download
		until the user scrolls near it. Combined with accurate <code>sizes</code> attributes
		(always in <code>px</code> or <code>vw</code>, never <code>em</code>/<code>rem</code>),
		this prioritization ensures bandwidth is spent on what the user sees first.
	</p>

	<p class="prose">
		For runtime images from CMS platforms or user uploads, <code>@unpic/svelte</code>
		provides CDN-agnostic optimization by detecting the image CDN from the URL and
		rewriting it with optimal resize parameters. Between <code>enhanced:img</code> for
		build-time assets and <code>@unpic/svelte</code> for runtime assets, every image in
		your SvelteKit application can be served at the right size, in the right format,
		with zero CLS and optimal LCP. Source images should be 2x the display size for
		retina screens, <code>alt</code> text is always required, and CSS should constrain
		images with <code>max-inline-size: 100%</code> and <code>block-size: auto</code>
		to maintain aspect ratio without overflow.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-12/project">Module 12 Project</a> — apply all performance
		patterns to a production-grade application.
	</p>
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

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }
	h3 { font-size: var(--text-base); margin: 0; color: var(--color-text); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		font-style: italic;
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
	}

	.key-point {
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text);
		line-height: 1.5;

		& strong { color: var(--color-brand); }
		& code { font-size: 0.85em; }
	}

	.cost-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.cost-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.cost-card h4 {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-brand);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.cost-card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	.cost-card p code { font-size: 0.85em; }

	/* ── Image demo ── */
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
		max-inline-size: 100%;
		border-radius: var(--radius-md);
		overflow: hidden;
		border: 2px dashed var(--color-border);
		transition: border-color 0.3s;
	}

	.image-placeholder.loaded {
		border-color: var(--color-success);
		border-style: solid;
	}

	.image-placeholder img {
		display: block;
		inline-size: 100%;
		block-size: auto;
	}

	.image-placeholder.small {
		max-inline-size: 100px;
	}

	/* ── CLS demo ── */
	.cls-demo {
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.cls-demo img {
		max-inline-size: 100%;
		block-size: auto;
	}

	.below-image {
		margin: 0;
		padding-block-start: var(--space-sm);
		color: var(--color-warning);
		font-weight: 600;
		font-size: var(--text-sm);
	}

	/* ── Oversized demo ── */
	.oversized-demo {
		max-inline-size: 400px;
		border: 2px dashed var(--color-error);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow: hidden;
	}

	.oversized-demo img {
		max-inline-size: 100%;
		block-size: auto;
	}

	/* ── Buttons ── */
	button.cta {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
	}

	button.cta:hover { background: var(--color-brand-dim); }

	/* ── Experiments ── */
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	/* ── Having issues ── */
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.cost-grid { grid-template-columns: repeat(3, 1fr); }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
	}

	@media (min-inline-size: 1024px) {
		.cost-grid { gap: var(--space-md); }
	}
</style>
