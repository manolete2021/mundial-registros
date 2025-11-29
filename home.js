// Data storage - using localStorage for persistence
let groupsData = {
    A: [],
    B: [],
    C: [],
    D: []
};

// Load data from localStorage on page load
function loadData() {
    const saved = localStorage.getItem('worldCupGroups');
    if (saved) {
        groupsData = JSON.parse(saved);
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('worldCupGroups', JSON.stringify(groupsData));
}

// Initialize
let currentGroup = 'A';

// DOM Elements
const groupButtons = document.querySelectorAll('.group-btn');
const playersTableBody = document.getElementById('playersTableBody');
const currentGroupTitle = document.getElementById('currentGroupTitle');
const createNewBtn = document.getElementById('createNewBtn');
const formSection = document.getElementById('formSection');
const playerForm = document.getElementById('playerForm');

// Load data when page loads
loadData();

// Set active group button
function setActiveGroup(group) {
    groupButtons.forEach(btn => {
        if (btn.dataset.group === group) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Display players for current group
function displayPlayers() {
    playersTableBody.innerHTML = '';
    const players = groupsData[currentGroup];
    
    if (players.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center; padding: 30px;">No hay jugadores en este grupo</td>';
        playersTableBody.appendChild(row);
    } else {
        players.forEach(player => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${player.id}</td>
                <td>${player.name}</td>
                <td>${player.email}</td>
                <td>${'*'.repeat(player.password.length)}</td>
            `;
            playersTableBody.appendChild(row);
        });
    }
    
    currentGroupTitle.textContent = `GROUP ${currentGroup}`;
}

// Group button click handlers
groupButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentGroup = btn.dataset.group;
        setActiveGroup(currentGroup);
        displayPlayers();
        formSection.style.display = 'none';
    });
});

// Create New button handler
createNewBtn.addEventListener('click', () => {
    formSection.style.display = formSection.style.display === 'none' ? 'block' : 'none';
    if (formSection.style.display === 'block') {
        playerForm.reset();
    }
});

// Form submission handler
playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const playerId = document.getElementById('playerId').value.trim();
    const playerName = document.getElementById('playerName').value.trim();
    const playerEmail = document.getElementById('playerEmail').value.trim();
    const playerPassword = document.getElementById('playerPassword').value.trim();
    
    // Check if ID already exists in current group
    const existingPlayer = groupsData[currentGroup].find(p => p.id === playerId);
    if (existingPlayer) {
        alert('Ya existe un jugador con este ID en el grupo ' + currentGroup);
        return;
    }
    
    // Add new player
    const newPlayer = {
        id: playerId,
        name: playerName,
        email: playerEmail,
        password: playerPassword
    };
    
    groupsData[currentGroup].push(newPlayer);
    saveData();
    displayPlayers();
    
    // Reset form and hide it
    playerForm.reset();
    formSection.style.display = 'none';
    
    alert('Jugador agregado exitosamente al GROUP ' + currentGroup);
});

// Initialize display
setActiveGroup(currentGroup);
displayPlayers();

