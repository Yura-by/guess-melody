const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        id: 101,
        src: `https://web.archive.org/web/20060818144601/http://www.navyband.navy.mil/anthems/ANTHEMS/Belarus.mp3`,
        genre: `rock`,
      },
      {
        id: 102,
        src: `https://web.archive.org/web/20080410052226/http://www.navyband.navy.mil/anthems/ANTHEMS/Sweden.mp3`,
        genre: `blues`,
      },
      {
        id: 103,
        src: `https://web.archive.org/web/20080227123358/http://www.navyband.navy.mil/anthems/ANTHEMS/Slovack%20Republic.mp3`,
        genre: `jazz`,
      },
      {
        id: 104,
        src: `https://web.archive.org/web/20070205235901/http://www.navyband.navy.mil/anthems/ANTHEMS/Czech%20Republic.mp3`,
        genre: `pop`,
      },
    ],
  }, {
    type: `artist`,
    song: {
      artist: `Mikle Jackson`,
      src: `https://upload.wikimedia.org/wikipedia/commons/6/64/Ugandan_national_anthem%2C_performed_by_the_U.S._Navy_Band.ogg`,
    },
    answers: [
      {
        id: 110,
        picture: `https://via.placeholder.com/134x134`,
        artist: `Mikle Jackson`,
      },
      {
        id: 111,
        picture: `https://via.placeholder.com/134x134`,
        artist: `Selena Gomez`,
      },
      {
        id: 112,
        picture: `https://via.placeholder.com/134x134`,
        artist: `50 cent`,
      },
    ],
  },
];

export default questions;
