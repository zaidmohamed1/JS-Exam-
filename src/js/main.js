"use strict";

const globalYear = document.getElementById("global-year");
const globalCity = document.getElementById("global-city");
const globalCountry = document.getElementById("global-country");
const globalSearchBtn = document.getElementById("global-search-btn");
const fromMoney = document.getElementById("currency-from");
const toMoney = document.getElementById("currency-to");
const money = document.getElementById("currency-amount");
const convertBtn = document.getElementById("convert-btn");
const eventsContainer = document.getElementById("events-content");
const clearAllPlansBtn = document.getElementById("clear-all-plans-btn");
const plansCount = document.getElementById("plans-count");
const toastContainer = document.getElementById("toast-container");
const statHolidays = document.getElementById("stat-holidays");
const statEvents = document.getElementById("stat-events");
const statSaved = document.getElementById("stat-saved");
let plan = [];

try {
  const storedPlan = JSON.parse(localStorage.getItem("plan"));
  if (Array.isArray(storedPlan)) {
    plan = storedPlan;
    displayplan(plan);
  }
} catch (error) {
  console.warn("Failed to parse saved plans:", error);
  localStorage.removeItem("plan");
}
console.log("zzzzz");

let year = new Date().getFullYear();
let city = "";
var countryCode = "";
let currentLat;
let currentLng;

const dashboardpage = document.getElementById("Dashboard");
const holidaysPage = document.getElementById("holidays");
const eventsPage = document.getElementById("Events");
const weatherPage = document.getElementById("Weather");
const longWeekendsPage = document.getElementById("long-weekends");
const currencyPage = document.getElementById("Currency");
const sunTimesPage = document.getElementById("sun-times");
const myPlansPage = document.getElementById("my-plans");
const dashboardView = document.getElementById("dashboard-view");
const holidaysView = document.getElementById("holidays-view");
const eventsView = document.getElementById("events-view");
const weatherView = document.getElementById("weather-view");
const lwView = document.getElementById("long-weekends-view");
const currencyView = document.getElementById("currency-view");
const sunTimesView = document.getElementById("sun-times-view");
const myPlansView = document.getElementById("my-plans-view");
const loadingOverlay = document.getElementById("loading-overlay");
const selectionState = {
  countryName: "",
  flagUrl: "",
  capitalName: "",
  countryCode: "",
  timezoneLabel: "",
  timezoneOffsetMinutes: null,
};

dashboardpage.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardpage.classList.add("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.add("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader(
    "Dashboard",
    "Welcome back! Ready to plan your next adventure?",
  );
});
holidaysPage.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardpage.classList.remove("active");
  holidaysPage.classList.add("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.add("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader("Holidays", "Explore public holidays around the world");
  showLoadingOverlay(500);
});
eventsPage.addEventListener("click", function (e) {
  e.preventDefault();

  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.add("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.add("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader("Events", "Find concerts, sports, and entertainment");
  showLoadingOverlay(1000);
});
weatherPage.addEventListener("click", function (e) {
  e.preventDefault();
  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.add("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.add("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader("Weather", "Check forecasts for any destination");
  showLoadingOverlay(1500);
});
longWeekendsPage.addEventListener("click", function (e) {
  e.preventDefault();

  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.add("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.add("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader("Long Weekends", "Find the perfect mini-trip opportunities");
  showLoadingOverlay(1000);
});
currencyPage.addEventListener("click", function (e) {
  e.preventDefault();

  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.add("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.add("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.remove("active");
  displayheader("Currency", "Convert currencies with live exchange rates");
});
sunTimesPage.addEventListener("click", function (e) {
  e.preventDefault();

  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.add("active");
  myPlansPage.classList.remove("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.add("active");
  myPlansView.classList.remove("active");
  displayheader("Sun Times", "Check sunrise and sunset times worldwide ");
  showLoadingOverlay(1000);
});
myPlansPage.addEventListener("click", function (e) {
  e.preventDefault();

  dashboardpage.classList.remove("active");
  holidaysPage.classList.remove("active");
  eventsPage.classList.remove("active");
  weatherPage.classList.remove("active");
  longWeekendsPage.classList.remove("active");
  currencyPage.classList.remove("active");
  sunTimesPage.classList.remove("active");
  myPlansPage.classList.add("active");

  dashboardView.classList.remove("active");
  holidaysView.classList.remove("active");
  eventsView.classList.remove("active");
  weatherView.classList.remove("active");
  lwView.classList.remove("active");
  currencyView.classList.remove("active");
  sunTimesView.classList.remove("active");
  myPlansView.classList.add("active");
  displayheader("My Plans", "Your saved holidays and events");
});

function displayheader(title, subtitle) {
  const titleEl = document.getElementById("page-title");
  const subtitleEl = document.getElementById("page-subtitle");
  if (titleEl) titleEl.textContent = title;
  if (subtitleEl) subtitleEl.textContent = subtitle;
}

function setSelectionBadge(badgeId, html) {
  const badge = document.getElementById(badgeId);
  if (!badge) return;
  badge.innerHTML = html;
  const wrapper = badge.closest(".view-header-selection");
  if (wrapper) wrapper.style.display = "flex";
}

function updateSelectionBadges() {
  if (!selectionState.countryName || !selectionState.flagUrl) return;

  const currentYear = (globalYear && globalYear.value) || year;
  const selectedCity =
    (globalCity && globalCity.value) || selectionState.capitalName;

  setSelectionBadge(
    "holidays-selection-badge",
    `<img src="${selectionState.flagUrl}" class="selection-flag">
     <span>${selectionState.countryName}</span>
     <span class="selection-year">${currentYear}</span>`,
  );
  setSelectionBadge(
    "events-selection-badge",
    `<img src="${selectionState.flagUrl}" class="selection-flag">
     <span>${selectionState.countryName}</span>
     <span class="selection-city">${selectedCity}</span>`,
  );
  setSelectionBadge(
    "weather-selection-badge",
    `<img src="${selectionState.flagUrl}" class="selection-flag">
     <span>${selectionState.countryName}</span>
     <span class="selection-city">${selectedCity}</span>`,
  );
  setSelectionBadge(
    "longweekends-selection-badge",
    `<img src="${selectionState.flagUrl}" class="selection-flag">
     <span>${selectionState.countryName}</span>
     <span class="selection-year">${currentYear}</span>`,
  );
  setSelectionBadge(
    "sun-times-selection-badge",
    `<img src="${selectionState.flagUrl}" class="selection-flag">
     <span>${selectionState.countryName}</span>
     <span class="selection-city">${selectedCity}</span>`,
  );
}

function formatHeaderDate(date) {
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function updateHeaderDateTime() {
  const dateEl = document.getElementById("current-datetime");
  if (!dateEl) return;
  if (selectionState.timezoneOffsetMinutes !== null) {
    dateEl.textContent = formatHeaderDate(
      getDateForOffset(selectionState.timezoneOffsetMinutes),
    );
    return;
  }
  dateEl.textContent = formatHeaderDate(new Date());
}

function showLoadingOverlay(timeout) {
  loadingOverlay.classList.remove("hidden");
  setTimeout(() => {
    loadingOverlay.classList.add("hidden");
  }, timeout);
}

function parseUtcOffsetLabel(timezone) {
  if (!timezone) return null;
  if (timezone === "UTC") {
    return { label: "UTC+00:00", offsetMinutes: 0 };
  }
  const match = timezone.match(/^UTC([+-])(\d{2}):?(\d{2})?$/);
  if (!match) return null;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2] || 0);
  const minutes = Number(match[3] || 0);
  return {
    label: `UTC${match[1]}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`,
    offsetMinutes: sign * (hours * 60 + minutes),
  };
}

function getDateForOffset(offsetMinutes) {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utcMs + offsetMinutes * 60000);
}

function formatTimeForOffset(offsetMinutes) {
  return getDateForOffset(offsetMinutes).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function updateDashboardLocalTime() {
  const timeEl = document.getElementById("dashboard-local-time-value");
  const zoneEl = document.getElementById("dashboard-local-time-zone");
  if (!timeEl || !zoneEl || selectionState.timezoneOffsetMinutes === null)
    return;
  timeEl.textContent = formatTimeForOffset(
    selectionState.timezoneOffsetMinutes,
  );
  zoneEl.textContent = selectionState.timezoneLabel;
}

function updateCountryTimeDisplays() {
  updateHeaderDateTime();
  updateDashboardLocalTime();
}

function showToast(message, type = "success") {
  if (!toastContainer) return;
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  const iconClass =
    type === "error"
      ? "fa-circle-xmark"
      : type === "info"
        ? "fa-circle-info"
        : "fa-circle-check";
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
    <button class="toast-close" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `;
  toast.querySelector(".toast-close").addEventListener("click", () => {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  });
  toastContainer.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.parentElement.removeChild(toast);
  }, 4000);
}

function getSelectedCountryName() {
  if (selectionState.countryName) return selectionState.countryName;
  const selectedOption = globalCountry?.selectedOptions?.[0];
  return selectedOption ? selectedOption.textContent : "";
}

function getSelectedCountryCode() {
  return selectionState.countryCode || countryCode || "";
}

function updateStatHolidays(count) {
  if (statHolidays) statHolidays.textContent = String(count);
}

function updateStatEvents(count) {
  if (statEvents) statEvents.textContent = String(count);
}

function updateSavedStats() {
  const selectedCode = getSelectedCountryCode();
  const count = selectedCode
    ? plan.filter(
        (item) => !item.countryCode || item.countryCode === selectedCode,
      ).length
    : plan.length;
  if (statSaved) statSaved.textContent = String(count);
}

updateCountryTimeDisplays();
setInterval(updateCountryTimeDisplays, 60 * 1000);

async function loadDashboard() {
  try {
    const response = await fetch(
      "https://date.nager.at/api/v3/AvailableCountries",
    );
    if (!response.ok) {
      throw new Error(`Countries request failed: ${response.status}`);
    }
    const data = await response.json();
    displayDashboard(data);
  } catch (error) {
    console.error("Failed to load countries:", error);
    if (globalCountry) {
      globalCountry.innerHTML = `<option value="">Failed to load countries</option>`;
    }
    showToast("Failed to load countries. Check internet/console.", "error");
  }
}

function displayDashboard(list) {
  let blackBox = ``;
  for (let i = 0; i < list.length; i++) {
    blackBox += `<option value="${list[i].countryCode}">${list[i].name}</option>`;
  }
  globalCountry.innerHTML =
    `<option value="">Select Country</option>` + blackBox;
}

async function cityInfo(countryCode) {
  if (!countryCode) return;
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
  );
  const data = await response.json();
  displayCity(data);
}

function displayCity(list) {
  currentLat = list[0].capitalInfo.latlng[0];
  currentLng = list[0].capitalInfo.latlng[1];
  let blackBox = ``;
  let blackBox2 = ``;
  let blackBox3 = ``;
  const countryName = list[0].name?.common || "";
  const flagUrl = list[0].flags?.png || "";
  const capitalName = list[0].capital?.[0] || "";
  const timezoneInfo = parseUtcOffsetLabel(list[0].timezones?.[0]);
  selectionState.countryName = countryName;
  selectionState.flagUrl = flagUrl;
  selectionState.capitalName = capitalName;
  selectionState.countryCode = list[0].cca2 || countryCode || "";
  if (timezoneInfo) {
    selectionState.timezoneLabel = timezoneInfo.label;
    selectionState.timezoneOffsetMinutes = timezoneInfo.offsetMinutes;
  } else {
    selectionState.timezoneLabel = list[0].timezones?.[0] || "";
    selectionState.timezoneOffsetMinutes = null;
  }
  for (let i = 0; i < list.length; i++) {
    blackBox += `
            <img src="${list[i].flags.png}" class="selection-flag">
            <span>${list[i].name.common}</span>
            <span class="selection-year">${year}</span>`;
    blackBox2 += `<option value="${list[i].capital[0]}">${list[i].capital[0]}</option>`;
    blackBox3 += `
            <div class="selected-flag"><img src="${list[i].flags.png}"></div>
            <div class="selected-info">
                <span class="selected-country-name">${list[i].name.common}</span>
                <span class="selected-city-name">• ${list[i].capital[0]}</span>
            </div>
            <button class="clear-selection-btn" id="clear-selection-btn">
                <i class="fa-solid fa-xmark"></i>
            </button>`;
  }
  updateSelectionBadges();
  updateCountryTimeDisplays();
  updateSavedStats();
  globalCity.innerHTML =
    `<option value="" selected>Select City</option>` + blackBox2;
  document.getElementById("selected-destination").innerHTML = blackBox3;
}

function clearSelection() {
  const blackBox = `
    <div class="ww">
      <h2><i class="fa-solid fa-globe"></i></h2>
      <p>Select a country to view detailed information</p>
    </div>`;
    let blackBox2 = ``;
  const container = document.getElementById("dashboard-country-info");
  if (container) {
    container.innerHTML = blackBox;
  }
document.getElementById("selected-destination").innerHTML = blackBox2;
}

async function countryInfo(countryCode) {
  if (!countryCode) return;
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha/${countryCode}`,
  );
  const data = await response.json();
  displayCounteryInfo(data);
}

function displayCounteryInfo(list) {
  let blackBox = ``;
  for (let i = 0; i < list.length; i++) {
    const timezoneInfo = parseUtcOffsetLabel(list[i].timezones?.[0]);
    if (timezoneInfo) {
      selectionState.timezoneLabel = timezoneInfo.label;
      selectionState.timezoneOffsetMinutes = timezoneInfo.offsetMinutes;
    } else {
      selectionState.timezoneLabel = list[i].timezones?.[0] || "";
      selectionState.timezoneOffsetMinutes = null;
    }
    selectionState.countryCode = list[i].cca2 || countryCode || "";
    const curKey = Object.keys(list[i].currencies)[0];
    const langKey = Object.keys(list[i].languages)[0];
    const borders = list[i].borders
      ? list[i].borders
          .map((b) => `<span class="extra-tag border-tag">${b}</span>`)
          .join("")
      : "";

    blackBox += `
            <div class="dashboard-country-header">
                <img src="${list[i].flags.png}" class="dashboard-country-flag">
                <div class="dashboard-country-title">
                    <h3>${list[i].name.common}</h3>
                    <p class="official-name">${list[i].name.official}</p>
                    <span class="region"><i class="fa-solid fa-location-dot"></i> ${list[i].region} • ${list[i].subregion}</span>
                </div>
            </div>
            <div class="dashboard-local-time">
                <div class="local-time-display">
                    <i class="fa-solid fa-clock"></i>
                    <span class="local-time-value" id="dashboard-local-time-value">${selectionState.timezoneOffsetMinutes === null ? new Date().toLocaleTimeString() : formatTimeForOffset(selectionState.timezoneOffsetMinutes)}</span>
                    <span class="local-time-zone" id="dashboard-local-time-zone">${selectionState.timezoneLabel || list[i].timezones[0]}</span>
                </div>
            </div>
            <div class="dashboard-country-grid">
                <div class="dashboard-country-detail"><i class="fa-solid fa-building-columns"></i><span class="label">Capital</span><span class="value">${list[i].capital[0]}</span></div>
                <div class="dashboard-country-detail"><i class="fa-solid fa-users"></i><span class="label">Population</span><span class="value">${list[i].population.toLocaleString()}</span></div>
                <div class="dashboard-country-detail"><i class="fa-solid fa-ruler-combined"></i><span class="label">Area</span><span class="value">${list[i].area.toLocaleString()} km²</span></div>
                <div class="dashboard-country-detail"><i class="fa-solid fa-globe"></i><span class="label">Continent</span><span class="value">${list[i].continents[0]}</span></div>
            </div>
            <div class="dashboard-country-extras">
                <div class="dashboard-country-extra"><h4><i class="fa-solid fa-coins"></i> Currency</h4><div class="extra-tags"><span class="extra-tag">${list[i].currencies[curKey].name} (${list[i].currencies[curKey].symbol})</span></div></div>
                <div class="dashboard-country-extra"><h4><i class="fa-solid fa-language"></i> Languages</h4><div class="extra-tags"><span class="extra-tag">${list[i].languages[langKey]}</span></div></div>
                <div class="dashboard-country-extra"><h4><i class="fa-solid fa-map-location-dot"></i> Neighbors</h4><div class="extra-tags">${borders}</div></div>
            </div>
            <div class="dashboard-country-actions">
                <a href="${list[i].maps.googleMaps}" target="_blank" class="btn-map-link"><i class="fa-solid fa-map"></i> View on Google Maps</a>
            </div>`;
  }

  document.getElementById("dashboard-country-info").innerHTML = blackBox;
  updateCountryTimeDisplays();
  updateSavedStats();
}

async function displayHolidays(countryCode, year) {
  if (!countryCode || !year) return;
  const response = await fetch(
    `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
  );
  const data = await response.json();
  readHolidays(data);
}

function readHolidays(list) {
  let blackBox = ``;
  for (let i = 0; i < list.length; i++) {
    const date = new Date(list[i].date);
    blackBox += `
            <div class="holiday-card">
                <div class="holiday-card-header">
                    <div class="holiday-date-box">
                        <span class="day">${date.getDate()}</span>
                        <span class="month">${date.toLocaleString("en-US", { month: "short" })}</span>
                    </div>
                    <div class="holiday-icon">
                        <button class="event-card-save" data-index="${i}"><i class="fa-regular fa-heart"></i></button>
                    </div>
                </div>
                <h3>${list[i].localName}</h3>
                <p class="holiday-name">${list[i].name}</p>
                <div class="holiday-card-footer">
                    <span class="holiday-day-badge">${date.toLocaleString("en-US", { weekday: "long" })}</span>
                    <span class="holiday-type-badge">${list[i].types[0]}</span>
                </div>
            </div>`;
  }
  document.getElementById("holidays-content").innerHTML = blackBox;
  updateStatHolidays(list.length);

  const holidayBtns = document.querySelectorAll(
    "#holidays-content .event-card-save",
  );

  holidayBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      const holidaysPlan = {
        type: "holiday",
        name: list[idx].localName,
        date: list[idx].date,
        day: new Date(list[idx].date).toLocaleString("en-US", {
          weekday: "long",
        }),
        kind: list[idx].types?.[0] || "General",
        countryCode: getSelectedCountryCode(),
        countryName: getSelectedCountryName(),
      };
      plan.push(holidaysPlan);
      localStorage.setItem("plan", JSON.stringify(plan));
      displayplan(plan);
      updateSavedStats();
      showToast("Saved to My Plans", "success");
    });
  });
}

async function displayEvents(city, countryCode) {
  if (!city || !countryCode) return;
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?apikey=VwECw2OiAzxVzIqnwmKJUG41FbeXJk1y&city=${city}&countryCode=${countryCode}&size=20`,
    );
    const data = await response.json();
    if (data._embedded && data._embedded.events)
      readEvents(data._embedded.events);
    else {
      eventsContainer.innerHTML = `<div class="empty-state"><h3>No events found</h3></div>`;
      updateStatEvents(0);
    }
  } catch (e) {
    console.error(e);
  }
}

function readEvents(list) {
  if (!eventsContainer) return;
  let blackBox = "";
  for (let i = 0; i < list.length; i++) {
    const event = list[i];
    const venue = event._embedded?.venues?.[0] || {
      name: "N/A",
      city: { name: "Unknown" },
    };

    blackBox += `
        <div class="event-card">
            <div class="event-card-image">
                <img src="${event.images?.[0]?.url}" alt="${event.name}">
                <span class="event-card-category">${event.classifications?.[0]?.segment?.name || "Event"}</span>
                <button class="event-card-save btn-event" data-index="${i}"><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="event-card-body">
                <h3>${event.name}</h3>
                <div class="event-card-info">
                    <div><i class="fa-regular fa-calendar"></i> ${event.dates.start.localDate}</div>
                    <div><i class="fa-solid fa-location-dot"></i> ${venue.name}, ${venue.city.name}</div>
                </div>
                <div class="event-card-footer">
                    <button class="btn-event" data-index="${i}"><i class="fa-regular fa-heart"></i> Save</button>
                    <a href="${event.url}" target="_blank" class="btn-buy-ticket"><i class="fa-solid fa-ticket"></i> Buy Tickets</a>
                </div>
            </div>
        </div>`;
  }
  eventsContainer.innerHTML = blackBox;
  updateStatEvents(list.length);

  const eventBtns = eventsContainer.querySelectorAll(".btn-event");

  eventBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = btn.getAttribute("data-index");
      if (idx === null) return;
      const eventItem = list[idx];
      const eventplace = {
        type: "event",
        name: eventItem.name,
        image: eventItem.images?.[0]?.url,
        date: eventItem.dates.start.localDate,
        time: eventItem.dates.start.localTime,
        venue: eventItem._embedded?.venues?.[0]?.name,
        city: eventItem._embedded?.venues?.[0]?.city?.name,
        url: eventItem.url,
        countryCode: getSelectedCountryCode(),
        countryName: getSelectedCountryName(),
      };

      plan.push(eventplace);
      localStorage.setItem("plan", JSON.stringify(plan));
      displayplan(plan);
      updateSavedStats();
      showToast("Saved to My Plans", "success");
    });
  });
}

function displayplan(list) {
  let blackBox = ``;
  for (let i = 0; i < list.length; i++) {
    blackBox += `
  
<div class="plan-card">
  <div class="plan-type-badge">${list[i].type}</div>

  <h3 class="plan-title">${list[i].name}</h3>

  <div class="plan-details">
    <p><i class="fa-regular fa-calendar"></i> ${list[i].date}</p>
    <p><i class="fa-solid fa-location-dot"></i> ${list[i].city || list[i].name || list[i].infoBox}</p>
  </div>

  <button onclick="removePlan(${i})" class="plan-remove-btn">
    <i class="fa-solid fa-trash"></i> Remove
  </button>
</div>
  `;
  }
  if (list.length === 0) {
    blackBox = `<div class="empty-state">
              <div class="empty-icon"><i class="fa-solid fa-heart-crack"></i></div>
              <h3>No Saved Plans Yet</h3>
              <p>Start exploring and save holidays, events, or long weekends you like!</p>
              <button class="btn-primary" id="start-exploring-btn">
                <i class="fa-solid fa-compass"></i> Start Exploring
              </button>
            </div>
          </div>`;
  }
  document.getElementById("plans-content").innerHTML = blackBox;
  if (list.length > 0) {
    plansCount.classList.remove("hidden");
    plansCount.innerHTML = list.length;
    updateSavedStats();
  } else {
    plansCount.classList.add("hidden");
    plansCount.innerHTML = list.length;
    updateSavedStats();
  }
  updateFilterCounters();
}
function removePlan(index) {
  const confirmRemove = () => {
    plan.splice(index, 1);
    localStorage.setItem("plan", JSON.stringify(plan));
    displayplan(plan);
    updateFilterCounters();
    updateSavedStats();
    showToast("Plan removed", "info");
  };

  if (window.Swal) {
    window.Swal.fire({
      icon: "warning",
      title: "Remove Plan?",
      text: "Are you sure you want to remove this plan?",
      showCancelButton: true,
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) confirmRemove();
    });
    return;
  }

  if (window.confirm("Remove this plan?")) {
    confirmRemove();
  }
}
window.removePlan = removePlan;

clearAllPlansBtn.addEventListener("click", () => {
  const clearAll = () => {
    plan = [];
    localStorage.setItem("plan", JSON.stringify(plan));
    displayplan(plan);
    updateFilterCounters();
    updateSavedStats();
    showToast("All plans cleared", "info");
  };

  if (window.Swal) {
    window.Swal.fire({
      icon: "warning",
      title: "Clear all saved plans?",
      text: "This will remove everything from My Plans.",
      showCancelButton: true,
      confirmButtonText: "Clear All",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#6b7280",
    }).then((result) => {
      if (result.isConfirmed) clearAll();
    });
    return;
  }

  if (window.confirm("Clear all saved plans?")) {
    clearAll();
  }
});
function updateFilterCounters() {
  const totalItems = plan.length;

  const holidayCount = plan.filter((item) => item.type === "holiday").length;
  const eventCount = plan.filter((item) => item.type === "event").length;
  const lwCount = plan.filter((item) => item.type === "Long Weekend").length;

  if (document.getElementById("filter-all-count"))
    document.getElementById("filter-all-count").textContent = totalItems;

  if (document.getElementById("filter-holiday-count"))
    document.getElementById("filter-holiday-count").textContent = holidayCount;

  if (document.getElementById("filter-event-count"))
    document.getElementById("filter-event-count").textContent = eventCount;

  if (document.getElementById("filter-lw-count"))
    document.getElementById("filter-lw-count").textContent = lwCount;
}

async function displayWeather(currentLat, currentLng) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${currentLat || 30.0444}&longitude=${currentLng || 31.2357}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,uv_index&hourly=temperature_2m,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`,
  );
  const data = await response.json();
  readWeather(data, city || "Cairo");
}

function readWeather(list, city) {
  let blackBox = `
    <div class="weather-hero-card weather-sunny">
        <div class="weather-location">
            <i class="fa-solid fa-location-dot"></i>
            <span>${city}</span>
            <span class="weather-time">${list.current.time}</span>
        </div>
        <div class="weather-hero-main">
            <div class="weather-hero-left">
                <div class="weather-hero-icon"><i class="fa-solid fa-sun"></i></div>
                <div class="weather-hero-temp">
                    <span class="temp-value">${list.current.temperature_2m}</span>
                    <span class="temp-unit">°C</span>
                </div>
            </div>
            <div class="weather-hero-right">
                <div class="weather-condition">Condition Code: ${list.current.weather_code}</div>
                <div class="weather-feels">Feels like ${list.current.apparent_temperature}°C</div>
                <div class="weather-high-low">
                    <span class="high"><i class="fa-solid fa-arrow-up"></i> ${list.daily.temperature_2m_max[0]}°</span>
                    <span class="low"><i class="fa-solid fa-arrow-down"></i> ${list.daily.temperature_2m_min[0]}°</span>
                </div>
            </div>
        </div>
    </div>
    <div class="weather-details-grid">
        <div class="weather-detail-card">
            <div class="detail-icon humidity"><i class="fa-solid fa-droplet"></i></div>
            <div class="detail-info">
                <span class="detail-label">Humidity</span>
                <span class="detail-value">${list.current.relative_humidity_2m}%</span>
            </div>
        </div>
        <div class="weather-detail-card">
            <div class="detail-icon wind"><i class="fa-solid fa-wind"></i></div>
            <div class="detail-info">
                <span class="detail-label">Wind</span>
                <span class="detail-value">${list.current.wind_speed_10m} km/h</span>
            </div>
        </div>
        <div class="weather-detail-card">
            <div class="detail-icon uv"><i class="fa-solid fa-sun"></i></div>
            <div class="detail-info">
                <span class="detail-label">UV Index</span>
                <span class="detail-value">${list.current.uv_index}</span>
            </div>
        </div>
        <div class="weather-detail-card">
            <div class="detail-icon precip"><i class="fa-solid fa-cloud-rain"></i></div>
            <div class="detail-info">
                <span class="detail-label">Precipitation</span>
                <span class="detail-value">${list.hourly.precipitation_probability[0]}%</span>
            </div>
        </div>
    </div>
    <div class="weather-section">
        <h3 class="weather-section-title"><i class="fa-solid fa-clock"></i> Hourly Forecast</h3>
        <div class="hourly-scroll">
            ${list.hourly.temperature_2m
              .slice(0, 8)
              .map(
                (temp, i) => `
                <div class="hourly-item">
                    <span class="hourly-time">${list.hourly.time[i].slice(11, 16)}</span>
                    <div class="hourly-icon"><i class="fa-solid fa-sun"></i></div>
                    <span class="hourly-temp">${temp}°</span>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>
    <div class="weather-section">
        <h3 class="weather-section-title"><i class="fa-solid fa-calendar-week"></i> 7-Day Forecast</h3>
        <div class="forecast-list">
            ${list.daily.time
              .map(
                (day, i) => `
                <div class="forecast-day">
                    <div class="forecast-day-name">
                        <span class="day-label">${new Date(day).toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span class="day-date">${new Date(day).getDate()} ${new Date(day).toLocaleDateString("en-US", { month: "short" })}</span>
                    </div>
                    <div class="forecast-icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="forecast-temps">
                        <span class="temp-max">${list.daily.temperature_2m_max[i]}°</span>
                        <span class="temp-min">${list.daily.temperature_2m_min[i]}°</span>
                    </div>
                    <div class="forecast-precip"><i class="fa-solid fa-droplet"></i><span>${list.daily.precipitation_probability_max[i]}%</span></div>
                </div>
            `,
              )
              .join("")}
        </div>
    </div>`;
  document.getElementById("weather-content").innerHTML = blackBox;
}

async function displayLongWeekends() {
  if (!countryCode || !year) return;
  const response = await fetch(
    `https://date.nager.at/api/v3/LongWeekend/${year}/${countryCode}`,
  );
  const data = await response.json();
  readLongWeekends(data);
}

function readLongWeekends(list) {
  let blackBox = ``;

  list.forEach((item, index) => {
    let daysHtml = "";
    let start = new Date(item.startDate);
    let end = new Date(item.endDate);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayName = d.toLocaleDateString("en-US", { weekday: "short" });
      const dayNum = d.getDate();
      const isWeekend = item.needBridgeDay ? "weekend" : "weekend";

      daysHtml += `
        <div class="lw-day ${isWeekend}">
          <span class="name">${dayName}</span>
          <span class="num">${dayNum}</span>
        </div>`;
    }

    const infoBox = item.needBridgeDay
      ? `<div class="lw-info-box warning"><i class="fa-solid fa-circle-info"></i> Requires taking a bridge day off</div>`
      : `<div class="lw-info-box success"><i class="fa-solid fa-check-circle"></i> No extra days off needed!</div>`;

    blackBox += `
      <div class="lw-card">
        <div class="lw-card-header">
          <span class="lw-badge"><i class="fa-solid fa-calendar-days"></i> ${item.dayCount} Days</span>
          <button class="long-weekend-action-btn" data-index="${index}" ><i class="fa-regular fa-heart"></i></button>
        </div>
        
        <h3>Long Weekend #${index + 1}</h3>
        
        <div class="lw-dates">
          <i class="fa-regular fa-calendar"></i> 
          ${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - 
          ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>

        ${infoBox}

        <div class="lw-days-visual">
          ${daysHtml}
        </div>
      </div>`;
  });

  document.getElementById("lw-content").innerHTML = blackBox;

  const holidayActionBtns = document.querySelectorAll(
    ".long-weekend-action-btn",
  );
  holidayActionBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const index = btn.getAttribute("data-index");
      const longWeekend = {
        type: "Long Weekend",
        name: `${index + 1} Long Weekend #`,
        data: list[index].startDate - list[index].endDate,
        dayCount: list[index].dayCount,
        infoBox: list[index].needBridgeDay,
        countryCode: getSelectedCountryCode(),
        countryName: getSelectedCountryName(),
      };
      plan.push(longWeekend);
      localStorage.setItem("plan", JSON.stringify(plan));
      displayplan(plan);
      updateSavedStats();
      showToast("Saved to My Plans", "success");
    });
  });
}
async function displaySunTimes(currentLng, currentLat) {
  if (!currentLat || !currentLng) return;

  try {
    const response = await fetch(
      `https://api.sunrise-sunset.org/json?lat=${currentLat}&lng=${currentLng}&date=today&formatted=0`,
    );
    const data = await response.json();

    if (data.status === "OK") {
      readSunTimes(data.results);
    }
  } catch (error) {
    console.error("Error fetching sun times:", error);
  }
}

function readSunTimes(list) {
  const formatLocalTime = (utcString) => {
    return new Date(utcString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const daySeconds = list.day_length;
  const dayHours = Math.floor(daySeconds / 3600);
  const dayMinutes = Math.floor((daySeconds % 3600) / 60);

  const nightSeconds = 86400 - daySeconds;
  const nightHours = Math.floor(nightSeconds / 3600);
  const nightMinutes = Math.floor((nightSeconds % 3600) / 60);

  const dayPercent = ((daySeconds / 86400) * 100).toFixed(1);

  let blackBox = `
        <div class="sun-main-card">
            <div class="sun-main-header">
                <div class="sun-location">
                    <h2><i class="fa-solid fa-location-dot"></i> ${city || "Selected Location"}</h2>
                    <p>Sun times for your selected location</p>
                </div>
                <div class="sun-date-display text-end">
                    <div class="date">${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
                    <div class="day">${new Date().toLocaleDateString("en-US", { weekday: "long" })}</div>
                </div>
            </div>
            
            <div class="sun-times-grid">
                <div class="sun-time-card dawn">
                    <div class="icon"><i class="fa-solid fa-moon"></i></div>
                    <div class="label">Dawn</div>
                    <div class="time">${formatLocalTime(list.civil_twilight_begin)}</div>
                    <div class="sub-label">Civil Twilight</div>
                </div>

                <div class="sun-time-card sunrise">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Sunrise</div>
                    <div class="time">${formatLocalTime(list.sunrise)}</div>
                    <div class="sub-label">Golden Hour Start</div>
                </div>

                <div class="sun-time-card noon">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Solar Noon</div>
                    <div class="time">${formatLocalTime(list.solar_noon)}</div>
                    <div class="sub-label">Sun at Highest</div>
                </div>

                <div class="sun-time-card sunset">
                    <div class="icon"><i class="fa-solid fa-sun"></i></div>
                    <div class="label">Sunset</div>
                    <div class="time">${formatLocalTime(list.sunset)}</div>
                    <div class="sub-label">Golden Hour End</div>
                </div>

                <div class="sun-time-card dusk">
                    <div class="icon"><i class="fa-solid fa-moon"></i></div>
                    <div class="label">Dusk</div>
                    <div class="time">${formatLocalTime(list.civil_twilight_end)}</div>
                    <div class="sub-label">Civil Twilight</div>
                </div>

                <div class="sun-time-card daylight">
                    <div class="icon"><i class="fa-solid fa-hourglass-half"></i></div>
                    <div class="label">Day Length</div>
                    <div class="time">${dayHours}h ${dayMinutes}m</div>
                    <div class="sub-label">Total Daylight</div>
                </div>
            </div>
        </div>
        
        <div class="day-length-card">
            <h3><i class="fa-solid fa-chart-pie"></i> Daylight Distribution</h3>
            <div class="day-progress">
                <div class="day-progress-bar">
                    <div class="day-progress-fill" style="width: ${dayPercent}%"></div>
                </div>
            </div>
            <div class="day-length-stats">
                <div class="day-stat">
                    <div class="value">${dayHours}h ${dayMinutes}m</div>
                    <div class="label">Daylight</div>
                </div>
                <div class="day-stat">
                    <div class="value">${dayPercent}%</div>
                    <div class="label">of 24 Hours</div>
                </div>
                <div class="day-stat">
                    <div class="value">${nightHours}h ${nightMinutes}m</div>
                    <div class="label">Darkness</div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("sun-times-content").innerHTML = blackBox;
}

//////////////////////////////////////////////////////////
/// section money

async function changemoney() {
  const amount = Number(money.value);
  if (
    !fromMoney.value ||
    !toMoney.value ||
    !Number.isFinite(amount) ||
    amount < 0
  ) {
    document.getElementById("currency-result").innerHTML = `
      <div class="alert alert-danger">Please enter a valid amount and select both currencies.</div>`;
    return;
  }

  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/805842951e5953ad31497176/pair/${fromMoney.value}/${toMoney.value}/${amount}`,
    );
    const data = await response.json();

    if (data.result !== "success") {
      document.getElementById("currency-result").innerHTML = `
        <div class="alert alert-danger">Error: ${data["error-type"] || "Unable to fetch rates."}</div>`;
      return;
    }

    readmoney(data, amount);
  } catch (error) {
    console.error("Currency API error:", error);
    document.getElementById("currency-result").innerHTML = `
      <div class="alert alert-danger">Network error. Please try again.</div>`;
  }
}

function readmoney(list, amount) {
  const result = Number(list.conversion_result);
  const rate = Number(list.conversion_rate);
  const safeResult = Number.isFinite(result) ? result.toFixed(2) : "0.00";
  const safeRate = Number.isFinite(rate) ? rate.toFixed(4) : "0.0000";

  const blackBox = `
    <div class="conversion-display">
      <div class="conversion-from">
        <span class="amount">${amount.toFixed(2)}</span>
        <span class="currency-code">${fromMoney.value}</span>
      </div>
      <div class="conversion-equals"><i class="fa-solid fa-equals"></i></div>
      <div class="conversion-to">
        <span class="amount">${safeResult}</span>
        <span class="currency-code">${toMoney.value}</span>
      </div>
    </div>
    <div class="exchange-rate-info">
      <p>1 ${fromMoney.value} = ${safeRate} ${toMoney.value}</p>
      <small>Last updated: ${list.time_last_update_utc}</small>
    </div>
  `;

  document.getElementById("currency-result").innerHTML = blackBox;
}

convertBtn.addEventListener("click", function (e) {
  e.preventDefault();
  changemoney();
});

///////////////////////////////////////////////////////////////////////////

globalSearchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  countryCode = globalCountry.value;
  year = globalYear.value;
  city = globalCity.value;
  cityInfo(countryCode);
  countryInfo(countryCode);
  if (city !== "") {
    displayHolidays(countryCode, year);
    displayLongWeekends();
    displayEvents(city, countryCode);
    displayWeather(currentLat, currentLng);
    displaySunTimes(currentLng, currentLat);
    if (getSelectedCountryName()) {
      showToast(`Exploring ${getSelectedCountryName()}!`, "success");
    }
  } else {
    let blackBox = `,<div class="container flex-1 align-center justify-center">
    <div class="no-selection-state text-center">
        <div class="placeholder-icon">
            <i class="fa-solid fa-map-location-dot"></i>
        </div>
        <h2>No City Selected</h2>
        <p>Please select a country and city from the dashboard to discover information and opportunities.</p>
        <button class="btn-primary" id="back-to-dash-btn">
            <i class="fa-solid fa-arrow-left"></i> Go to Dashboard
        </button>
    </div>
    </div>
    
    `;
    document.getElementById("holidays-content").innerHTML = blackBox;
    eventsContainer.innerHTML = blackBox;
    document.getElementById("weather-content").innerHTML = blackBox;
    document.getElementById("lw-content").innerHTML = blackBox;
    document.getElementById("sun-times-content").innerHTML = blackBox;
    updateStatHolidays(0);
    updateStatEvents(0);
  }

  updateSelectionBadges();
});

globalCountry.addEventListener("change", function () {
  countryCode = globalCountry.value;
  cityInfo(countryCode);
});

globalCity.addEventListener("change", function () {
  city = globalCity.value;
  updateSelectionBadges();
});

globalYear.addEventListener("change", function () {
  year = globalYear.value;
  updateSelectionBadges();
});

loadDashboard();

document.addEventListener("click", function (e) {
  if (e.target.closest("#clear-selection-btn")) {
    clearSelection();
  }
});
///////////////////////////////////////////////////////////////////////
