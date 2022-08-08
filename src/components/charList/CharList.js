import { Component } from 'react/cjs/react.production.min';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharListItem from '../CharListItem/CharLIstItem';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 220,
        charEnded: false
    }
    marvelService = new MarvelService();
    

    componentDidMount() {
        this.onRequest();
        window.addEventListener("scroll", this.onScroll);
    }
   
    componentWillUnmount() {
      window.removeEventListener("scroll", this.onScroll);
    }
   
    onScroll = () => {
      if (this.state.newItemLoading) return;
      if (this.state.charEnded)
        window.removeEventListener("scroll", this.onScroll);
   
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.onCharListLoading();
        this.onRequest(this.state.offset);
      }
    };

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharLoaded = (newChars) => {

        let ended = false
        if(newChars.length < 9) {
            ended =  true;
        }
        this.setState(({offset, chars}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    render() {
        const {chars, loading, error, offset, newItemLoading,charEnded} = this.state;
        const items = chars.map(item => {
            const{id, ...itemProps} = item;
            return (
              <CharListItem 
                key={item.id}
                {...itemProps}
                onCharSelected={() => {this.props.onCharSelected(item.id)}}/>
            )
        });
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;
        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long"
                        disabled={newItemLoading}
                        style={{'display': charEnded ? 'none' : 'block'}}
                        onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;