<script lang="ts">
  //@ts-nocheck

  import Navigation from "$lib/components/Navigation.svelte";
  import "../app.postcss";
  import {
    AppShell,
    AppBar,
    Avatar,
    initializeStores,
    getDrawerStore,
    Drawer,
    Toast,
    getToastStore,
    Modal,
  } from "@skeletonlabs/skeleton";

  initializeStores();

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open();
  }
</script>

<Toast position="tr"></Toast>
<Modal></Modal>
<Drawer>
  <Navigation />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
  <svelte:fragment slot="header">
    <!-- App Bar -->
    <AppBar>
      <svelte:fragment slot="lead">
        <button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path
              d="M4 8l16 0"
            /><path d="M4 16l16 0" /></svg
          >
        </button>

        <strong class="text-xl uppercase"> <a href="/">🗞️ Parchment</a></strong>
      </svelte:fragment>

      <svelte:fragment slot="trail">
        <Avatar initials="CS" background="bg-primary-500" class="w-10" />
      </svelte:fragment>
    </AppBar>
  </svelte:fragment>

  <!-- <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment> -->

  <div class="container p-10 mx-auto">
    <slot />
  </div>
  <svelte:fragment slot="pageFooter"
    ><div class="p-4 text-primary-100">
      A Colby Sprague Project
    </div></svelte:fragment
  >
</AppShell>
