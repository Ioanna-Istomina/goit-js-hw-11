import { button_load, notification } from './refs';
import { fetchImages } from './fetchImages';

export async function loadingMore(
  createMarkup,
  page,
  currentHits,
  searchResult
) {
  page.index += 1;
  const result = await fetchImages(searchResult, page.index);
  createMarkup(result.data.hits);
  currentHits += currentHits;

  if (currentHits > result.data.totalHits) {
    button_load.classList.add('is-hidden');
    notification.insertAdjacentHTML(
      'beforeend',
      `<p class="info_message">We're sorry, but you've reached the end of search results.</p>`
    );
  }
}
