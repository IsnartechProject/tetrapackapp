// // import axios from 'axios';

// // const API_URL = 'https://emfires-chatbot-api.emfires.com/chatbot';
// // const ACCESS_TOKEN = 'HJ5tQc1vZnRl8P3BXdWk6HpzAg2s4T0sMNa7LrIhXj9ubqEbiDoGmUYGnvJmCFWeQZlO';

// // export const processTetraPackImage = async (imageAsset, taskID) => {
// //     console.log(imageAsset);
// //     console.log(taskID);
// //     try {
// //         const formData = new FormData();
// //         formData.append('access_token', ACCESS_TOKEN);
// //         formData.append('tetrapackID', '7');
// //         formData.append('taskID', taskID);  // Sending taskID within FormData
// //         formData.append('filesTTR', {
// //             uri: imageAsset.uri,
// //             type: imageAsset.type,
// //             name: imageAsset.fileName || 'image.jpg',
// //         });

// //         const res = await axios.post(API_URL, formData, {
// //             headers: { 'Content-Type': 'multipart/form-data' },
// //         });

// //         console.log(formData);
// //         console.log(res);

// //         if (taskID === 1) {
// //             return { count: parseInt(res.data.result), volume: null };
// //         } else if (taskID === 2) {
// //             return { count: null, volume: parseInt(res.data.result) };
// //         }

// //     } catch (error) {
// //         console.error('AI Image Processing Failed:', error);
// //         throw new Error('Failed to process image with AI');
// //     }
// // };


// import axios from 'axios';

// const API_URL = 'https://emfires-chatbot-api.emfires.com/chatbot';
// const ACCESS_TOKEN = 'HJ5tQc1vZnRl8P3BXdWk6HpzAg2s4T0sMNa7LrIhXj9ubqEbiDoGmUYGnvJmCFWeQZlO';

// export const processTetraPackImage = async (imageAsset, taskID) => {
//     console.log('🖼️ ImageAsset Received:', JSON.stringify(imageAsset, null, 2));
//     console.log('🧠 Task ID:', taskID);

//     try {
//         const formData = new FormData();

//         // Append all fields
//         formData.append('access_token', ACCESS_TOKEN);
//         formData.append('tetrapackID', '7');
//         formData.append('taskID', taskID);

//         const imageField = {
//             uri: imageAsset.uri,
//             type: imageAsset.type || 'image/jpeg',
//             name: imageAsset.fileName || 'image.jpg',
//         };

//         console.log('📦 Appending image to formData:', imageField);
//         formData.append('file', imageField); // Changed field to 'file'

//         // Axios POST without headers (let axios handle boundary)
//         const res = await axios.post(API_URL, formData);

//         console.log('✅ AI Server Response:', res.data);

//         // Handle AI results
//         if (taskID === 1) {
//             return { count: parseInt(res.data.result), volume: null };
//         } else if (taskID === 2) {
//             return { count: null, volume: parseInt(res.data.result) };
//         }

//     } catch (error) {
//         console.error('❌ AI Image Processing Failed');
//         console.error('🔎 Axios Error Message:', error.message);
//         console.error('📜 Axios Error Response:', error.response?.data);
//         console.error('📋 Axios Error Stack:', error.stack);
//         throw new Error('Failed to process image with AI');
//     }
// };


import axios from 'axios';
import { Platform } from 'react-native';


const API_URL = 'https://emfires-chatbot-api.emfires.com/chatbot';
const ACCESS_TOKEN = 'HJ5tQc1vZnRl8P3BXdWk6HpzAg2s4T0sMNa7LrIhXj9ubqEbiDoGmUYGnvJmCFWeQZlO';

export const processTetraPackImage = async (imageAsset, taskID) => {
    console.log('🖼️ ImageAsset Received:\n', JSON.stringify(imageAsset, null, 2));
    console.log('🧠 Task ID:', taskID);

    try {
        const formData = new FormData();

        const uri = Platform.OS === 'android'
            ? imageAsset.uri.startsWith('file://') ? imageAsset.uri : `file://${imageAsset.uri}`
            : imageAsset.uri;

      

        formData.append('access_token', ACCESS_TOKEN);
        formData.append('tetrapackID', '7');
        formData.append('taskID', String(taskID));

        const imageField = {
            uri,
            type: imageAsset.type || 'image/jpeg',
            name: imageAsset.fileName || 'image.jpg',
        };

        console.log('📦 Appending image to formData:\n', JSON.stringify(imageField, null, 2));
        formData.append('filesTTR', imageField); // ✅ Correct key for image

        // ✅ Explicit headers without boundary
        const res = await axios.post(API_URL, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log('✅ AI Server Response:', res.data);

        if (taskID === 1) {
            return { count: parseInt(res.data.result), volume: null };
        } else if (taskID === 2) {
            return { count: null, volume: parseInt(res.data.result) };
        }

    } catch (error) {
        console.error('❌ AI Image Processing Failed');
        console.error('🔎 Axios Error Message:', error.message);
        if (error.response) {
            console.error('📜 Server Error Response:', error.response.data);
            console.error('📊 Status Code:', error.response.status);
        } else {
            console.error('❓ No response from server (possibly network issue)');
        }
        throw new Error('Failed to process image with AI');
    }
};
