<script>
	// import Navbar from "./navbar.svelte";;
	import Footer from "./footer.svelte";
	import Card from "./card.svelte";
        
    const discreteMath ={
            title: 'DiscreteMath.org', 
            desc: 'An open content source to learn discrete math. ',
            link: 'https://discretemath.org/',
            tag: 'theory'
    };

    const teachYourself ={
            title: 'Teach Yourself CS', 
            desc: 'Massive guide to learn lots of underlying knowlegdge of Computer Science.',
            link: 'https://teachyourselfcs.com/',
            tag: 'theory'
     };

     const theoryOfComp ={
            title: "Theory of Computation",
            desc: "MIT Opencourseware on their class, Theory of Computation, at both a graduate and undergraduate level.",
            link: "https://ocw.mit.edu/courses/18-404j-theory-of-computation-fall-2020/", 
            tag: "theory"
    };

    const theoriesInComp ={
        title: "Theories in Computer Science",
        desc: "A quick guide giving small explanations of the basics of computer science theory.",
        link: "https://cs.lmu.edu/~ray/notes/cstheories/", 
        tag: "theory"
    };

    const introDiscrete ={
        title: "Discrete Mathematics, An Introduction",
        desc: "An interactive ebook introducing discrete math to beginners.",
        link: "https://discrete.openmathbooks.org/dmoi3/", 
        tag: "theory"
    };

    const visualgo ={
        title: "VisualAlgo",
        desc: "A website with visuals and animations of many popular algorithims.",
        link: "https://visualgo.net/en", 
        tag: "theory"
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
<section class="hero is-info" id="theory_hero">
    <div class="hero-body">
        <h2 class="title is-2 has-text-centered">Theory</h2>
        <p>Computational Theory is a large background element of all Computer Science. It is good to have a general base of computational theory to understand the underlying working of computers.</p>
        <p>WPI offers a number of courses focused on Theory. Some of the offerings include <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-3133">CS 3133</a> and <a href="https://www.wpi.edu/academics/calendar-courses/course-descriptions/17851/computer-science#CS-4123">CS 4123</a>.</p>
    </div>
  </section>
<br>
<div class="container">
    <div class="columns is-vcentered is desktop">
        <div class="column" id="theory_col1">
			<Card {...teachYourself}/>
			<Card {...visualgo}/>
		</div>
		<div class="column" id="theory_col2">
			<Card {...theoriesInComp} />
			<Card {...theoryOfComp} />
		</div>
		<div class="column" id="theory_col3">
            <Card {...discreteMath} />
			<Card {...introDiscrete} />
		</div>
	</div>
</div>
<br>
<br>
<Footer /> <!--triple check-->