import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon, Well, PanelGroup, Panel } from 'react-bootstrap';
import { VehicleDetails, VehiclesForm } from '../components/';
import AuthenticationService from '../utils/authentication/AuthenticationService';
import VehiclesService from '../utils/vehicles/VehiclesService';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toastr from 'toastr';
import 'toastr/build/toastr.css'

export class VehiclesPage extends Component {
    constructor() {
        super();

        this.auth = new AuthenticationService();
        this.vehiclesService = new VehiclesService(this.auth);

        this.state = {
            vehicles: [],
            isLoading: true,
            selectedVehicle: null,
            showForm: false
        }
    }

    componentDidMount() {
        this.fetchVehicles();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isLoading !== this.state.isLoading) {
            this.fetchVehicles();
        }
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
                    <AddButton showForm={this.state.showForm} onClick={this.handleButtonClick}></AddButton>
                    <VehiclesForm show={this.state.showForm} vehicle={this.state.selectedVehicle} onSubmit={this.handleSubmit}>
                        <Button bsStyle="warning" onClick={this.handleButtonClick}>Cancel</Button>
                    </VehiclesForm>
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
                    onClick: () => {
                        this.vehiclesService.deleteVehicle(vehicle.vehicleId).then(() => {
                            this.setState({
                                showForm: false,
                                selectedVehicle: null
                            });
                            toastr.success("Vehicle deleted!");
                        })
                    }
                },
                {
                    label: 'No',
                }
            ],
            willUnmount: () => {
                this.setState({
                    isLoading: true,
                    selectedVehicle: null
                });
            }
        });
    }

    handleButtonClick = (e) => {
        let selectedVehicleId = e.target.value;
        let selectedAction = e.target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim();

        let selectedVehicle = this.state.vehicles.find(v => v.vehicleId === parseInt(selectedVehicleId));

        this.setState({
            selectedVehicle,
        });

        switch (selectedAction) {
            case "Edit":
                this.setState({
                    showForm: true,
                });
                window.scrollTo(0, 0);
                break;
            case "Delete":
                this.deleteVehicle(selectedVehicle);
                break;
            case "Add":
                this.setState({
                    showForm: true,
                    selectedVehicle: null
                });
                break;
            case "Cancel":
                this.setState({
                    showForm: false,
                    selectedVehicle: null
                });
        }
    }

    handleSubmit = () => {
        this.setState({
            isLoading: true,
            showForm: false,
        });
    }
}

function AddButton(props) {
    if (!props.showForm) {
        return (<Button bsStyle="primary" onClick={props.onClick}><Glyphicon glyph="plus" /> Add</Button>);
    } else {
        return null;
    }
}