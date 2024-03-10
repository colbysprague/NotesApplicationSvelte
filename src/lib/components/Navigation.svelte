<script lang="ts">
    import { getDrawerStore } from "@skeletonlabs/skeleton";

    const drawerStore = getDrawerStore();

    function drawerClose(): void {
        drawerStore.close();
    }
</script>

<nav class="list-nav p-4">
    <ul>
        <li><a on:click={drawerClose} href="/notes">Notes</a></li>
        <li><a on:click={drawerClose} href="/news">News</a></li>
    </ul>
</nav>
