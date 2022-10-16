<script>
	// import Navbar from "./navbar.svelte";;
	import Footer from "./footer.svelte";
	import Card from "./card.svelte";
        
    const sqlZoo ={
        title: 'SQLZoo', 
        desc: 'Wiki-based interactive tutorials to learn SQL.',
        link: 'https://sqlzoo.net/wiki/SQL_Tutorial',
        tag: 'fullstack'
    };

    const hciBibs ={
        title: 'HCI Bib', 
        desc: 'A webpage of useful HCI resources (albeit a bit outdated). ',
        link: 'http://hcibib.org/',
        tag: 'fullstack'
    };

    const material ={
            title: "Material.io",
            desc: "Best practices for building Android Apps.",
            link: "https://material.io/design", 
            tag: "fullstack"
    };

    const webTools ={
        title: "Accessible Web Tools",
        desc: "A Mastersheet of many Accessible web components.",
        link: "https://www.smashingmagazine.com/2021/03/complete-guide-accessible-front-end-components/", 
        tag: "fullstack"
    };

    const responsiveDesign ={
        title: "Responsive Design",
        desc: "Helpful step-by-step guides to learn Responsive Design.",
        link: "https://web.dev/learn/design/", 
        tag: "fullstack"
    };

    const runrb ={
        title: "runrb.io",
        desc: "Online development space to create, run, and test Ruby on Rails code.",
        link: "https://runrb.io/", 
        tag: "fullstack"
    };

    const codeAbbey ={
        title: "CodeAbbey",
        desc: "Test out your Java skills with a wide variety of Java problems to solve.",
        link: "https://www.codeabbey.com/index/task_list", 
        tag: "fullstack"
    };

    const phpRight ={
        title: "PHP the Right Way",
        desc: "A frequently updated guide to learn and write PHP code.",
        link: "https://phptherightway.com/", 
        tag: "fullstack"
    };

    const devTerminal ={
        title: "Front-End Dev's Guide to Terminal",
        desc: "A user friendly guide to using Terminal commands.",
        link: "https://www.joshwcomeau.com/javascript/terminal-for-js-devs/", 
        tag: "fullstack"
    };

    const reactLib ={
        title: "React Libraries",
        desc: "13 React Libraries that are helpful to know.",
        link: "https://cult.honeypot.io/reads/react-libraries-2022/", 
        tag: "fullstack"
    };

    const svelteTut ={
        title: "Svelte Tutorials",
        desc: "Tutorials from the official Svelte documentation.",
        link: "https://svelte.dev/tutorial/basics", 
        tag: "fullstack"
    };

    const w3Schools ={
        title: "W3 Schools",
        desc: "A website with documentation and tutorials for almost all of the most popular web development languages and Tools.",
        link: "https://www.w3schools.com/", 
        tag: "fullstack"
    };
</script>

<svelte:head>
	<meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>How to Survive CS@WPI</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
        <link rel="icon" type="image/x-icon" href="https://cdn-icons-png.flaticon.com/512/5766/5766858.png">
</svelte:head>

<!-- <Navbar /> triple check -->
<br>
<br>
<br>
<!--Hero content-->
<section class="hero is-info" id="full_stack_hero">
    <div class="hero-body">
        <h2 class="title is-2 has-text-centered">Full-Stack and Design</h2>
        <p>Fullstack development is a useful skill for developers to have. Fullstack development is the ability to work on both the front end and back end of applications.</p>
        <p>WPI offers a number of courses focused on fullstack. Some of the offerings include <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3733">CS 3733</a> and <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3041">CS 3041</a>.</p>
    </div>
  </section>
<br>
<div class="container">
    <div class="columns is-vcentered is desktop">
        <div class="column" id="front_end_cards">
            <h1 class="title is-2 has-text-centered">Front End</h1>
			<Card {...material}/>
			<Card {...hciBibs}/>
			<Card {...webTools}/>
		</div>
		<div class="column" id="back_end_cards">
			<h1 class="title is-2 has-text-centered">Back End</h1>
			<Card {...codeAbbey} />
			<Card {...runrb} />
			<Card {...sqlZoo}/>
		</div>
		<div class="column" id="full_stack_cards">
            <h1 class="title is-2 has-text-centered">Full Stack</h1>
            <Card {...reactLib} />
			<Card {...svelteTut} />
			<Card {...w3Schools} />
		</div>
	</div>
</div>
<br>
<br>
<Footer /> <!--triple check-->