import {
    AsyncStorage
} from 'react-native';

async function getVisited() {
    try {
        const value = await AsyncStorage.getItem('@VisitedStore:key').then(val => {
            let visited = JSON.parse(val);
        });
        return value;
    } catch (error) {
        console.log("Error retrieving data " + error);
    }
}

async function saveVisited(value) {
    try {
        await AsyncStorage.setItem('@VisitedStore:key', value);
    } catch (error) {
        console.log("Error saving data " + error);
    }
}

module.exports = {
    getVisited  :  getVisited,
    saveVisited :  saveVisited,
};