<script>
    export let title;
    export let desc;
    export let link;
    export let tag;
</script>

<div class="column">
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {title}
            </p>
            <a href="#" class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
            </a>
        </header>
        <div class="card-content">
            <div class="content">
                {desc}
                <a href={link}>{link}</a>
                <br>
                <a href="#">#{tag}</a> <!--TODO: link hashtags-->
                <br>
                Added: <time datetime="2022-10-10">12:10 PM - 10 Oct 2022</time>
            </div>
        </div>
        <footer class="card-footer">
            <a href="#" class="card-footer-item">Save</a>
        </footer>
    </div>
</div>