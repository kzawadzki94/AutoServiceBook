import React, { Component } from 'react';
import { Button, Table, Glyphicon, Well } from 'react-bootstrap';
import { VehicleDetails } from '../components/';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import VehiclesService from '../utils/vehicles/VehiclesService';

export class VehiclesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.vehiclesService = new VehiclesService(this.auth);

        this.state = {
            vehicles: [],
            isLoading: true,
            selectedVehicle: null,
            showDetails: false
        }
    }

    componentDidMount() {
        this.fetchVehicles();
    }

    render() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }

        const vehiclesList = this.state.vehicles.map((v, i) =>
            <tr key={i}>
                <td>{v.licencePlate}</td>
                <td>{v.make}</td>
                <td>{v.model}</td>
                <td>{v.year}</td>
                <td><Button bsStyle="info" bsSize="xsmall" onClick={this.handleButtonClick} value={v.vehicleId}>Details</Button></td>
                <td><Button bsStyle="warning" bsSize="xsmall" onClick={this.handleButtonClick} value={v.vehicleId}>Edit</Button></td>
                <td><Button bsStyle="danger" bsSize="xsmall" onClick={this.handleButtonClick} value={v.vehicleId}>Delete</Button></td>
            </tr>
        );

        return (
            <div>
                <h2>Vehicles</h2>

                <Well>
                    <Button bsStyle="primary"><Glyphicon glyph="plus" /> Add new vehicle</Button>
                </Well>

                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Licence plate</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {vehiclesList}
                    </tbody>
                </Table>

                <br />
                <VehicleDetails show={this.state.showDetails} vehicle={this.state.selectedVehicle} />
            </div>
        );
    }

    fetchVehicles = () => {
        this.vehiclesService.getVehicles()
            .then(response => {
                this.setState({
                    vehicles: response,
                    isLoading: false
                });
            });
    }

    handleButtonClick = (e) => {
        let selectedVehicleId = e.target.value;
        let selectedAction = e.target.innerHTML;

        let selectedVehicle = this.state.vehicles.find(v => v.vehicleId == selectedVehicleId);

        if (selectedAction === "Details") {
            this.setState({
                showDetails: true,
                selectedVehicle: selectedVehicle
            });
        } else if (selectedAction === "Edit") {
            this.setState({
                showDetails: false,
                selectedVehicle: selectedVehicle
            });
        } else if (selectedAction === "Delete") {
            this.setState({
                showDetails: false,
                selectedVehicle: selectedVehicle
            });
        }
    }
}