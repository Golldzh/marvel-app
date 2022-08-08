class MarvelService {
  _baseOffset = 210
  getResource = async(url) => {
    const res = await fetch(url);
    if(!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`)
    }
    return await res.json();
  };

  getAllCharacters = async(offset = this._baseOffset) => {
    const res = await this.getResource(`${process.env.REACT_APP_MARVEL_API_BASE}characters?limit=9&offset=${offset}&${process.env.REACT_APP_MARVEL_API_KEY}`);
    return res.data.results.map(this._transformCharacters);
  }
  getCharacter = async(id) => {
    const res = await this.getResource(`${process.env.REACT_APP_MARVEL_API_BASE}characters/${id}?${process.env.REACT_APP_MARVEL_API_KEY}`);
    return this._transformCharacters(res.data.results[0]);
  }

  _transformCharacters = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? char.description : 'There is no description about this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
}

export default MarvelService; 