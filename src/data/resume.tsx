import { Icons } from "@/components/icons";

export const TECS = [
  {
    title: "C#",
    icon: "/icons/cs.svg",
  },
  {
    title: "Python",
    icon: "/icons/python.svg",
  },
  {
    title: "C++",
    icon: "/icons/cpp.svg",
  },
  {
    title: "Arduino",
    icon: "/icons/arduino.svg",
  },
  {
    title: "Go",
    icon: "/icons/go.svg",
  },

  {
    title: "JavaScript",
    icon: "/icons/js.svg",
  },
  {
    title: "TypeScript",
    icon: "/icons/typescript.svg",
  },
  {
    title: "Node.js",
    icon: "/icons/nodejs.svg",
  },
  {
    title: "React",
    icon: "/icons/react.svg",
  },
  {
    title: "React Native",
    icon: "/icons/react.svg",
  },
  {
    title: "Next.js",
    icon: "/icons/nextjs.svg",
  },
  {
    title: "Express",
    icon: "/icons/express.svg",
  },

  {
    title: "MongoDB",
    icon: "/icons/mongodb.svg",
  },
  {
    title: "MySQL",
    icon: "/icons/mysql.svg",
  },
  {
    title: "Firebase",
    icon: "/icons/firebase.svg",
  },
  {
    title: "PostgreSQL",
    icon: "/icons/postgresql.svg",
  },
  {
    title: "GraphQL",
    icon: "/icons/graphql.svg",
  },

  {
    title: "HTML",
    icon: "/icons/html.svg",
  },
  {
    title: "CSS",
    icon: "/icons/css.svg",
  },
  {
    title: "Tailwind CSS",
    icon: "/icons/tailwindcss.svg",
  },

  {
    title: "Git",
    icon: "/icons/git.svg",
  },
  {
    title: "Figma",
    icon: "/icons/figma.svg",
  },
  {
    title: "Photoshop",
    icon: "/icons/ps.svg",
  },
  {
    title: "After Effects",
    icon: "/icons/ae.svg",
  },
  {
    title: "Premiere Pro",
    icon: "/icons/pr.svg",
  },

  {
    title: "Docker",
    icon: "/icons/docker.svg",
  },
  {
    title: "Kubernetes",
    icon: "/icons/kubernetes.svg",
  },
  {
    title: "AWS",
    icon: "/icons/aws.svg",
  },
] as const;
export const DATA = {
  gads: "5902111857271047",
  name: "Gürkan Çiloğlu",
  initials: "GC",
  url: "https://grkn.dev",
  keywords:
    "Grkn Dev, Gürkan Çiloğlu, Grkn, GrknDev, GrknDev.com, Software engineer, Next.js, React, React Native, TypeScript, Node.js, Python, Go, Postgres, Docker, Kubernetes, C#, C++, Arduino, HTML, CSS, Tailwind CSS, Git, Figma, Photoshop, After Effects, Premiere Pro, Discord, Samsung, LinkedIn, GitHub, X, Twitter",

  description:
    "Software Developer. I mostly develop backend and mobile . I love building things and helping people.",
  summary:
    "I develop things as a Software Developer. I'm developing somethings for Discord. I also have expertise and experience in embedded systems, web development, mobile development and object oriented programming.",
  avatarUrl: "/me.jpg",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Node.js",
    "Python",
    "Go",
    "Postgres",
    "Docker",
    "Kubernetes",
    "C#",
    "C++",
  ],
  contact: {
    email: "info@grkn.dev",
    social: {
      GitHub: {
        url: "https://github.com/grkndev",
        icon: Icons.github,
      },
      LinkedIn: {
        url: "https://www.linkedin.com/in/grkndev/",
        icon: Icons.linkedin,
      },
      X: {
        url: "https://x.com/grkndev",
        icon: Icons.x,
      },
    },
  },

  work: [
    // {
    //   company: "Nvidia",
    //   href: "https://nvidia.com/",
    //   badges: [],
    //   location: "Santa Clara, CA",
    //   title: "Software Engineer",
    //   logoUrl: "/nvidia.png",
    //   start: "January 2020",
    //   end: "April 2020",
    //   description:
    //     "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    // },
  ],
  education: [
    {
      school: "Middle East Technical University",
      href: "https://metu.edu.tr",
      degree: "Bachelor of Science in Software Engineering",
      logoUrl: "/metu_logo.svg",
      start: "",
      end: "",
    },
  ],
  projects: [
    {
      hasError: true,
      title: "Link to Mac",
      href: "https://github.com/grkndev/LinkToMac",
      dates: "Shared Jun 8, 2026 | Last Updated Jun 26, 2026",
      active: true,
      description:
        "Link to Windows (Phone Link) alternative for macOS. Sync your clipboard, notifications, calls, and more between your Mac and Android devices.",
      technologies: ["React Native", "TypeScript", "Kotlin","Swift", "Java"],
      links: [
      ],
      image: "/rabelcode.png",
      video: "",
    },
    {
      title: "ICleaner",
      hasError: false,
      href: "https://github.com/grkndev/icleaner",
      dates: "Shared Mar 25, 2026 | Last Updated Mar 25, 2026",
      active: false,
      description: "Disk Cleaner and Optimizer for macOS",
      technologies: [
        "GoLang",
        "Makefile",
        "MacOS",
        "Cache",
        "TUI/CLI",
      ],
      links: [],
      image: "/rabelcode.png",
      video: "",
    },
    {
      hasError: true,
      title: "Snowflake Id",
      href: "https://github.com/grkndev/snowflake-id",
      dates: "Shared Sep 15, 2024 | Last Updated Oct 10, 2024",
      active: false,
      description:
        "A simple Snowflake ID generator for JavaScript and TypeScript projects.",
      technologies: ["npm", "TypeScript", "Javascript"],
      links: [
        {
          type: "NPM",
          href: "https://www.npmjs.com/package/@grkndev/snowflakeid",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/rabelcode.png",
      video: "",
    },
    {
      title: "Twitcher",
      hasError: false,
      href: "https://github.com/grkndev/Twitcher",
      dates: "Shared Nov 11, 2023 | Last Updated Now 27, 2023",
      active: false,
      description:
        "A great library that will allow you to use the Twitch API service. All you need to do is use your Token and Client Id information.",
      technologies: ["npm", "TypeScript", "Javascript", "Twitch Api"],
      links: [
        {
          type: "NPM",
          href: "https://www.npmjs.com/package/twitcher",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/rabelcode.png",
      video: "",
    }
    
  ],
  hackathons: [
    {
      title: "Kernel Panic Bootcamp by METU Cybersecurity Society",
      dates: "May 1st - May 3rd, 2026",
      location: "Turkiye",
      description:
        "I successfully completed the Advanced Cyber Security Training organized by METU NCC Cybersecurity Society at METU KALTEV. This intensive 3-day program focused heavily on hands-on practice, covering advanced security tools and real-world scenarios.",
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "Europe Coding School Cybersecurity Bootcamp",
      dates: "April 13th - May 25th, 2026",
      location: "Turkiye",
      description:
        "I successfully completed the Cyber Security Specialist program at Europe Coding School, earning a Certificate of Excellence for outstanding performance. Throughout the training, I gained hands-on expertise in penetration testing, web application security, networking fundamentals, and defense strategies. I am excited to combine my software development skills with a security-first perspective.",
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "METU Cybersecurity Society CTF Competition",
      dates: "December 4th, 2025",
      location: "Turkiye",
      description:
        "I learned how data is stolen in the digital world (hacking) and how to protect against it. After that, I became the first among 32 participants in a CTF competition.",
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "Google DevFest",
      dates: "December 7th - 10th, 2024",
      location: "Turkiye, Izmir",
      description:
        "With the Developer event organized by the Google Developer Community every year in various locations around the world, I learned about next-generation technologies, tools and learned how to develop effectively in my business career.",
      image: "",
      mlh: "",
      links: [],
    },

    {
      title: "DEVember",
      dates: "December 5th - 29th, 2023",
      location: "Remote",
      description:
        "During the month, I specialized in react native and taught me how to build and publish mobile-focused products. A long-term adventure where I learned a new project and a new feature every day",
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "Mobile Mastery",
      dates: "December 1st - 4th, 2023",
      location: "Remote",
      description:
        "The training I received in mobile application development, testing and publishing with React Native ",
      image: "",
      mlh: "",
      links: [],
    },
    {
      title: "Engineers Submit",
      dates: "November 23rd - 25th, 2023",
      location: "Turkiye, Istanbul",
      description:
        "Constructive industry insights and new teachings from today's engineering luminaries.",
      image: "",
      mlh: "",
      links: [],
    },
  ],
} as const;
