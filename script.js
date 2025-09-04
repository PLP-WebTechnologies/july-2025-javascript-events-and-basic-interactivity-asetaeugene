document.addEventListener('DOMContentLoaded', () => {
    // --- Section 1: Dynamic Content Feature ---
    // This feature changes the text content of a paragraph when a button is clicked.
    const changeContentBtn = document.getElementById('changeContentBtn');
    const dynamicText = document.getElementById('dynamicText');
    let contentToggle = true; // To alternate between two texts

    changeContentBtn.addEventListener('click', () => {
        if (contentToggle) {
            dynamicText.textContent = "You've successfully changed the text!";
        } else {
            dynamicText.textContent = "This text will change when you click the button again.";
        }
        contentToggle = !contentToggle; // Toggle the state
    });

    // --- Section 2: Image Carousel Feature ---
    // This feature allows users to navigate through a series of images.
    const carouselImage = document.getElementById('carouselImage');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');

    const images = [
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        "https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg",
        "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg",
        "https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg"
    ];
    let currentImageIndex = 0;

    // Function to update the image displayed in the carousel
    function updateCarouselImage() {
        carouselImage.src = images[currentImageIndex];
        carouselImage.alt = `Carousel Image ${currentImageIndex + 1}`;
    }

    // Event listener for the "Previous" button
    prevImageBtn.addEventListener('click', () => {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1; // Loop back to the last image
        }
        updateCarouselImage();
    });

    // Event listener for the "Next" button
    nextImageBtn.addEventListener('click', () => {
        currentImageIndex++;
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0; // Loop back to the first image
        }
        updateCarouselImage();
    });

    // --- Custom Form Validation ---
    // This section handles the validation of the contact form.
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');

    // Function to display an error message
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    // Function to hide an error message
    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // Validate Name field
    function validateName() {
        if (nameInput.value.trim() === '') {
            showError(nameError, 'Name is required.');
            return false;
        } else {
            hideError(nameError);
            return true;
        }
    }

    // Validate Email field
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            showError(emailError, 'Email is required.');
            return false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailError, 'Please enter a valid email address.');
            return false;
        } else {
            hideError(emailError);
            return true;
        }
    }

    // Validate Message field
    function validateMessage() {
        if (messageInput.value.trim() === '') {
            showError(messageError, 'Message is required.');
            return false;
        } else if (messageInput.value.trim().length < 10) {
            showError(messageError, 'Message must be at least 10 characters long.');
            return false;
        } else {
            hideError(messageError);
            return true;
        }
    }

    // Add real-time validation for input fields
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);

    // Form submission handler
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Run all validations
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        // If all fields are valid, process the form
        if (isNameValid && isEmailValid && isMessageValid) {
            formSuccess.textContent = 'Form submitted successfully!';
            formSuccess.style.display = 'block';
            contactForm.reset(); // Clear the form
            // In a real application, you would send this data to a server
            console.log('Form Data:', {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            });
            setTimeout(() => {
                formSuccess.style.display = 'none';
                formSuccess.textContent = '';
            }, 3000); // Hide success message after 3 seconds
        } else {
            formSuccess.textContent = ''; // Clear any previous success message
            formSuccess.style.display = 'none';
        }
    });
});