import moment from 'moment';

export default class VehicleFormatter {
    getFormattedVehicle(vehicle) {
        return {
            vehicleId: vehicle.vehicleId,
            ownerId: vehicle.ownerId,
            type: this.formatVehicleType(vehicle.type),
            licencePlate: vehicle.licencePlate,
            make: vehicle.make,
            model: vehicle.model,
            year: vehicle.year,
            fuelType: this.formatFuelType(vehicle.fuelType),
            vin: this.formatEmptyOrNull(vehicle.vin),
            engineDisplacement: this.formatEmptyOrNull(vehicle.engineDisplacement) + " cm3",
            engineHorsepower: this.formatEmptyOrNull(vehicle.engineHorsepower) + " HP",
            mileage: this.formatEmptyOrNull(vehicle.mileage) + " km",
            registerDate: this.formatDate(vehicle.registerDate),
            insuranceExpireDate: this.formatDate(vehicle.insuranceExpireDate),
            nextServiceDate: this.formatDate(vehicle.nextServiceDate),
            insuranceNumber: this.formatEmptyOrNull(vehicle.insuranceNumber)
        }
    }

    formatVehicleType(type) {
        switch (type) {
            case 0:
                return "Car";
            case 1:
                return "Truck";
            case 2:
                return "Motorcycle";
            case 3:
                return "Other";
            default:
                return "N/A";
        }
    }

    formatFuelType(type) {
        switch (type) {
            case 0:
                return "Petrol";
            case 1:
                return "LPG";
            case 2:
                return "CNG";
            case 3:
                return "Diesel";
            case 4:
                return "Hybrid";
            case 5:
                return "Electric";
            case 6:
                return "Hydrogen";
            default:
                return "N/A";
        }
    }

    formatEmptyOrNull(s) {
        if (s === undefined || s === null || s === "string" || s === "" || s === 0 || s === "0") {
            return "N/A";
        } else {
            return s;
        }
    }

    formatDate(d) {
        if (d === undefined || d === null || d === "" || d === "string") {
            return "N/A";
        }
        return moment(d).format("DD MMMM YYYY");
    }
}