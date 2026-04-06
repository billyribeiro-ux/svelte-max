<script lang="ts">
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
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
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
</style>
