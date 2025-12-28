<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-CTZN Official | Chengalpattu Command</title>
    <style>
        :root {
            --primary: #0f172a; --secondary: #1e293b; --accent: #10b981;
            --danger: #ef4444; --warning: #f59e0b; --bg-overlay: rgba(247, 249, 255, 0.88); 
            --text: #000000; --card-bg: rgba(255, 255, 255, 0.95); --border: #cbd5e1;
        }

        body { 
            margin: 0; font-family:'Courier New', Courier, monospace; color: var(--text); display: flex; 
            background: linear-gradient(var(--bg-overlay), var(--bg-overlay)), url('pictures/bg.jpg');
            background-size: cover; background-position: center; background-attachment: fixed;
        }

        .sidebar { height: 100vh; width: 280px; position: fixed; background: var(--primary); color: white; display: flex; flex-direction: column; z-index: 1000; }
        .sidebar-header { padding: 30px; font-size: 1.5rem; font-weight: 800; color: var(--accent); border-bottom: 1px solid #334155; }
        .sidebar a { padding: 15px 30px; color: #94a3b8; text-decoration: none; border-left: 4px solid transparent; font-weight: 500; cursor: pointer; font-size: 0.9rem; }
        .sidebar a:hover, .sidebar a.active { background: var(--secondary); color: white; border-left-color: var(--accent); }
        .sidebar-footer { margin-top: auto; padding: 20px; border-top: 1px solid #334155; }

        .main { margin-left: 280px; width: calc(100% - 280px); min-height: 100vh; }
        .content-container { padding: 40px; }

        .card { background: var(--card-bg); padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid var(--border); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        
        .section-title { font-size: 0.75rem; color: var(--accent); font-weight: bold; text-transform: uppercase; margin-top: 20px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; grid-column: span 2; }
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
        .full-width { grid-column: span 2; }
        
        label { display: block; margin-bottom: 5px; font-weight: 600; font-size: 0.75rem; color: #475569; }
        input, select, textarea { padding: 10px; width: 100%; border-radius: 6px; border: 1px solid var(--border); background: #ffffff; box-sizing: border-box; font-size: 0.85rem; }
        
        button { background: var(--accent); color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; font-weight: 700; text-transform: uppercase; margin-top: 10px; }
        .btn-dispatch { background: var(--danger); width: 100%; margin-top: 25px; font-size: 1rem; }
        .btn-approve { background: #6366f1; padding: 6px 12px; font-size: 0.7rem; border-radius: 4px; }
        
        .emergency-card { border-left: 6px solid var(--border); padding: 15px; background: white; margin-bottom: 15px; border-radius: 4px; border: 1px solid var(--border); }
        .unauthorized { border: 2px dashed var(--warning); background: #fffbeb; }
        .critical-high { border-left-color: var(--danger); }

        #loginOverlay { position: fixed; inset: 0; background: var(--primary); display: flex; align-items: center; justify-content: center; z-index: 9999; }
        .login-card { background: white; padding: 40px; border-radius: 12px; width: 350px; text-align: center; }
        .hidden { display: none !important; }
    </style>
</head>
<body>

<div id="loginOverlay">
    <div class="login-card">
        <h2 style="color: var(--primary)">E-CTZN DISTRICT COMMAND</h2>
        <div style="text-align: left; margin: 20px 0;">
            <label>Authentication Level</label>
            <select id="userRole" onchange="Engine.toggleAdminField(this.value)">
                <option value="User">Registered Citizen/Volunteer</option>
                <option value="Admin">District Administrator (IAS/IPS)</option>
            </select>
        </div>
        <div id="adminKeyContainer" style="display: none; text-align: left; margin-bottom: 20px;">
            <label>Department Security Key</label>
            <input type="password" id="adminKey" placeholder="••••••••">
        </div>
        <button onclick="Engine.login()" style="width: 100%;">Initialize Interface</button>
    </div>
</div>

<div class="sidebar">
    <div class="sidebar-header">E-CTZN v2.0</div>
    <a id="link-home" onclick="Engine.showSection('home')">District Summary</a>
    <a id="link-volunteer" onclick="Engine.showSection('volunteer')">Volunteer Deployment</a>
    <a id="link-task" onclick="Engine.showSection('task')">SOS/Incident Reporting</a>
    <a id="link-dashboard" onclick="Engine.showSection('dashboard')">Live Ops Dashboard</a>
    <div class="sidebar-footer"><button style="background:transparent; border:1px solid #ef4444; color:#ef4444; width:100%; font-size:0.7rem;" onclick="location.reload()">TERMINAL EXIT</button></div>
</div>

<div class="main">
    <div id="homeSection" class="content-container">
        <h1 style="margin-bottom:5px;">Chengalpattu District, TN</h1>
        <p style="color:#64748b; margin-top:0;">Unified Emergency Management Framework</p>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:20px; margin-top:30px;">
            <div class="card" style="text-align:center;"><span>Authorized Responders</span><h2 id="statVols" style="font-size:3rem; color:var(--accent); margin:10px 0;">0</h2></div>
            <div class="card" style="text-align:center;"><span>Active Verified Missions</span><h2 id="statIncidents" style="font-size:3rem; color:var(--danger); margin:10px 0;">0</h2></div>
        </div>
    </div>

    <div id="volunteerSection" class="content-container hidden">
        <div class="card">
            <h2 style="margin-top:0;">Professional Volunteer Enrollment</h2>
            <div class="form-grid">
                <div class="section-title">Personal Credentials</div>
                <div><label>Legal Full Name</label><input type="text" id="volName" placeholder="As per Govt ID"></div>
                <div><label>Government ID Number (Aadhar/Voter)</label><input type="text" id="volGovID" placeholder="XXXX-XXXX-XXXX"></div>
                <div><label>Age</label><input type="number" id="volAge"></div>
                <div><label>Blood Group</label>
                    <select id="volBlood"><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>O+</option><option>O-</option><option>AB+</option><option>AB-</option></select>
                </div>
                
                <div class="section-title">Deployment Specifics</div>
                <div><label>Service Area (Township)</label>
                    <select id="volLocation">
                        <option>Tambaram</option><option>Chengalpattu</option><option>Pallavaram</option><option>Maraimalai Nagar</option><option>Guduvancheri</option>
                    </select>
                </div>
                <div><label>Availability Status</label>
                    <select id="volAvail"><option value="Active">24/7 On-Call</option><option value="Partial">Weekends/Nights Only</option><option value="Emergency">Extreme Disasters Only</option></select>
                </div>
                
                <div class="section-title">Professional Expertise</div>
                <div><label>Primary Skillset</label>
                    <select id="volMainSkill"><option>Medical Specialist</option><option>Heavy Machinery/Rescue</option><option>Logistics & Supply</option><option>Search & Recovery</option></select>
                </div>
                <div><label>Professional License No. (If Medical/Pilot)</label><input type="text" id="volLicense" placeholder="MC-12345 (Optional)"></div>
                
                <div class="full-width">
                    <label>Equipped Resources (Tools you own)</label>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; background: #f1f5f9; padding: 12px; border-radius: 6px;">
                        <label><input type="checkbox" name="vskill" value="First Aid Kit"> First Aid Kit</label>
                        <label><input type="checkbox" name="vskill" value="4x4 Vehicle"> 4x4 Vehicle</label>
                        <label><input type="checkbox" name="vskill" value="Drone"> Drone</label>
                        <label><input type="checkbox" name="vskill" value="Rope/Harness"> Rope/Harness</label>
                    </div>
                </div>
                <button onclick="Engine.registerVolunteer()" class="full-width">Submit Credentials for Official Audit</button>
            </div>
        </div>
        <div id="verificationAdminCard" class="card hidden">
            <h3 style="color: var(--accent);">PENDING AUDITS: PERSONNEL VERIFICATION</h3>
            <div id="pendingVolunteerList"></div>
        </div>
    </div>

    <div id="taskSection" class="content-container hidden">
        <div id="adminReviewSection" class="card hidden">
            <h3 style="color: var(--warning)">CRITICAL: UNAUTHORIZED CITIZEN SOS REPORTS</h3>
            <div id="reviewQueueList"></div>
        </div>

        <div class="card">
            <h2>Detailed Incident Intelligence</h2>
            <div class="form-grid">
                <div class="section-title">Situation Profile</div>
                <div><label>Incident Category</label><select id="taskType"><option>Industrial/Fire</option><option>Medical Mass Casualty</option><option>Structural Collapse</option><option>Water/Flood Rescue</option></select></div>
                <div><label>Location (Township)</label><select id="taskLocation"><option>Tambaram</option><option>Chengalpattu</option><option>Pallavaram</option></select></div>
                <div><label>Priority Level</label><select id="taskCriticality"><option value="HIGH">Code Red (Immediate Life Threat)</option><option value="LOW">Code Amber (Urgent/Stable)</option></select></div>
                <div><label>Max Responders to Dispatch</label><input type="number" id="taskMaxVolunteers" value="3"></div>
                
                <div class="section-title">On-Site Logistics</div>
                <div class="full-width"><label>Exact Physical Address / GPS Coordinates</label><input type="text" id="taskAddress" placeholder="e.g. Near New Bus Stand, Gate 3"></div>
                <div><label>Victim Count (Estimated)</label><input type="number" id="taskVictims" value="1"></div>
                <div><label>High-Risk Demographics</label><select id="taskDemo"><option>Adults Only</option><option>Children Involved</option><option>Elderly/Disabled Involved</option></select></div>
                <div><label>Hazmat/Gas Presence</label><select id="taskHazmat"><option>No</option><option>Yes (Chemicals/Gas Smoke)</option><option>Yes (Electrical/Live Wire)</option></select></div>
                <div><label>Reporter Contact No.</label><input type="text" id="taskPhone" placeholder="+91-XXXXX XXXXX"></div>
                
                <div class="full-width">
                    <label>Required Deployment Skills</label>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; background: #f1f5f9; padding: 12px; border-radius: 6px;">
                        <label><input type="checkbox" name="tskill" value="Medical Aid"> Medical Aid</label>
                        <label><input type="checkbox" name="tskill" value="Heavy Rescue"> Heavy Rescue</label>
                        <label><input type="checkbox" name="tskill" value="Crowd Control"> Crowd Control</label>
                    </div>
                </div>
                <button id="dispatchBtn" onclick="Engine.createIncident()" class="btn-dispatch">Transmit Signal for Official Review</button>
            </div>
        </div>
    </div>

    <div id="dashboardSection" class="content-container hidden">
        <div class="dashboard-columns" style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:20px;">
            <div><h4 style="color:#64748b;">AWAITING DISPATCH</h4><div id="list-pending"></div></div>
            <div><h4 style="color:var(--accent);">ACTIVE OPERATIONS</h4><div id="list-progress"></div></div>
            <div><h4 style="color:#94a3b8;">COMPLETED LOGS</h4><div id="list-resolved"></div></div>
        </div>
    </div>
</div>

<script>
window.Engine = {
    role: "User",
    ADMIN_KEY: "chengalpattu2025", 
    volunteers: JSON.parse(localStorage.getItem('vols_v2')) || [],
    incidents: JSON.parse(localStorage.getItem('incs_v2')) || [],

    toggleAdminField(val) { document.getElementById('adminKeyContainer').style.display = (val === 'Admin') ? 'block' : 'none'; },

    login() {
        const selRole = document.getElementById('userRole').value;
        if (selRole === 'Admin' && document.getElementById('adminKey').value !== this.ADMIN_KEY) return alert("Security Breach: Invalid Credentials");
        this.role = selRole;
        document.getElementById('loginOverlay').style.display = 'none';
        this.showSection('home');
    },

    showSection(id) {
        ['homeSection', 'volunteerSection', 'taskSection', 'dashboardSection'].forEach(s => document.getElementById(s).classList.add('hidden'));
        document.getElementById(id + 'Section').classList.remove('hidden');
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
            if (matches.length > 0) { newInc.status = 'IN_PROGRESS'; newInc.responders = matches.map(m => m.name); }
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
        this.showSection('task');
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
        const containers = { PENDING: document.getElementById('list-pending'), IN_PROGRESS: document.getElementById('list-progress'), RESOLVED: document.getElementById('list-resolved') };
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
            item.innerHTML = `<strong>${v.name}</strong> [ID: ${v.govID}]<br>Role: ${v.tier} | Status: ${v.avail}<br>${!v.isVerified && this.role === 'Admin' ? `<button class="btn-approve" onclick="Engine.authorizeResponder(${i})">APPROVE CREDENTIALS</button>` : '<span style="color:var(--accent)">Verified Officer</span>'}`;
            list.appendChild(item);
        });
    },

    authorizeResponder(i) { this.volunteers[i].isVerified = true; this.save(); this.renderVerificationList(); },
    refreshStats() { 
        document.getElementById('statVols').innerText = this.volunteers.filter(v => v.isVerified).length;
        document.getElementById('statIncidents').innerText = this.incidents.filter(i => i.status !== 'RESOLVED' && i.status !== 'UNAUTHORIZED').length;
    },
    save() { localStorage.setItem('vols_v2', JSON.stringify(this.volunteers)); localStorage.setItem('incs_v2', JSON.stringify(this.incidents)); }
};
Engine.showSection('home');
</script>
</body>
</html>
