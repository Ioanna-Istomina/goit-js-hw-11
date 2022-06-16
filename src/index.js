import './css/main.css';
import { fetchImages } from './partials/service/fetchImages';
import { galerryMarkup } from './partials/template/renderMarkup';
import {
  form,
  gallery,
  button_load,
  notification,
} from './partials/service/refs';
import { loadingMore } from './partials/service/load_more_btn';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

form.addEventListener('submit', onSubmitSearchForm);

let searchResult = '';
let page = { index: 1 };
let currentHits = 0; //текущее количество загруженных картинок
let result = '';

const lightbox = new SimpleLightbox('.gallery a', {
  overlay: true,
  overlayOpacity: 0.7,
  nav: true,
  close: true,
});

async function onSubmitSearchForm(ev) {
  ev.preventDefault();
  searchResult = ev.currentTarget.searchQuery.value.trim(); //запрос

  if (searchResult === '') {
    // если запрос это пустая строка не производит поиск
    return;
  }

  try {
    page.index = 1;
    result = await fetchImages(searchResult, page.index); //результат поиска
    let totalHits = result.data.totalHits; //количество найденных картинок
    currentHits = result.data.hits.length;

    totalHits > 40
      ? button_load.classList.remove('is-hidden')
      : button_load.classList.add('is-hidden');

    if (totalHits > 0) {
      // отрисовка картинок по запросу
      notification.innerHTML = '';
      gallery.innerHTML = '';
      form.reset();

      createMarkup(result.data.hits);
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      return;
    }

    if (totalHits === 0) {
      //ошибка если по поиску ничего нет
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

button_load.addEventListener('click', () => {
  loadingMore(createMarkup, page, currentHits, searchResult);
});

export function createMarkup(array) {
  const markup = array.map(item => galerryMarkup(item)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
