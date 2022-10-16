<script>
    import { writable } from 'svelte/store';
    export const menu = writable(0);
</script>

<div class="container is-fixed-top is-fluid" id="navbar">
    <br>
    <h1 class="title has-text-centered">HOW TO SURVIVE CS@WPI</h1>
    <nav class="navbar is-link" role="navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="https://www.pictureofhotdog.com/" id="nav_icon">
                <img src="https://cdn-icons-png.flaticon.com/512/5766/5766858.png">
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <a class="navbar-item" id="full_stack_nav" on:click|preventDefault={() => (menu = 1)}>
                    Full Stack/Design
                </a>      
                <a class="navbar-item" id="theory_nav" on:click|preventDefault={() => (menu = 2)}>
                    Theory
                </a>
                <a class="navbar-item" id="cyber_nav" on:click|preventDefault={() => (menu = 3)}>
                    Cybersecurity
                </a>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="field is-grouped">
                    <p class="control">
                        <a class="button is-primary" href="#" id="login_nav">
                        <span>LOGIN</span>
                        </a>
                    </p>
                    <p class="control">
                        <a class="button is-dark" href="#" id="register_nav">
                        <span>REGISTER</span>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    </nav>
</div>