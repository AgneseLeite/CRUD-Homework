import axios from "axios";

const container: HTMLDivElement | null = document.querySelector(".container");
const addSrc: HTMLInputElement | null = document.querySelector(".add-link");
const addInput: HTMLInputElement | null = document.querySelector(".add-input");
const addTextarea: HTMLTextAreaElement | null = document.querySelector(".add-textarea");
const addPreDefined: HTMLPreElement | null = document.querySelector(".add-pre");
const addBtn: HTMLButtonElement | null = document.querySelector(".add-btn");


type PlacesData = {
    id: number,
    src: string,
    title: string,
    description: string
}

const displayCard = (data: PlacesData[]) => 
    data.forEach(place => {
    let card: HTMLDivElement | null= document.createElement("div");
    card.classList.add("box");
    card.classList.add("card");
    card.setAttribute("id", `${place.id}`);
    card.innerHTML = `
        <img src="${place.src}" alt="${place.title}"class="image">
        <h2 class="title">${place.title}</h3>
        <p class="description">${place.description}</p>
        <button class="edit-btn edit-btn-${place.id}">Edit</button>
        <button class="delete-btn delete-btn-${place.id}">Delete</button>
        <pre class="pre-defined"></pre>
        <form class="form">
            <input type="text" class="form-input" placeholder="New Title"><br>
            <textarea name="" id="" cols="30" rows="10" class="form-textarea"></textarea><br>
            <button class="update-btn update-btn-${place.id}">Update</button>
        </form>
        `
    container.appendChild(card);

    let editBtn: HTMLButtonElement = card.querySelector(`.edit-btn-${place.id}`);
    editBtn.addEventListener("click", showForm);


    // let deleteBtn: HTMLButtonElement = card.querySelector(`delete-btn-${place.id}`);
    // deleteBtn.addEventListener("click", () => {
    //     deletePlace();  
    // });

    // let updateBtn: HTMLButtonElement = card.querySelector(`update-btn-${place.id}`);
    // updateBtn.addEventListener("click", updatePlace);

});


// get request
axios.get("http://localhost:3004/places")
    .then(({ data }) => {
    displayCard(data);
    console.log(data)
});


// display form input & textarea for updates
const showForm = () => {
    console.log("HI");
    let form: HTMLFormElement = document.querySelector(".form");
    form.style.display = "block";
}


// delete
const deletePlace = () => {
    console.log("HELLO")
    let preDefined = document.querySelector(".pre-defined");
    axios.delete<PlacesData>("http://localhost:3004/places").then(({data}) => {
        preDefined.innerHTML = JSON.stringify(data);
    });
};


// post 
addBtn.addEventListener("click", () => {
    axios.post<PlacesData>("http://localhost:3004/places", {
        src: addSrc.value,
        title: addInput.value,
        description: addTextarea.value,
    }).then(({data}) => {
        addPreDefined.innerHTML = JSON.stringify(data);
    })
})


// update
const updatePlace = () => {
    axios.patch<PlacesData>("http://localhost:3004/places", {
        title: '',
        description: '',
    }).then(({data}) => {
        addPreDefined.innerHTML = JSON.stringify(data);
    });
};
