export const FRUITS = ['apple', 'app', 'appl', 'apply', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew'];

export const getSearchSuggestions = async (keyword) => {
  const result = FRUITS.filter(fruit => fruit.toLowerCase().startsWith(keyword.toLowerCase()));
  // return result.length > 0 ? result : 'No suggestions found';
  const resultAsAPI = await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (result.length > 0) {
        resolve(result);
      } else {
        reject('No suggestions found');
      }
    }, 2000);
  });
  return resultAsAPI;
}