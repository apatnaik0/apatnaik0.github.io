document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Apply observer to all sections and cards
    const animatedElements = document.querySelectorAll('.project-card, .timeline-item, .skill-tags span, .section-title, .about-text, .education-card');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Terminal Easter Egg
    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    // Toggle Terminal
    document.addEventListener('keydown', (e) => {
        if (e.key === '`' || e.key === '~') {
            e.preventDefault(); // Prevent typing `
            terminalOverlay.classList.toggle('active');
            if (terminalOverlay.classList.contains('active')) {
                terminalInput.focus();
                // Welcome message if empty
                if (terminalOutput.innerHTML === '') {
                    printOutput("Welcome to the Portfolio Terminal v1.0.0", "system");
                    printOutput("Type 'help' to see available commands.", "system");
                }
            }
        }
    });

    // Close terminal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminalOverlay.classList.contains('active')) {
            terminalOverlay.classList.remove('active');
        }
    });

    // Handle Output Printing
    function printOutput(text, type = "normal") {
        const div = document.createElement('div');
        div.className = 'command-output';
        if (type === 'error') div.className += ' command-error';
        if (type === 'system') div.style.fontWeight = 'bold';
        div.textContent = text;
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Command Logic
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            const originalInput = terminalInput.value;

            // Print user command
            const commandLine = document.createElement('div');
            commandLine.textContent = `guest@portfolio:~$ ${originalInput}`;
            commandLine.style.color = 'var(--accent)';
            commandLine.style.marginTop = '0.5rem';
            terminalOutput.appendChild(commandLine);

            terminalInput.value = '';

            processCommand(command);
        }
    });

    function processCommand(cmd) {
        switch (cmd) {
            case 'help':
                printOutput("Available commands: [whoami, projects, contact, skills, f1, cooking, clear, sudo hire user]");
                break;
            case 'whoami':
                printOutput("First-year Master's student. Deep Learning enthusiast. Aspiring AI/ML Engineer.");
                break;
            case 'projects':
                printOutput("Fetching projects...\n1. MyTorch: Custom Deep Learning Framework from Scratch  \n2. Neonatal Seizure Detection (Deep Learning) \n3. RAG Enhanced Authorship Classification (NLP)");
                break;
            case 'skills':
                printOutput("Languages: Python, C++, SQL, R \nML: PyTorch, TensorFlow, NLP, GenAI \nTools: Azure, Github, Docker, Kubernetes");
                break;
            case 'contact':
                printOutput("Opening mail client...");
                setTimeout(() => {
                    window.location.href = "mailto:apatnaik0@gmail.com";
                }, 1000);
                break;
            case 'f1':
                printOutput("I'm a big fan of Formula 1 and I love to look at Telemetry Data! My favourite driver is Lewis Hamilton and my favourite race circuit is Marina Bay (Singapore)");
                break;
            case 'cooking':
                printOutput("Cooking is a theraputic process for me, I'd say by best dish is a good fried rice with a side of stir fried vegetables");
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                break;
            case 'sudo hire user':
                printOutput("Access Granted. Redirecting to LinkedIn...");
                setTimeout(() => {
                    window.open("https://linkedin.com/in/anish-patnaik-7241a6179/", "_blank");
                }, 1500);
                break;
            default:
                if (cmd !== '') {
                    printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
                }
        }
    }
});
