import React, { Component } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';

export class VehicleDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: this.props.show
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    }

    handleShow = () => {
        this.setState({ show: true });
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousState.show != this.props.show) {
            this.setState({
                show: this.props.show
            })
        }
    }

    render() {
        if (!this.state.show) {
            return null;
        }

        const vehicleType = (type) => {
            if (type === 0) {
                return "Car";
            } else if (type === 1) {
                return "Truck";
            } else if (type === 2) {
                return "Motorcycle";
            } else if (type === 3) {
                return "Other";
            } else {
                return "N/A";
            }
        };

        const fuelType = (type) => {
            if (type === 0) {
                return "Petrol";
            } else if (type === 1) {
                return "LPG";
            } else if (type === 2) {
                return "CNG";
            } else if (type === 3) {
                return "Diesel";
            } else if (type === 4) {
                return "Hybrid";
            } else if (type === 5) {
                return "Electric";
            } else if (type === 6) {
                return "Hydrogen";
            } else {
                return "N/A";
            }
        };

        return (
            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.vehicle.make} {this.props.vehicle.model}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table responsive striped bordered hover>
                        <tbody>
                            <tr>
                                <th>Vehicle Type</th>
                                <td>{vehicleType(this.props.vehicle.type)}</td>
                            </tr>
                            <tr>
                                <th>Make</th>
                                <td>{this.props.vehicle.make}</td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td>{this.props.vehicle.model}</td>
                            </tr>
                            <tr>
                                <th>Year</th>
                                <td>{this.props.vehicle.year}</td>
                            </tr>
                            <tr>
                                <th>Licence Plate</th>
                                <td>{this.props.vehicle.licencePlate}</td>
                            </tr>
                            <tr>
                                <th>Odometer - kilometers</th>
                                <td>{this.props.vehicle.mileage} km</td>
                            </tr>
                            <tr>
                                <th>Engine Displacement</th>
                                <td>{this.props.vehicle.engineDisplacement} cm3</td>
                            </tr>
                            <tr>
                                <th>Fuel Type</th>
                                <td>{fuelType(this.props.vehicle.fuelType)}</td>
                            </tr>
                            <tr>
                                <th>VIN</th>
                                <td>{this.props.vehicle.vin}</td>
                            </tr>
                            <tr>
                                <th>Register date</th>
                                <td>{this.props.vehicle.registerDate}</td>
                            </tr>
                            <tr>
                                <th>Next service date</th>
                                <td>{this.props.vehicle.nextServiceDate}</td>
                            </tr>
                            <tr>
                                <th>Insurance number</th>
                                <td>{this.props.vehicle.insuranceNumber}</td>
                            </tr>
                            <tr>
                                <th>Insurance expire date</th>
                                <td>{this.props.vehicle.insuranceExpireDate}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}