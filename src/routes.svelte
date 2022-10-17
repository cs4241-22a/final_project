<script>
  import { Router, Route } from 'svelte-routing';
  import Index from "./index.svelte";
	import Fullstack from "./fullstack.svelte";
	import Cybersecurity from "./cybersecurity.svelte";
	import Theory from "./theory.svelte";

  export let url = '';
</script>

<router {url}>
  <div>
    <route path="fullstack" component="{Fullstack}" />
    <route path="cybersecurity" component="{Cybersecurity}" />
    <route path="theory" component="{theory}" />
    <route path="/" component="{Index}" />
  </div>
</router>