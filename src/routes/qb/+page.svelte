<script lang="ts">
    //@ts-nocheck
    import { FileButton } from "@skeletonlabs/skeleton";
    import { ProgressRadial } from "@skeletonlabs/skeleton";

    let files: FileList;
    let loading: boolean = false;
    let displayButton: boolean = true;
    let processedData;
    let videoURL;

    async function onChangeHandler(e: Event): Promise<void> {
        loading = true;
        displayButton = false;

        const file = e.target.files[0];

        videoURL = URL.createObjectURL(file);

        // Create a FormData object to append the file
        const formData = new FormData();
        formData.append("video", file);

        try {
            // Make a POST request to the Flask API endpoint
            const response = await fetch(
                "http://127.0.0.1:5000/process-video",
                {
                    method: "POST",
                    mode: "cors",
                    body: formData,
                },
            );

            // Parse the JSON response
            const data = await response.json();

            processedData = data[0];
            console.log(processedData);
        } catch (err) {
            alert("Error Processing Video. Please try again");
        } finally {
            loading = false;
            displayButton = true;
        }
    }
</script>

<div class="h-full text-center flex flex-col align-center justify-center">
    <h1 class="h1">
        <span
            class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
            >Elevate Your Game.</span
        >
    </h1>

    <br />
    {#if displayButton}
        <FileButton name="files" bind:files on:change={onChangeHandler}
            >Upload Throw</FileButton
        >
    {/if}
    {#if loading}
        <ProgressRadial />
    {/if}
    {#if processedData}
        <br />
        <div class="grid grid-cols-1 md:grid-cols-2">
            <video
                controls
                width="640"
                height="360"
                style="border-radius: 10px"
            >
                <source src={videoURL} type="video/mp4" />
                <track captions="" />
                Your browser does not support the video tag.
            </video>

            <!-- Responsive Container (recommended) -->
            <div class="table-container">
                <!-- Native Table Element -->
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>On Release</th>
                            <th>Degrees</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Elbow Angle</td>
                            <td>{processedData.data.releaseArmAngle}</td>
                        </tr>
                        <tr>
                            <td>Shoulder Tilt</td>
                            <td>{processedData.data.shoulderTilt}</td>
                        </tr>
                    </tbody>
                </table>
                Thank you for using QBVision!
            </div>
        </div>
    {/if}
</div>
