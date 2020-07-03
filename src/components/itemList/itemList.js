import React, {Component} from 'react';
import styled from 'styled-components';

import Spinner from '../spinner/';


const List = styled.ul`
    cursor: pointer
    `;


export default class ItemList extends Component {
    
    state = {
        itemList: null
    }

    componentDidMount() {

        const {getData} = this.props;

        getData()
            .then( (itemList) => {
                this.setState({
                    itemList
                })
            })
    }

    renderItems (arr) {
        return arr.map((item) => {

            const {id,name} = item;
            const label = this.props.renderItem(item); 

            return (
                <li 
                key={id}
                className="list-group-item"
                onClick={ () => this.props.onCharSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const {itemList} = this.state;

        if (!itemList) {
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
            <List>
              {items}
            </List>
        );
    }
}