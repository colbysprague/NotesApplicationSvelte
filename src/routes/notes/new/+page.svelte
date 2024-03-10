<script lang="ts">
  import { noteStore } from "$lib/stores";
  import { goto } from "$app/navigation";
  import {
    InputChip,
    type ToastSettings,
    getToastStore,
  } from "@skeletonlabs/skeleton";

  let tags: string[] = [];
  let content: string;

  const toastStore = getToastStore();

  const t: ToastSettings = {
    message: "Note created successfully!",
    background: "variant-filled-primary",
  };

  function createNote(): void {
    noteStore.update((notes) => [
      ...notes,
      {
        id: crypto.randomUUID(),
        content,
        tags,
        createdAt: Date.now(),
      },
    ]);
    content = "";
    tags = [];
    toastStore.trigger(t);
    goto("/notes");
  }
</script>

<div class="container h-full mx-auto gap-8 flex flex-col">
  <form class="card p-4 flex flex-col gap-3">
    <h2>New Note</h2>
    <textarea
      bind:value={content}
      class="textarea p-4"
      rows="5"
      placeholder="Note content..."
    />
    <InputChip bind:value={tags} name="tags" placeholder="Tags..."></InputChip>
    <button
      type="button"
      on:click={createNote}
      class="btn variant-ghost-primary self-end">Create Note</button
    >
  </form>
</div>
