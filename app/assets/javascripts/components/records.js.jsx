var Records = React.createClass({

  getInitialState: function() {
    return { records: this.props.data };
  },

  getDefaultProps: function() {
    return { records: [] };
  },

  addRecord: function(record) {
    var records = this.state.records
    records.push(record)
    this.setState({ records: records })
  },

  deleteRecord: function(record) {
    var index = this.state.records.indexOf(record);
    var records = this.state.records;
    records.splice(index, 1)
    this.replaceState({ records: records});
  },

  credits: function() {
    var credits = this.state.records.filter(function(val) {
      return val.amount >= 0
    });
    return credits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0)
  },

  debits: function() {
    var debits = this.state.records.filter(function(val) {
      return val.amount < 0
    });
    return debits.reduce(function(prev, curr) {
      return prev + parseFloat(curr.amount);
    }, 0)
  },

  balance: function() {
    return this.debits() + this.credits();
  },

  render: function() {
    return(
      <div className='records'>
        <h2 className='title'>
          Records
        </h2>
        <div className='row'>
          <AmountBox type='success' amount={this.credits()} text='Credits' />
          <AmountBox type='danger' amount={this.debits()} text='Debits' />
          <AmountBox type='info' amount={this.balance()} text='Balance' />
        </div>
        <RecordForm handleNewRecord={this.addRecord}/>
        <table className='table'> 
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Account</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.records.map(function(record) {
              return <Record key={record.id} record={record} handleDeleteRecord={this.deleteRecord} handleEditRecord={this.editRecord} />
             }.bind(this))}
          </tbody>
        </table>
      </div>
    )
  }
  });