const bandStands = [
    {
        id: 1,
        title: "Ross Theatre",
        description: "West Princes Street Gardens",
        image: require('../assets/images/bandstand-01.jpg'),
        coords: {
            lat: 55.950526,
            lng: -3.200066,
        },
        song: {
            duration: "4:18",
            sound: require('../assets/audio/01.mp3'),
            loop: require('../assets/audio/choir-01.mp3'),
        },
        visited: false,
    },
    {
        id: 2,
        title: "The Meadows",
        description: "In situ 1908 to 1953",
        image: require('../assets/images/bandstand-02.jpg'),
        coords: {
            lat: 55.941304,
            lng: -3.191872,
        },
        song: {
            duration: "4:11",
            sound: require('../assets/audio/02.mp3'),
            loop: require('../assets/audio/choir-02.mp3'),
        },
        visited: true,
    },
    {
        id: 3,
        title: "Saughton Park",
        description: "erected 1908, re-erected 2018",
        image: require('../assets/images/bandstand-01.jpg'),
        coords: {
            lat: 55.941519,
            lng: -3.253753,
        },
        song: {
            duration: "2:34",
            sound: require('../assets/audio/01.mp3'),
            loop: require('../assets/audio/choir-01.mp3'),
        },
        visited: false,
    },
    {
        id: 4,
        title: "Victoria Park, Leith",
        description: "no dates available",
        image: require('../assets/images/bandstand-02.jpg'),
        coords: {
            lat: 55.975007,
            lng: -3.193481,
        },
        song: {
            duration: "3:08",
            sound: require('../assets/audio/02.mp3'),
            loop: require('../assets/audio/choir-02.mp3'),
        },
        visited: false,
    },
    {
        id: 5,
        title: "Leith Links",
        description: "erected early 1900s",
        image: require('../assets/images/bandstand-01.jpg'),
        coords: {
            lat: 55.970744,
            lng: -3.165750,
        },
        song: {
            duration: "4:11",
            sound: require('../assets/audio/02.mp3'),
            loop: require('../assets/audio/choir-02.mp3'),
        },
        visited: false,
    },
    {
        id: 6,
        title: "Portobello Prom, John Street",
        description: "dates unclear/ early 1900s in situ",
        image: require('../assets/images/bandstand-02.jpg'),
        coords: {
            lat: 55.951358,
            lng: -3.104938,
        },
        song: {
            duration: "2:34",
            sound: require('../assets/audio/01.mp3'),
            loop: require('../assets/audio/choir-01.mp3'),
        },
        visited: false,
    },
    {
        id: 7,
        title: "Inveresk Park, Musselburgh",
        description: "dates unclear/ early 1900s in situ",
        image: require('../assets/images/bandstand-01.jpg'),
        coords: {
            lat: 55.939633,
            lng: -3.051714,
        },
        song: {
            duration: "3:08",
            sound: require('../assets/audio/02.mp3'),
            loop: require('../assets/audio/choir-02.mp3'),
        },
        visited: false,
    }
];

export default {
  bandStands
};
