import React, {Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import styled from 'styled-components';

import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import ErrorMessage from '../errorMessage';
import CharacterPage from '../characterPage'
import gotService from '../../services/gotService';


const ToggleRandomChar = styled.button`
    padding: 10px;
    margin-top: 15px;
    margin-bottom: 15px;  
    background-color: gray;
    color: white;
`;


export default class App extends Component {
    
    gotService = new gotService();


    state = {
        showRandomChar: true,
        error: false,
        selectedChar: 130
    }

    componentDidCatch(){
        
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }


    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render(){
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;


        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 6, offset: 3}}>
                            {char}
                            <ToggleRandomChar
                            onClick={this.toggleRandomChar}>Toggle Random Char</ToggleRandomChar>
                        </Col>
                    </Row>
                   <CharacterPage/>

                   <Row>
                        <Col md='6'>
                            <ItemList 
                                    onCharSelected={this.onCharSelected}
                                    getData={this.gotService.getAllBooks}
                                    renderItem={(item) => `${item.name}`}
                            />
                        </Col>
                         <Col md='6'>
                             <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>

                    <Row>
                        <Col md='6'>
                            <ItemList 
                                    onCharSelected={this.onCharSelected}
                                    getData={this.gotService.getAllHouses}
                                    renderItem={(item) => `${item.name}`}
                                    />
                        </Col>
                         <Col md='6'>
                             <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>  
                </Container>
            </>
        );
    }
};