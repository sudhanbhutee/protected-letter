import type { JournalEntry } from './types';

// --- SECURITY NOTE ---
// The SHA-256 hash for the password "jholmomo"
export const SECRET_PASSWORD_HASH = '41c10d6e81a76de867fe9f2c308f0c7592d6a53c91769d62853f3a282c17a2f7';

// The secret content is now structured as a series of journal entries.
// This allows for animating only new content and grouping by date.
export const JOURNAL_ENTRIES: JournalEntry[] = [
  {
    id: 'letter-part-1',
    date: '2025-09-27',
    type: 'letter',
    content: `Hi ,\n\nasti monday ko lagi really sorry hai. You have no idea how worried i was when i heard the news and you weren't reachable.\nI wasn't worried much about the protest as i was worried about the news that the government has fallen. It is worst time for the people safety.tyo bela ta people’s safety sab bhanda big challenge huncha.Since you were not reachable, i was more worried. So i decided to come home. While i was about to leave for the airport, hajur ko tyo mail ayo,full of anger..instead of just telling me tyaha ko situation kasto cha, how's you, ani Mom and bhai ko k khabar cha.`
  },
  {
    id: 'letter-part-2',
    date: '2025-09-27',
    type: 'note',
    content: `By the way how is your prepartion going for the exam?\n\nsuna na can you please take back Mom ko promise. Aba festival month start huncha. Dashain ni start bhayo..then dipawali ani chhath puja.`
  },
  {
    id: 'letter-part-3',
    date: '2025-09-27',
    type: 'note',
    content: `Hajur lai tha cha, asti Ghana jane time flight ma euta sathi banaye. He works in BlackRock company ani usle mero recommendation garyo afno company ma, i wasn't expecting but i got response within 2 days nai. Telephone interview ta Ghana mai bhayo.\n\nTechnical round friday ko din schedule thyo but yaha ghar tira yeti dherai pani pari ra thyo ki bati ga ko gai thyo, ani mobile data ko speed ramro thiyena so aja rati 1 baje tira coding round start huncha cha.`
  },
  {
    id: 'letter-part-4',
    date: '2025-09-27',
    type: 'note',
    content: `It's been more than 3 months since you blocked me, can you please take back Mom ani Didi ko promise and unblock me. I have so much things, photos and stories to show and share... I have been waiting for months that you will take back the promise you gave me once your anger goes down. Aba festival ni ayo ani hajur lai tha nai cha how excited i get to share photos and all the stories specially during these festival months or any puja.`
  },
  {
    id: 'note01-2025-09-27',
    date: '2025-09-27',
    type: 'note',
    content: `You remember that Dove bird? He is still alive, but one of his eye is gone. Yesterday we made a home for him. He loves sitting on my laptop now.\nDo you want to see some pictures?`,
    revealsPhotos: 'photos01-2025-09-27',
  },
  {
    id: 'photos01-2025-09-27',
    date: '2025-09-27',
    type: 'photos',
    items: [
      { url: '/public/bird.jpg', description: 'We built a little home.' },
      { url: '/public/bird01.jpg', description: 'resting after shower' },
    ]
  },
   {
    id: 'note02-2025-09-27',
    date: '2025-09-27',
    type: 'note',
    content: `We also tried our hand at making candles at home... It was so much fun and photoshoot bati gako bela, checkout here!!!`,
    revealsPhotos: 'photos02-2025-09-27',
  },
  {
    id: 'photos02-2025-09-27',
    date: '2025-09-27',
    type: 'photos',
    items: [
      { url: '/public/bhagini01.jpg' },
      { url: '/public/bhagini02.jpg' },
      { url: '/public/with_kids01.jpg' },
      { url: '/public/with_kids02.jpg', description: 'i know i am the one who always lecture you to take your meals on time and its me who lost weight, 17kg' },
      { url: '/public/with_kids03.jpg' },
    ]
  },
  {
    id: 'note03-2025-09-27',
    date: '2025-09-27',
    type: 'note',
    content: `Playing with the lenses. Do you want to see my dragonfly and moth?`,
    revealsPhotos: 'photos03-2025-09-27',
  },
    {
    id: 'photos03-2025-09-27',
    date: '2025-09-27',
    type: 'photos',
    items: [
      { url: '/public/photo1.jpg',description: 'looks like king of insects..born with crown' },
      { url: '/public/photo2.jpg', },
      { url: '/public/photo3.jpg' },
      { url: '/public/photo4.jpg', description: 'new addition to my pet collection...' },
    ]
  },
  {
    id: 'letter-part-5',
    date: '2025-09-27',
    type: 'note',
    content: `You know I'm thinking of buying a DJI drone. India ma expensive cha ani nepal ma ta jhan. But I wanna buy the new model, it has a bigger camera sensor and an array of omni-directional sensors. It is perfectly the way I wanted to buy. If any of your relatives are coming from the US this Dashain or Diwali, then do let me know la.`,
  },
  {
    id: 'note04-2025-10-01',
    date: '2025-10-01',
    type: 'note',
    content: `Mithi ko birthday ko din ko few photos..`,
    revealsPhotos: 'photos04-2025-10-01',
  },
  {
    id: 'photos04-2025-10-01',
    date: '2025-10-01',
    type: 'photos',
    items: [
      { url: '/public/mithi_birthday.jpg'},
      { url: '/public/mithi_birthday01.jpg'},
      { url: '/public/mithi_birthday02.mp4'},
    ]
  },
  {
    id: 'note05-2025-10-01',
    date: '2025-10-01',
    type: 'note',
    content: `Bhauju ko k halat bhako cha 10 din mai, you noticed her dark circle ?`,
    revealsPhotos: 'photos05-2025-10-01',
  },
  {
    id: 'photos05-2025-10-01',
    date: '2025-10-01',
    type: 'photos',
    items: [
      { url: '/public/dashain.jpg', description: 'her eyes..' },
      { url: '/public/dashain01.jpg'},
      { url: '/public/dashain02.mp4', description: 'mela ma mithi..' },
      { url: '/public/hair_clip.mp4.jpg', description: 'bought this in mela' },
      { url: '/public/ice_cream.jpg', description: 'mela ma ice cream party for all the kids..ani return aune time pheri 2kg ice cream' },
    ]
  },
  {
    id: 'note06-2025-10-01',
    date: '2025-10-01',
    type: 'note',
    content: `You remember, hajur lai bhane ko the ni yaha Ghar ko najik euta bread factory cha..dherai mitho smell aye ra thyo..so we bought some..`,
    revealsPhotos: 'photos06-2025-10-01',
  },
  {
    id: 'photos06-2025-10-01',
    date: '2025-10-01',
    type: 'photos',
    items: [
      { url: '/public/bread.jpg', description: 'fresh baked..its still hot and tasty' },
    ]
  },
 {
    id: 'note07-2025-10-03',
    date: '2025-10-03',
    type: 'note',
    content: `Feeding time..`,
    revealsPhotos: 'photos07-2025-10-03',
  },
  {
    id: 'photos07-2025-10-03',
    date: '2025-10-03',
    type: 'photos',
    items: [
      { url: '/public/bird02.mp4', description: 'hijo evening ma bahira ghumi ra thyo' },
      { url: '/public/bird03.mp4', description: 'maja le basera khai ra cha' },
    ]
  },
];