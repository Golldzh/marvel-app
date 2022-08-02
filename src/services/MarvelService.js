class MarvelService {
  getResource = async(url) => {
    const res = await fetch(url);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(`${process.env.REACT_APP_MARVEL_API_BASE}/characters?limit=9&offset=210&${process.env.REACT_APP_MARVEL_API_KEY}`)
  }
}

export default MarvelService; 