import React from 'react';
import WalletForms from '../components/WalletForm';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForms />
      </div>
    );
  }
}

export default Wallet;
