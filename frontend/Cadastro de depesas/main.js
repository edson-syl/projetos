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
