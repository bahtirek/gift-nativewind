import allGiftCards from "@assets/data/allcards";

export const getTrendingCards = async() => {
  const data = await fetchData();
  return data
}

const fetchData = async () => {
  let json, loading, error;
  /* try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    json = await response.json();
  } catch (e) {
    error = e
  } finally {
    loading = false
  } */
  setTimeout(() => {
    return {
      allGiftCards, loading, error
    }
  }, 1000)
  //return {json, loading, error}
}