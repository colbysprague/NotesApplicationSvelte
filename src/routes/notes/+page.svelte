<script lang="ts">
  //@ts-nocheck
  import { noteStore } from "$lib/stores";
  import {
    getToastStore,
    type ModalSettings,
    getModalStore,
  } from "@skeletonlabs/skeleton";
  import { flip } from "svelte/animate";

  const toastStore = getToastStore();
  const modalStore = getModalStore();
  let noteArray: any;

  $: noteArray = $noteStore;

  $: allTags = getAllTags(noteArray);

  function getAllTags(data) {
    const tagSet = new Set();

    data.forEach((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        item.tags.forEach((tag) => {
          tagSet.add(tag);
        });
      }
    });

    return tagSet;
  }

  function deleteNote(noteId: string): void {
    const confirmDelete: ModalSettings = {
      type: "confirm",
      title: "Delete Note",
      body: "Are you sure you want to delete this note?",
      response: (r: boolean) => {
        if (r) {
          noteStore.update((notes) => notes.filter((n) => n.id !== noteId));
          toastStore.trigger({
            message: "Note deleted",
            background: "variant-filled-primary",
          });
          return;
        }
        toastStore.trigger({
          message: "Note not deleted!",
          background: "variant-filled-error",
        });
      },
    };
    modalStore.trigger(confirmDelete);
  }

  function formatNiceLookingDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust options based on your preferences
  }

  let currentTag = "_ALL_NOTES";

  function filterObjectsByTag(data, tagToFilter) {
    if (tagToFilter === "_ALL_NOTES") {
      return data;
    }

    return data.filter((item) => {
      if (item.tags && Array.isArray(item.tags)) {
        return item.tags.includes(tagToFilter);
      }

      return false;
    });
  }

  function filterObjectsByContent(data, contentToFilter) {
    currentTag = "_ALL_NOTES";

    const lowercasedContentToFilter = contentToFilter.toLowerCase();

    return data.filter((item) => {
      // Check if the item's content includes the specified content
      if (item.content && typeof item.content === "string") {
        const lowercasedContent = item.content.toLowerCase();
        return lowercasedContent.includes(lowercasedContentToFilter);
      }

      return false;
    });
  }

  let searchContent = "";

  $: filterdNotes = filterObjectsByTag(noteArray, currentTag);
  $: filterdNotes = filterObjectsByContent(noteArray, searchContent);
</script>

<div class="container h-full mx-auto gap-12 flex-col">
  <div class="flex items-center justify-between my-4">
    <h1>Notes</h1>
    <a href="/notes/new" class="btn variant-ghost-primary"> New Note </a>
  </div>

  <div class="card p-4 my-4 flex flex-col">
    <div class="flex items-center justify-start gap-1 flex-wrap">
      <button
        class="chip {currentTag === '_ALL_NOTES'
          ? 'variant-filled'
          : 'variant-soft'}"
        on:click={() => {
          currentTag = "_ALL_NOTES";
        }}
        on:keypress
      >
        <span>All</span>
      </button>
      {#each allTags as c}
        <button
          class="chip {currentTag === c ? 'variant-filled' : 'variant-soft'}"
          on:click={() => {
            currentTag = c;
          }}
          on:keypress
        >
          <span>{c}</span>
        </button>
      {/each}
    </div>
    <input
      type="text"
      class="input mt-4"
      placeholder="Search notes..."
      bind:value={searchContent}
    />
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filterdNotes as note (note)}
      <div
        class="card p-4 variant-ghost-primary flex flex-col gap-2 relative"
        animate:flip={{ duration: 200 }}
      >
        <span class="badge variant-soft"
          >{formatNiceLookingDate(note.createdAt)}</span
        >
        <div>
          {note.content}
        </div>

        <div class="flex gap-1 flex-wrap">
          {#each note.tags as tag}
            <span class="badge variant-ghost-secondary">{tag}</span>
          {/each}
        </div>

        <button
          on:click={() => deleteNote(note.id)}
          class="btn-icon btn-icon-sm variant-filled-error absolute -top-1.5 -right-1.5"
          >X</button
        >
      </div>
    {/each}
    {#if $noteStore.length === 0}
      <p class="">No Notes Yet</p>
    {/if}
  </div>
</div>
