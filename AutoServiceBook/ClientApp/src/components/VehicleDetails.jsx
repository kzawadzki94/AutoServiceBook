import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

export class VehicleDetails extends Component {
    render() {
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
            <React.Fragment>
                <Row>
                    <Col sm={6}><b>Vehicle Type</b></Col>
                    <Col sm={6}>{vehicleType(this.props.vehicle.type)}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Make</b></Col>
                    <Col sm={6}>{this.props.vehicle.make}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Model</b></Col>
                    <Col sm={6}>{this.props.vehicle.model}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Year</b></Col>
                    <Col sm={6}>{this.props.vehicle.year}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Licence Plate</b></Col>
                    <Col sm={6}>{this.props.vehicle.licencePlate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Odometer - kilometers</b></Col>
                    <Col sm={6}>{this.props.vehicle.mileage} km</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Engine Displacement</b></Col>
                    <Col sm={6}>{this.props.vehicle.engineDisplacement} cm3</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Fuel Type</b></Col>
                    <Col sm={6}>{fuelType(this.props.vehicle.fuelType)}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>VIN</b></Col>
                    <Col sm={6}>{this.props.vehicle.vin}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Register date</b></Col>
                    <Col sm={6}>{this.props.vehicle.registerDate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Next service date</b></Col>
                    <Col sm={6}>{this.props.vehicle.nextServiceDate}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Insurance number</b></Col>
                    <Col sm={6}>{this.props.vehicle.insuranceNumber}</Col>
                </Row>
                <Row>
                    <Col sm={6}><b>Insurance expire date</b></Col>
                    <Col sm={6}>{this.props.vehicle.insuranceExpireDate}</Col>
                </Row>
            </React.Fragment>
        );
    }
}