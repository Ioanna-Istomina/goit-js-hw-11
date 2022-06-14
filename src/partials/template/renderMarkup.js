export function galerryMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<a href="${largeImageURL}" class="photo-link">
  <div class="photo-card">
  <div class="img-wrap">
        <img src="${webformatURL}" alt="${tags}" loading="lazy"class="gallery_img"/>
        </div>
        <div class="info">
          <p class="info-item">
            <b class="info-item-text"><span class="info-item-number">Views: </span>${likes}</b>
          </p>
          <p class="info-item">
            <b class="info-item-text"><span class="info-item-number">Views: </span>${views}</b>
          </p>
          <p class="info-item">
            <b class="info-item-text"><span class="info-item-number">Comments: </span>${comments}</b>
          </p>
          <p class="info-item">
            <b class="info-item-text"><span class="info-item-number">Downloads: </span>${downloads}</b>
          </p>
    </div>
    </div>
     </a>`;
}
