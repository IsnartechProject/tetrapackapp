

// // import React, { useEffect, useState } from 'react';
// // import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// // import MapView, { Marker, Polyline } from 'react-native-maps';
// // import axios from 'axios';

// // // Replace this with your Google API Key
// // const GOOGLE_API_KEY = "AIzaSyACQbRwSLNq6gj80_gAILMWZ0QjJfMXpoM";

// // const MapViewComponent = ({ userLocation, selectedLocation }) => {
// //     const [loading, setLoading] = useState(false);
// //     const [coordinates, setCoordinates] = useState([]);
// //     const [error, setError] = useState(null);

// //     console.log(userLocation);
// //     console.log(selectedLocation);

// //     useEffect(() => {
// //         if (userLocation && selectedLocation) {
// //             fetchDirections(userLocation, selectedLocation);
// //         }
// //     }, [userLocation, selectedLocation]);

// //     const fetchDirections = async (start, end) => {
// //         setLoading(true);
// //         setError(null);
// //         const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&key=${GOOGLE_API_KEY}`;

// //         try {
// //             const response = await axios.get(directionsUrl);
// //             if (response.data.status === 'OK') {
// //                 const points = response.data.routes[0].legs[0].steps.map(step => {
// //                     const lat = step.end_location.lat;
// //                     const lng = step.end_location.lng;
// //                     return { latitude: lat, longitude: lng };
// //                 });
// //                 setCoordinates(points);
// //             } else {
// //                 console.error("Error fetching directions:", response.data.status);
// //                 setError("Could not fetch directions. Please try again.");
// //             }
// //         } catch (error) {
// //             console.error("Error fetching directions:", error);
// //             setError("An error occurred while fetching directions. Please try again.");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <View style={styles.container}>
// //             {loading ? (
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             ) : (
// //                 <>
// //                     {error && (
// //                         <View style={styles.errorContainer}>
// //                             <Text style={styles.errorText}>{error}</Text>
// //                         </View>
// //                     )}
// //                     <MapView
// //                         style={styles.map}
// //                         provider="google"
// //                         showsUserLocation
// //                         region={{
// //                             latitude: userLocation.lat,
// //                             longitude: userLocation.lng,
// //                             latitudeDelta: 0.0922,
// //                             longitudeDelta: 0.0421,
// //                         }}
// //                     >
// //                         <Marker coordinate={{ latitude: userLocation.lat, longitude: userLocation.lng }} title="Your Location" />
// //                         <Marker coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }} title="Donation Location" />

// //                         {coordinates.length > 0 && (
// //                             <Polyline
// //                                 coordinates={coordinates}
// //                                 strokeWidth={4}
// //                                 strokeColor="blue"
// //                             />
// //                         )}
// //                     </MapView>
// //                 </>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //     },
// //     map: {
// //         flex: 1,
// //     },
// //     errorContainer: {
// //         position: 'absolute',
// //         top: 20,
// //         left: 20,
// //         backgroundColor: 'rgba(0, 0, 0, 0.7)',
// //         padding: 10,
// //         borderRadius: 5,
// //     },
// //     errorText: {
// //         color: 'white',
// //         fontSize: 14,
// //     },
// // });

// // export default MapViewComponent;


// import React, { useEffect, useState } from 'react';
// import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import axios from 'axios';
// import polyline from '@mapbox/polyline';

// // Replace this with your actual Google Maps API Key
// const GOOGLE_API_KEY = "AIzaSyACQbRwSLNq6gj80_gAILMWZ0QjJfMXpoM";

// const MapViewComponent = ({ userLocation, selectedLocation }) => {
//     const [loading, setLoading] = useState(false);
//     const [coordinates, setCoordinates] = useState([]);
//     const [error, setError] = useState(null);

//     console.log(userLocation);
//     console.log(selectedLocation);

//     useEffect(() => {
//         if (userLocation && selectedLocation) {
//             fetchDirections(userLocation, selectedLocation);
//         }
//     }, [userLocation, selectedLocation]);

//     const fetchDirections = async (start, end) => {
//         setLoading(true);
//         setError(null);

//         if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
//             console.warn("Invalid coordinates:", { start, end });
//             setError("Invalid coordinates provided.");
//             setLoading(false);
//             return;
//         }

//         const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&mode=driving&key=${GOOGLE_API_KEY}`;

//         try {
//             const response = await axios.get(directionsUrl);

//             if (response.data.status === 'OK') {
//                 const encoded = response.data.routes[0].overview_polyline.points;
//                 const decodedPoints = polyline.decode(encoded);
//                 const routeCoordinates = decodedPoints.map(([lat, lng]) => ({
//                     latitude: lat,
//                     longitude: lng,
//                 }));
//                 setCoordinates(routeCoordinates);
//             } else if (response.data.status === 'ZERO_RESULTS') {
//                 console.warn("No route found between locations", { start, end });
//                 setError("No route could be found between the selected points.");
//             } else {
//                 console.error("Unexpected error from Google Directions API:", response.data.status);
//                 setError(`Error fetching directions: ${response.data.status}`);
//             }
//         } catch (error) {
//             console.error("Error fetching directions:", error);
//             setError("An error occurred while fetching directions. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <View style={styles.container}>
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <>
//                     {error && (
//                         <View style={styles.errorContainer}>
//                             <Text style={styles.errorText}>{error}</Text>
//                         </View>
//                     )}
//                     <MapView
//                         style={styles.map}
//                         provider="google"
//                         showsUserLocation={true}
//                         zoomEnabled={true}
//                         zoomControlEnabled={true}
//                         scrollEnabled={true}
//                         rotateEnabled={true}
//                         showsCompass={true}
//                         trafficEnabled={true}
//                         region={{
//                             latitude: userLocation.lat,
//                             longitude: userLocation.lng,
//                             latitudeDelta: 0.05,
//                             longitudeDelta: 0.05,
//                         }}
//                     >
//                         <Marker
//                             coordinate={{
//                                 latitude: userLocation.lat,
//                                 longitude: userLocation.lng
//                             }}
//                             title="Your Location"
//                         />
//                         <Marker
//                             coordinate={{
//                                 latitude: selectedLocation.lat,
//                                 longitude: selectedLocation.lng
//                             }}
//                             title="Donation Location"
//                         />
//                         {coordinates.length > 0 && (
//                             <Polyline
//                                 coordinates={coordinates}
//                                 strokeWidth={5}
//                                 strokeColor="#007bff"
//                             />
//                         )}
//                     </MapView>
//                 </>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     errorContainer: {
//         position: 'absolute',
//         top: 20,
//         left: 20,
//         right: 20,
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         padding: 10,
//         borderRadius: 5,
//         zIndex: 999,
//     },
//     errorText: {
//         color: 'white',
//         fontSize: 14,
//     },
// });

// export default MapViewComponent;



import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import axios from 'axios';
import polyline from '@mapbox/polyline';
import Tts from 'react-native-tts';


const GOOGLE_API_KEY = "AIzaSyACQbRwSLNq6gj80_gAILMWZ0QjJfMXpoM"; // Replace with your actual key

const MapViewComponent = ({ userLocation, selectedLocation, onLiveLocationUpdate  }) => {
    const [loading, setLoading] = useState(false);
    const [coordinates, setCoordinates] = useState([]);
    const [error, setError] = useState(null);
    const [tracking, setTracking] = useState(false);
    const [liveLocation, setLiveLocation] = useState(userLocation);
    const [eta, setEta] = useState(null);
    const [distance, setDistance] = useState(null);
    const watchId = useRef(null);
    const mapRef = useRef(null);
    const [showOverlay, setShowOverlay] = useState(true);


    useEffect(() => {
        if (userLocation && selectedLocation) {
            fetchDirections(userLocation, selectedLocation);
        }
    }, [userLocation, selectedLocation]);

    useEffect(() => {
        return () => {
            if (watchId.current !== null) {
                Geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    const fetchDirections = async (start, end) => {
        setLoading(true);
        setError(null);

        if (!start || !end || !start.lat || !start.lng || !end.lat || !end.lng) {
            console.warn("Invalid coordinates:", { start, end });
            setError("Invalid coordinates provided.");
            setLoading(false);
            return;
        }

        const directionsUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${start.lat},${start.lng}&destination=${end.lat},${end.lng}&mode=driving&key=${GOOGLE_API_KEY}`;


        try {
            const response = await axios.get(directionsUrl);

            if (response.data.status === 'OK') {
                const route = response.data.routes[0];
                const encoded = route.overview_polyline.points;
                const decodedPoints = polyline.decode(encoded);
                const routeCoordinates = decodedPoints.map(([lat, lng]) => ({
                    latitude: lat,
                    longitude: lng,
                }));
                setCoordinates(routeCoordinates);

                const leg = route.legs[0];
                const etaText = leg.duration.text;
                const distanceText = leg.distance.text;
                setEta(leg.duration.text);
                setDistance(leg.distance.text);
                Tts.speak(`Estimated time to destination is ${etaText}. Distance is ${distanceText}.`);
            } else {
                setError(`Error: ${response.data.status}`);

            }
        } catch (err) {
            console.error("Fetch error:", err);
            setError("Failed to fetch directions.");
        } finally {
            setLoading(false);
        }
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        }
        return true;
    };

    const startTracking = async () => {
        const hasPermission = await requestLocationPermission();
        if (!hasPermission) {
            setError("Location permission denied.");
            return;
        }

        setTracking(true);
        watchId.current = Geolocation.watchPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const updatedLocation = { lat: latitude, lng: longitude };
                setLiveLocation(updatedLocation);

                if (onLiveLocationUpdate) {
                    onLiveLocationUpdate(updatedLocation);
                }

                mapRef.current?.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
            },
            (error) => {
                console.error("Tracking error:", error);
                setError("Failed to track location.");
            },
            { enableHighAccuracy: true, distanceFilter: 10, interval: 5000 }
        );
    };

    const stopTracking = () => {
        if (watchId.current !== null) {
            Geolocation.clearWatch(watchId.current);
            setTracking(false);
        }
    };

    const recenterMap = () => {
        if (liveLocation && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: liveLocation.lat,
                longitude: liveLocation.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    {/* {error && (
                        <View style={styles.errorContainer}>
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )} */}

                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider="google"
                        showsUserLocation={true}
                        zoomEnabled={true}
                        region={{
                            latitude: liveLocation?.lat || userLocation.lat,
                            longitude: liveLocation?.lng || userLocation.lng,
                            latitudeDelta: 0.05,
                            longitudeDelta: 0.05,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: selectedLocation.lat,
                                longitude: selectedLocation.lng,
                            }}
                            title="Donation Location"
                        />
                        {tracking && liveLocation && (
                            <Marker
                                coordinate={{
                                    latitude: liveLocation.lat,
                                    longitude: liveLocation.lng,
                                }}
                                title="You (Live)"
                                pinColor="green"
                            />
                        )}
                        {coordinates.length > 0 && (
                            <Polyline
                                coordinates={coordinates}
                                strokeWidth={5}
                                strokeColor="#007bff"
                            />
                        )}
                    </MapView>

                    {showOverlay && (
                        <View style={styles.overlayContainer}>
                            {eta && distance && (
                                <View style={styles.etaContainer}>
                                    <Text style={styles.etaText}>ETA: {eta}</Text>
                                    <Text style={styles.etaText}>Distance: {distance}</Text>
                                </View>
                            )}

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={tracking ? stopTracking : startTracking}
                                    style={[
                                        styles.customButton,
                                        { backgroundColor: tracking ? "#d9534f" : "#5cb85c" },
                                    ]}
                                >
                                    <Text style={styles.buttonText}>
                                        {tracking ? "Stop Tracking" : "Start Tracking"}
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={recenterMap}
                                    style={[styles.customButton, { backgroundColor: "#0275d8" }]}
                                >
                                    <Text style={styles.buttonText}>Re-center Map</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    )}

                    <TouchableOpacity
                        onPress={() => setShowOverlay(!showOverlay)}
                        style={styles.toggleButton}
                    >
                        <Text style={styles.toggleButtonText}>
                            {showOverlay ? "Hide Info" : "Show Info"}
                        </Text>
                    </TouchableOpacity>


                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    map: {
        flex: 1,
    },
    errorContainer: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 10,
        borderRadius: 5,
        zIndex: 999,
    },
    errorText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center',
    },
    overlayContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 5,
    },
    etaContainer: {
        marginBottom: 10,
        alignItems: 'center',
    },
    etaText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10, // For React Native 0.71+ — use margin fallback if older
    },
    customButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 5, // Fallback for gap
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textTransform: 'none',
        fontWeight: '600',
    },
    toggleButton: {
        position: 'absolute',
        top: 15,
        right: 70,
        backgroundColor: '#f1c40f',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        zIndex: 10,
        opacity: 1.2,
    },
    
    toggleButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    
});

export default MapViewComponent;