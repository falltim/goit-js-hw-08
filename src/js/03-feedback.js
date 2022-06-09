import throttle from "lodash.throttle";

const KEY_STORAGE = 'feedback - form - state';
const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('submit', onFormSubmit);
formRef.addEventListener('input', throttle(onTextInput,  1000));

populateText();

function onFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const finalData = {};
    for(const [key, value] of formData.entries()){
    if (!value) {
        alert("Все поля должны быть заполнены!!");
        return;
    }
        finalData[key] = value;
    }
    console.log(finalData);
    form.reset();
    localStorage.removeItem(KEY_STORAGE);
}

function onTextInput(event) {
    const { name, value } = event.target;
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const formData = {
        ...parsedData,
        [name] : value,    
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
        } else {
        const formData = {[name] : value, 
        };
        localStorage.setItem(KEY_STORAGE, JSON.stringify(formData))
    }
}

function populateText() {
    const parsedData = JSON.parse(localStorage.getItem(KEY_STORAGE));
    if (parsedData) {
        const inputNames = Object.keys(parsedData);
    inputNames.forEach(inputName => {
        const input = formRef.elements[inputName];
        input.value = parsedData[inputName];
    });
    }

}