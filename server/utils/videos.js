const videos = [
  {
    videoId: "Ke90Tje7VS0",
    title: "React JS - React Tutorial for Beginners",
    thumbnailUrl: "https://i.ytimg.com/vi/Ke90Tje7VS0/hqdefault.jpg",
    videoUrl: "https://youtu.be/Ke90Tje7VS0",
    description: "A comprehensive React tutorial for beginners.",
    channelId: "channel01",
    channelName: "Programming with Mosh",
    views: 6301451,
    likes: 93000,
    dislikes: 45,
    uploadDate: "2024-09-20",
    category: "web development",
    comments: [
      {
        commentId: "comment01",
        userId: "user02",
        text: "Great video! Very helpful.",
        timestamp: "2024-09-21T08:30:00Z"
      }
    ]
  },
  {
    videoId: "ENrzD9HAZK4",
    title: "Node.js Ultimate Beginner's Guide in 7 easy Steps",
    thumbnailUrl: "https://i.ytimg.com/vi/ENrzD9HAZK4/hqdefault.jpg",
    videoUrl: "https://youtu.be/ENrzD9HAZK4",
    description: "Master the fundamentals of Node in 7 easy steps, then build a fullstack web app and deploy it to a cloud server.",
    channelId: "channel02",
    channelName: "freeCodeCamp.org",
    views: 1935315,
    likes: 58074,
    dislikes: 30,
    uploadDate: "2020-05-21",
    category: "web development",
    comments: [
      {
        commentId: "comment02",
        userId: "user03",
        text: "This cleared up so many things about Redux!",
        timestamp: "2023-08-16T10:15:00Z"
      }
    ]
  },
  {
    videoId: "tS7upsfuxmo",
    title: "Tailwind CSS Full Course 2023 | Build and Deploy a Nike Website",
    thumbnailUrl: "https://i.ytimg.com/vi/tS7upsfuxmo/hqdefault.jpg",
    videoUrl: "https://youtu.be/tS7upsfuxmo",
    description: "Dive into Tailwind CSS and build a Nike website from scratch.",
    channelId: "channel03",
    channelName: "JavaScript Mastery",
    views: 850000,
    likes: 42000,
    dislikes: 20,
    uploadDate: "2023-05-10",
    category: "web development",
    comments: [
      {
        commentId: "comment03",
        userId: "user04",
        text: "Amazing tutorial, learned a lot!",
        timestamp: "2023-05-11T12:00:00Z"
      }
    ]
  },
  {
    videoId: "5yEG6GhoJBs",
    title: "Redux - Complete Tutorial (with Redux Toolkit)",
    thumbnailUrl: "https://i.ytimg.com/vi/5yEG6GhoJBs/hqdefault.jpg",
    videoUrl: "https://youtu.be/5yEG6GhoJBs",
    description: "Master Redux with this complete tutorial using Redux Toolkit.",
    channelId: "channel04",
    channelName: "Cosden Solutions",
    views: 950000,
    likes: 48000,
    dislikes: 25,
    uploadDate: "2023-06-20",
    category: "web development",
    comments: [
      {
        commentId: "comment04",
        userId: "user05",
        text: "Redux finally makes sense!",
        timestamp: "2023-06-21T09:45:00Z"
      }
    ]
  },
  {
    videoId: "W6NZfCO5SIk",
    title: "JavaScript Course for Beginner - YOur First to Web Development",
    thumbnailUrl: "https://i.ytimg.com/vi/W6NZfCO5SIk/hqdefault.jpg",
    videoUrl: "https://youtu.be/W6NZfCO5SIk",
    description: "Learn JavaScript basics with this beginner-friendly course.",
    channelId: "channel05",
    channelName: "Programming with Mosh",
    views: 2000000,
    likes: 75000,
    dislikes: 40,
    uploadDate: "2022-01-10",
    category: "JavaScript",
    comments: [
      {
        commentId: "comment05",
        userId: "user06",
        text: "Perfect for beginners!",
        timestamp: "2022-01-11T14:20:00Z"
      }
    ]
  },
  {
    videoId: "Hb9QvSODBPY",
    title: "3 Months DSA Roadmap! Beginner to Advanced Level! | How to use AI and start from zero & get a JOB",
    thumbnailUrl: "https://i.ytimg.com/vi/Hb9QvSODBPY/hqdefault.jpg",
    videoUrl: "https://youtu.be/Hb9QvSODBPY",
    description: "Where to start DSA, nishant chahar, Data Structures, dsa, roadmap, data structures and algorithms, how to learn dsa, how to code, Where to learn data structures, roadmap for freshers",
    channelId: "channel06",
    channelName: "Nishant Chahar",
    views: 1100000,
    likes: 67000,
    dislikes: 35,
    uploadDate: "2023-03-05",
    category: "Data sturctures",
    comments: [
      {
        commentId: "comment06",
        userId: "user07",
        text: "Great introduction to Node.js!",
        timestamp: "2023-03-06T11:10:00Z"
      }
    ]
  },
  {
    videoId: "EE8ZTQxa0AM",
    title: "MongoDB in 5 Minutes with Eliot Horowitz",
    thumbnailUrl: "https://i.ytimg.com/vi/EE8ZTQxa0AM/hqdefault.jpg",
    videoUrl: "https://youtu.be/EE8ZTQxa0AM",
    description: "Learn MongoDB basics in just 5 minutes with Eliot Horowitz.",
    channelId: "channel07",
    channelName: "MongoDB",
    views: 500000,
    likes: 30000,
    dislikes: 15,
    uploadDate: "2023-02-25",
    category: "MongoDB",
    comments: [
      {
        commentId: "comment07",
        userId: "user08",
        text: "Short and informative!",
        timestamp: "2023-02-26T13:50:00Z"
      }
    ]
  },
  {
    videoId: "jl9kHKoSijU",
    title: "Majha Bappa | Deeya Wadkar | Sneha Mahadik | Pravin Koli -Yogita Koli | Official Ganpati Bappa Song",
    thumbnailUrl: "https://i.ytimg.com/vi/jl9kHKoSijU/hqdefault.jpg",
    videoUrl: "https://youtu.be/jl9kHKoSijU",
    description: "A devotional song dedicated to Lord Ganesha.",
    channelId: "channel08",
    channelName: "Pravin Koli",
    views: 1000000,
    likes: 250000,
    dislikes: 10,
    uploadDate: "2022-09-01",
    category: "Music",
    comments: [
      {
        commentId: "comment08",
        userId: "user09",
        text: "Beautiful song!",
        timestamp: "2022-09-02T07:30:00Z"
      }
    ]
  },
  {
    videoId: "RYqJ5w-GrfM",
    title: "Ajay-Atul - Deva Shree Ganesha Best Video|Agneepath|Priyanka Chopra|Hrithik|Ajay Gogavale",
    thumbnailUrl: "https://i.ytimg.com/vi/RYqJ5w-GrfM/hqdefault.jpg",
    videoUrl: "https://youtu.be/RYqJ5w-GrfM",
    description: "Deva Shree Ganesha is a high energy devotional song.",
    channelId: "channel09",
    channelName: "SonyMusicIndiaVEVO",
    views: 1500000,
    likes: 82000,
    dislikes: 50,
    uploadDate: "2023-04-15",
    category: "Music",
    comments: [
      {
        commentId: "comment09",
        userId: "user10",
        text: "Melody song",
        timestamp: "2023-04-16T16:40:00Z"
      }
    ]
  },
  {
    videoId: "3jjsWRtuNHk",
    title: "I BUILD MY NEW CITY",
    thumbnailUrl: "https://i.ytimg.com/vi/3jjsWRtuNHk/hqdefault.jpg",
    videoUrl: "https://youtu.be/3jjsWRtuNHk",
    description: "I BUILD MY NEW CITY | CITY SKYLINES 2 GAMEPLAY #1",
    channelId: "channel10",
    channelName: "Techno Gamerz",
    views: 900000,
    likes: 46000,
    dislikes: 20,
    uploadDate: "2023-07-22",
    category: "Gaming",
    comments: [
      {
        commentId: "comment10",
        userId: "user11",
        text: "amazing game!",
        timestamp: "2023-07-23T10:05:00Z"
      }
    ]
  },
  {
    videoId: "kRQbRAJ4-Fs",
    title: "Build and Deploy an Apple Website with React | Beginner Three.js & GSAP Tutorial",
    thumbnailUrl: "https://i.ytimg.com/vi/kRQbRAJ4-Fs/hqdefault.jpg",
    videoUrl: "https://youtu.be/kRQbRAJ4-Fs",
    description: "Recreate the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects. ",
    channelId: "channel11",
    channelName: "JavaScript Mastery",
    views: 800000,
    likes: 39000,
    dislikes: 18,
    uploadDate: "2023-08-30",
    category: "web development",
    comments: [
      {
        commentId: "comment11",
        userId: "user12",
        text: "Fantastic three.js tutorial!",
        timestamp: "2023-08-31T09:00:00Z"
      }
    ]
  }
];

export default videos