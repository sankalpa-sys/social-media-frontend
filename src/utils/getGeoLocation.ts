import axios from 'axios';

export interface Location {
    city: string;
    country: string;
}

export interface LocationError {
    code: number;
    message: string;
}

const API_KEY = import.meta.env.VITE_LOCATION_API_KEY;

export const getLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
            reject({
                code: 0,
                message: 'Geolocation is not supported by this browser.',
            });
        }
    });
};

export const reverseGeocode = async (lat: number, lon: number): Promise<Location> => {
    const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`;

    const response = await axios.get(apiUrl);
    if (response.data.results.length > 0) {
        const locationData = response.data.results[0].components;
        const city = locationData.city || locationData.town || locationData.village;
        const country = locationData.country;
        return { city, country };
    } else {
        throw new Error('Location not found.');
    }
};