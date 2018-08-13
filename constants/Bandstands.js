import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MonoText } from "../components/StyledText";
import { MonoTextBold } from "../components/StyledTextBold";
import Colours from '../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center"
  },
  // bgImage: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   right: 0,
  //   width: "100%",
  //   height: "100%",
  //   resizeMode: "contain"
  // },
  contentContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    alignSelf: "center",
    alignContent: "center",
    maxWidth: 420,
  },
  text: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center"
  },
  textSmall: {
    fontSize: 13
  },
  textLarge: {
    fontSize: 25,
    lineHeight: 50,
    textAlign: "center"
  },
  textLarger: {
    fontSize: 35,
    lineHeight: 45,
  },
  textLargest: {
    fontSize: 55,
    lineHeight: 65,
  },
  textBold: {
    fontSize: 18,
    color: Colours.brandGreen,
  },
  textLink: {
    color: Colours.brandPurple
  },
  textYellow: {
    color: Colours.brandYellow,
    textAlign: "center"
  },
});


const bandStands = [{
    id: 1,
    title: "Ross Theatre",
    location: "West Princes Street Gardens",
    dates: "1877-",
    description: "null",
    image: require('../assets/images/bandstand-01-01.jpg'),
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
      duration: "4min 18sec",
      soundscape: require('../assets/audio/01-lo.mp3'),
      loop: require('../assets/audio/choirloop-01-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-01-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Ross{"\n"}Theatre{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}1877-
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
              In the{"\n"}City Side{"\n"}Just arrived
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-01-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-01-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={styles.textBold}>
              First bandstand installed in 1877, along with the gardens first opening to the public, prior to that it was a private park.{"\n"}{"\n"}
              </MonoTextBold>
              <MonoText>
              In 1935 the bandstand was replaced to the one that is there today, and at that time became named the Ross bandstand after William Henry Ross who donated £8,000 towards its construction.
              </MonoText>
            </MonoText>
          </View>
        )
      },
    ]
  },
  {
    id: 2,
    title: "The Meadows",
    location: "Middle Meadow Walk",
    dates: "1908-1950",
    description: "null2",
    image: require('../assets/images/bandstand-02-01.jpg'),
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
      duration: "4min 11sec",
      soundscape: require('../assets/audio/02-lo.mp3'),
      loop: require('../assets/audio/choirloop-02-lo.mp3'),
    },
    visited: true,
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-02-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              The Meadows{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}1908-1950
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
              Growing and grazing fields{"\n"}Used to reside{"\n"}Walked now
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-02-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-02-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-02-03.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '5',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            Bandstand erected in 1908. Dismantled in 1950.(A duplicate of the one at Saughton Park){"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            There is a record of it being scrapped in 1953. One of the few cast iron bandstands.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 3,
    title: "Saughton Park",
    location: "off Balgreen Road",
    dates: "1909-87, 2019-",
    description: "null3",
    image: require('../assets/images/bandstand-03-01.jpg'),
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
      duration: "2min 34sec",
      soundscape: require('../assets/audio/01-lo.mp3'),
      loop: require('../assets/audio/choirloop-03-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-03-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Saughton{"\n"}Park{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}1909-87,{"\n"}2019-
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
              Im returning{"\n"}Back from{"\n"}30 years away
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-03-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-03-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-03-03.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '5',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            The Scottish National Exhibition took place at Saughton Park from May-Oct 1908,{"\u2002"}
            </MonoTextBold>
            <MonoText>
            after which time the prefabricated buildings (and two bandstands) were dismantled, with many being relocated to form Portobello’s Marine Gardens.{"\n"}{"\n"}
            </MonoText>
            <MonoText style={styles.textSmall}>
            The Edinburgh Corporation felt the bandstands were so successful, that they purchased two Cast Iron Lion Foundry No. 23 bandstands in 1909 (different from the Exhibition’s mainly timber ones), one of these would sit in the Meadows, the other being in Saughton Park. This bandstand was eventually dismantled in 1986, and kept in storage, which is currently being rebuilt to be returned to the park as part of their ongoing redevelopment project, which opens to the public in 2019. Although access to the bandstand is currently not possible, it is visible from the Stevenson Drive entrance that leads you towards the Walled Garden.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 4,
    title: "Victoria Park",
    location: "off Newhaven Road, Leith",
    dates: "c1908-no record",
    description: "null4",
    image: require('../assets/images/bandstand-04-01.jpg'),
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
      duration: "3min 08sec",
      soundscape: require('../assets/audio/02-lo.mp3'),
      loop: require('../assets/audio/choirloop-04-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-04-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Victoria{"\n"}Park{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}c1908-{"\n"}no record
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
              Horns{"\n"}Playing{"\n"}Beside
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-04-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-04-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            The park first opened to the public in 1898.{"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            The bandstand is recorded as being installed between 1906 and 1910, with conflict about the exact date, and no evidence of when taken down.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 5,
    title: "Leith Links",
    location: "off Hermitage Place",
    dates: "c1910-no record",
    description: "null5",
    image: require('../assets/images/bandstand-05-01.jpg'),
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
      duration: "4min 11sec",
      soundscape: require('../assets/audio/02-lo.mp3'),
      loop: require('../assets/audio/choirloop-05-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-05-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Leith{"\n"}Links{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}c1910-{"\n"}no record
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
            On roaming{"\n"}Sundays{"\n"}I stroll I listen
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-05-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-05-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            Bandstand erected in early 1900s.{"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            No record of when it was dismantled.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 6,
    title: "Marine Gardens",
    location: "Seafield Promenade",
    dates: "1909-15",
    description: "null6",
    image: require('../assets/images/bandstand-06-01.jpg'),
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
      duration: "2min 34sec",
      soundscape: require('../assets/audio/01-lo.mp3'),
      loop: require('../assets/audio/choirloop-06-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-06-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Marine{"\n"}Gardens{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}1909-15
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
            Oh I do{"\n"}Like{"\n"}To think of{"\n"}Pleasures past
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-06-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-06-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-06-03.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '5',
        image: require('../assets/images/bandstand-06-04.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '6',
        image: require('../assets/images/bandstand-06-05.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '7',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            Many of the buildings from the 1908 Scottish National Exhibition held in Saughton Park were moved to Marine Gardens but it is unclear where the bandstand from the 1908 Exhibition actually ended up.{"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            Marine Gardens opened in 1909 and was in full use until 1915.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 7,
    title: "Portobello Promenade",
    location: "by John Street",
    dates: "c1910-c1950",
    description: "null7",
    image: require('../assets/images/bandstand-07-01.jpg'),
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
      duration: "2min 34sec",
      soundscape: require('../assets/audio/01-lo.mp3'),
      loop: require('../assets/audio/choirloop-07-lo.mp3'),
    },
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-07-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Portobello{"\n"}Promenade{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}c1910-{"\n"}c1950
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
              On the{"\n"}Sea{"\n"}Side{"\n"}I dip my toe
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-07-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-07-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-07-03.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '5',
        image: require('../assets/images/bandstand-07-04.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '6',
        image: require('../assets/images/bandstand-07-05.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '7',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            In the early 1900s, the bandstand was in Portobello, close to the foot of John Street, likely dismantled in the 1950s.{"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            The area later became an outdoor paddling pool and in the 1990s a community garden.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  },
  {
    id: 8,
    title: "Lewisvale Park",
    location: "off Newbigging, Musselburgh",
    dates: "1914-",
    description: "null8",
    image: require('../assets/images/bandstand-08-01.jpg'),
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
      duration: "3min 08sec",
      soundscape: require('../assets/audio/02-lo.mp3'),
      loop: require('../assets/audio/choirloop-08-lo.mp3'),
    },
    lyrics: 'null8',
    slides: [
      {
        key: '0',
        image: require('../assets/images/bandstand-08-00.jpg'),
        imageResizeMode: 'cover',
        content: (
          <View style={styles.contentContainer}>
            <MonoText style={styles.text}>
              <MonoTextBold style={[styles.textYellow, styles.textLargest]}>
              Lewisvale{"\n"}Park{"\n"}
              </MonoTextBold>
              <MonoTextBold style={[styles.textYellow, styles.textLarger]}>
              {"\n"}1914-
              </MonoTextBold>
            </MonoText>
          </View>
        )
      },
      {
        key: '1',
        content: (
          <View style={styles.contentContainer}>
            <MonoTextBold style={[styles.textBold, styles.textLarge]}>
            When the sun goes down{"\n"}Im gloamin.{"\n"}And gleaming
            </MonoTextBold>
          </View>
        )
      },
      {
        key: '2',
        image: require('../assets/images/bandstand-08-01.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '3',
        image: require('../assets/images/bandstand-08-02.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '4',
        image: require('../assets/images/bandstand-08-03.jpg'),
        imageResizeMode: 'cover',
      },
      {
        key: '5',
        content: (
          <View style={styles.contentContainer}>
          <MonoText style={styles.text}>
            <MonoTextBold style={styles.textBold}>
            The bandstand was first installed in 1914 which was restored as part of a Heritage Lottery project developing the park, completed in early 2018.{"\n"}{"\n"}
            </MonoTextBold>
            <MonoText>
            The area later became an outdoor paddling pool and in the 1990s a community garden.
            </MonoText>
          </MonoText>
        </View>
        )
      },
    ]
  }
];

export default bandStands;