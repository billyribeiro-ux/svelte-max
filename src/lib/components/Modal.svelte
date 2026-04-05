<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    title: string;
    children: Snippet;
    onclose?: () => void;
  }

  let {
    open = $bindable(false),
    title,
    children,
    onclose
  }: Props = $props();

  let dialogEl = $state<HTMLDialogElement | null>(null);

  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) {
      dialogEl.showModal();
    } else if (!open && dialogEl.open) {
      dialogEl.close();
    }
  });

  function close() {
    open = false;
    onclose?.();
  }

  function handleBackdrop(e: MouseEvent) {
    if (e.target === dialogEl) {
      close();
    }
  }

  function handleKey(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }
</script>

<dialog
  bind:this={dialogEl}
  onclick={handleBackdrop}
  onkeydown={handleKey}
  onclose={() => { if (open) close(); }}
>
  <header class="modal-header">
    <h2>{title}</h2>
    <button type="button" class="close" aria-label="Close" onclick={close}>×</button>
  </header>
  <div class="modal-body">
    {@render children()}
  </div>
</dialog>

<style>
  dialog {
    max-inline-size: 32rem;
    inline-size: calc(100% - var(--space-xl));
    padding: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-lg);
  }

  dialog::backdrop {
    background: oklch(0% 0 0 / 0.55);
    backdrop-filter: blur(2px);
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-md);
    padding: var(--space-md) var(--space-lg);
    border-block-end: 1px solid var(--color-border);
  }

  .modal-header h2 {
    margin: 0;
    font-size: var(--text-lg);
  }

  .close {
    background: transparent;
    border: none;
    color: var(--color-text-muted);
    font-size: var(--text-2xl);
    line-height: 1;
    cursor: pointer;
    padding: var(--space-xs) var(--space-sm);
    border-radius: var(--radius-sm);
    transition: background var(--dur-fast) var(--ease-out);
  }

  .close:hover {
    background: var(--color-surface-2);
    color: var(--color-text);
  }

  .modal-body {
    padding: var(--space-lg);
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
  }
</style>
