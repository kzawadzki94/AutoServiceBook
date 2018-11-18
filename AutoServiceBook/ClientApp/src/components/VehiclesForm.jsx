import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { SelectInput, TextInput, NumericInput, DateInput } from '../components';

export class VehiclesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vehicle: this.getEmptyVehicleState(),
            buttonText: "Add"
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.vehicle && this.props != prevProps) {
            this.setState({
                vehicle: this.props.vehicle,
                buttonText: "Update"
            });
        } else if (!this.props.show && this.props !== prevProps) {
            this.setState({
                vehicle: this.getEmptyVehicleState(),
                buttonText: "Add"
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
                <h2>{this.state.buttonText} vehicle</h2>
                <form>
                    <SelectInput controlId="type" label="Vehicle Type" options={typeOptions} onChange={this.handleChange} selected={this.state.vehicle.type}></SelectInput>
                    <TextInput controlId="make" label="Make" onChange={this.handleChange} value={this.state.vehicle.make} required minLength="1"></TextInput>
                    <TextInput controlId="model" label="Model" onChange={this.handleChange} value={this.state.vehicle.model} required minLength="1"></TextInput>
                    <NumericInput controlId="year" label="Year" onChange={this.handleChange} value={this.state.vehicle.year} required minLength="3"></NumericInput>
                    <TextInput controlId="licencePlate" label="Licence Plate" onChange={this.handleChange} value={this.state.vehicle.licencePlate} required minLength="1"></TextInput>
                    <NumericInput controlId="mileage" label="Odometer - kilometers" onChange={this.handleChange} value={this.state.vehicle.mileage}></NumericInput>
                    <NumericInput controlId="engineDisplacement" label="Engine displacement" onChange={this.handleChange} value={this.state.vehicle.engineDisplacement}></NumericInput>
                    <NumericInput controlId="engineHorsepower" label="Engine horsepower" onChange={this.handleChange} value={this.state.vehicle.engineHorsepower}></NumericInput>
                    <SelectInput controlId="fuelType" label="Fuel Type" options={fuelOptions} onChange={this.handleChange} selected={this.state.vehicle.fuelType}></SelectInput>
                    <TextInput controlId="vin" label="VIN number" onChange={this.handleChange} value={this.state.vehicle.vin}></TextInput>
                    <DateInput controlId="registerDate" label="Register date" onChange={this.handleChange} value={this.state.vehicle.registerDate}></DateInput>
                    <DateInput controlId="nextServiceDate" label="Next service date" onChange={this.handleChange} value={this.state.vehicle.nextServiceDate}></DateInput>
                    <TextInput controlId="insuranceNumber" label="Insurance number" onChange={this.handleChange} value={this.state.vehicle.insuranceNumber}></TextInput>
                    <DateInput controlId="insuranceExpireDate" label="Insurance expire date" onChange={this.handleChange} value={this.state.vehicle.insuranceExpireDate}></DateInput>
                </form>
                <Button type="submit" bsStyle="primary">{this.state.buttonText}</Button>
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
            type: "",
            licencePlate: "",
            make: "",
            model: "",
            year: "",
            fuelType: "0",
            vin: "",
            engineDisplacement: "",
            engineHorsepower: "",
            mileage: "",
            registerDate: "",
            insuranceExpireDate: "",
            nextServiceDate: "",
            insuranceNumber: ""
        }
    }
}