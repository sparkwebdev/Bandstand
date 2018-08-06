const bandStands = [{
    id: 1,
    title: "Ross Theatre",
    location: "West Princes Street Gardens",
    dates: "1877-",
    description: "First installed in 1877 when the gardens first opened to the public. In 1935 the bandstand was replaced and renamed, the Ross Bandstand, after William Henry Ross who donated £8,000 towards its construction.",
    image: require('../assets/images/bandstand-01.jpg'),
    coords: {
      lat: 55.950526,
      lng: -3.200066,
    },
    coordsTest: {
      lat: 55.833428, // Steven's home office
      lng: -4.281125,
    },
    kmToNext: 1.6,
    timeToNext: 21,
    song: {
      duration: "4:18",
      loop: require('../assets/audio/01.mp3'),
      sound: require('../assets/audio/choir-01.mp3'),
    },
    lyrics: 'In the<br />City Side<br />Just arrived',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 2,
    title: "The Meadows",
    location: "Middle Meadow Walk",
    dates: "1908-1950",
    description: "Erected in 1908, and was dismantled in 1950 (A duplicate of the one at Saughton Park). There is a record of it being scrapped in 1953. One of the few cast iron bandstands.",
    image: require('../assets/images/bandstand-02.jpg'),
    coords: {
      lat: 55.940141,
      lng: -3.191780,
    },
    coordsTest: {
      lat: 55.833976, // Crossmyloof train station
      lng: -4.284329,
    },
    kmToNext: 4.2,
    timeToNext: 50,
    song: {
      duration: "4:11",
      loop: require('../assets/audio/02.mp3'),
      sound: require('../assets/audio/choir-02.mp3'),
    },
    lyrics: 'Growing and grazing fields<br />Used to reside<br />Walked now',
    visited: true,
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-02-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-02-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-02-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-02-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-02-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 3,
    title: "Saughton Park",
    location: "off Balgreen Road",
    dates: "1909-87, 2019-",
    description: "First one erected 1908 (timber) as part of Scottish National Exhibition which then moved to Marine Gardens. A new cast iron bandstand was installed in 1909, dismantled in 1987 and kept in storage. This one has recently been rebuilt and restored, opening in 2019 (one of only five left in the world).",
    image: require('../assets/images/bandstand-01.jpg'),
    coords: {
      lat: 55.934214,
      lng: -3.247926,
    },
    coordsTest: {
      lat: 55.859112,  // Central Train Station
      lng: -4.258109,
    },
    kmToNext: 7.1,
    timeToNext: 87,
    song: {
      duration: "2:34",
      loop: require('../assets/audio/01.mp3'),
      sound: require('../assets/audio/choir-03.mp3'),
    },
    lyrics: 'Im returning<br />Back from<br />30 years away',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-02-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-02-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-02-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-02-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-02-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 4,
    title: "Victoria Park",
    location: "off Newhaven Road, Leith",
    dates: "c1908-no record",
    description: "The park first opened to the public in 1898. The bandstand is recorded as being installed between 1906 and 1910, with conflict about the precise date, and no evidence of when taken down.",
    image: require('../assets/images/bandstand-02.jpg'),
    coords: {
      lat: 55.975364,
      lng: -3.192939,
    },
    coordsTest: {
      lat: 55.857080, // Steven's work office
      lng: -4.264364,
    },
    kmToNext: 2.5,
    timeToNext: 26,
    song: {
      duration: "3:08",
      loop: require('../assets/audio/02.mp3'),
      sound: require('../assets/audio/choir-04.mp3'),
    },
    lyrics: 'Horns<br />Playing<br />Beside',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 5,
    title: "Leith Links",
    location: "off Hermitage Place",
    dates: "c1910-no record",
    description: "The bandstand was erected in the early 1900s. No record of when it was dismantled.",
    image: require('../assets/images/bandstand-01.jpg'),
    coords: {
      lat: 55.970992,
      lng: -3.165235,
    },
    coordsTest: {
      lat: 55.862466, // Queen Street Station, Glasgow
      lng: -4.251156,
    },
    kmToNext: 3.1,
    timeToNext: 38,
    song: {
      duration: "4:11",
      loop: require('../assets/audio/02.mp3'),
      sound: require('../assets/audio/choir-05.mp3'),
    },
    lyrics: 'On roaming<br />Sundays<br />I stroll I listen',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 6,
    title: "Marine Gardens",
    location: "Seafield Promenade",
    dates: "1909-15",
    description: "Many of the buildings from the 1908 Scottish National Exhibition held in Saughton Park were moved to Marine Gardens at Seafield (the Lothian Buses depot now on the previous site).  Marine Gardens was in operation from 1909 until 1915.",
    image: require('../assets/images/bandstand-02.jpg'),
    coords: {
      lat: 55.961963,
      lng: -3.125264
    },
    coordsTest: {
      lat: 55.865584, // Citizen M Glasgow
      lng: -4.256428,
    },
    kmToNext: 1.8,
    timeToNext: 21,
    song: {
      duration: "2:34",
      loop: require('../assets/audio/01.mp3'),
      sound: require('../assets/audio/choir-06.mp3'),
    },
    lyrics: 'Oh I do<br />Like<br />To think of<br />Pleasures past',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 7,
    title: "Portobello Promenade",
    location: "by John Street",
    dates: "c1910-c1950",
    description: "No exact dates found, was installed in the early 1900s. Archive footage shows dancing around the bandstand at the time of WWII, with the area becoming an outdoor paddling pool (1960) and more recently a community garden (2006)",
    image: require('../assets/images/bandstand-02.jpg'),
    coords: {
      lat: 55.952157,
      lng: -3.104045,
    },
    coordsTest: {
      lat: 55.831421, // Langside Hall, Glasgow
      lng: -4.277751,
    },
    kmToNext: 4.4,
    timeToNext: 52,
    song: {
      duration: "2:34",
      loop: require('../assets/audio/01.mp3'),
      sound: require('../assets/audio/choir-07.mp3'),
    },
    lyrics: 'On the<br />Sea<br />Side<br />I dip my toe',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  },
  {
    id: 8,
    title: "Lewisvale Park",
    location: "off Newbigging, Musselburgh",
    dates: "1914-",
    description: "The bandstand was first installed in 1914, which was restored as part of a Heritage Lottery project developing the park completed in early 2018.",
    image: require('../assets/images/bandstand-01.jpg'),
    coords: {
      lat: 55.938926,
      lng: -3.045463,
    },
    coordsTest: {
      lat: 55.831073, // Queens Park Monument, Glasgow
      lng: -4.270193,
    },
    kmToNext: 0,
    timeToNext: 0,
    song: {
      duration: "3:08",
      loop: require('../assets/audio/02.mp3'),
      sound: require('../assets/audio/choir-08.mp3'),
    },
    lyrics: 'When the sun goes down<br />Im gloamin.<br />And gleaming',
    slides: [{
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '1',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-02.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-03.png'),
        imageResizeMode: 'contain',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-01-04.png'),
        imageResizeMode: 'contain',
      },
    ]
  }
];

export default bandStands;