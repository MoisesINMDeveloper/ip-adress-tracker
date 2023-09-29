import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import IconArrow from "/icon-arrow.svg"
import axios from "axios";

export default function AddressTracker() {
    const [searchValue, setSearchValue] = useState("");
    const [ipAddress, setIpAddress] = useState("");
    const [locationInfo, setLocationInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mapObject, setMapObject] = useState(null);
    const [marker, setMarker] = useState(null); // Nuevo estado para guardar la referencia al marcador


    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);

                // Hacer la petición a la API utilizando tu apiKey y dirección IP
                const response = await axios.get(
                    `https://geo.ipify.org/api/v1?apiKey=at_GsdDW8nuvH5GrH8dbhJKSJsSZgVO7&ipAddress=${ipAddress}`
                );

                setLocationInfo(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [ipAddress]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://geo.ipify.org/api/v1?apiKey=at_GsdDW8nuvH5GrH8dbhJKSJsSZgVO7`
                );

                const { lat, lng } = response.data.location;

                const map = L.map("map").setView([lat, lng], 13);

                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution:
                        '©️ <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
                    maxZoom: 18,
                }).addTo(map);

                setMapObject(map);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);

            const response = await axios.get(
                `https://geo.ipify.org/api/v1?apiKey=at_GsdDW8nuvH5GrH8dbhJKSJsSZgVO7&ipAddress=${searchValue}`
            );

            setLocationInfo(response.data);

            if (mapObject) {

                if (marker) {
                    mapObject.removeLayer(marker); // Eliminar el marcador existente antes de agregar uno nuevo
                }

                const { lat, lng } = response.data.location;

                // Crear un marcador con las coordenadas y personalizarlo con una imagen
                const newMarkerIcon = L.icon({
                    iconUrl: "/icon-location.svg",
                    iconSize: [50, 50],
                    iconAnchor: [25, 50]
                });

                const newMarker = L.marker([lat, lng], { icon: newMarkerIcon }).addTo(mapObject);

                setMarker(newMarker); // Guardar referencia del nuevo marcador en el estado

                // Redirigir el mapa a la ubicación del nuevo marcador
                mapObject.setView([lat, lng], 13);

            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <main>
            <article className="bg-mobile absolute md:bg-desktop flex flex-col items-center w-[100%] h-[40vh]">
                <h1 className="text-white/90 text-2xl font-[rubik] font-medium mt-[1.5rem] mb-[1.7rem]">IP Address Tracker</h1>
                <form className="flex" onSubmit={handleSubmit}>
                    <input
                        className="cursor-pointer h-[3rem] w-[17.5rem] md:w-[30rem] rounded-l-2xl focus:outline-none px-3"
                        type="text"
                        placeholder="Search for any IP address of domain"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button type="submit" className="h-[3rem] w-[3rem] bg-black rounded-r-2xl flex items-center justify-center hover:bg-[#2b2b2b]">
                        <img src={IconArrow} alt="icon arrow right" />
                    </button>
                </form>
            </article>
            <div className="flex justify-center pt-[12.3rem] z-20">
                {locationInfo && (

                    <article className="w-[100%] flex flex-col items-center">
                        <ul className="flex flex-col md:flex-row z-50 relative bg-white rounded-2xl mt-[-2rem] md:mt-[0rem] w-[20.5rem] md:w-[44rem] h-[18rem] md:h-[8rem] md:p-[.5rem] shadow-2xl" >
                            <li className="md:border-r-2 md:h-[5rem] items-center md:w-[10rem] md:items-start md:ml-[1rem]">
                                <p className="text-xs tracking-widest">IP ADDRESS</p>
                                {!isLoading && locationInfo && (
                                    <span className="md:w-[9rem] md:mr-[.5rem]">{locationInfo.ip}</span>
                                )}
                            </li>
                            <li className="md:border-r-2 md:h-[5rem] md:w-[10rem] md:items-start md:ml-[1rem]">
                                <p className="text-xs tracking-widest">LOCATION</p>
                                {!isLoading && locationInfo && (
                                    <>
                                        <div className="md:w-[9rem] md:mr-[.5rem]">

                                            <span>{`${locationInfo.location.city}, ${locationInfo.location.region} ${locationInfo.location.postalCode}`}</span>
                                            <span>{`${locationInfo.location.country}`}</span>
                                        </div>
                                    </>
                                )}
                            </li>
                            <li className="md:border-r-2 md:h-[5rem] md:w-[10rem] md:items-start md:ml-[1rem]">
                                <p className="text-xs tracking-widest">TIMEZONE</p>
                                {!isLoading && locationInfo && (
                                    <span className="md:w-[9rem] md:mr-[.5rem]">{`UTC ${locationInfo.location.timezone}`}</span>
                                )}
                            </li>
                            <li className="md:ml-[1rem] md:items-start">
                                <p className="text-xs tracking-widest">ISP</p>
                                {!isLoading && locationInfo && (
                                    <span className="md:w-[9rem] md:mr-[.5rem]">{locationInfo.isp}</span>
                                )}
                            </li>
                        </ul>
                        <div id="map" className="-z-10 absolute mt-[4.4rem] md:mt-[4.1rem] w-[100vw] h-[25rem] md:h-[24.4rem]" />
                    </article>
                )}
            </div>
        </main >
    )
}