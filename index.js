const HOME = document.getElementById("home");
const DESTINATION = document.getElementById("destination");
const CREW = document.getElementById("crew");
const TECHNOLOGY = document.getElementById("technology");
const selection = document.getElementById('selection');
const main = document.querySelector('main');
const BODY = document.querySelector('body');
const subNAV = document.querySelector('.navigate');

const pageNAV = document.querySelectorAll('.navigate button');
let index;
let activeNavId;
let activeNav;

fetch ('data.json')
.then (res => res.json())
.then (data => {
    if (!BODY.classList.contains('home')) {
        const navBTN = [...subNAV.children];
    
        let btns = [];
        let btnId;
        let timerIntv;
        navBTN.forEach(li => {
            btns.push(li.children[0])
        });
        btns.forEach(btn => {
            if (btn.classList.contains('active')) {
                btnId = btns.indexOf(btn)
                timerIntv = setInterval(() => {
                    if (btnId >= btns.length - 1) {
                        btnId = 0;
                        selectJson(btnId, btns[btnId]);
                        console.log(btns[btnId])
                    } else {
                        btnId += 1;
                        selectJson(btnId, btns[btnId]);
                        console.log(btns[btnId - 1])
                    }
                }, 12000);
            }
            btn.addEventListener('click', () => {
                btnId = btns.indexOf(btn);
                selectJson(btnId, btn)
            })
        })
        
        function selectJson(index, element) {
            // console.log(selection.previousElementSibling.src)
            if (BODY.classList.contains('destination')) {
                selection.children[1].innerText = data.destinations[index].name;
                selection.previousElementSibling.src = data.destinations[index].images.png;
                selection.children[2].innerText = data.destinations[index].description;
                selection.nextElementSibling.children[2].innerText = data.destinations[index].travel;
                selection.nextElementSibling.children[3].innerText = data.destinations[index].distance;
                pageNAV.forEach(btn => btn.classList.remove('active'));
                element.classList.add('active')
            } else if (BODY.classList.contains('crew')) {    
                crewFill(index, element);
            } else if (BODY.classList.contains('technology')) {
                let width;
                selection.children[1].innerText = data.technology[index].name;
                selection.children[2].innerText = data.technology[index].description;

                if (window.innerWidth <= 640) {
                    width = "portrait"
                } else {
                    width = "landscape"
                }
                selection.previousElementSibling.src = data.technology[index].images[width];
                pageNAV.forEach(btn => btn.classList.remove('active'));
                element.classList.add('active')
            }
        }

        function crewFill(index, element) {
            selection.children[0].innerText = data.crew[index].role;
            selection.children[1].innerText = data.crew[index].name;
            selection.children[2].innerText = data.crew[index].bio;
            selection.previousElementSibling.src = data.crew[index].images.png;
            pageNAV.forEach(btn => btn.classList.remove('active'));
            element.classList.add('active')
        }
    }
});