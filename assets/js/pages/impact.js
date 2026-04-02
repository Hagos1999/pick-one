/**
 * impact.js — Map interactions & animations for the well section
 * Pick-One Initiative
 */

(function () {
  'use strict';

  function initMap() {
    const mapContainer = document.getElementById('wells-map');
    if (!mapContainer || typeof L === 'undefined') return;

    // Center of Bauchi State, Nigeria roughly
    const bauchiCenter = [10.3158, 9.8442];
    
    const map = L.map('wells-map', {
      center: bauchiCenter,
      zoom: 7,
      scrollWheelZoom: false, // Prevent accidental scrolling while reading
      zoomControl: false      // We'll add it custom if needed, or leave it clean
    });

    // Add zoom control manually to bottom right to keep it out of the way of our stats overlay
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Use CartoDB Positron for a clean, professional, minimal look that fits the site theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // 25 Well locations across Bauchi State with pre-seeded stable data.
    // Beneficiary counts and dates are fixed — they no longer change on reload.
    const locations = [
      { name: "Tafawa Balewa Village Well",  lat: 9.75,  lng: 9.55,  beneficiaries: 620, commissioned: "14 Mar 2021" },
      { name: "Dass Community Borehole",      lat: 9.99,  lng: 9.51,  beneficiaries: 480, commissioned: "02 Jun 2021" },
      { name: "Bogoro Rural Access",          lat: 9.66,  lng: 9.59,  beneficiaries: 310, commissioned: "19 Sep 2021" },
      { name: "Alkaleri Market Well",         lat: 10.26, lng: 10.33, beneficiaries: 750, commissioned: "07 Jan 2022" },
      { name: "Kirfi District Pump",          lat: 10.40, lng: 10.42, beneficiaries: 540, commissioned: "23 Apr 2022" },
      { name: "Toro Central Well",            lat: 10.05, lng: 9.06,  beneficiaries: 410, commissioned: "11 Aug 2022" },
      { name: "Darazo Community Water",       lat: 10.99, lng: 10.40, beneficiaries: 890, commissioned: "03 Nov 2022" },
      { name: "Misau Public Borehole",        lat: 11.31, lng: 10.47, beneficiaries: 670, commissioned: "28 Jan 2023" },
      { name: "Katagum Trade Well",           lat: 11.66, lng: 10.35, beneficiaries: 920, commissioned: "15 Mar 2023" },
      { name: "Giade Local Pump",             lat: 11.35, lng: 10.15, beneficiaries: 340, commissioned: "09 May 2023" },
      { name: "Shira District Borehole",      lat: 11.45, lng: 10.05, beneficiaries: 580, commissioned: "22 Jul 2023" },
      { name: "Jama'are Central Well",        lat: 11.67, lng: 9.92,  beneficiaries: 430, commissioned: "04 Oct 2023" },
      { name: "Itas/Gadau Access Point",      lat: 11.85, lng: 10.15, beneficiaries: 760, commissioned: "17 Nov 2023" },
      { name: "Zaki Rural Well",              lat: 12.20, lng: 10.25, beneficiaries: 280, commissioned: "06 Jan 2024" },
      { name: "Gamawa Border Pump",           lat: 12.13, lng: 10.51, beneficiaries: 510, commissioned: "20 Feb 2024" },
      { name: "Dambam Motor Park Well",       lat: 11.60, lng: 10.75, beneficiaries: 650, commissioned: "08 Apr 2024" },
      { name: "Ningawa Village Supply",       lat: 11.02, lng: 9.45,  beneficiaries: 370, commissioned: "25 May 2024" },
      { name: "Ganjuwa Market Pump",          lat: 10.75, lng: 9.78,  beneficiaries: 490, commissioned: "11 Jul 2024" },
      { name: "Ningi Highway Borehole",       lat: 11.04, lng: 9.47,  beneficiaries: 830, commissioned: "30 Aug 2024" },
      { name: "Warji Community Well",         lat: 11.23, lng: 9.78,  beneficiaries: 560, commissioned: "14 Oct 2024" },
      { name: "Rimin Zayam Borehole",         lat: 10.15, lng: 9.35,  beneficiaries: 420, commissioned: "02 Dec 2024" },
      { name: "Nabordo Rural Supply",         lat: 10.20, lng: 9.45,  beneficiaries: 280, commissioned: "19 Jan 2025" },
      { name: "Limanci Well",                 lat: 10.35, lng: 9.95,  beneficiaries: 350, commissioned: "07 Mar 2025" },
      { name: "Wunti Market Access",          lat: 10.31, lng: 9.83,  beneficiaries: 610, commissioned: "23 Apr 2025" },
      { name: "Yelwa Student Borehole",       lat: 10.28, lng: 9.80,  beneficiaries: 470, commissioned: "15 Jun 2025" }
    ];


    const pulseIcon = L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div class="pulse-marker-wrapper">
          <div class="pulse-marker-ring"></div>
          <div class="pulse-marker-dot"></div>
        </div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -18]
    });

    const markers = [];
    const wells = [];
    const listContainer = document.getElementById('locations-list');

    locations.forEach((loc, index) => {
        const popupContent = `
            <div style="margin-bottom: 0.5rem;"><span class="badge badge-green">Active Project</span></div>
            <h4>${loc.name}</h4>
            <p style="font-weight: 500;">Bauchi State, Nigeria</p>
            <span class="popup-stat">👥 ${loc.beneficiaries} Daily Users</span>
            <span class="popup-stat">📅 Commissioned: ${loc.commissioned}</span>
        `;

        const marker = L.marker([loc.lat, loc.lng], { icon: pulseIcon })
            .addTo(map)
            .bindPopup(popupContent);
            
        markers.push(marker);
        wells.push({ lat: loc.lat, lng: loc.lng, marker });

        // Build Side List Item
        if (listContainer) {
            const listItem = document.createElement('li');
            listItem.className = 'location-item';
            listItem.innerHTML = `
                <span class="location-name">${loc.name}</span>
                <span class="location-meta">👥 ${loc.beneficiaries} Users • Est. ${loc.commissioned.split(' ').pop()}</span>
            `;
            
            // Map interaction on click
            listItem.addEventListener('click', () => {
                // Stop auto-fly sequence
                if (flyInterval) {
                    clearInterval(flyInterval);
                    flyInterval = null;
                }
                
                // Set active visual state
                const allItems = listContainer.querySelectorAll('.location-item');
                allItems.forEach(item => item.classList.remove('active'));
                listItem.classList.add('active');
                
                // Fly to marker
                map.flyTo([loc.lat, loc.lng], 14, {
                    duration: 1.5,
                    easeLinearity: 0.25
                });
                
                // Open popup when flyTo finishes
                setTimeout(() => {
                    marker.openPopup();
                }, 1500);
            });
            
            listContainer.appendChild(listItem);
        }
    });

    // Crazy Auto-Fly Sequence
    // Create an intersection observer to start the animation only when map is visible
    let isMapVisible = false;
    let flyInterval = null;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isMapVisible) {
                    isMapVisible = true;
                    startFlySequence();
                }
            } else {
                isMapVisible = false;
                if (flyInterval) {
                    clearInterval(flyInterval);
                    flyInterval = null;
                }
            }
        });
    }, { threshold: 0.1 });

    observer.observe(mapContainer);

    function startFlySequence() {
        if (flyInterval) return; // Already running

        // Pick 5 random wells to tour
        const tourWells = [];
        const shuffled = [...wells].sort(() => 0.5 - Math.random());
        for (let i = 0; i < 5; i++) {
            tourWells.push(shuffled[i]);
        }
        
        // Add the main center to the end so it zooms back out ultimately
        tourWells.push({ lat: bauchiCenter[0], lng: bauchiCenter[1], isCenter: true });

        let step = 0;

        function flyNext() {
            if (!isMapVisible) return;
            
            const current = tourWells[step];
            
            if (current.isCenter) {
                // Return to overview
                map.flyTo([current.lat, current.lng], 7, {
                    duration: 3,
                    easeLinearity: 0.25
                });
                // Close any open popups
                map.closePopup();
            } else {
                // Fly to specific well
                map.flyTo([current.lat, current.lng], 13, {
                    duration: 3,
                    easeLinearity: 0.25
                });
                
                // Open popup shortly after arrival
                setTimeout(() => {
                    if (isMapVisible) {
                        current.marker.openPopup();
                    }
                }, 3000); // 3 seconds is the flyTo duration
            }

            step = (step + 1) % tourWells.length;
        }

        // Start first flight immediately, then every 8 seconds
        setTimeout(flyNext, 1000);
        flyInterval = setInterval(flyNext, 8000);
    }
    
    // Allow user to break the auto-pan by interacting with the map manually
    map.on('mousedown dragstart zoomstart', function() {
        if (flyInterval) {
            clearInterval(flyInterval);
            flyInterval = null;
        }
    });
  }

  // Initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
  } else {
    initMap();
  }
})();
