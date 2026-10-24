
const asset = (path: string) =>
  `${process.env.NODE_ENV === "production" ? "/Wedding_Card" : ""}${path}`;

export const wedding = {
  groom: "Siddhant",
  bride: "Srishti",
  date: "21 November 2026",

  groomParents: "Mrs. Savita Siddhu & Mr. Ashwani Siddhu",
  brideParents: "Mrs. Babita Singh & Mr. Kuldeep Singh",

  home: "Village Akdauli, Hapur, Uttar Pradesh 245101",

  venue:
    "Heritage Resorts, Barla, Muzaffarnagar, Uttar Pradesh 251307, India",

  events: [
    {
      date: "15 November 2026",
      day: "15",
      month: "NOV",
      title: "Sagai",
      category: "Engagement celebration",
      time: "12:00 PM",
      place: "Manohar Regency",
      address: "Hapur, Uttar Pradesh 245101",
      mapLink:
        "https://www.google.com/maps/place/Manohar+Regency/data=!4m2!3m1!1s0x0:0xb97319707c30e36c?sa=X&ved=1t:2428&ictx=111",
      image: asset("/images/event-sagai.webp"),
      note:
        "A special beginning marked with blessings, rings and the joy of our families.",
    },
    {
      date: "18 November 2026",
      day: "18",
      month: "NOV",
      title: "Haldi",
      category: "Pre-wedding celebration",
      time: "12:00 PM",
      place: "At the Groom's Home",
      address: "Village Akdauli, Hapur, Uttar Pradesh 245101",
      image: asset("/images/event-haldi-new.webp"),
      note:
        "An afternoon of turmeric, blessings and joyful family traditions.",
    },
    {
      date: "19 November 2026",
      day: "19",
      month: "NOV",
      title: "Sangeet",
      category: "Pre-wedding celebration",
      time: "7:00 PM",
      place: "At the Groom's Home",
      address: "Village Akdauli, Hapur, Uttar Pradesh 245101",
      image: asset("/images/event-sangeet-new.webp"),
      note:
        "An evening of music, dance and celebration with our loved ones.",
    },
    {
      date: "20 November 2026",
      day: "20",
      month: "NOV",
      title: "Mehndi",
      category: "Pre-wedding celebration",
      time: "12:00 PM",
      place: "At the Groom's Home",
      address: "Village Akdauli, Hapur, Uttar Pradesh 245101",
      image: asset("/images/event-mehndi-new.webp"),
      note:
        "A beautiful gathering filled with henna, colour and warm wishes.",
    },
    {
      date: "21 November 2026",
      day: "21",
      month: "NOV",
      title: "Wedding Day",
      category: "The main celebration",
      time: "Celebrations begin at 3:00 PM",
      place: "Heritage Resorts, Barla",
      address:
        "Heritage Resorts, Barla, Muzaffarnagar, Uttar Pradesh 251307, India",
      image: asset("/images/event-wedding.webp"),
      note: "The day we begin our new journey together.",
      schedule: [
        { label: "Baraat departure", time: "3:00 PM" },
        { label: "Dinner", time: "6:30 PM" },
        { label: "Pheras", time: "11:30 PM" },
        
      ],
    },
  ],
};
