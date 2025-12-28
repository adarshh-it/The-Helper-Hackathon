window.Engine = {
    role: "User",
    ADMIN_KEY: "chengalpattu2025", 
    volunteers: JSON.parse(localStorage.getItem('vols_v2')) || [],
    incidents: JSON.parse(localStorage.getItem('incs_v2')) || [],

    toggleAdminField(val) { 
        document.getElementById('adminKeyContainer').style.display = (val === 'Admin') ? 'block' : 'none'; 
    },

    login() {
        const selRole = document.getElementById('userRole').value;
        if (selRole === 'Admin' && document.getElementById('adminKey').value !== this.ADMIN_KEY) {
            return alert("Security Breach: Invalid Credentials");
        }
        this.role = selRole;
        document.getElementById('loginOverlay').style.display = 'none';
        this.showSection('home');
    },

    showSection(id) {
        ['homeSection', 'volunteerSection', 'taskSection', 'dashboardSection'].forEach(s => {
            document.getElementById(s).classList.add('hidden');
        });
        document.getElementById(id + 'Section').classList.remove('hidden');
        
        // Update Sidebar Active State
        document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
        document.getElementById('link-' + id).classList.add('active');

        if (id === 'task') this.renderReviewQueue();
        if (id === 'volunteer') this.renderVerificationList();
        if (id === 'dashboard') this.renderDashboard();
        this.refreshStats();
    },

    registerVolunteer() {
        const skills = Array.from(document.querySelectorAll('input[name="vskill"]:checked')).map(i => i.value);
        this.volunteers.push({
            name: document.getElementById('volName').value,
            govID: document.getElementById('volGovID').value,
            tier: document.getElementById('volMainSkill').value,
            avail: document.getElementById('volAvail').value,
            skills, 
            location: document.getElementById('volLocation').value,
            isVerified: false 
        });
        this.save();
        alert("Credentials Logged. Verification Pending with District HQ.");
        this.showSection('home');
    },

    createIncident() {
        const reqs = Array.from(document.querySelectorAll('input[name="tskill"]:checked')).map(i => i.value);
        const taskLoc = document.getElementById('taskLocation').value;
        const maxNeeded = parseInt(document.getElementById('taskMaxVolunteers').value) || 1;

        const newInc = {
            id: 'OPS-' + Math.random().toString(36).substr(2, 4).toUpperCase(),
            type: document.getElementById('taskType').value,
            criticality: document.getElementById('taskCriticality').value,
            address: document.getElementById('taskAddress').value,
            victims: document.getElementById('taskVictims').value,
            hazmat: document.getElementById('taskHazmat').value,
            maxNeeded, location: taskLoc, requiredSkills: reqs,
            status: (this.role === 'Admin') ? 'PENDING' : 'UNAUTHORIZED',
            responders: []
        };

        if (this.role === 'Admin') {
            const matches = this.volunteers.filter(v => v.isVerified && v.location === taskLoc && v.skills.some(s => reqs.includes(s))).slice(0, maxNeeded);
            if (matches.length > 0) { 
                newInc.status = 'IN_PROGRESS'; 
                newInc.responders = matches.map(m => m.name); 
            }
        }

        this.incidents.push(newInc);
        this.save();
        this.showSection('dashboard');
    },

    authorizeReport(index) {
        const inc = this.incidents[index];
        const matches = this.volunteers.filter(v => v.isVerified && v.location === inc.location && v.skills.some(s => inc.requiredSkills.includes(s))).slice(0, inc.maxNeeded);
        inc.status = matches.length > 0 ? 'IN_PROGRESS' : 'PENDING';
        inc.responders = matches.map(m => m.name);
        this.save();
        this.renderReviewQueue();
        this.refreshStats();
    },

    renderReviewQueue() {
        const queue = document.getElementById('reviewQueueList');
        const container = document.getElementById('adminReviewSection');
        if (this.role !== 'Admin') { container.classList.add('hidden'); return; }
        
        const pending = this.incidents.filter(i => i.status === 'UNAUTHORIZED');
        container.classList.toggle('hidden', pending.length === 0);
        queue.innerHTML = '';
        
        this.incidents.forEach((inc, idx) => {
            if (inc.status === 'UNAUTHORIZED') {
                const card = document.createElement('div');
                card.className = 'emergency-card unauthorized';
                card.innerHTML = `<strong>${inc.type} @ ${inc.address}</strong><br>Risk: ${inc.hazmat} | Victims: ${inc.victims}<br><button class="btn-approve" onclick="Engine.authorizeReport(${idx})">VALIDATE & ACTIVATE OPS</button>`;
                queue.appendChild(card);
            }
        });
    },

    renderDashboard() {
        const containers = { 
            PENDING: document.getElementById('list-pending'), 
            IN_PROGRESS: document.getElementById('list-progress'), 
            RESOLVED: document.getElementById('list-resolved') 
        };
        Object.values(containers).forEach(c => c.innerHTML = '');
        
        this.incidents.filter(i => i.status !== 'UNAUTHORIZED').forEach(inc => {
            const card = document.createElement('div');
            card.className = `emergency-card critical-${inc.criticality.toLowerCase()}`;
            card.innerHTML = `<strong>${inc.id}: ${inc.type}</strong><br>Loc: ${inc.address}<br>Deployment: ${inc.responders.length}/${inc.maxNeeded}<br><small>Personnel: ${inc.responders.join(', ') || 'SEARCHING FOR LOCAL ASSETS...'}</small>`;
            containers[inc.status].appendChild(card);
        });
    },

    renderVerificationList() {
        const list = document.getElementById('pendingVolunteerList');
        document.getElementById('verificationAdminCard').classList.toggle('hidden', this.role !== 'Admin');
        list.innerHTML = '';
        this.volunteers.forEach((v, i) => {
            const item = document.createElement('div');
            item.className = 'emergency-card';
            item.innerHTML = `<strong>${v.name}</strong> [ID: ${v.govID}]<br>Role: ${v.tier} | Status: ${v.avail}<br>${!v.isVerified && this.role === 'Admin' ? `<button class="btn-approve" onclick="Engine.authorizeResponder(${i})">APPROVE CREDENTIALS</button>` : '<span style="color:var(--accent)">✔ Verified Officer</span>'}`;
            list.appendChild(item);
        });
    },

    authorizeResponder(i) { this.volunteers[i].isVerified = true; this.save(); this.renderVerificationList(); },
    
    refreshStats() { 
        document.getElementById('statVols').innerText = this.volunteers.filter(v => v.isVerified).length;
        document.getElementById('statIncidents').innerText = this.incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'UNAUTHORIZED').length;
    },
    
    save() { 
        localStorage.setItem('vols_v2', JSON.stringify(this.volunteers)); 
        localStorage.setItem('incs_v2', JSON.stringify(this.incidents)); 
    }
};

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    Engine.refreshStats();
});
