import React, {Component} from 'react';

import './CryptoList.css';

class CryptoList extends Component {

    render() {
        let cryptoRate = this.props.filteredCryptoList;

        let currencies = cryptoRate.map(crypto => {
            let arrow = "";

            if (crypto.class === "green") {
                arrow = String.fromCharCode(8593) // &uarr;

            } else if (crypto.class === "red") {
                arrow = String.fromCharCode(8595); // &darr;
            } else {
                arrow = String.fromCharCode(8596); // &harr;
            }

            return (<li key = {crypto.currency} className = "CryptoListLi" >
                <span className = "CryptoLabel" > Last rate: </span> 
                <span className = {crypto.class + " CryptoSymbol"} > {crypto.lastRate} {arrow} </span>  
                <span className = "CryptoCurrency" > {crypto.currency} </span> 
                <span className = "CurrencySymbol" > [{crypto.symbol}] </span>
                 </li >

            );
        });

        return ( <div className = "CryptoList" >
            <ul className = "CryptoListUl" > {currencies} </ul>
             </div >
        );
    }
}

export default CryptoList;