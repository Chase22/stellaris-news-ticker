<script lang="ts">
    import Form from "./Form.svelte";
    import { newsTitleStore, newsBodyStore, newsAuthorStore, newsDateStore } from "./localstore";
    import News from "./News.svelte";
    import download from 'downloadjs';
    import { toPng } from 'html-to-image';

    let news: HTMLElement | undefined = $state(undefined)

    function buildImage() {
        console.log(news)
        toPng(news!!, {
            style: {
                border: "5px solid transparent"
            }
        }).then((dataUrl) => {
            download(dataUrl, "news.png", "image/png")
        }, (e) => {
            console.error(`Error exporting image: ${e}`)
            window.alert("There was an issue with exporting the image. Please tell chase")
        })
    }
</script>

<style>
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .left {
        display: flex;
        flex-direction: column;
    }

    .right {

    }
</style>

<main>
    <div class="left">
        <Form 
            bind:title={$newsTitleStore}
            bind:body={$newsBodyStore}
            bind:author={$newsAuthorStore}
            dateChanged = { (newDate) => { $newsDateStore = newDate } }
            buttonPressed={buildImage}
        />
    </div>
    <div class="right">
        <News bind:newsDiv={news} title = {$newsTitleStore} body = {$newsBodyStore} date = {$newsDateStore} author={$newsAuthorStore}/>
    </div>
</main>