// https://rapidapi.com/aptitudeapps/api/countries33

const locales = 'en-US';
const $countries = $('#countries');
const countriesArray = [];

const settings = {
    async: false,
    crossDomain: true,
    url: 'https://restcountries.com/v3.1/all',
    method: 'GET',
};

$.ajax(settings).done(function (ajaxReturn) {
    console.log(ajaxReturn);

    for (const r of ajaxReturn) {
        population = +r.population;
        if (r.capital === undefined) {

            // console.log(`${r.name.common} / "no capital" /  ${population.toLocaleString(locales)} / ${r.cca2} / ${r.flags.png}`);
            countriesArray.push(`${r.name.common} / "no capital" / ${population.toLocaleString(locales)} / ${r.cca2} / ${r.flags.png}`);
            continue;
        }

        // console.log(`${r.name.common} / ${r.capital[0]} / ${population.toLocaleString(locales)} / ${r.cca2} / ${r.flags.png}`);
        countriesArray.push(`${r.name.common} / ${r.capital[0]} / ${population.toLocaleString(locales)} / ${r.cca2} / <img src="${r.flags.png}" height="20">`);
    }
    countriesArray.sort();
});



for (const r of countriesArray) {
    $countries.append(`${r} <br>`);
}


// const settings = {
//     async: false,
//     crossDomain: true,
//     url: 'https://countries33.p.rapidapi.com/basic',
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'f46d7770dbmsh5c4d189540ea60fp1c8881jsn3bd429a3af85',
//         'X-RapidAPI-Host': 'countries33.p.rapidapi.com'
//     }
// };

// $.ajax(settings).done(function (ajaxReturn) {
//     console.log(ajaxReturn);

//     for (const r of ajaxReturn) {
//         if (r.capital === undefined) {
//             continue;
//             // r.capital[0].name = "no capital";
//         }

//         population = +r.population.total;
//         console.log(`${r.name} / ${r.iso_3166.alpha2} / ${population.toLocaleString(locales)} / ${r.capital[0].name}`);
//     }
// });



// Demonstrate selected international locales
// const locales = [
//     undefined,  // Your own browser
//     'en-US',    // United States
//     'de-DE',    // Germany
//     'ru-RU',    // Russia
//     'hi-IN',    // India
//     'de-CH',    // Switzerland
// ];
// var n = 100000;
// var opts = { minimumFractionDigits: 2 };
// for (var i = 0; i < locales.length; i++) {
//     console.log(locales[i], n.toLocaleString(locales[i], opts));
// }


// let countryName = '';

// const settingsCountries = {
//     async: false,
//     crossDomain: true,
//     url: 'https://structured-world-data.p.rapidapi.com/countries',
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'f46d7770dbmsh5c4d189540ea60fp1c8881jsn3bd429a3af85',
//         'X-RapidAPI-Host': 'structured-world-data.p.rapidapi.com'
//     },
//     error: function (error) {
//         console.error('Error fetching data:', error);
//     }
// };
// const settingsCountry = {
//     async: false,
//     crossDomain: true,
//     // url: `https://get-population.p.rapidapi.com/population/country?country=${countryName}`,
//     url: `https://get-population.p.rapidapi.com/population/country?country=Egypt`,
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'f46d7770dbmsh5c4d189540ea60fp1c8881jsn3bd429a3af85',
//         'X-RapidAPI-Host': 'get-population.p.rapidapi.com'
//     }
// };


// $.ajax(settingsCountries).done(function (ajaxReturn) {

//     for (const r of ajaxReturn.response) {
//         console.log(`${r.commonName} / ${r.iso3166_1_alpha2} / ${r.iso3166_1_numeric} / ${r.officialName}`);
//         countryName = r.commonName;
//     }

// });

// $.ajax(settingsCountry).done(function (ajaxReturn) {
//     console.log(`${ajaxReturn.country} / ${ajaxReturn.readable_format}`);
// });


// $.ajax(settingsCountry).done(function (ajaxReturn) {
//     console.log(`${ajaxReturn.country} / ${ajaxReturn.readable_format}`);
// });


// const url = 'https://get-population.p.rapidapi.com/population/country?country=Egypt';
// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'f46d7770dbmsh5c4d189540ea60fp1c8881jsn3bd429a3af85',
//         'X-RapidAPI-Host': 'get-population.p.rapidapi.com'
//     }
// };

// try {
//     const response = await fetch(url, options);
//     const result = await response.text();
//     console.log(result);
// } catch (error) {
//     console.error(error);
// }