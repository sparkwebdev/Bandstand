import React from 'react';
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

function hasVisited(id) {
    let visited = getVisited();
    let visitedString = JSON.parse(visited);
    if (visitedString !== null) {
        if (visitedString.includes(id)) {
            return true;
        }
    }
    return false;
}

module.exports = {
    getVisited  :  getVisited,
    saveVisited :  saveVisited,
    hasVisited  :  hasVisited,
};