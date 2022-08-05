import { Component } from 'react/cjs/react.production.min';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import CharListItem from '../CharListItem.js/CharLIstItem';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
    state = {
        chars: [],
        loading: true,
        error: false
    }
    marvelService = new MarvelService();
    componentDidMount() {
        this.newChar()
    }

    newChar = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    onCharLoaded = (chars) => {
        this.setState({
            chars,
            loading: false
        })
    }
    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }


    render() {
        const {chars, loading, error} = this.state;
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
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;