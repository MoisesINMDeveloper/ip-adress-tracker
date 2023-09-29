// import { useEffect, useState } from "react";
// // import L from "leaflet";
// // import IconLocation from "/icon-location.svg"
// // import axios from "axios";

// // Importar los estilos CSS de Leaflet
// import "leaflet/dist/leaflet.css";

// export default function Address({ searchValue }) {
//     const [ipAddress, setIpAddress] = useState("");
//     const [locationInfo, setLocationInfo] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);


//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 setIsLoading(true);

//                 // Hacer la petición a la API utilizando tu apiKey y dirección IP
//                 const response = await axios.get(
//                     `https://geo.ipify.org/api/v1?apiKey=at_viKgzftMW1SDp6hlmpA0xvtswt4LY&ipAddress=${ipAddress}`
//                 );

//                 setLocationInfo(response.data);
//             } catch (error) {
//                 console.log(error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };

//         fetchData();
//     }, [ipAddress]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 // Hacer la petición a la API utilizando tu apiKey
//                 const response = await axios.get(
//                     `https://geo.ipify.org/api/v1?apiKey=at_viKgzftMW1SDp6hlmpA0xvtswt4LY`
//                 );

//                 const { lat, lng } = response.data.location;

//                 // Crear el mapa y asignarlo al div con id "map"
//                 const map = L.map("map").setView([lat, lng], 13);

//                 // Agregar una capa base (por ejemplo, OpenStreetMap)
//                 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//                     attribution:
//                         '©️ <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors',
//                     maxZoom: 18,
//                 }).addTo(map);
//             } catch (error) {
//                 console.log(error);
//             }
//         };

//         fetchData();
//     }, [{ searchValue }]);


// //     return (
// //         <article className="w-[100%] flex flex-col items-center">
// //             <ul className=" z-50 relative bg-white rounded-2xl mt-[-2rem] w-[20.5rem] h-[18rem] shadow-2xl" >
// //                 <li>
// //                     <p className="text-xs tracking-widest">IP ADDRESS</p>
// //                     {!isLoading && locationInfo && (
// //                         <span>{locationInfo.ip}</span>
// //                     )}
// //                 </li>
// //                 <li>
// //                     <p className="text-xs tracking-widest">LOCATION</p>
// //                     {!isLoading && locationInfo && (
// //                         <>
// //                             <span>{`${locationInfo.location.city}, ${locationInfo.location.region} ${locationInfo.location.postalCode}`}</span>
// //                             <span>{`${locationInfo.location.country}`}</span>
// //                         </>
// //                     )}
// //                 </li>
// //                 <li>
// //                     <p className="text-xs tracking-widest">TIMEZONE</p>
// //                     {!isLoading && locationInfo && (
// //                         <span>{`UTC ${locationInfo.location.timezone}`}</span>
// //                     )}
// //                 </li>
// //                 <li>
// //                     <p className="text-xs tracking-widest">ISP</p>
// //                     {!isLoading && locationInfo && (
// //                         <span>{locationInfo.isp}</span>
// //                     )}
// //                 </li>
// //             </ul>
// //             <div id="map" className="-z-10 absolute mt-[4.4rem] w-[100vw] h-[25rem]"><img className="z-20" src={IconLocation} alt="" /></div>
// //         </article>
// //     );
// // }
