document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            window.location.href = '#register';
        });
    }
});

function openStory(storyId) {
    const modal = document.getElementById(`storyModal-${storyId}`);
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

document.getElementById('donorForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        dob: formData.get('dob'),
        gender: formData.get('gender'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
        bloodGroup: formData.get('bloodGroup'),
        organs: formData.getAll('organs')
    };

    console.log('Submitting data:', data);

    try {
        const response = await fetch('http://localhost:5500/api/donors/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            alert(`Registration failed: ${errorData.message || 'Unknown error'}`);
            return;
        }

        const result = await response.json();
        
        if (response.ok) {
            alert('Registration successful!');
            e.target.reset();
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        } else {
            alert(`Registration failed: ${result.message}`);
        }
    } catch (error) {
        alert('Error submitting form. Please try again.');
        console.error('Error:', error);
    }
});

// Modal functionality
const modal = document.getElementById('registerModal');
const registerTriggers = document.querySelectorAll('.register-trigger, .cta-button, .share-story-btn');
const closeBtn = document.querySelector('.close-btn');

// Open modal when clicking any register button
registerTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.classList.add('modal-open');
    });
});

// Close modal when clicking the close button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});

// Prevent modal close when clicking inside the modal content
modal.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Story modal functionality
function openStory(storyId) {
    const modal = document.getElementById(`storyModal-${storyId}`);
    modal.style.display = 'block';
    document.body.classList.add('modal-open');
}

// Add this to your existing modal close handlers
document.querySelectorAll('.story-modal .close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.target.closest('.modal').style.display = 'none';
        document.body.classList.remove('modal-open');
    });
});

// Update your window click handler to include story modals
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.classList.remove('modal-open');
    }
});
