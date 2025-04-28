

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
    TextInput,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Image,
    PermissionsAndroid,
    Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Geolocation from '@react-native-community/geolocation';
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import { GOOGLE_API_KEY, BASE_URL } from '../../config/config';
import { useAuth } from '../../Context/AuthContext';
import MapViewComponent from '../map/MapComponent';
import { processTetraPackImage } from '../../helpers/TetrapackHelpers';

const locations = [
   
    'Sahakari Bhandar Kharghar, Kharghar 410210',
    'Sahakari Bhandar Borivali, Borivali 400092',
    'Sahakari Bhandar Bandra, Bandra 400050',
    'Sahakari Bhandar Worli, Worli 400018',
    'Reliance Fresh, Marine Lines, Marine Lines 400020',
    'Sahakari Bhandar Mazgaon, Mazgaon 400010',
    'June Blossoms, Bandra, Bandra 400050',
    'Maharashtra Mitra Mandal, Bandra 400050',
    'Lodha (Acenza), Andheri 400053',
    'Our Lady Church, Mahim 400016',
    'Sr. Michael Church, Mahim 400016',
    'Hotel Marine Plaza, Marine Lines 400020',
    'Raj Infinia Lodha, Malad 400095',
    'Eternis Lodha, Andheri 400053',
    'Woods, Kandivali 400067',
    'Evershine Embassy, Veera Desai Rd, Andheri 400053',
    'NPCI BKC 400051',
    'Kalina Kamal Housing Society, Kalina 400098',
    'AM/NS, Vikhroli 400083',
    'Videojet Tech., Glass with Pet Bottle, Vikhroli 400083',
    'Post Office, Wadala 400031',
    'Golf Scappe Society, Chembur 400071',
    'We Work, Worli 400018',
    'Signet, Dadar 400014',
    'JBCN, Chembur 400071',
    'We Work, Vijay Diamond, Marol 400059',
    'Raheja We Work, Marol 400059',
    'Wadala Post Office, Wadala 400031',
    'We Work OC2, Goregaon 400063',
    'SB Dindoshi, Chembur 400071',
    'We Work Chromium, Vikhroli 400083',
    'Societe Generale, Lower Parel 400013',
    'We Work BKC, Kalyan 421301',
    'IC Church, Borivali 400092',
    'NPCI Office, Goregaon 400063',
    'Bombay Cambridge School, Andheri 400053',
    'HT Parekh Foundation (Individual), Fort 400001',
    'Lodha Regalia, Mulund 400080'
];

const tetraPackSizes = ['200ml', '500ml', '1000ml', 'Other'];

const DonateTetraPacksScreen = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedLocationCoordinates, setSelectedLocationCoordinates] = useState(null);
    const [sortedLocations, setSortedLocations] = useState([]);
    const [selectedSize, setSelectedSize] = useState(tetraPackSizes[0]);
    const [manualSize, setManualSize] = useState('');
    const [numPacks, setNumPacks] = useState(1);
    const [distance, setDistance] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [aiCount, setAiCount] = useState(null);
    const [aiVolume, setAiVolume] = useState(null);
    const [isAIProcessing, setIsAIProcessing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMap, setShowMap] = useState(false);
    const [useAISectionVisible, setUseAISectionVisible] = useState(false);
    const [isLocationsLoading, setIsLocationsLoading] = useState(true);

    const [imageForVolume, setImageForVolume] = useState(null);
    const [imageForCount, setImageForCount] = useState(null);
    const [isNearDropPoint, setIsNearDropPoint] = useState(false);
    const [showImagePickerModal, setShowImagePickerModal] = useState(false);
    const [currentTaskType, setCurrentTaskType] = useState(null);



    const { user } = useAuth();
    const UserId = user?.id ?? 'id';

    const fetchUserLocation = async () => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This app needs to access your location to find nearby drop points.',
                        buttonPositive: 'OK',
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert('Permission Denied', 'Location permission is required.');
                    return;
                }
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    Alert.alert('Turn On Your location.');
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        } catch (error) {
            console.error('Location Error:', error);
            Alert.alert('Error', 'Unexpected location error.');
        }
    };

    const fetchCoordinates = async (address) => {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: { address, key: GOOGLE_API_KEY },
            });
            if (response.data.status === 'OK') {
                return response.data.results[0].geometry.location;
            }
        } catch (error) {
            console.error('Geocode Error:', error);
        }
        return null;
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const toRad = (deg) => deg * (Math.PI / 180);
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    };

    const fetchAndSortLocations = async () => {
        setIsLocationsLoading(true);
        const data = await Promise.all(
            locations.map(async (location) => {
                const coords = await fetchCoordinates(location);
                if (!coords) return null;
                const dist = calculateDistance(userLocation.lat, userLocation.lng, coords.lat, coords.lng);
                return { name: location, coordinates: coords, distance: dist };
            })
        );

        setSortedLocations(data.filter(Boolean).sort((a, b) => a.distance - b.distance));
        setIsLocationsLoading(false);
    };

    useEffect(() => { fetchUserLocation(); }, []);
    useEffect(() => { if (userLocation) fetchAndSortLocations(); }, [userLocation]);

    const toggleMap = () => setShowMap(!showMap);

    const handleLocationSelect = (location) => {
        if (location) {
            setSelectedLocation(location.name);
            setSelectedLocationCoordinates(location.coordinates);
            setDistance(location.distance.toFixed(2));
        }
    }; 

    const handleAIFlow = (taskType) => {
        setCurrentTaskType(taskType);
        setShowImagePickerModal(true);
    };

    const handleImageSelection = (type, taskType) => {
        const options = { mediaType: 'photo', quality: 0.7 };
        const pickerFunc = type === 'camera' ? ImagePicker.launchCamera : ImagePicker.launchImageLibrary;

        pickerFunc(options, async (response) => {
            if (response.didCancel || response.errorCode) {
                console.warn('Image selection cancelled or failed');
                return;
            }

            const asset = response.assets?.[0];
            if (asset && taskType) {
                const taskID = taskType === 'count' ? 1 : 2;

                if (taskID === 1) {
                    setImageForCount({ uri: asset.uri });
                } else if (taskID === 2) {
                    setImageForVolume({ uri: asset.uri });
                }

                await processImageWithAI(asset, taskID);
                setCurrentTaskType(null);
            }
        });
    };

    const processImageWithAI = async (imageAsset, taskID) => {
        setIsAIProcessing(true);
        try {
            const { count, volume } = await processTetraPackImage(imageAsset, taskID);
            console.log(count, volume);
            if (taskID === 1 && !isNaN(count)) {
                setNumPacks(count);
                setAiCount(count);


            }
            if (taskID === 2 && !isNaN(volume)) {
                setManualSize(String(volume));
                setSelectedSize('Other');
                setAiVolume(volume);

            }
        } catch (err) {
            Alert.alert('AI Error', 'Could not extract info from image. Please fill manually.');
        } finally {
            setIsAIProcessing(false);
        }
    };




    const handleDonation = async () => {
        if (numPacks <= 0) return Alert.alert('Error', 'Pack count must be greater than 0');
        if (!selectedLocation) return Alert.alert('Error', 'Please select a location');

        const size =
            selectedSize === 'Other'
                ? `${manualSize}ml` // Append 'ml' for manual sizes
                : selectedSize;

        if (selectedSize === 'Other' && (!manualSize || isNaN(manualSize) || Number(manualSize) <= 0)) {
            return Alert.alert('Error', 'Please enter a valid size in ml.');
        }

        try {
            setIsLoading(true);
            const res = await axios.post(`${BASE_URL}/createDonation`, {
                UserId,
                selectedLocation,
                tetraPackSize: size,
                numPacks,
                distance,
            });

            if (res.status === 201) {
                Alert.alert('Thank You!', `Donated ${numPacks} packs (${size}) at ${selectedLocation}.`);
            } else {
                Alert.alert('Error', res.data.message || 'Failed to record donation.');
            }
        } catch (error) {
            Alert.alert('Network Error', error.response?.data?.message || 'Try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.label}>Select Donation Location:</Text>
                {isLocationsLoading ? (
                    <View style={{ paddingVertical: 20 }}>
                        <ActivityIndicator size="small" color="#2e7d32" />
                        <Text style={{ textAlign: 'center', marginTop: 8 }}>Loading locations...</Text>
                    </View>
                ) : (
                    <Picker
                        selectedValue={selectedLocation}
                        onValueChange={(val) => {
                            const loc = sortedLocations.find((l) => l.name === val);
                            handleLocationSelect(loc);
                        }}
                        style={styles.picker}
                    >
                        <Picker.Item label="Select a Location" value="" />
                        {sortedLocations.map((loc, i) => (
                            <Picker.Item
                                key={i}
                                label={`${loc.name}${i === 0 ? ' (Nearest)' : ''}`}
                                value={loc.name}
                            />
                        ))}
                    </Picker>
                )}

                <TouchableOpacity onPress={toggleMap} style={styles.mapButton}>
                    <Text style={styles.buttonText}>View Path on Map</Text>
                </TouchableOpacity>

                {showMap && userLocation && selectedLocationCoordinates && (
                    <View style={styles.mapContainer}>
                        <MapViewComponent
                            userLocation={userLocation}
                            selectedLocation={selectedLocationCoordinates}
                            onLiveLocationUpdate={(liveLoc) => {
                                if (selectedLocationCoordinates) {
                                    const d = calculateDistance(
                                        liveLoc.lat,
                                        liveLoc.lng,
                                        selectedLocationCoordinates.lat,
                                        selectedLocationCoordinates.lng
                                    );
                                    setIsNearDropPoint(d <= 1);
                                }
                            }}
                        />
                    </View>
                )}

                <Text style={styles.labelSel}>Enter Size in ml:</Text>
                <View style={styles.rowAligned}>
                    <TextInput style={[styles.input, { flex: 1, marginRight: 10 }]}
                        placeholderTextColor='#696969'
                        value={manualSize ? `${manualSize}ml` : ''}
                        onChangeText={setManualSize} placeholder="e.g. 233ml" />
                    <TouchableOpacity style={styles.aiMiniButton} onPress={() => handleAIFlow('volume')}>
                        <Text style={styles.buttonText}>Use AI to Fill</Text>
                    </TouchableOpacity>
                </View>
                {isAIProcessing && imageForVolume && !imageForCount && (
                    <ActivityIndicator color="#388e3c" style={{ marginVertical: 10 }} />
                )}


                {imageForVolume && (
                    <Image
                        source={imageForVolume}
                        style={{ width: '100%', height: 200, marginBottom: 10 }}
                        resizeMode="contain"
                    />
                )}

                <Text style={styles.label}>Number of Packs:</Text>
                <View style={styles.rowAligned}>
                    <TextInput
                        style={[styles.input, { flex: 1, marginRight: 10 }]}
                        value={String(numPacks)}
                        placeholderTextColor='#696969'
                        placeholder='Enter Number of Packs'
                        onChangeText={(text) => setNumPacks(Number(text))}
                        keyboardType="numeric"
                    />
                    <TouchableOpacity style={styles.aiMiniButton} onPress={() => handleAIFlow('count')}>
                        <Text style={styles.buttonText}>Use AI to Fill</Text>
                    </TouchableOpacity>
                </View>
                {isAIProcessing && imageForCount && <ActivityIndicator color="#388e3c" style={{ marginVertical: 10 }} />}

                {imageForCount && (
                    <Image
                        source={imageForCount}
                        style={{ width: '100%', height: 200, marginBottom: 10 }}
                        resizeMode="contain"
                    />
                )}

                <TouchableOpacity
                    style={[
                        styles.donateButton,
                        { opacity: isNearDropPoint ? 1 : 0.4 } // Dim when disabled
                    ]}
                    onPress={handleDonation}
                    disabled={!isNearDropPoint || isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>
                            {isNearDropPoint ? 'Donate' : 'Get Closer to Drop Location'}
                        </Text>
                    )}
                </TouchableOpacity>




            </ScrollView>

            
            {showImagePickerModal && (
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Text style={styles.modalTitle}>Choose Image Source</Text>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setShowImagePickerModal(false);
                                    handleImageSelection('camera', currentTaskType);
                                }}
                            >
                                <Text style={styles.modalButtonText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setShowImagePickerModal(false);
                                    handleImageSelection('gallery', currentTaskType);
                                }}
                            >
                                <Text style={styles.modalButtonText}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, { backgroundColor: '#d32f2f' }]}
                                onPress={() => setShowImagePickerModal(false)}
                            >
                                <Text style={[styles.modalButtonText, { color: '#fff' }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f0f7f4', padding: 20 },
    scrollContainer: { paddingBottom: 30 },
    label: { fontSize: 16, marginBottom: 10, color: '#2e7d32' },
    labelUp: { fontSize: 16, marginBottom: 1, marginTop: 10, color: '#2e7d32' },
    labelCa: { fontSize: 16, marginBottom: 8, marginTop: 10, color: '#2e7d32' },
    labelSel: { fontSize: 16, marginBottom: 8, marginTop: 10, color: '#2e7d32' },
    picker: {
        height: 50,
        marginBottom: 20,
        backgroundColor: '#dcedc8',
        borderRadius: 5,
        color: '#000',
    },
    rowAligned: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    aiMiniButton: {
        backgroundColor: '#1f618d',
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderColor: '#2e7d32',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },

    AIButton: {
        backgroundColor: '#1f618d', // Different color (blue tone)
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginVertical: 12,         // Spacing above and below
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,               // Subtle shadow on Android
        shadowColor: '#000',        // iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },

    donateButton: {
        backgroundColor: '#0b5345',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    calButton: {
        flex: 1,
        marginHorizontal: 5,
        paddingVertical: 10,        // More vertical padding
        paddingHorizontal: 10,      // Horizontal padding to prevent text touching sides
        backgroundColor: '#388e3c',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 140,              // Ensures button isn’t too narrow
    },

    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 14,
        textAlign: 'center',
        flexWrap: 'wrap',
        includeFontPadding: false,  // Helps reduce overflow on some Android devices
    },


    mapButton: {
        backgroundColor: '#388e3c',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 10,
        flex: 1,
        marginHorizontal: 5,
    },

    buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
    distance: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#388e3c',
        textAlign: 'center',
        marginVertical: 10,
    },
    mapContainer: {
        height: 300,
        width: '100%',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },



    flexPicker: {
        flex: 1,
        backgroundColor: '#dcedc8',
        borderRadius: 5,
        color: '#000',
        height: 50,
    },

    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 20,
        color: '#2e7d32',
        textTransform: 'none',
    },
    modalButton: {
        backgroundColor: '#388e3c',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        textTransform: 'none',
        fontWeight: '500',
    },
    



});

export default DonateTetraPacksScreen;
