export interface VideoItem {
  id: string;
  title: string;
  speaker: string;
  designation: string;
  duration: string;
  youtubeId: string;
  category: "Keynote" | "Inaugural" | "Panel Discussion" | "Academic Paper" | "Valedictory";
  description: string;
  thumbnailUrl: string;
  views?: string;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Inaugural" | "Academic Sessions" | "Dignitaries" | "Audience" | "Campus Life";
  imageUrl: string;
  caption: string;
  featured: boolean;
}

export interface ResearchPaper {
  id: string;
  title: string;
  arabicTitle?: string;
  author: string;
  authorRole: string;
  department: "Muamalah" | "Usrah" | "General Fiqh";
  year: string;
  abstract: string;
  pdfUrl: string;
  downloadUrl: string;
  pages: number;
  featured: boolean;
}

export const CONFERENCE_INFO = {
  name: "INTERNATIONAL FIQH CONFERENCE",
  shortName: "IFC",
  edition: "SEASON 2",
  arabicFaculty: "كلية الشريعة الإسلامية",
  college: "Wafy Campus kalikavu",
  department: "Department of Sharee'ah",
  parentOrg: "Coordination of Islamic Colleges (CIC)",
  themeSeason2: "ISLAMIC FINANCE PRINCIPLES: STRENGTH & OPPORTUNITIES FOR INDIA'S ETHICAL GROWTH",
  themeSeason1: "Contemporary Jurisprudence & Ethical Governance in the Modern World",
  dates: "31 DEC 2025 - 01 JAN 2026",
  time: "10:00 AM - 08:30 PM",
  venue: "Grand Auditorium, Wafy Campus, Kalikavu, Malappuram, Kerala, India",
  chiefGuest: {
    name: "Usthad Abdul Hakeem Faizy Adrissery",
    designation: "General Secretary, Coordination of Islamic Colleges (CIC)",
    image: "/poster.jpg"
  },
  instagram: {
    handle: "@dept.ofshareea",
    url: "https://www.instagram.com/dept.ofshareea/"
  },
  stats: [
    { label: "Delegates", value: "20+" },
    { label: "Research Papers", value: "25+" },
    { label: "Jurists & Scholars", value: "10+" },
    { label: "Academic Sessions", value: "15+" }
  ]
};

export const SHAREEAH_DEPT_INFO = {
  title: "Faculty of Islamic Jurisprudence (كلية الشريعة الإسلامية)",
  duration: "2-Year Advanced Postgraduate Program",
  description:
    "The Department of Sharee'ah at Wafy Campus kalikavu represents the pinnacle of classical Islamic jurisprudence seamlessly integrated with modern legal, commercial, and financial sciences. Spread across two rigorous years of postgraduate research, the department offers specialized streams in Usrah (Family Jurisprudence) and Muamalah (Commercial Law & Islamic Finance).",
  specializations: [
    {
      id: "usrah",
      name: "Department of Usrah (الأحوال الشخصية)",
      title: "Family Jurisprudence & Contemporary Personal Law",
      description:
        "Specialized study of matrimonial laws, inheritance (Mawaarith), custody, dispute mediation, and contemporary legal challenges facing the modern Muslim family.",
      classes: ["USR 1 (Usrah First Year)", "USR 2 (Usrah Second Year)"],
      focusAreas: [
        "Classical & Codified Muslim Personal Law",
        "Inheritance Computation & Complex Mawaarith",
        "Contemporary Matrimonial Arbitration & Family Ethics",
        "Comparative Family Jurisprudence"
      ]
    },
    {
      id: "muamalah",
      name: "Department of Muamalah (المعاملات المالية)",
      title: "Commercial Jurisprudence, Contracts & Islamic Finance",
      description:
        "In-depth research into Islamic commercial transactions, modern banking principles, FinTech compliance, digital assets, Sukuk, and ethical wealth generation.",
      classes: ["MUL 1 (Muamalah First Year)", "MUL 2 (Muamalah Second Year)"],
      focusAreas: [
        "Contemporary Islamic Banking & Microfinance",
        "Smart Contracts, Blockchain & Digital Assets under Fiqh",
        "Waqf Structuring & Social Impact Capital",
        "Classical Contracts (Murabaha, Musharakah, Ijarah, Istisna)"
      ]
    }
  ],
  classesOverview: [
    {
      code: "USR 1",
      name: "Usrah First Year",
      year: "Postgraduate Year 1",
      strength: "28 Scholars",
      coreTheme: "Foundations of Personal Status Jurisprudence"
    },
    {
      code: "MUL 1",
      name: "Muamalah First Year",
      year: "Postgraduate Year 1",
      strength: "32 Scholars",
      coreTheme: "Foundations of Islamic Commercial Law"
    },
    {
      code: "USR 2",
      name: "Usrah Second Year",
      year: "Postgraduate Year 2",
      strength: "26 Scholars",
      coreTheme: "Advanced Family Arbitration & Thesis Defense"
    },
    {
      code: "MUL 2",
      name: "Muamalah Second Year",
      year: "Postgraduate Year 2",
      strength: "30 Scholars",
      coreTheme: "Applied Islamic Finance & Contemporary Legal Rulings"
    }
  ]
};

export const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: "vid-1",
    title: "IFC Season 1 Grand Inaugural Address: Fiqh for Modern Civilisation",
    speaker: "Usthad Abdul Hakeem Faizy Adrissery",
    designation: "General Secretary, CIC",
    duration: "42:15",
    youtubeId: "dQw4w9WgXcQ", // Ready to be replaced by actual IDs or watched
    category: "Inaugural",
    description:
      "The epoch-making inaugural lecture setting the foundational framework of the International Fiqh Conference at Wafy Campus Kalikavu.",
    thumbnailUrl: "/img1.png",
    views: "14.2K views",
    featured: true
  },
  {
    id: "vid-2",
    title: "Islamic Finance Principles: Blueprint for Ethical Economic Growth in India",
    speaker: "Dr. Luqmanul Hakeem Azhari",
    designation: "Senior Jurisprudence Fellow",
    duration: "34:50",
    youtubeId: "LXb3EKWsInQ",
    category: "Keynote",
    description:
      "Exploration of how non-interest participatory finance models can fuel sustainable MSME growth across the Indian subcontinent.",
    thumbnailUrl: "/img2.png",
    views: "9.8K views",
    featured: true
  },
  {
    id: "vid-3",
    title: "Panel Discussion: Digital Currencies & Modern Contracts Under Shariah Review",
    speaker: "Faculty of Muamalah Panel",
    designation: "Muamalah Department, Wafy Campus",
    duration: "58:10",
    youtubeId: "3JZ_D3ELwOQ",
    category: "Panel Discussion",
    description:
      "Intense scholarly deliberation on cryptocurrencies, CBDCs, algorithmic trading, and Islamic contract validity.",
    thumbnailUrl: "/img3.png",
    views: "18.5K views",
    featured: true
  },
  {
    id: "vid-4",
    title: "Contemporary Family Disputes & Mediation Mechanisms in Islamic Jurisprudence",
    speaker: "Faculty of Usrah Scholars",
    designation: "Usrah Department, Wafy Campus",
    duration: "29:45",
    youtubeId: "fJ9rUzIMcZQ",
    category: "Academic Paper",
    description:
      "Analytical framework on non-adversarial resolution, counseling methodologies, and child welfare in modern Fiqh adjudication.",
    thumbnailUrl: "/img4.png",
    views: "7.1K views",
    featured: true
  },
  {
    id: "vid-5",
    title: "IFC Season 1 Concluding Resolutions & Season 2 Roadmap Announcement",
    speaker: "Scholarly Council of Wafy Campus",
    designation: "Wafy Campus Kalikavu",
    duration: "25:30",
    youtubeId: "kXYiU_JCYtU",
    category: "Valedictory",
    description:
      "Official presentation of the 12 declarations of IFC Season 1 and unveiling the monumental theme of Season 2.",
    thumbnailUrl: "/img5.png",
    views: "11.3K views",
    featured: true
  },
  {
    id: "vid-6",
    title: "The Architecture of Classical Fiqh Textual Reasoning: From Usul to Furu",
    speaker: "Usthad K.V. Muhammed Faizy",
    designation: "Professor of Usul al-Fiqh",
    duration: "48:12",
    youtubeId: "2Vv-BfVoq4g",
    category: "Academic Paper",
    description: "Deep dive into hermeneutics, Qiyas, and Istihsan applied to emerging technological realities.",
    thumbnailUrl: "/img2.png",
    views: "6.4K views",
    featured: false
  },
  {
    id: "vid-7",
    title: "Waqf Modernization: Transitioning from Static Assets to Productive Social Capital",
    speaker: "Dr. Faisal Rahman Nadwi",
    designation: "Visiting Chair of Islamic Economics",
    duration: "38:40",
    youtubeId: "L_LUpnjgPso",
    category: "Keynote",
    description: "Revitalizing historic Waqf mechanisms for modern healthcare, university funding, and tech incubators.",
    thumbnailUrl: "/img3.png",
    views: "8.2K views",
    featured: false
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Official IFC Season 2 Announcement & Theme Reveal",
    category: "Inaugural",
    imageUrl: "/poster.jpg",
    caption: "The iconic poster unveiling IFC Season 2: Islamic Finance Principles at Wafy Campus Kalikavu.",
    featured: true
  },
  {
    id: "gal-2",
    title: "Keynote Session in Grand Auditorium",
    category: "Academic Sessions",
    imageUrl: "/img2.png",
    caption: "Scholars, faculty, and research delegates filling the main conference hall during the plenary session.",
    featured: true
  },
  {
    id: "gal-3",
    title: "Scholarly Paper Presentation & Question Session",
    category: "Academic Sessions",
    imageUrl: "/img3.png",
    caption: "Postgraduate scholars of Muamalah & Usrah presenting peer-reviewed research papers.",
    featured: true
  },
  {
    id: "gal-4",
    title: "Dignitaries & Senior Jurists on the Dias",
    category: "Dignitaries",
    imageUrl: "/img4.png",
    caption: "Distinguished scholars from CIC and national universities convening on the dais.",
    featured: true
  },
  {
    id: "gal-5",
    title: "Wafy Campus Kalikavu Sharee'ah Department Delegation",
    category: "Campus Life",
    imageUrl: "/img5.png",
    caption: "The student organizing committee of the Sharee'ah Department who orchestrated the success of Season 1.",
    featured: true
  },
  {
    id: "gal-6",
    title: "Interactive Workshop on Modern Banking Transactions",
    category: "Academic Sessions",
    imageUrl: "/img2.png",
    caption: "Hands-on case studies on structured Islamic financial contracts.",
    featured: false
  },
  {
    id: "gal-7",
    title: "Conference Kit & Academic Journal Release",
    category: "Inaugural",
    imageUrl: "/img3.png",
    caption: "Official release of the IFC Season 1 Research Compendium.",
    featured: false
  }
];

export const RESEARCH_PAPERS: ResearchPaper[] = [
  {
    id: "paper-1",
    title: "Islamic Finance Principles: Strength & Opportunities for India's Ethical Growth",
    arabicTitle: "مبادئ التمويل الإسلامي: القوة والفرص للنمو الأخلاقي في الهند",
    author: "Dept. of Muamalah Research Collective",
    authorRole: "Faculty of Islamic Jurisprudence, Wafy Campus Kalikavu",
    department: "Muamalah",
    year: "2025-2026",
    abstract:
      "This comprehensive research paper examines the compatibility of participatory equity models (Mudarabah & Musharakah) with the contemporary Indian financial framework. It highlights ethical financing as a resilient catalyst for MSME empowerment and rural credit inclusion without predatory interest mechanisms.",
    pdfUrl: "/papers/paper1.pdf",
    downloadUrl: "/papers/paper1.pdf",
    pages: 28,
    featured: true
  },
  {
    id: "paper-2",
    title: "Cryptocurrency, CBDCs & Digital Assets in Contemporary Fiqh Deliberations",
    arabicTitle: "العملات الرقمية والأصول المشفرة في ميزان الفقه الإسلامي المعاصر",
    author: "Scholars of MUL 2 (Muamalah Final Year)",
    authorRole: "Postgraduate Juridical Research Group",
    department: "Muamalah",
    year: "2025",
    abstract:
      "An analytical inquiry assessing whether decentralized tokens fulfill the classical criteria of 'Mal' (property) and 'Taqawwum' (legal validity). Examines smart contracts, proof-of-stake validations, and algorithmic volatility from an Usul al-Fiqh standpoint.",
    pdfUrl: "/papers/paper2.pdf",
    downloadUrl: "/papers/paper2.pdf",
    pages: 34,
    featured: true
  },
  {
    id: "paper-3",
    title: "Mediation & Reconciliation in Modern Marital Disputes: Usrah Jurisprudential Model",
    arabicTitle: "التحكيم والإصلاح في النزاعات الأسرية المعاصرة: نموذج كلية الأسرة",
    author: "Scholars of USR 2 (Usrah Final Year)",
    authorRole: "Family Law & Arbitration Wing",
    department: "Usrah",
    year: "2025",
    abstract:
      "Presents a structured non-adversarial alternative dispute resolution (ADR) framework grounded in Quranic arbitration (Hakamayn). Demonstrates proven community dispute reduction protocols applied across Kerala jurisdictions.",
    pdfUrl: "/papers/paper3.pdf",
    downloadUrl: "/papers/paper3.pdf",
    pages: 24,
    featured: true
  },
  {
    id: "paper-4",
    title: "Dynamic Waqf Governance: Transforming Stagnant Endowments into Sustainable Impact",
    arabicTitle: "حوكمة الأوقاف التنموية: نحو تحويل الأصول الراكدة إلى رؤوس أموال مجتمعية",
    author: "Joint Research Panel (MUL 1 & USR 1)",
    authorRole: "Wafy Campus Academic Fellowship",
    department: "General Fiqh",
    year: "2025",
    abstract:
      "A strategic proposal for cash Waqf funds, corporate Waqf governance, and digital registry systems to fund healthcare, high-tier higher education, and scholarship endowments across minority educational institutions.",
    pdfUrl: "/papers/paper1.pdf",
    downloadUrl: "/papers/paper1.pdf",
    pages: 22,
    featured: true
  }
];
