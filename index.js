import { getSearchSuggestions } from "./Utils.js";

const searchInput = document.getElementById('search-box');
// const searchDisplay = searchInput.addEventListener('input', (event) => console.log(event.target.value));
// console.log('searc', searchDisplay);
const suggestionsBox = document.getElementById('suggestion-box');
const clickMatchedItem = document.addEventListener('click', (event) => {
  if (event.target.classList.contains('matched-item')) {
    const selectedItem = event.target.textContent;
    searchInput.value = selectedItem;
    suggestionsBox.innerHTML = '';
  }
})

const debounceFun = (callbackFunction, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callbackFunction(...args)
    }, delay);
  }
}

const displayName = async (event) => {
  if (!event.target.value) {
    suggestionsBox.innerHTML = '';
    return;
  }
  const name = event.target.value;
  try {
    const result = await getSearchSuggestions(name);
    suggestionsBox.innerHTML = '';
    if (Array.isArray(result) && result.length > 0) {
      console.log(result);
      suggestionsBox.innerHTML = result.map(item => `<div class="matched-item">${item}</div>`).join('');
    } else {
      console.log('match not found');
      suggestionsBox.innerHTML = '<div class="unmatched-item">No suggestions found</div>';
    }
  } catch (error) {
    console.log('error fetching suggestions:', error);
    suggestionsBox.innerHTML = `<div class="unmatched-item">No such match found</div>`;
  }
};


const searchDisplay1 = searchInput.addEventListener('input',debounceFun(displayName, 500));
