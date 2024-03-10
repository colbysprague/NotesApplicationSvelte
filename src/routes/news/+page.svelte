<script>
    export let data;
    console.log(data);
</script>

<div class="container max-w-screen-md mx-auto">
    <div class="p-4 my-4 flex flex-col">
        <div class="flex items-center justify-start gap-1 flex-wrap">
            Featured NFL Stories
        </div>
    </div>

    <div class="p-4 my-4 flex flex-col">
        <div class="flex items-center justify-center gap-1 flex-wrap">
            <div class="grid grid-cols-1 gap-4">
                {#each data.articles as story}
                    <a class="card card-hover" href="/elements/cards">
                        <header>
                            <img
                                src={story.images[0].url}
                                class="bg-black/50 w-full h-90 object-cover"
                                alt="Post"
                            />
                        </header>
                        <div class="p-4 space-y-4">
                            <h6 class="h6" data-toc-ignore>NFL Story 🏈</h6>
                            <h3 class="h3" data-toc-ignore>{story.headline}</h3>
                            <article>
                                <p>
                                    {story.description}
                                </p>
                            </article>
                        </div>
                        <hr class="opacity-50" />
                        <footer
                            class="p-4 flex justify-start items-center space-x-4"
                        >
                            <div
                                class="flex-auto flex justify-between items-center"
                            >
                                <h6 class="font-bold" data-toc-ignore>
                                    By {story.byline}
                                </h6>
                                <small
                                    >On {new Date().toLocaleDateString()}</small
                                >
                            </div>
                        </footer>
                    </a>
                {/each}
            </div>
        </div>
    </div>
</div>
