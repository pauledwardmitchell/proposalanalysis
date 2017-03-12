const { number, string } = React.PropTypes


const AnalysisChart = React.createClass({

  // propTypes: {
  //   washers: number.isRequired,
  //   lgWashers: number.isRequired,
  //   lgDryers: number.isRequired,
  //   smDryers: number.isRequired,
  //   incomePerDoor: number.isRequired,
  //   bonus: number.isRequired,
  //   redec: number.isRequired,
  //   numApartments: number.isRequired,
  //   leaseYears: number.isRequired,
  //   percentToLocation: number.isRequired
  // },

  getInitialState: function() {
  	return {
  	  washers: 12,
  	  lgWashers: 0,
  	  lgDryers: 4,
  	  smDryers: 3,
      machFactor: 23, //split into 4 types
      incomePerDoor: 17.59,
      bonus: 1500,
      redec: 995,
      numApartments: 90,
      leaseYears: 7,
      percentToLocation: 51
  		
  	}
  },

  handleWashersChange: function(event) {
    this.setState({ washers: event.target.value})
  },

  handleLgWashersChange: function(event) {
    this.setState({ lgWashers: event.target.value})
  },

  handleLgDryersChange: function(event) {
    this.setState({ lgDryers: event.target.value})
  },

  handleSmDryersChange: function(event) {
    this.setState({ smDryers: event.target.value})
  },

  handleIncomePerDoorChange: function(event) {
    this.setState({ incomePerDoor: event.target.value})
  },

  handleBonusChange: function(event) {
    this.setState({ bonus: event.target.value})
  },

  handleRedecChange: function(event) {
    this.setState({ redec: event.target.value })
  },

  handleNumApartmentsChange: function(event) {
    this.setState({ numApartments: event.target.value})
  },

  handleLeaseYearsChange: function(event) {
    this.setState({ leaseYears: event.target.value })
  },

  handlePercentToLocationChange: function(event) {
    this.setState({ percentToLocation: event.target.value })
  },

  machFactor: function() {
    return parseInt(this.state.washers) + parseInt(this.state.lgWashers) + parseInt((this.state.lgDryers * 2)) + parseInt(this.state.smDryers) //why lgDryers *2? 
  },

  percentToWashco: function() {
    return 100 - this.state.percentToLocation
  },

  percentToWashcoToDec: function() {
  	return this.percentToWashco() * .01
  },

  totalBonus: function() {
    return this.state.bonus + this.state.redec
  },

  bonusMonthlyAmort: function() {
    return this.state.bonus / this.leaseMonths()
  },

  redecMonthlyAmort: function() {
    return this.state.redec / this.leaseMonths() 
  },

  grossMMUA: function() {
    return this.state.incomePerDoor * this.state.numApartments / this.machFactor() 
  },

  monthlyGrossCollections: function() {
    return this.state.incomePerDoor * this.state.numApartments
  },

  monthlyRentToLocation: function() {
    return this.monthlyGrossCollections() * this.state.percentToLocation / 100
  },

  netMMUA: function() {
    return (this.grossMMUA() * this.percentToWashcoToDec()) - (this.bonusMonthlyAmort() / this.machFactor())
  },

  netIncomePercentage: function() {
    return this.monthlyNetIncomeForLocation() / this.monthlyGrossCollections() * 100
  },

  netIncomePercentageToDec: function() {
    return this.monthlyNetIncomeForLocation() / this.monthlyGrossCollections()
  },

  breakEvenMonths: function() {
    return this.totalUpFrontCost() / this.monthlyNetIncomeForLocation() 
    // this is different than spreadsheet... 
    // spreadsheet has doors * money/door * % in demoninator
  },

  // costOfServiceCollectionsAdmin: function() {
  //   return this.machFactor() * this.leaseMonths() * 12 //why times 12? Months already factored in?
  // },

  leaseMonths: function() {
    return this.state.leaseYears * 12
  },

  contingency: function() {
    return ((this.totalEquipmentCost() + this.totalBonus()) / 2) * .0042 // how is this calculated?
  },

  interest: function() {
    return .0133 / 2 // how is this calculated?
  },

  interestOnLeaseBonus: function() {
    return this.state.bonus * this.interest() 
  },

  interestOnRedec: function() {
    return this.state.redec / 2 * .0133
  },

  totalMonthlyCommissionExpense: function() {
    return this.monthlyRentToLocation() + this.bonusMonthlyAmort() + this.interestOnLeaseBonus()
  },

  monthlyIncomeAfterCommission: function() {
    return this.monthlyGrossCollections() - this.totalMonthlyCommissionExpense()
  },

  monthlyServiceCollectionsAdminCost: function() {
    return this.machFactor() * 10.02 //why this number?
  },

  redecMonthlyDepreciation: function() {
    return this.state.redec / this.leaseMonths()
  },

  totalWashersCost: function() {
    return this.state.washers * 823.65
  },

  totalLgWashersCost: function() {
    return this.state.lgWashers * 1278.40
  },

  totalLgDryersCost: function() {
    return this.state.lgDryers * 1540.10
  },

  totalSmDryersCost: function() {
    return this.state.smDryers * 709.75
  },

  totalEquipmentCost: function() {
    return this.totalWashersCost() + this.totalLgWashersCost() + this.totalLgDryersCost() + this.totalSmDryersCost()
  },

  totalUpFrontCost: function() {
    return this.totalEquipmentCost() + this.totalBonus()
  },
  
  totalMonthlyWasherDepreciation: function() {
    return this.totalWashersCost() / this.leaseMonths() // A machine's life is 7 years?
  },

  totalMonthlyLargeWasherDepreciation: function() {
    return this.totalLgWashersCost() / this.leaseMonths()
  },

  totalMonthlyLargeDryerDepreciation: function() {
    return this.totalLgDryersCost() / this.leaseMonths()
  },

  totalMonthlySmallDryerDepreciation: function() {
    return this.totalSmDryersCost() / this.leaseMonths()
  },

  totalMonthlyMachineDepreciation: function() {
    return this.totalMonthlyWasherDepreciation() + this.totalMonthlyLargeWasherDepreciation() + this.totalMonthlyLargeDryerDepreciation() + this.totalMonthlySmallDryerDepreciation()
  },

  totalMonthlyDepreciation: function() {
    return this.totalMonthlyMachineDepreciation() + this.redecMonthlyDepreciation()
  },

  totalOtherMonthlyCosts: function() {
    return this.monthlyServiceCollectionsAdminCost() + this.totalMonthlyDepreciation() + this.interestOnRedec() + this.contingency()
  },

  monthlyNetIncomeForLocation: function() {
    return this.monthlyIncomeAfterCommission() - this.totalOtherMonthlyCosts()
  },

  grossOverContract: function() {
    return this.state.incomePerDoor * this.state.numApartments * this.leaseMonths()
  },

  rentOverContract: function() {
    return this.grossOverContract() * this.state.percentToLocation / 100
  },

  totalPaidOutToCustomerOverContract: function() {
    return this.rentOverContract() + this.totalBonus()
  },

  netRevenueOverContract: function() {
    return this.grossOverContract() - this.rentOverContract()
  },

  netRevenueOverContractMinusAllCosts: function() {
    return this.netRevenueOverContract() - this.totalEquipmentCost() - this.totalBonus()
  },

  render: function() {
  	return (

  	<div>
      <h1>Proposal Analysis</h1>

      <div>
        <h3>Lease Details</h3>
        <table className='table'>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Equipment Details</strong></td>
            </tr>
            <tr>
              <td><label>Washers</label></td>
              <td><input onChange={this.handleWashersChange} value={this.state.washers} /></td>
              <td><label>LgWashers</label></td>
              <td><input onChange={this.handleLgWashersChange} value={this.state.lgWashers} /></td>
            </tr>
            <tr>
	          <td><label>LgDryers</label></td>
	          <td><input onChange={this.handleLgDryersChange} value={this.state.lgDryers} /></td>
	          <td><label>SmDryers</label></td>
	          <td><input onChange={this.handleSmDryersChange} value={this.state.smDryers} /></td>
            </tr>
            <tr>
              <td><strong>Lease Variables</strong></td>
            </tr>
            <tr>
	          <td><label>Lease Years</label></td>
	          <td><input onChange={this.handleLeaseYearsChange} value={this.state.leaseYears} /></td>

	          <td><label>% to Location</label></td>
	          <td><input onChange={this.handlePercentToLocationChange} value={this.state.percentToLocation} /></td>
            </tr>
            <tr>
	          <td><label>Bonus</label></td>
	          <td><input onChange={this.handleBonusChange} value={this.state.bonus} /></td>

	          <td><label>Redec</label></td>
	          <td><input onChange={this.handleRedecChange} value={this.state.redec} /></td>
            </tr>
            <tr>
              <td><strong>Location Details</strong></td>
            </tr>
            <tr>
	          <td><label>Income / Door</label></td>
	          <td><input onChange={this.handleIncomePerDoorChange} value={this.state.incomePerDoor} /></td>
	  
	          <td><label>Number of Apartments</label></td>
	          <td><input onChange={this.handleNumApartmentsChange} value={this.state.numApartments} /></td>
              
            </tr>
          </tbody>
        </table>
      </div>
      
      <div>
  
  
      </div>

      <div>
        //<h2>machFactor: {this.machFactor()}</h2>
        <h2>grossMMUA: ${this.grossMMUA()}</h2>
        <h2>netMMUA: ${this.netMMUA()}</h2>
        <h3>percentToWashco: {this.percentToWashco()} %</h3>
        <h2>netIncomePercentage: {this.netIncomePercentage()}%</h2>
        <h2>breakEvenMonths: { this.breakEvenMonths() }</h2>

        <h4>grossOverContract: {this.grossOverContract() } </h4>
        <h4>rentOverContract: {this.rentOverContract() } </h4>
        <h4>Rent + Bonus: { this.totalPaidOutToCustomerOverContract() } </h4>
        <h4>revenueOverContract: {this.netRevenueOverContract() } </h4>
        <h4>Revenue - All Costs: {this.netRevenueOverContractMinusAllCosts() }</h4>


        <h1>- - - - - - - </h1>
        <h2>monthlyGrossCollections: {this.monthlyGrossCollections()}</h2>
        <h2>MONTHLY COMMISSION EXPENSE:</h2>
        <h3>monthlyRentToLocation: { this.monthlyRentToLocation() }</h3>
        <h3>bonusMonthlyAmort: { this.bonusMonthlyAmort() }</h3>
        <h3>interestOnLeaseBonus: { this.interestOnLeaseBonus() }</h3>
        <h3>totalMonthlyCommissionExpense: { this.totalMonthlyCommissionExpense() } </h3>
        <h3>monthlyIncomeAfterCommission: { this.monthlyIncomeAfterCommission() }  </h3>
        <h1>- - - - - - - </h1>
        <h2>OTHER MONTHLY EXPENSES:</h2>
        <h3>monthlyServiceCollectionsAdminCost: { this.monthlyServiceCollectionsAdminCost() }</h3>
        <h3>totalMonthlyDepreciation: { this.totalMonthlyDepreciation() }</h3>
        <h3>interestOnRedec (Interest of Avg Investment?): { this.interestOnRedec() } </h3>
        <h3>contingency: {this.contingency()} </h3>
        <h2>totalOtherMonthlyCosts: { this.totalOtherMonthlyCosts() }</h2>
        <h2>monthlyNetIncomeForLocation: { this.monthlyNetIncomeForLocation() }</h2>

      </div>

    </div>
  	)
  }

})