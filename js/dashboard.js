document.addEventListener("DOMContentLoaded", () => {
  // Simulated Data
  const priorityBins = Array.from({ length: 20 }, (_, i) => {
    const fillPercent = Math.floor(Math.random() * 60) + 40;
    return {
      id: i + 1,
      location: `Location ${i + 1}`,
      fill: `${fillPercent}%`,
      lat: 6.9 + Math.random(),
      lng: 79.8 + Math.random(),
      assigned: false, // Added to track assignment
    };
  });

  const trackData = [
    { id: "T1", status: "available", driver: "Nimal", region: "Colombo Zone" },
    { id: "T2", status: "assigned", driver: "Kamal", region: "Gampaha" },
    { id: "T3", status: "available", driver: "Sunil", region: "Kandy" },
    { id: "T4", status: "assigned", driver: "Amal", region: "Matara" },
    { id: "T5", status: "available", driver: "Ravi", region: "Jaffna" },
    { id: "T6", status: "available", driver: "Kasun", region: "Kurunegala" },
    { id: "T7", status: "assigned", driver: "Ruwan", region: "Negombo" },
    { id: "T8", status: "available", driver: "Ajith", region: "Anuradhapura" },
    { id: "T9", status: "available", driver: "Niroshan", region: "Trincomalee" },
    { id: "T10", status: "assigned", driver: "Saman", region: "Badulla" },
  ];

  let currentPage = 1;
  const binsPerPage = 5;
  let filteredBins = priorityBins.filter(bin => parseInt(bin.fill) > 75);

  const priorityList = document.getElementById("priority-list");
  const pageInfo = document.getElementById("page-info");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const trackList = document.getElementById("track-list");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const statCards = document.querySelectorAll(".stat-card");
const binHeading = document.getElementById("bin-heading");
document.getElementById("priority-section").scrollIntoView({ behavior: "smooth" });

  const updateMap = (lat, lng) => {
    document.getElementById("gps-coords").textContent = `GPS Coordinates: ${lat.toFixed(4)}°, ${lng.toFixed(4)}°`;
    document.getElementById("map-frame").src =
      `https://www.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed`;
  };

  function getColor(fill) {
    const num = parseInt(fill);
    if (num > 75) return "red";
    if (num > 50) return "orange";
    return "green";
  }

  function renderPriorityBins() {
    const start = (currentPage - 1) * binsPerPage;
    const end = start + binsPerPage;
    const currentBins = filteredBins.slice(start, end);

    priorityList.innerHTML = "";
    currentBins.forEach(bin => {
      const card = document.createElement("div");
      card.className = "priority-card";

      const fillNum = parseInt(bin.fill);
      const color = getColor(bin.fill);

  card.innerHTML = `
  <h3 class="bin-id" style="color: ${color};">Bin ID: ${bin.id}</h3>
  <p>${bin.location}</p>
  <p>Bin Level: ${bin.fill}</p>
  
  <div class="progress-container">
    <div class="progress-bar ${color}" style="width: ${fillNum}%"></div>
  </div>
`;



      if (!bin.assigned) {
        const assignBtn = document.createElement("button");
        assignBtn.textContent = "Assign";
        assignBtn.className = "assign-track-btn";
        assignBtn.addEventListener("click", e => {
          e.stopPropagation();
          renderTracks("available", true, bin);
        });
        card.appendChild(assignBtn);
      } else {
        const assignedLabel = document.createElement("p");
        assignedLabel.textContent = "Assigned";
        assignedLabel.className = "assigned-label";
        card.appendChild(assignedLabel);
      }

      card.addEventListener("click", () => {
        updateMap(bin.lat, bin.lng);
        renderTracks("available", true, bin);
      });

      priorityList.appendChild(card);
    });

    pageInfo.textContent = `Page ${currentPage}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= filteredBins.length;
  }

  function renderTracks(status, showAssign = false, bin = null) {
    trackList.innerHTML = "";
    trackData.filter(t => t.status === status).forEach(track => {
      const card = document.createElement("div");
      card.className = "track-card";

      card.innerHTML = `
  <h4>${track.id}</h4>
  <p>Driver: ${track.driver}</p>
  <p>Status: <span style="color: ${track.status === 'available' ? 'green' : 'red'}">${track.status}</span></p>
`;


      if (showAssign && bin && !bin.assigned && track.status === "available") {
        const assignBtn = document.createElement("button");
        assignBtn.textContent = "Assign to Bin";
        assignBtn.className = "assign-track-btn";
        assignBtn.addEventListener("click", () => {
          alert(`Track ${track.id} assigned to Bin ${bin.id}`);
          bin.assigned = true;
          track.status = "assigned";
          renderPriorityBins();
          renderTracks("available");
        });
        card.appendChild(assignBtn);
      }

      trackList.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const status = btn.getAttribute("data-status");
      renderTracks(status);
    });
  });

  statCards.forEach(card => {
  card.addEventListener("click", () => {
    const type = card.getAttribute("data-type");

    if (type === "total") {
      filteredBins = [...priorityBins];
      binHeading.textContent = "All Bins";
    } else if (type === "need") {
      filteredBins = priorityBins.filter(bin => parseInt(bin.fill) > 75);
      binHeading.textContent = "Bins Needing Immediate Collection";
    } else if (type === "assigned") {
      filteredBins = priorityBins.filter(bin => bin.assigned === true);
      binHeading.textContent = "Assigned Bins";
    }

    currentPage = 1;
    renderPriorityBins();

    // Scroll to the bin card section
    document.getElementById("priority-section").scrollIntoView({ behavior: "smooth" });
  });
});


  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderPriorityBins();
    }
  });

  nextBtn.addEventListener("click", () => {
    if ((currentPage * binsPerPage) < filteredBins.length) {
      currentPage++;
      renderPriorityBins();
    }
  });

  // Initial render
  renderPriorityBins();
  renderTracks("available");
});
