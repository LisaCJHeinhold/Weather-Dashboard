var apiKey = '2a29b7cfbdbb553ce8984f15bc2a35a7';
var userSearch = document.querySelector('.form-input');
var recentSearches = JSON.parse(localStorage.getItem('search')) || [];
var currentEl = document.querySelector('.current-info');
//BUTTON
$('#searchBtn').on('click', function(event) {
    event.preventDefault();
    if(!userSearch.value){
        alert('Please enter a valid city');
        return;
    }
    //add form input to recent searches
    var userSearchValue = userSearch.value 
    recentSearches.push(userSearchValue);
    localStorage.setItem('form-input', JSON.stringify(recentSearches));

    //get input and search city
    var searchedCity = userSearch.value.trim();
    userSearch.value = ''
    getCityWeather(searchedCity);
    //setLocalStorage();
});
//get cordinaits
var getCityWeather = function(searchedCity) {fetch(
    'https://api.openweathermap.org/data/2.5/weather?q='+searchedCity+'&appid='+apiKey
)
.then(function(response) {
    if(response.ok) {
    }
    response.json().then(function(data) {
        var lat = data.coord.lat
        var lon = data.coord.lon
        var name = data.name
        var cityName = document.querySelector('.city-name');
        var currentDate = moment().format('MM/DD/YYYY')
        cityName.textContent = name + " (" +currentDate+')';
        //use cord to get weather
        fetch (
            "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey
        )
            .then(function(response) {
                response.json()
                .then(function(data) {
                    currentEl.innerHTML='';
                    //get current data
                    var current = data.current;
                    //weather condition
                    var currentCond = current.weather[0].icon;
                    var currentIcon = document.querySelector('#weather-icon');
                    currentIcon.removeAttribute('src');
                    currentIcon.setAttribute('src', "")
                })
            })
    })
})
}

// var getCityInfo = function(city) {
//     var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat='&lon='&units=imperial&appid=2a29b7cfbdbb553ce8984f15bc2a35a7";
//     fetch(apiUrl).then(function(response) {
//         if (response.ok) {
//             console.log(response);
//         } else {
//             //alert("City Not Found");
//         }
//     });
// }
// var searchHistory = function(event) {
    
// }
// getCityInfo();