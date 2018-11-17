import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import VehicleFormatter from '../utils/vehicles/VehicleFormatter';

export class VehicleDetails extends Component {
    constructor(props) {
        super(props);
        this.vehicleFormatter = new VehicleFormatter();

        this.state = {
            vehicle: null,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: false,
            vehicle: this.vehicleFormatter.getFormattedVehicle(this.props.vehicle)
        });
    }

    render() {
        if (this.state.isLoading) {
            return (<p>Loading...</p>);
        }

        return (
            <React.Fragment>
                <Row>
                    <Col sm={6}><b>Vehicle Type</b></Col>
                    <Col sm={6}>{this.state.vehicle.type}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Make</b></Col>
                    <Col sm={6}>{this.state.vehicle.make}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Model</b></Col>
                    <Col sm={6}>{this.state.vehicle.model}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Year</b></Col>
                    <Col sm={6}>{this.state.vehicle.year}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Licence Plate</b></Col>
                    <Col sm={6}>{this.state.vehicle.licencePlate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Odometer - kilometers</b></Col>
                    <Col sm={6}>{this.state.vehicle.mileage}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Engine Displacement</b></Col>
                    <Col sm={6}>{this.state.vehicle.engineDisplacement}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Fuel Type</b></Col>
                    <Col sm={6}>{this.state.vehicle.fuelType}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>VIN</b></Col>
                    <Col sm={6}>{this.state.vehicle.vin}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Register date</b></Col>
                    <Col sm={6}>{this.state.vehicle.registerDate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Next service date</b></Col>
                    <Col sm={6}>{this.state.vehicle.nextServiceDate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Insurance number</b></Col>
                    <Col sm={6}>{this.state.vehicle.insuranceNumber}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Insurance expire date</b></Col>
                    <Col sm={6}>{this.state.vehicle.insuranceExpireDate}</Col>
                </Row>
            </React.Fragment>
        );
    }
}