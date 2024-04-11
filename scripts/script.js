
const $sectionHeader = $('#section-header');

const locales = 'en-US';
const $worldInfo = $('#world-info');
const $countriesNumber = $('#countries-number');
const $totalPopulation = $('#total-population');
const $countryTable = $('#country-table');

const $singleCountry = $('#single-country');
const $singleCountryName = $('#single-country-name');
const $singleCountryCode = $('#single-country-code');
const $singleCountryCapital = $('#single-country-capital');
const $singleCountryPopulation = $('#single-country-population');
const $singleCountryArea = $('#single-country-area');
const $singleCountryContinent = $('#single-country-continent');
const $singleCountrySubregion = $('#single-country-subregion');
const $singleCountryMap = $('#single-country-map');
const $singleCountryFlag = $('#single-country-flag');

const $countryList = $('#country-list');

const selectElement = document.getElementById('mySelect');
const showTop = document.getElementById('showtop');
const showLast = document.getElementById('showlast');

$sectionHeader.html(`Population of all countries (2024)`);
$worldInfo.html(`Summary`);
$singleCountry.html(`Select Country`);
$countryList.html(`Country List`);

init();

function init() {

    getLocalJson();
    getCountryApi();

}

function writeData() {
    $totalPopulation.html(`Total Population: <strong>${totalPopulation.toLocaleString(locales)}</strong>`);
    $countriesNumber.html(`Numbers of Countries: <strong>${jsonArray.length}</strong>`);
    writeTable();
    singleCountry();
    createDropdownList();
}

function generateTable(data) {

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Country Name', 'Country Code', 'Capital City', 'Population', 'Area (km²)', 'Continents', 'Sub-Region'];

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        let row = document.createElement('tr');

        for (let key in item) {
            let cell = document.createElement('td');
            cell.textContent = item[key];
            row.appendChild(cell);
        }

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    return table;
}

function writeTable() {
    const tableElement = generateTable(tableArray);

    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = '';
    tableContainer.appendChild(tableElement);
}

selectElement.addEventListener('change', function () {
    const selectedValue = this.value;

    const selectedIndex = tableArrayForSingle.findIndex(country => country.name === selectedValue);
    singleCountry(selectedIndex);

});


function singleCountry(selectedIndex = 35) {

    $singleCountryName.html(`<strong>${tableArrayForSingle[selectedIndex].name}</strong>`);
    $singleCountryCode.html(`<strong>${tableArrayForSingle[selectedIndex].code}</strong>`);
    $singleCountryCapital.html(`<strong>${tableArrayForSingle[selectedIndex].capital}</strong>`);
    $singleCountryPopulation.html(`<strong>${tableArrayForSingle[selectedIndex].population}</strong>`);
    $singleCountryArea.html(`<strong>${tableArrayForSingle[selectedIndex].area} km²</strong>`);
    $singleCountryContinent.html(`<strong>${tableArrayForSingle[selectedIndex].continents}</strong>`);
    $singleCountrySubregion.html(`<strong>${tableArrayForSingle[selectedIndex].subregion}</strong>`);
    $singleCountryMap.html(`<strong><a href="${tableArrayForSingle[selectedIndex].maps}" target="_blank">${tableArrayForSingle[selectedIndex].maps}</strong>`);
    $singleCountryFlag.html(`<img src="${tableArrayForSingle[selectedIndex].flag}" height="100">`);

}

const countries = [];
function createDropdownList() {

    for (const r of tableArrayForSingle) {
        countries.push(r.name);
    }
    countries.sort();

    countries.forEach(country => {
        const option = document.createElement('option');
        option.text = country;
        selectElement.appendChild(option);
    });

}

showTop.addEventListener('click', function () {
    const firstEntries = tableArray.slice(0, 10);
    const entries = [];
    for (const r of firstEntries) {
        entries.push({
            country: r.name,
            population: r.population
        });
    }
    displayEntries('Top 10', entries);
})

showLast.addEventListener('click', function () {
    const lastEntries = tableArray.slice(-10);
    const entries = [];
    for (const r of lastEntries) {
        entries.push({
            country: r.name,
            population: r.population
        });
    }
    displayEntries('Last 10', entries);
})


function displayEntries(title, entries) {
    const $title = $('#modal-title');
    const table = document.getElementById('arrayTable');
    table.innerHTML = '';

    $title.html(`<h4>${title}</h4>`);
    const headers = ['Country', 'Population'];
    const headerRow = document.createElement('tr');
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    entries.forEach(entry => {
        const row = document.createElement('tr');

        const countryCell = document.createElement('td');
        countryCell.textContent = entry.country;
        row.appendChild(countryCell);

        const populationCell = document.createElement('td');
        populationCell.textContent = entry.population;
        row.appendChild(populationCell);

        table.appendChild(row);
    });
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

