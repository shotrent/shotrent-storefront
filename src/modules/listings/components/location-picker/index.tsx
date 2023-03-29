import { Listing } from "@lib/models/listing"
import Input from "@modules/common/components/input"
import { SetStateAction, useEffect, useState } from "react"
import { useFormContext, UseFormRegister } from "react-hook-form"
import MapPicker from 'react-google-map-picker'
import useToggleState from "@lib/hooks/use-toggle-state"
import Button from "@modules/common/components/button"
import Modal from "@modules/common/components/modal"
import Spinner from "@modules/common/icons/spinner"
import { medusaClient } from "@lib/config"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons"
const DefaultLocation = { lat: 19.218330, lng: 72.978088 };
const DefaultZoom = 17;

export type AddressDetails = {
    address_line1: string | null;
    address_line2: string | null;
    city: string | null;
    country_code: string | null;
    province: string | null;
    postal_code: string | null;
}

type LocationPickerProps = {
    register: UseFormRegister<Listing>,
    name:string,
    sendAddress:(arg:AddressDetails)=>void;
}

export default ({ register, name, sendAddress }: LocationPickerProps) => {
    const googleApiKey = `AIzaSyATi0RPmcLGDwdNVyXMD0wQjeCUR5YGBnI`;
    const methods = useFormContext<Listing>();

    const { state, open, close } = useToggleState(false)
    const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
    const [zoom, setZoom] = useState(DefaultZoom);
    const [address, setAddress] =useState<AddressDetails|null>(null)
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);

    function changeLocation(lat: any, lng: any) {       
        methods.setValue(name as any, { lat: lat, lng: lng });
        setDefaultLocation({lat, lng});        
    }

    function handleChangeLocation(lat: any, lng: any) {       
        methods.setValue(name as any, { lat: lat, lng: lng });
        setDefaultLocation({lat, lng});  
        getAddress(lat, lng, true);      
    }

    function handleChangeZoom(newZoom: SetStateAction<number>) {
        setZoom(newZoom);
    }

    const [showMap, setShowMap] = useState(false);

    //open map with some timeout to handle package issue
    const openMapTimeout = () => setTimeout(()=> setShowMap(true),1000);

    //sets current postition based on location service and open map with timeout
    const setCurrentPosition = () => {
        navigator.geolocation.getCurrentPosition((position)=>{
            changeLocation(position.coords.latitude, position.coords.longitude);
            getAddress(position.coords.latitude, position.coords.longitude, true);
            openMapTimeout();
            
        }, err=> {
            if(err.code == 1){
                setIsLocationEnabled(false);
                changeLocation(defaultLocation.lat, defaultLocation.lng); 
                getAddress(defaultLocation.lat, defaultLocation.lng, true); 
                openMapTimeout();
            }
        })
    }

    // change location if default values are already set else set current location if permission is already granted else do nothing
    useEffect(()=>{
        const defaultValue = methods.getValues();
        if(defaultValue.location && defaultValue.location.lat && defaultValue.location.lng) {
            changeLocation(defaultValue.location.lat, defaultValue.location.lng);
            getAddress(defaultValue.location.lat, defaultValue.location.lng, false); 
        }        
        else {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    setCurrentPosition();
                }
                else {
                    /* do nothing */
                }
            });
        }
    }, [])

   

    //set current position using location service if default values is not set and open map with timeout
    const openMap = () => {
        open();       
        const defaultValue = methods.getValues();
        if(!defaultValue.location || !defaultValue.location.lat || !defaultValue.location.lng) {
            setCurrentPosition();
        }
        else {
            openMapTimeout();
        }
    }

    

    const getAddress = (lat:number, long:number, emitAddress:boolean) => {       
        medusaClient.client.request('POST', `/store/google/maps/geocode?lat=${lat}&long=${long}`)
        .then(data=>{
           if(emitAddress)sendAddress(data);
           setAddress(data);
        })
        .catch(err=>console.log(err));
    }
        

    return (<>
        <div className="flex border border-black justify-between cursor-pointer md:text-base text-xs" onClick={e=> openMap()}>
            <div className="p-2"><FontAwesomeIcon icon={faLocationCrosshairs} className='mr-2'/> {address?(<span>{address?.address_line2}, {address?.city}</span>):(<span className="">Please set your pickup location</span>)}</div>
            <div className="p-2 bg-black border-black border-r text-white">Change Location</div>
        </div>
        {isLocationEnabled?"":(<p className="text-red-800 text-xs md:text-base mb-2">Please enable location services for accurate pickup location.</p>)}

        <Modal isOpen={state} close={close} size='large'>
            <Modal.Title>Set your pickup address</Modal.Title>
            <Modal.Body>
                <div>
                    {showMap?(<MapPicker defaultLocation={defaultLocation}
                        zoom={zoom}
                        mapTypeId={"roadmap" as MapTypeId}
                        onChangeLocation={handleChangeLocation}
                        onChangeZoom={handleChangeZoom}
                        apiKey={googleApiKey} />)
                    :(<Spinner />)}
                    
                </div>
            </Modal.Body>            
        </Modal>
    </>)
}

declare enum MapTypeId {
    Roadmap = "roadmap",
    Satellite = "satellite",
    Hybrid = "hybrid",
    Terrain = "terrain"
}
