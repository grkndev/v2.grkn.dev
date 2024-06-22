import { Icons } from "@/components/icons";

export const TECS = [
  {
    title: "C#",
    icon: "https://skillicons.dev/icons?i=cs&theme=light",
  },
  {
    title: "Python",
    icon: "https://skillicons.dev/icons?i=python&theme=light",
  },
  {
    title: "C++",
    icon: "https://skillicons.dev/icons?i=cpp&theme=light",
  },
  {
    title: "Arduino",
    icon: "https://skillicons.dev/icons?i=arduino&theme=light",
  },
  {
    title: "Go",
    icon: "https://skillicons.dev/icons?i=go&theme=light",
  },

  {
    title: "JavaScript",
    icon: "https://skillicons.dev/icons?i=js&theme=light",
  },
  {
    title: "TypeScript",
    icon: "https://skillicons.dev/icons?i=typescript&theme=light",
  },
  {
    title: "Node.js",
    icon: "https://skillicons.dev/icons?i=nodejs&theme=light",
  },
  {
    title: "React",
    icon: "https://skillicons.dev/icons?i=react&theme=light",
  },
  {
    title: "React Native",
    icon: "https://skillicons.dev/icons?i=react&theme=light",
  },
  {
    title: "Next.js",
    icon: "https://skillicons.dev/icons?i=nextjs&theme=light",
  },
  {
    title: "Express",
    icon: "https://skillicons.dev/icons?i=express&theme=light",
  },

  {
    title: "MongoDB",
    icon: "https://skillicons.dev/icons?i=mongodb&theme=light",
  },
  {
    title: "MySQL",
    icon: "https://skillicons.dev/icons?i=mysql&theme=light",
  },
  {
    title: "Firebase",
    icon: "https://skillicons.dev/icons?i=firebase&theme=light",
  },
  {
    title: "PostgreSQL",
    icon: "https://skillicons.dev/icons?i=postgresql&theme=light",
  },
  {
    title: "GraphQL",
    icon: "https://skillicons.dev/icons?i=graphql&theme=light",
  },

  {
    title: "HTML",
    icon: "https://skillicons.dev/icons?i=html&theme=light",
  },
  {
    title: "CSS",
    icon: "https://skillicons.dev/icons?i=css&theme=light",
  },
  {
    title: "Tailwind CSS",
    icon: "https://skillicons.dev/icons?i=tailwindcss&theme=light",
  },

  {
    title: "Git",
    icon: "https://skillicons.dev/icons?i=git&theme=light",
  },
  {
    title: "Figma",
    icon: "https://skillicons.dev/icons?i=figma&theme=light",
  },
  {
    title: "Photoshop",
    icon: "https://skillicons.dev/icons?i=ps&theme=light",
  },
  {
    title: "After Effects",
    icon: "https://skillicons.dev/icons?i=ae&theme=light",
  },
  {
    title: "Premiere Pro",
    icon: "https://skillicons.dev/icons?i=pr&theme=light",
  },

  {
    title: "Docker",
    icon: "https://skillicons.dev/icons?i=docker&theme=light",
  },
  {
    title: "Kubernetes",
    icon: "https://skillicons.dev/icons?i=kubernetes&theme=light",
  },
  {
    title: "AWS",
    icon: "https://skillicons.dev/icons?i=aws&theme=light",
  },
] as const;
export const DATA = {
  name: "Gürkan Çiloğlu",
  initials: "GC",
  url: "https://grkn.dev",

  description:
    "Software Engineer.I develop mostly backend and mobile.I love building things and helping people.I am very active on Twitter.",
  summary:
    "I develop things as a Senior Software Engineer. I'm developing somethings for Discord and Samsung. I also have expertise and experience in embedded systems, web development, object oriented programming.",
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
        url: "https://github.com/gweepcreative",
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
    {
      company: "Nvidia",
      href: "https://nvidia.com/",
      badges: [],
      location: "Santa Clara, CA",
      title: "Software Engineer",
      logoUrl: "/nvidia.png",
      start: "January 2020",
      end: "April 2020",
      description:
        "Architected and wrote the entire MVP of the GeForce Now Cloud Gaming internal admin and A/B testing dashboard using React, Redux, TypeScript, and Python.",
    },
  ],
  education: [
    {
      school: "Wilfrid Laurier University",
      href: "https://wlu.ca",
      degree: "Bachelor's Degree of Business Administration (BBA)",
      logoUrl: "/laurier.png",
      start: "2016",
      end: "2021",
    },
  ],
  projects: [
    {
      title: "RabeL Code",
      href: "https://rabelcode.net",
      dates: "2021 - 2023",
      active: false,
      description: "A platform where everyone can share code and find new code",
      technologies: ["Next.js", "MondoDB", "TailwindCSS"],
      links: [
        {
          type: "Website",
          href: "https://rabelcode.net",
          icon: <Icons.globe className="size-3" />,
        }
      ],
      image: "/rabelcode.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "DEVember",
      dates: "December 5th - 29th, 2023",
      location: "Remote",
      description:
        "During the month, I specialized in react native and taught me how to build and publish mobile-focused products. A long-term adventure where I learned a new project and a new feature every day",
      image:
        "",
      mlh: "",
      links: [],
    },
    {
      title: "Mobile Mastery",
      dates: "December 1st - 4th, 2023",
      location: "Remote",
      description:
        "The training I received in mobile application development, testing and publishing with React Native ",
      image:
        "",
      mlh: "",
      links: [],
    },
    {
      title: "Engineers Submit",
      dates: "November 23rd - 25th, 2023",
      location: "Turkiye, Istanbul",
      description:
        "Constructive industry insights and new teachings from today's engineering luminaries.",
      image:
        "",
      mlh: "",
      links: [],
    },
  ],
} as const;
