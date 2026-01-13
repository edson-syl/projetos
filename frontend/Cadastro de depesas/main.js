<<<<<<< HEAD
const form = document.getElementById('despesaForm');
const modalElement = document.getElementById('alertModal');
const modal = new bootstrap.Modal(modalElement);

let despesas_list = JSON.parse(localStorage.getItem('despesas')) || {};

const meses = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11
};
=======
const form = document.getElementById('despesaForm');
const modalElement = document.getElementById('alertModal');
const modal = new bootstrap.Modal(modalElement);

let despesas_list = JSON.parse(localStorage.getItem('despesas')) || {};

const meses = {
  janeiro: 0,
  fevereiro: 1,
  marco: 2,
  abril: 3,
  maio: 4,
  junho: 5,
  julho: 6,
  agosto: 7,
  setembro: 8,
  outubro: 9,
  novembro: 10,
  dezembro: 11
};
>>>>>>> f6147817db8da2f863618685ca5959e99c21c5c8
