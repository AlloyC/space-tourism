const HOME = document.getElementById("home");
const DESTINATION = document.getElementById("destination");
const CREW = document.getElementById("crew");
const TECHNOLOGY = document.getElementById("technology");
const selection = document.getElementById('selection');
const main = document.querySelector('main');


const pageNAV = document.querySelectorAll('.navigate button');

fetch ('data.json')
.then (res => res.json())
.then (data => {
    pageNAV.forEach(nav => nav.addEventListener('click', () => selectJson(nav.id)));

    function selectJson(index) {
        // console.log(selection.previousElementSibling.src)
        selection.children[1].innerText = data.destinations[index].name;
        selection.previousElementSibling.src = data.destinations[index].images.png;
        selection.children[2].innerText = data.destinations[index].description;
        selection.nextElementSibling.children[2].innerText = data.destinations[index].travel;
        selection.nextElementSibling.children[3].innerText = data.destinations[index].distance
    }
});