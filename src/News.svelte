<script lang="ts">
    import { marked } from 'marked';
    import DOMPurify from 'dompurify';
    import dateformat from 'date-format';

    let { title, body, date, author, newsDiv = $bindable(undefined) }: {
        newsDiv: HTMLElement | undefined
        title: string,
        body: string,
        author: string,
        date: Date
    } = $props()

    let renderedBody = $derived( DOMPurify.sanitize(marked(body)) )
</script>

<style>
    .ui.panel {
        width: calc(100%-20px);
        height: calc(100%-20px);
        padding: 2px;
        background: #00a1ed; /* fallback */
        background: linear-gradient(0deg, transparent 0px, #00a1ed 0) top left, linear-gradient(0deg, transparent 0px, #00a1ed 0) top right, linear-gradient(315deg, transparent 10px, #00a1ed 0) bottom right, linear-gradient(0deg, transparent 0px, #00a1ed 0) bottom left;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        display: inline-block;
        -webkit-filter: drop-shadow(5px 5px 5px rgba(0, 161, 237, 0.25));
        filter: drop-shadow(5px 5px 5px rgba(0, 161, 237, 0.25));
        width: 100%;
        height: 100%;
    }

    .ui.panel > .content {
        width: calc(100% - 1em);
        height: calc(100% - 1em);
        padding: 0.5em;
        color: #00a1ed;
        background: #00202F; /* fallback */
        background: linear-gradient(0deg, transparent 0px, rgba(0, 0, 0, 0.8) 0) top left, linear-gradient(0deg, transparent 0px, rgba(0, 0, 0, 0.8) 0) top right, linear-gradient(315deg, transparent 10px, rgba(0, 0, 0, 0.8) 0) bottom right, linear-gradient(0deg, transparent 0px, rgba(0, 0, 0, 0.8) 0) bottom left;
        background-size: 50% 50%;
        background-repeat: no-repeat;
        display: inline-block;
    }

    .ui.panel hr {
        border-color: #00a1ed;
    }
</style>

<div bind:this={newsDiv} id="news" style="padding: 10px;">
    <div style="width:400px;padding-bottom: 10px;">
      <div class="ui panel">
        <div class="ui panel content">
          <h3 id="news-title-view">{title}</h3>
          <hr>
          <span id="news-body-view">{@html renderedBody}</span>
          <b id="news-date-view">{dateformat("- dd-MM-yyyy", date)}</b>
        </div>
      </div>
    </div>
    <div style="width:400px">
      <div class="ui panel">
        <div class="ui panel content">
          <b>Author:</b> <span id="news-author">{author}</span><br/>
          <span style="font-size: 10px;">
            GNT is an independant, interstellar organisation of the galactic community. It takes no editorial
            responsibility for any news send and is only responsible for distribution of news <br />
          </span>
        </div>
      </div>
    </div>
  </div>