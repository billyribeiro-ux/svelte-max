<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	type LikeStatus = 'idle' | 'pending' | 'success' | 'rollback';

	let likes = $state(42);
	let isLiked = $state(false);
	let status = $state<LikeStatus>('idle');
	let message = $state('');

	async function toggleLike() {
		if (status === 'pending') return;

		const previousLikes = likes;
		const previousIsLiked = isLiked;

		// Optimistic update
		isLiked = !isLiked;
		likes = isLiked ? likes + 1 : likes - 1;
		status = 'pending';
		message = '';

		try {
			// Simulate API call
			const success = await fakeApiCall();

			if (success) {
				status = 'success';
				message = 'Saved successfully!';
			} else {
				throw new Error('Server rejected the request');
			}
		} catch {
			// Rollback
			likes = previousLikes;
			isLiked = previousIsLiked;
			status = 'rollback';
			message = 'Failed! Rolled back.';
		}

		// Reset status after delay
		setTimeout(() => {
			status = 'idle';
			message = '';
		}, 2000);
	}

	function fakeApiCall(): Promise<boolean> {
		return new Promise((resolve) => {
			setTimeout(() => {
				// 50% chance of failure
				resolve(Math.random() > 0.5);
			}, 1000);
		});
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type LikeStatus = 'idle' | 'pending' | 'success' | 'rollback';\n" +
		"\n" +
		"	let likes = $state(42);\n" +
		"	let isLiked = $state(false);\n" +
		"	let status = $state\u003cLikeStatus\u003e('idle');\n" +
		"	let message = $state('');\n" +
		"\n" +
		"	async function toggleLike() {\n" +
		"		if (status === 'pending') return;\n" +
		"\n" +
		"		const previousLikes = likes;\n" +
		"		const previousIsLiked = isLiked;\n" +
		"\n" +
		"		// Optimistic update\n" +
		"		isLiked = !isLiked;\n" +
		"		likes = isLiked ? likes + 1 : likes - 1;\n" +
		"		status = 'pending';\n" +
		"		message = '';\n" +
		"\n" +
		"		try {\n" +
		"			// Simulate API call\n" +
		"			const success = await fakeApiCall();\n" +
		"\n" +
		"			if (success) {\n" +
		"				status = 'success';\n" +
		"				message = 'Saved successfully!';\n" +
		"			} else {\n" +
		"				throw new Error('Server rejected the request');\n" +
		"			}\n" +
		"		} catch {\n" +
		"			// Rollback\n" +
		"			likes = previousLikes;\n" +
		"			isLiked = previousIsLiked;\n" +
		"			status = 'rollback';\n" +
		"			message = 'Failed! Rolled back.';\n" +
		"		}\n" +
		"\n" +
		"		// Reset status after delay\n" +
		"		setTimeout(() =\u003e {\n" +
		"			status = 'idle';\n" +
		"			message = '';\n" +
		"		}, 2000);\n" +
		"	}\n" +
		"\n" +
		"	function fakeApiCall(): Promise\u003cboolean\u003e {\n" +
		"		return new Promise((resolve) =\u003e {\n" +
		"			setTimeout(() =\u003e {\n" +
		"				// 50% chance of failure\n" +
		"				resolve(Math.random() \u003e 0.5);\n" +
		"			}, 1000);\n" +
		"		});\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.11 — Optimistic UI with Rollback\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eOptimistic UI\u003c/strong\u003e updates the interface immediately before the server\n" +
		"		confirms the change. If the server rejects the update, we \u003cstrong\u003eroll back\u003c/strong\u003e\n" +
		"		to the previous state. This makes the app feel instant while staying consistent.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eState Machine\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"state-diagram\"\u003e\n" +
		"			\u003cdiv class=\"state-node\" class:active={status === 'idle'}\u003eidle\u003c/div\u003e\n" +
		"			\u003cdiv class=\"state-arrow\"\u003eclick\u003c/div\u003e\n" +
		"			\u003cdiv class=\"state-node\" class:active={status === 'pending'}\u003epending\u003c/div\u003e\n" +
		"			\u003cdiv class=\"state-fork\"\u003e\n" +
		"				\u003cdiv class=\"state-branch\"\u003e\n" +
		"					\u003cdiv class=\"state-arrow success-arrow\"\u003eAPI ok\u003c/div\u003e\n" +
		"					\u003cdiv class=\"state-node success-node\" class:active={status === 'success'}\u003esuccess\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"				\u003cdiv class=\"state-branch\"\u003e\n" +
		"					\u003cdiv class=\"state-arrow fail-arrow\"\u003eAPI fail\u003c/div\u003e\n" +
		"					\u003cdiv class=\"state-node fail-node\" class:active={status === 'rollback'}\u003erollback\u003c/div\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo: Like Button (50% failure rate)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"like-area\"\u003e\n" +
		"			\u003cbutton\n" +
		"				class=\"like-button\"\n" +
		"				class:liked={isLiked}\n" +
		"				class:pending={status === 'pending'}\n" +
		"				onclick={toggleLike}\n" +
		"				disabled={status === 'pending'}\n" +
		"			\u003e\n" +
		"				\u003cspan class=\"heart\"\u003e{isLiked ? '\\u2665' : '\\u2661'}\u003c/span\u003e\n" +
		"				\u003cspan class=\"like-count\"\u003e{likes}\u003c/span\u003e\n" +
		"			\u003c/button\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"status-area\"\u003e\n" +
		"				\u003cspan class=\"status-badge\" data-status={status}\u003e\n" +
		"					{status}\n" +
		"				\u003c/span\u003e\n" +
		"				{#if message}\n" +
		"					\u003cspan\n" +
		"						class=\"message\"\n" +
		"						class:success-msg={status === 'success'}\n" +
		"						class:fail-msg={status === 'rollback'}\n" +
		"					\u003e\n" +
		"						{message}\n" +
		"					\u003c/span\u003e\n" +
		"				{/if}\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Click the heart to like/unlike. The count updates \u003cstrong\u003eimmediately\u003c/strong\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>11.11 — Optimistic UI with Rollback</h1>

	<p class="concept">
		<strong>Optimistic UI</strong> updates the interface immediately before the server
		confirms the change. If the server rejects the update, we <strong>roll back</strong>
		to the previous state. This makes the app feel instant while staying consistent.
	</p>

	<h3>State Machine</h3>
	<div class="build">
		<div class="state-diagram">
			<div class="state-node" class:active={status === 'idle'}>idle</div>
			<div class="state-arrow">click</div>
			<div class="state-node" class:active={status === 'pending'}>pending</div>
			<div class="state-fork">
				<div class="state-branch">
					<div class="state-arrow success-arrow">API ok</div>
					<div class="state-node success-node" class:active={status === 'success'}>success</div>
				</div>
				<div class="state-branch">
					<div class="state-arrow fail-arrow">API fail</div>
					<div class="state-node fail-node" class:active={status === 'rollback'}>rollback</div>
				</div>
			</div>
		</div>
	</div>

	<h3>Live Demo: Like Button (50% failure rate)</h3>
	<div class="build">
		<div class="like-area">
			<button
				class="like-button"
				class:liked={isLiked}
				class:pending={status === 'pending'}
				onclick={toggleLike}
				disabled={status === 'pending'}
			>
				<span class="heart">{isLiked ? '\u2665' : '\u2661'}</span>
				<span class="like-count">{likes}</span>
			</button>

			<div class="status-area">
				<span class="status-badge" data-status={status}>
					{status}
				</span>
				{#if message}
					<span
						class="message"
						class:success-msg={status === 'success'}
						class:fail-msg={status === 'rollback'}
					>
						{message}
					</span>
				{/if}
			</div>
		</div>

		<p class="concept">
			Click the heart to like/unlike. The count updates <strong>immediately</strong>
			(optimistic). After 1 second, the fake API responds — 50% chance it fails and
			the UI rolls back to the previous state.
		</p>
	</div>

	<h3>The Pattern</h3>
	<div class="build">
		<pre><code>async function toggleLike() &#123;
  const previous = likes;     // Save previous state
  likes++;                     // Optimistic update
  status = 'pending';

  try &#123;
    await apiCall();           // Wait for server
    status = 'success';
  &#125; catch &#123;
    likes = previous;          // Rollback on failure
    status = 'rollback';
  &#125;
&#125;</code></pre>
	</div>

	<h3>Concurrent clicks</h3>
	<div class="build">
		<p class="concept">
			What if the user clicks twice before the first request resolves? Options:
			(1) Disable the button during pending (simplest),
			(2) Queue requests,
			(3) Cancel the first request.
			This demo uses option 1 — the button is <code>disabled</code> while
			<code>status === 'pending'</code>.
		</p>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Save previous state before the optimistic update so you can roll back</li>
		<li>Update the UI immediately — the user sees the change before the server responds</li>
		<li>Use a state machine (<code>idle | pending | success | rollback</code>) to track progress</li>
		<li>On failure, restore the saved state and show a message</li>
		<li>This pattern works for likes, toggles, inline edits, and any fast-feedback interaction</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>const previousLikes = likes</code> snapshot before the optimistic update.</strong> When the API fails, the rollback sets <code>likes</code> to <code>undefined</code> because there is no saved value to restore, and the counter displays <code>NaN</code>.</li>
		<li><strong>Remove the <code>if (status === 'pending') return</code> guard at the top of <code>toggleLike()</code>.</strong> Clicking rapidly while a request is in flight fires multiple concurrent API calls, each saving a different "previous" value, and rollbacks corrupt the counter with stale data.</li>
		<li><strong>Remove the optimistic update and only update after the API responds.</strong> The like count does not change until after the 1-second delay, making the app feel sluggish compared to the instant feedback of the optimistic version.</li>
		<li><strong>Set the fake API to always fail (<code>resolve(false)</code>).</strong> Every click briefly shows the new count then snaps back to the old one, creating a jarring yo-yo effect that proves optimistic UI must be paired with reliable APIs or graceful error handling.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Optimistic UI is the pattern of updating the interface immediately before the server confirms the change. The user sees instant feedback, and the app only rolls back if the server rejects the mutation. The key requirement is saving a snapshot of the previous state before applying the optimistic update, so you have something to restore on failure.</p>
	<p class="prose">A state machine with states like <code>idle</code>, <code>pending</code>, <code>success</code>, and <code>rollback</code> cleanly tracks the progress of an async operation. Each state maps to specific UI behaviour: disabling the button during pending, showing a success message, or displaying a rollback warning. This eliminates the boolean soup of multiple <code>isLoading</code> and <code>hasError</code> flags.</p>
	<p class="prose">Handling concurrent clicks is critical. The simplest approach is to disable the UI during the pending state, preventing race conditions where multiple in-flight requests each capture different "previous" values. More advanced patterns include request queuing or aborting the previous request with an <code>AbortController</code>.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-1-core-web-vitals">12.1 — Core Web Vitals</a> — measure and optimise real-world performance.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.state-diagram {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		justify-content: center;
	}
	.state-node {
		padding: var(--space-xs) var(--space-md);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: 0.85em;
		font-weight: 600;
		color: var(--color-text-muted);
		text-align: center;
	}
	.state-node.active {
		border-color: var(--color-primary);
		color: var(--color-primary);
		background: color-mix(in oklch, var(--color-primary) 10%, transparent);
	}
	.success-node.active {
		border-color: oklch(60% 0.18 150);
		color: oklch(60% 0.18 150);
		background: color-mix(in oklch, oklch(60% 0.18 150) 10%, transparent);
	}
	.fail-node.active {
		border-color: #e74c3c;
		color: #e74c3c;
		background: color-mix(in oklch, #e74c3c 10%, transparent);
	}
	.state-arrow {
		font-size: 0.75em;
		color: var(--color-text-muted);
	}
	.state-fork {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.state-branch {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.success-arrow { color: oklch(60% 0.18 150); }
	.fail-arrow { color: #e74c3c; }
	.like-area {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
	}
	.like-button {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md) var(--space-xl);
		background: var(--color-surface-2);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-lg);
		cursor: pointer;
		transition: all 0.2s ease;
		font-size: 1.2rem;
	}
	.like-button:hover:not(:disabled) {
		border-color: var(--color-primary);
	}
	.like-button.liked {
		border-color: #e74c3c;
		background: color-mix(in oklch, #e74c3c 8%, var(--color-surface-2));
	}
	.like-button.pending {
		opacity: 0.7;
		cursor: wait;
	}
	.heart {
		font-size: 1.8rem;
		color: #e74c3c;
		line-height: 1;
	}
	.like-count {
		font-family: var(--font-mono);
		font-weight: 700;
		color: var(--color-text);
		font-size: 1.2rem;
	}
	.status-area {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.status-badge {
		padding: 2px var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: 0.75em;
		font-family: var(--font-mono);
		font-weight: 600;
		text-transform: uppercase;
		background: var(--color-surface-2);
		color: var(--color-text-muted);
	}
	.status-badge[data-status='pending'] {
		background: oklch(80% 0.12 70);
		color: oklch(30% 0.1 70);
	}
	.status-badge[data-status='success'] {
		background: oklch(80% 0.12 150);
		color: oklch(30% 0.1 150);
	}
	.status-badge[data-status='rollback'] {
		background: oklch(80% 0.12 25);
		color: oklch(30% 0.1 25);
	}
	.message {
		font-size: 0.85em;
		font-weight: 600;
	}
	.success-msg { color: oklch(60% 0.18 150); }
	.fail-msg { color: #e74c3c; }


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
