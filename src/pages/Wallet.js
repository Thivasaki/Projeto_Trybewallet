import React from 'react';
import WalletForms from '../components/WalletForm';
import Table from '../components/Table';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <WalletForms />
        <Table />
      </div>
    );
  }
}

export default Wallet;
