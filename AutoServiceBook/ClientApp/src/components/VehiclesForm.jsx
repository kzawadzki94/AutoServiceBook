import React, { Component } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Glyphicon, Well, PanelGroup, Panel } from 'react-bootstrap';
import { SelectInput } from '../components';

export class VehiclesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: this.getEmptyVehicleState()
        }
    }

    // type: this.formatVehicleType(vehicle.type), //select box

    // licencePlate: vehicle.licencePlate, // text input
    // make: vehicle.make, // text input
    // model: vehicle.model, // text input
    // year: vehicle.year, // // text input - numeric only

    // fuelType: this.formatFuelType(vehicle.fuelType), //select box

    // vin: this.formatEmptyOrNull(vehicle.vin), // text input
    // engineDisplacement: this.formatEmptyOrNull(vehicle.engineDisplacement) + " cm3", // text input - numeric only
    // engineHorsepower: this.formatEmptyOrNull(vehicle.engineHorsepower) + " HP", // text input - numeric only
    // mileage: this.formatEmptyOrNull(vehicle.mileage) + " km", // text input - numeric only
    // registerDate: this.formatDate(vehicle.registerDate) + " (" + this.formatRelativeDate(vehicle.registerDate) + ")", //date input
    // insuranceExpireDate: this.formatDate(vehicle.insuranceExpireDate) + " (" + this.formatRelativeDate(vehicle.insuranceExpireDate) + ")", //date input
    // nextServiceDate: this.formatDate(vehicle.nextServiceDate) + " (" + this.formatRelativeDate(vehicle.nextServiceDate) + ")", //date input
    // insuranceNumber: this.formatEmptyOrNull(vehicle.insuranceNumber) // text input

    componentDidUpdate(prevProps) {
        if (this.props.vehicle && this.props != prevProps) {
            this.setState({
                vehicle: this.props.vehicle
            });
        } else if (!this.props.show && this.props !== prevProps) {
            this.setState({
                vehicle: this.getEmptyVehicleState()
            });
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }

        let typeOptions = [
            { key: "Car", value: 0 },
            { key: "Truck", value: 1 },
            { key: "Motorcycle", value: 2 },
            { key: "Other", value: 3 }
        ];

        let fuelOptions = [
            { key: "Petrol", value: 0 },
            { key: "LPG", value: 1 },
            { key: "CNG", value: 2 },
            { key: "Diesel", value: 3 },
            { key: "Hybrid", value: 4 },
            { key: "Electric", value: 5 },
            { key: "Hydrogen", value: 6 }
        ];

        return (
            <React.Fragment>
                <form>
                    <SelectInput controlId="type" label="Vehicle Type" options={typeOptions} onChange={this.handleChange} selected={this.state.vehicle.type}></SelectInput>
                    <SelectInput controlId="fuelType" label="Fuel Type" options={fuelOptions} onChange={this.handleChange} selected={this.state.vehicle.fuelType}></SelectInput>
                </form>
                {this.props.children}
            </React.Fragment>
        )
    }

    handleChange = (e) => {
        let v = { ...this.state.vehicle };
        v[[e.target.id]] = e.target.value;

        this.setState({
            vehicle: v
        });
    }

    getEmptyVehicleState = () => {
        return {
            type: "0",
            fuelType: "0"
        }
    }
}