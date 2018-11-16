import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon, Well, PanelGroup, Panel } from 'react-bootstrap';
import { VehicleDetails } from '../components/';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import VehiclesService from '../utils/vehicles/VehiclesService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export class VehiclesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.vehiclesService = new VehiclesService(this.auth);

        this.state = {
            vehicles: [],
            isLoading: true,
            selectedVehicle: null,
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
            <Panel eventKey={i} key={i}>
                <Panel.Heading>
                    <Panel.Title toggle>{v.make} {v.model} {v.licencePlate}</Panel.Title>
                </Panel.Heading>
                <Panel.Body collapsible>
                    <VehicleDetails vehicle={v} />
                </Panel.Body>
                <Panel.Footer>
                    <ButtonToolbar>
                        <ButtonGroup>
                            <Button bsStyle="warning" bsSize="xsmall" onClick={this.handleButtonClick} value={v.vehicleId}>Edit</Button>
                            <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleButtonClick} value={v.vehicleId}>Delete</Button>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Panel.Footer>
            </Panel>
        );

        return (
            <div>
                <h2>Vehicles</h2>

                <Well>
                    <Button bsStyle="primary"><Glyphicon glyph="plus" /> Add new vehicle</Button>
                </Well>

                <PanelGroup accordion id="vehicles-panel">
                    {vehiclesList}
                </PanelGroup>
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

    deleteVehicle = (vehicle) => {
        confirmAlert({
            title: 'Confirm vehicle delete',
            message: 'Are you sure to delete ' + vehicle.make + ' ' + vehicle.model + '?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.vehiclesService.deleteVehicle(vehicle.vehicleId)
                },
                {
                    label: 'No',
                }
            ],
            willUnmount: () => {
                this.fetchVehicles();
                this.forceUpdate();
            }
        });
    }

    handleButtonClick = (e) => {
        let selectedVehicleId = e.target.value;
        let selectedAction = e.target.innerHTML;

        let selectedVehicle = this.state.vehicles.find(v => v.vehicleId === parseInt(selectedVehicleId));

        this.setState({
            selectedVehicle: selectedVehicle
        });

        if (selectedAction === "Edit") {

        } else if (selectedAction === "Delete") {
            this.deleteVehicle(selectedVehicle);
        }
    }
}