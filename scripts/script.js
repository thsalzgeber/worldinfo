
const $sectionHeader = $('#section-header');

const locales = 'en-US';
const $worldInfo = $('#world-info');
const $countries = $('#countries');
const $countriesNumber = $('#countries-number');
const $totalPopulation = $('#total-population');
const $countryTable = $('#country-table');

const $singleCountry = $('#single-country');

const $countryList = $('#country-list');


$sectionHeader.html(`Population of all countries`);
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
}

function generateTable(data) {

    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Country Name', 'Country Code', 'Capital City', 'Population'];

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


