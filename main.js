// Update scroll event listener for horizontal scrolling
 window.addEventListener('scroll', () => {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('nav a');
    let pageDots = document.querySelectorAll('.page-dot');

    sections.forEach(section => {
        let left = window.scrollX;
        let offset = section.offsetLeft - 150;
        let width = section.offsetWidth;
        let id = section.getAttribute('id');

        if (left >= offset && left < offset + width) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('nav a[href*=' + id + ']').classList.add('active');
            });
            pageDots.forEach(dot => {
                dot.classList.remove('active');
                if (dot.getAttribute('data-section') === id) {
                    dot.classList.add('active');
                }
            });
        }
    });

    // Add background line animation
    const lines = document.querySelectorAll('.line');
    const scrollX = window.scrollX;

    lines.forEach((line, index) => {
        const speed = (index + 1) * 0.3; // Increased movement speed
        const rotation = 15 + (index * 10);
        line.style.transform = `rotate(${rotation}deg) translateX(${-scrollX * speed}px)`;
    });
});

// Update click handlers for horizontal scrolling
document.querySelectorAll('.page-dot, nav a').forEach(element => {
    element.addEventListener('click', (e) => {
        e.preventDefault();
        const section = element.getAttribute('data-section') ||
            element.getAttribute('href').substring(1);
        document.getElementById(section).scrollIntoView({
            behavior: 'smooth',
            inline: 'start'
        });
    });
});

// Add tab functionality
document.querySelectorAll('.tab-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Contact Form Handler
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWPW5Z_e79vSAvxyFWRiPCctrtktvZ0Ill7y35r6rezMwAqN9y8zEVY4PJ0hnqWr_UJQ/exec' // Replace with your actual web app URL
const form = document.forms['submit-to-google-sheet']
const msg = document.createElement('div')
msg.className = 'form-message'
form.after(msg)

form.addEventListener('submit', e => {
    e.preventDefault()
    msg.textContent = 'Sending...'
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            msg.textContent = 'Message sent successfully!'
            msg.style.color = '#2ecc71'
            form.reset()
            setTimeout(() => {
                msg.textContent = ''
            }, 5000)
        })
        .catch(error => {
            msg.textContent = 'Error sending message!'
            msg.style.color = '#e74c3c'
            console.error('Error!', error.message)
        })
})
