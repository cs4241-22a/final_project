const { add_transform } = require("svelte/internal");

//info packages
class Resources{
    constructor()
    {
        var cyberChef ={
            title: 'CyberChef', 
            desc: 'CyberChef is a simple, intuitive web app for carrying out all manner of \"cyber\" operations within a web browser.',
            link: 'https://gchq.github.io/CyberChef/',
            tag: 'cybersecurity'
        };
        
        const sqlZoo ={
            title: 'SQLZoo', 
            desc: 'Wiki-based interactive tutorials to learn SQL.',
            link: 'https://sqlzoo.net/wiki/SQL_Tutorial',
            tag: 'fullstack'
        };
        
        const discreteMath ={
            title: 'DiscreteMath.org', 
            desc: 'An open content source to learn discrete math. ',
            link: 'https://discretemath.org/',
            tag: 'theory'
        };

        const hciBibs ={
            title: 'HCI Bib', 
            desc: 'A webpage of useful HCI resources (albeit a bit outdated). ',
            link: 'http://hcibib.org/',
            tag: 'fullstack'
        };
        
        const cyberAwareness ={
            title: 'Cyber Awareness Challenge', 
            desc: 'Training used by Department of Defense workers to be aware of common cyber security threats.',
            link: 'https://public.cyber.mil/training/cyber-awareness-challenge/',
            tag: 'cybersecurity'
        };
        
        const teachYourself ={
            title: 'Teach Yourself CS', 
            desc: 'Massive guide to learn lots of underlying knowlegdge of Computer Science.',
            link: 'https://teachyourselfcs.com/',
            tag: 'theory'
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

        const nationalCyber ={
            title: "The National Cyber League",
            desc: "Join a community for immersive cyber challenges",
            link: "https://nationalcyberleague.org/", 
            tag: "cybersecurity"
        };

        const cyberGames ={
            title: "Cybersecurity Games",
            desc: "A set of games from the University of Texas at Austin focused on testing and sharpening cybersecurity skills.",
            link: "https://it.tamu.edu/security/cybersecurity-games/index.php", 
            tag: "cybersecurity"
        };

        const hacker101 ={
            title: "Hacker101",
            desc: "Free online classes covering web security.",
            link: "https://www.hacker101.com/", 
            tag: "cybersecurity"
        };

        const tryHackMe ={
            title: "TryHackMe",
            desc: "Learning cybersecurity in small, byte-sized, gamified lessons.",
            link: "https://tryhackme.com/", 
            tag: "cybersecurity"
        };
    }
}