import React, { Component } from 'react';
import CryptoList from './CryptoList';
import axios from 'axios';
import './Crypto.css';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: [],
            filteredCryptoList: []
        }

    }

    getCryptoData = () => {
        axios.get('https://blockchain.info/pl/ticker')
            .then(response => {
                const ticker = response.data;
                let lastCryptoList = this.state.cryptoList;
                let cryptoListArray = [];

                console.log('response.data', response.data);

                cryptoListArray = Object.keys(ticker).map( key => {
                    let cryptoObj = {};
                    cryptoObj.currency = key;
                    cryptoObj.symbol = ticker[key].symbol;
                    cryptoObj.buy = ticker[key].buy;
                    cryptoObj.sell = ticker[key].sell;
                    cryptoObj.lastRate = ticker[key].last;
                    
                    let lastObj = lastCryptoList.find( lastObj => cryptoObj.symbol === lastObj.symbol);

                    if (lastObj !== undefined) {
                        if ( cryptoObj.lastRate > lastObj.lastRate) {
                            cryptoObj.class = "green";
                        } else if ( cryptoObj.lastRate < lastObj.lastRate) {
                            cryptoObj.class = "red";
                        } else {
                            cryptoObj.class = "blue";
                        }
                    } else {
                        cryptoObj.class = "blue";
                    }

                    return cryptoObj;
                });

            

                this.setState( { 
                    cryptoList: cryptoListArray,
                });
         
                this.filterCryptoList();
        });
        
        axios.get('http://developer-lc.pl/')
        .then(res => {
            console.log(res.data);
            
        })
    }
    

    componentDidMount = () => {
        this.getCryptoData();
        this.timer = setInterval( () => this.getCryptoData(), 50000);    
    }

    filterCryptoList = () => { 

        this.inputFilter.value = this.inputFilter.value.trim()
        
        let filteredCryptoList = this.state.cryptoList;
        let filter = this.inputFilter.value.toUpperCase();

        filteredCryptoList = filteredCryptoList.filter( (curObj) => { 
            return (curObj.currency.search(filter) !== -1); 
        });

        this.setState( { 
            filteredCryptoList: filteredCryptoList
        });
    }

    render = () => {

        return (
            <div className="Crypto">
                <input ref={ (data) => { this.inputFilter = data; } } placeholder="Filter" onChange={this.filterCryptoList} id="filter" />
                <CryptoList filteredCryptoList={this.state.filteredCryptoList} />
            </div>
        );
    }
}

export default Crypto;

