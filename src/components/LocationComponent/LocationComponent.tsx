import {useEffect} from 'react';
import { getLocation, reverseGeocode } from '../../utils/getGeoLocation';

const LocationComponent = () => {

    const handleGetLocation = async () => {
        try {
            const position = await getLocation();
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const location = await reverseGeocode(lat, lon);
            localStorage.setItem("location", JSON.stringify({
                country: location.country,
                city: location.city
            }))
        } catch (err) {
            console.log(err)
        }
    };

    useEffect(()=> {
        handleGetLocation()
    },[])

    return (
        <div/>
    );
};

export default LocationComponent;