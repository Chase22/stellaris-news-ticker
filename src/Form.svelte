<script lang="ts">
    import type { FormEventHandler } from "svelte/elements";
    import { empires, startDate } from "./constants"

    interface Props {
        title: string
        body: string
        author: string
        dateChanged: (date: Date) => void,
        buttonPressed: () => void
    }
    let { 
        title = $bindable(""),
        body = $bindable(""),
        author = $bindable(""),
        dateChanged,
        buttonPressed
    }: Props = $props();

    const onchange: FormEventHandler<HTMLInputElement> = (e) => {
        dateChanged(new Date((e.target as HTMLInputElement).value))
    }
</script>

<datalist id="news-empire-data">
    {#each empires as empire}
        <option>{empire}</option>
    {/each}    
</datalist>

<input type="text" id="news-title" bind:value={title}>
<textarea rows="5" cols="40" id="news-body" bind:value={body}></textarea>
<input type="date" id="news-date" min={startDate.getTime()} max="2700-01-01" value={startDate.getTime()} {onchange}>
<input type="text" list="news-empire-data" id="news-empire" bind:value={author}>
<button id="news-export" onclick={buttonPressed}>To Image</button>