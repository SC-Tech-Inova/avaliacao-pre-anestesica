// JavaScript for index.html

document.addEventListener('DOMContentLoaded', function() {
    // Sample anesthesiologists data (in a real app, this would come from an API)
    const anesthesiologists = [
        {
            id: 1,
            name: "Dra. Maria Silva",
            specialty: "Anestesiologia Pediátrica",
            photo: "./images/doctor-1.jpg",
            description: "Especialista em anestesia para procedimentos pediátricos com mais de 15 anos de experiência."
        },
        {
            id: 2,
            name: "Dr. João Santos",
            specialty: "Anestesiologia Cardíaca",
            photo: "./images/doctor-2.jpg",
            description: "Especializado em procedimentos cardiovasculares de alta complexidade."
        },
        {
            id: 3,
            name: "Dra. Ana Oliveira",
            specialty: "Anestesiologia Obstétrica",
            photo: "./images/doctor-3.jpg",
            description: "Especialista em analgesia e anestesia para partos e procedimentos obstétricos."
        },
        {
            id: 4,
            name: "Dr. Carlos Mendes",
            specialty: "Tratamento da Dor",
            photo: "./images/doctor-4.jpg",
            description: "Focado no manejo da dor crônica e aguda pós-operatória."
        }
    ];

    // Load team members
    const teamContainer = document.getElementById('team-members');
    
    if (teamContainer) {
        anesthesiologists.forEach(doctor => {
            const doctorCard = document.createElement('div');
            doctorCard.className = 'col mb-5';
            doctorCard.innerHTML = `
                <div class="card h-100 shadow border-0 team-member-card">
                    <img class="card-img-top team-member-img" src="${doctor.photo}" alt="${doctor.name}" />
                    <div class="card-body p-4">
                        <h5 class="card-title mb-1">${doctor.name}</h5>
                        <div class="badge bg-primary bg-gradient rounded-pill mb-2">${doctor.specialty}</div>
                        <p class="card-text">${doctor.description}</p>
                    </div>
                    <div class="card-footer p-4 pt-0 bg-transparent border-top-0">
                        <div class="d-flex align-items-end justify-content-between">
                            <button class="btn btn-outline-primary btn-sm" onclick="showDoctorDetails(${doctor.id})">Ver Detalhes</button>
                        </div>
                    </div>
                </div>
            `;
            teamContainer.appendChild(doctorCard);
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send this data to your server via AJAX
            // For this example, we'll just display an alert
            alert(`Obrigado ${name}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`);
            
            // Reset the form
            contactForm.reset();
        });
    }
});

// Function to show doctor details (would be connected to a modal or redirect)
function showDoctorDetails(doctorId) {
    alert(`Exibindo detalhes do anestesista ID: ${doctorId}`);
    // In a real application, this would open a modal with more information or
    // redirect to a detailed profile page
}
