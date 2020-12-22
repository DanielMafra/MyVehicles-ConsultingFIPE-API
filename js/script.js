// base url
const url = "https://parallelum.com.br/fipe/api/v1";

// user choices
const vehicle = {
  type: '',
  brand: '',
  model: '',
  year: ''
};

// loops
let i = 0;
let j = 0;
let k = 0;

// form elements
const brandLabel = document.getElementById("brand-label");
const brandSelect = document.getElementById("brand-select");
const modelLabel = document.getElementById("model-label");
const modelSelect = document.getElementById("model-select");
const yearLabel = document.getElementById("year-label");
const yearSelect = document.getElementById("year-select");
const submitButton = document.getElementById("submit-button");
const vehicleForm = document.getElementById("vehicle-form");

// result element
const resultArea = document.getElementById("result-area");

// loading element
const loadingElement = document.getElementById("loading-element");
let loading = false;

// list vehicles brands
async function choiceVehicle(choice) {
  vehicle.type = choice;
  loading = true;
  loadingControl();
  const vehiclesBrands = await fetch(`${url}/${vehicle.type}/marcas`)
    .then(data => data.json());
  createBrandList(vehiclesBrands);
}

// create brand list
function createBrandList(brandsList) {
  brandLabel.classList.remove("hidden-element");
  brandSelect.classList.remove("hidden-element");
  brandLabel.classList.add("shown-element");
  brandSelect.classList.add("shown-element");
  autoScroll();

  for (i = 0; i < brandsList.length; i++) {
    brandSelect.innerHTML += `<option value="${brandsList[i].codigo}">${brandsList[i].nome}</option>`
  }

  loading = false;
  loadingControl();
}

// choice vehicle brand
brandSelect.addEventListener("change", function () {
  vehicle.brand = brandSelect.value;
  listModels();
})

// list vehicles models
async function listModels() {
  loading = true;
  loadingControl();
  const vehiclesModels = await fetch(`${url}/${vehicle.type}/marcas/${vehicle.brand}/modelos`)
    .then(data => data.json());
  createModelList(vehiclesModels);
}

// create model list
function createModelList(modelsList) {
  modelLabel.classList.remove("hidden-element");
  modelSelect.classList.remove("hidden-element");
  modelLabel.classList.add("shown-element");
  modelSelect.classList.add("shown-element");
  autoScroll();

  for (j = 0; j < modelsList.modelos.length; j++) {
    modelSelect.innerHTML += `<option value="${modelsList.modelos[j].codigo}">${modelsList.modelos[j].nome}</option>`
  }

  loading = false;
  loadingControl();
}

// choice vehicle model
modelSelect.addEventListener("change", function () {
  vehicle.model = modelSelect.value;
  listYears();
})

// list vehicle years
async function listYears() {
  loading = true;
  loadingControl();
  const vehicleYears = await fetch(`${url}/${vehicle.type}/marcas/${vehicle.brand}/modelos/${vehicle.model}/anos`)
    .then(data => data.json());
  createYearList(vehicleYears);
}

// create year list
function createYearList(yearsList) {
  yearLabel.classList.remove("hidden-element");
  yearSelect.classList.remove("hidden-element");
  yearLabel.classList.add("shown-element");
  yearSelect.classList.add("shown-element");
  autoScroll();

  for (k = 0; k < yearsList.length; k++) {
    yearSelect.innerHTML += `<option value="${yearsList[k].codigo}">${yearsList[k].nome}</option>`
  }

  loading = false;
  loadingControl();
}

// choice vehicle year
yearSelect.addEventListener("change", function () {
  vehicle.year = yearSelect.value;
  submitButton.classList.remove("hidden-element");
  submitButton.classList.add("shown-element");
  autoScroll();
})

// result
vehicleForm.addEventListener('submit', async function (event) {
  event.preventDefault();
  loading = true;
  loadingControl();
  const result = await fetch(`${url}/${vehicle.type}/marcas/${vehicle.brand}/modelos/${vehicle.model}/anos/${vehicle.year}`)
    .then(data => data.json());
  showResult(result);
});

function showResult(result) {
  resultArea.classList.remove("hidden-element");
  resultArea.classList.add("shown-element");
  resultArea.innerHTML = `<h5>Pela tabela FIPE, seu veículo ${result.Marca} - ${result.Modelo} - ${result.AnoModelo}, vale em média:</h5><h2>${result.Valor}</h2><h6>Consulta válida para ${result.MesReferencia}</h6><h6>Código FIPE: ${result.CodigoFipe}</h6>`;
  loading = false;
  loadingControl();
  autoScroll();
}

// autoscroll and loading control
function autoScroll() {
  const heightPage = document.body.scrollHeight;
  window.scrollTo(0, heightPage);
}

function loadingControl() {

  if (loading) {
    loadingElement.classList.remove("hidden-element");
    loadingElement.classList.add("shown-element");
  } else {
    loadingElement.classList.remove("shown-element");
    loadingElement.classList.add("hidden-element");
  }
  autoScroll();
}