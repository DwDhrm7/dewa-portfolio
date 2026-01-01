export type Reflection = {
  what: string;
  soWhat: string;
  nowWhat: string;
};

export type Artifact = {
  id: string;
  title: {
    id: string;
    en: string;
  };
  category: "Project Based" | "Case Based" | "Additional";
  role: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  techStack?: string[];
  links?: { label: string; url: string }[];
  reflection: {
    id: Reflection;
    en: Reflection;
  };
};

export const artifacts: Artifact[] = [
  // PROJECT BASED
  {
    id: "sigma",
    title: {
      id: "SIGMA (Smart Intelligent Guidance for Mobility Automation)",
      en: "SIGMA (Smart Intelligent Guidance for Mobility Automation)",
    },
    category: "Project Based",
    role: {
      id: "Project Leader & Developer",
      en: "Project Leader & Developer",
    },
    description: {
      id: "Pengembangan sistem rambu lalu lintas cerdas berbasis IoT dan AI menggunakan YOLOv8 untuk mendeteksi kendaraan dan menyesuaikan durasi lampu hijau secara otomatis, dengan tujuan mengurangi kemacetan di area perkotaan melalui edge computing dan dashboard analitik.",
      en: "Development of an intelligent traffic light system based on IoT and AI using YOLOv8 to detect vehicles and automatically adjust green light duration, aiming to reduce congestion in urban areas through edge computing and analytics dashboard.",
    },
    techStack: [
      "YOLOv8",
      "Raspberry Pi",
      "Python",
      "IoT",
      "Dashboard Analytics",
    ],
    links: [
      {
        label: "YouTube Demo",
        url: "https://youtu.be/CezTSoQYPDo?si=PbVPCk05_xlTGlC3",
      },
    ],
    reflection: {
      id: {
        what: "Proyek ini melibatkan perumusan konsep AIoT untuk mengatasi masalah kemacetan urban, pembuatan model deteksi kendaraan menggunakan YOLOv8, integrasi kamera dan Raspberry Pi sebagai edge device, pengembangan dashboard monitoring real-time, serta pengujian prototipe di lingkungan simulasi. Saya memimpin tim dari ideasi hingga implementasi teknis, koordinasi pengumpulan dataset, training model, dan integrasi hardware-software.",
        soWhat: "Pembelajaran terbesar adalah memahami trade-off antara akurasi model dengan kecepatan inferensi pada perangkat edge yang terbatas. Saya belajar pentingnya optimasi model agar dapat berjalan real-time di Raspberry Pi, kolaborasi lintas hardware dan software engineering, serta problem-solving di kondisi nyata seperti variasi pencahayaan dan sudut kamera. Proyek ini mengajarkan saya bagaimana menerjemahkan konsep AI menjadi solusi praktis yang dapat diimplementasikan.",
        nowWhat: "Ke depan, saya berencana mengembangkan SIGMA menjadi sistem skala kota dengan integrasi data lalu lintas real-time dari berbagai sumber, eksplorasi multi-sensor fusion untuk meningkatkan akurasi, serta publikasi ilmiah tentang metodologi dan hasil penelitian. Saya juga ingin berkontribusi pada implementasi smart city di Indonesia dengan menguji sistem ini di lokasi nyata dan berkolaborasi dengan stakeholder pemerintah.",
      },
      en: {
        what: "This project involved formulating an AIoT concept to address urban congestion issues, creating a vehicle detection model using YOLOv8, integrating cameras and Raspberry Pi as edge devices, developing a real-time monitoring dashboard, and testing prototypes in simulated environments. I led the team from ideation to technical implementation, coordinating dataset collection, model training, and hardware-software integration.",
        soWhat: "The biggest learning was understanding the trade-off between model accuracy and inference speed on limited edge devices. I learned the importance of model optimization to run real-time on Raspberry Pi, cross-domain collaboration between hardware and software engineering, and problem-solving in real conditions like lighting variations and camera angles. This project taught me how to translate AI concepts into practical, implementable solutions.",
        nowWhat: "Moving forward, I plan to develop SIGMA into a city-scale system with real-time traffic data integration from various sources, explore multi-sensor fusion to improve accuracy, and publish scientific papers on methodology and research results. I also want to contribute to smart city implementation in Indonesia by testing this system in real locations and collaborating with government stakeholders.",
      },
    },
  },

  // CASE BASED
  {
    id: "dangdut-research",
    title: {
      id: "Implementation of the Hybrid K-Nearest Neighbour Algorithm for Dangdut Music Sub-Genre Classification",
      en: "Implementation of the Hybrid K-Nearest Neighbour Algorithm for Dangdut Music Sub-Genre Classification",
    },
    category: "Case Based",
    role: {
      id: "Research Assistant / Student Researcher",
      en: "Research Assistant / Student Researcher",
    },
    description: {
      id: "Terlibat dalam penelitian dosen di bidang machine learning, khususnya implementasi algoritma Hybrid K-NN untuk klasifikasi sub-genre musik dangdut. Berkontribusi pada pengumpulan data audio, labeling, dan diskusi terkait teknik ekstraksi fitur serta evaluasi model.",
      en: "Involved in faculty research in machine learning, specifically implementing Hybrid K-NN algorithm for dangdut music sub-genre classification. Contributed to audio data collection, labeling, and discussions on feature extraction techniques and model evaluation.",
    },
    techStack: [
      "Audio Processing",
      "Feature Extraction (MFCC)",
      "K-Nearest Neighbour",
      "Machine Learning",
      "Data Analysis",
    ],
    links: [
      {
        label: "DOI Jurnal",
        url: "https://doi.org/10.30871/jaic.v9i4.9702",
      },
    ],
    reflection: {
      id: {
        what: "Dalam penelitian ini, saya terlibat dalam tahap pengumpulan dataset audio dari berbagai sub-genre dangdut, melakukan pelabelan data dengan supervisi dosen, serta diskusi mendalam tentang teknik ekstraksi fitur audio seperti MFCC (Mel-Frequency Cepstral Coefficients). Saya juga membantu dalam proses pre-processing data, dokumentasi metodologi, dan analisis hasil klasifikasi menggunakan algoritma Hybrid K-NN.",
        soWhat: "Pengalaman ini membuka wawasan saya tentang alur penelitian ilmiah yang sistematis, mulai dari identifikasi masalah hingga publikasi. Saya belajar pentingnya kualitas data dalam machine learning, cara membaca dan membandingkan paper ilmiah, serta memahami bagaimana algoritma klasik seperti K-NN dapat dimodifikasi untuk domain spesifik. Penelitian di ranah musik tradisional/daerah mengajarkan saya bahwa AI dapat diaplikasikan untuk melestarikan dan menganalisis warisan budaya lokal.",
        nowWhat: "Ke depan, saya ingin memperdalam riset di bidang audio AI dan music information retrieval, mengeksplorasi deep learning untuk klasifikasi musik yang lebih kompleks, serta mengembangkan proyek penelitian mandiri yang dapat dipublikasikan di jurnal internasional. Pengalaman ini menjadi fondasi untuk mempersiapkan diri menuju studi lanjut S2 di bidang AI dan berkontribusi pada penelitian yang lebih impactful.",
      },
      en: {
        what: "In this research, I was involved in collecting audio datasets from various dangdut sub-genres, performing data labeling under faculty supervision, and in-depth discussions on audio feature extraction techniques such as MFCC (Mel-Frequency Cepstral Coefficients). I also assisted in data pre-processing, methodology documentation, and analysis of classification results using the Hybrid K-NN algorithm.",
        soWhat: "This experience opened my perspective on systematic scientific research workflow, from problem identification to publication. I learned the importance of data quality in machine learning, how to read and compare scientific papers, and understand how classic algorithms like K-NN can be modified for specific domains. Research in traditional/regional music taught me that AI can be applied to preserve and analyze local cultural heritage.",
        nowWhat: "Moving forward, I want to deepen research in audio AI and music information retrieval, explore deep learning for more complex music classification, and develop independent research projects publishable in international journals. This experience serves as a foundation to prepare for graduate studies in AI and contribute to more impactful research.",
      },
    },
  },

  // ADDITIONAL ARTIFACTS
  {
    id: "theater-poetry",
    title: {
      id: "Teater & Puisi - Teater Biner, PEKSIMIDA, PEKSIMINAS",
      en: "Theater & Poetry - Teater Biner, PEKSIMIDA, PEKSIMINAS",
    },
    category: "Additional",
    role: {
      id: "Writer & Performer",
      en: "Writer & Performer",
    },
    description: {
      id: "Menulis puisi dan naskah teater yang mengangkat isu sosial, perjuangan, dan harapan dengan simbolisme kuat, serta tampil dalam pementasan dan lomba seperti PEKSIMIDA dan PEKSIMINAS. Karya-karya ini menggabungkan narasi emosional dengan kritik sosial yang mendalam.",
      en: "Writing poetry and theater scripts addressing social issues, struggles, and hopes with strong symbolism, and performing in productions and competitions such as PEKSIMIDA and PEKSIMINAS. These works combine emotional narratives with deep social critique.",
    },
    techStack: [],
    links: [
      {
        label: "Video Performance",
        url: "https://youtu.be/El0m7c9QIoU?si=7G929f63QUs4Snpp",
      },
      {
        label: "Artikel Profil",
        url: "https://tatkala.co/2024/09/23/dewa-made-dharma-dan-perjumpaannya-dengan-puisi/",
      },
    ],
    reflection: {
      id: {
        what: "Saya menulis naskah puisi dan teater dengan tema-tema seperti perjuangan identitas, kritik sosial, dan harapan generasi muda. Proses kreatif melibatkan riset mendalam tentang isu yang diangkat, penulisan draft, revisi berkali-kali, serta latihan intensif untuk pementasan. Saya tampil di berbagai panggung termasuk kompetisi tingkat provinsi (PEKSIMIDA) dan nasional (PEKSIMINAS), serta aktif di komunitas Teater Biner.",
        soWhat: "Melalui seni teater dan puisi, saya belajar empati yang lebih dalam terhadap berbagai perspektif kehidupan, mengasah kemampuan komunikasi dan public speaking, serta memahami kekuatan kata-kata dalam menyampaikan pesan moral dan sosial. Seni mengajarkan saya untuk berpikir kreatif, berani mengekspresikan ide, dan menghargai proses kolaboratif dengan sutradara, aktor, dan crew lainnya.",
        nowWhat: "Ke depan, saya ingin mengeksplorasi perpaduan antara seni dan teknologi, misalnya menggunakan AI untuk analisis naskah, digital performance, atau interactive storytelling. Saya juga berencana terus menulis dan tampil untuk menjaga keseimbangan antara sisi teknis dan humanis dalam diri saya, serta menggunakan platform seni sebagai medium untuk menyuarakan isu-isu penting.",
      },
      en: {
        what: "I wrote poetry and theater scripts with themes such as identity struggles, social critique, and youth aspirations. The creative process involved deep research on the issues addressed, drafting, multiple revisions, and intensive rehearsals for performances. I performed on various stages including provincial (PEKSIMIDA) and national (PEKSIMINAS) level competitions, and was active in the Teater Biner community.",
        soWhat: "Through theater and poetry arts, I learned deeper empathy for various life perspectives, honed communication and public speaking skills, and understood the power of words in conveying moral and social messages. Art taught me to think creatively, boldly express ideas, and appreciate collaborative processes with directors, actors, and crew.",
        nowWhat: "Moving forward, I want to explore the fusion of art and technology, such as using AI for script analysis, digital performance, or interactive storytelling. I also plan to continue writing and performing to maintain balance between technical and humanistic aspects within myself, and use art platforms as a medium to voice important issues.",
      },
    },
  },

  {
    id: "rade-leadership",
    title: {
      id: "Leadership - Ketua RADE (Robotics and Embedded Systems Research Group)",
      en: "Leadership - Leader of RADE (Robotics and Embedded Systems Research Group)",
    },
    category: "Additional",
    role: {
      id: "Ketua RADE",
      en: "Leader of RADE",
    },
    description: {
      id: "Memimpin organisasi riset mahasiswa yang fokus pada IoT, robotika, dan AI. Mengkoordinasikan berbagai kegiatan riset, pelatihan teknis, seminar, dan kompetisi nasional. Membangun kultur inovasi dan kolaborasi di kampus serta membawa RADE meraih prestasi di ajang tingkat nasional.",
      en: "Leading a student research organization focused on IoT, robotics, and AI. Coordinating various research activities, technical training, seminars, and national competitions. Building a culture of innovation and collaboration on campus and leading RADE to achievements at the 2025 national level.",
    },
    techStack: [],
    links: [
      {
        label: "Berita Prestasi",
        url: "https://www.stikom-bali.ac.id/id/ukm-rade-itb-stikom-bali-tunjukkan-prestasi-di-ajang-pnbrc-2025-tingkat-nasional/",
      },
    ],
    reflection: {
      id: {
        what: "Sebagai Ketua RADE, saya bertanggung jawab mengkoordinasikan program kerja tahunan, mengelola tim riset dan divisi-divisi, memfasilitasi pelatihan teknis IoT dan robotika, serta memimpin persiapan kompetisi. Saya juga berperan dalam membangun kemitraan dengan industri, mengorganisir seminar dengan pembicara eksternal, dan menciptakan lingkungan yang kondusif untuk eksperimen dan inovasi mahasiswa.",
        soWhat: "Pengalaman kepemimpinan ini mengajarkan saya tentang manajemen tim, delegasi tugas, resolusi konflik, dan pentingnya visi bersama. Saya belajar bahwa leadership bukan hanya tentang mengatur, tetapi juga menginspirasi, mendengarkan, dan memberdayakan anggota untuk berkembang. Prestasi yang diraih RADE di kompetisi nasional menjadi bukti bahwa kolaborasi dan dedikasi dapat menghasilkan dampak nyata.",
        nowWhat: "Ke depan, saya ingin terus mengembangkan kemampuan kepemimpinan dan manajemen organisasi, khususnya dalam konteks riset dan inovasi teknologi. Pengalaman ini menjadi bekal untuk berkarier di perusahaan teknologi atau membangun startup sendiri, di mana kemampuan memimpin tim lintas fungsi sangat krusial. Saya juga berkomitmen untuk terus membimbing junior dan berkontribusi pada ekosistem teknologi di Indonesia.",
      },
      en: {
        what: "As RADE Leader, I was responsible for coordinating annual work programs, managing research teams and divisions, facilitating IoT and robotics technical training, and leading competition preparations. I also played a role in building partnerships with industry, organizing seminars with external speakers, and creating a conducive environment for student experimentation and innovation.",
        soWhat: "This leadership experience taught me about team management, task delegation, conflict resolution, and the importance of shared vision. I learned that leadership is not just about organizing, but also inspiring, listening, and empowering members to develop. RADE's achievements in national competitions prove that collaboration and dedication can produce real impact.",
        nowWhat: "Moving forward, I want to continue developing leadership and organizational management skills, especially in the context of research and technological innovation. This experience serves as preparation for a career in technology companies or building my own startup, where the ability to lead cross-functional teams is crucial. I am also committed to continuing to mentor juniors and contribute to the technology ecosystem in Indonesia.",
      },
    },
  },

  {
    id: "vru-exchange",
    title: {
      id: "Academic & Cross-Cultural Collaboration - VRU Thailand Exchange",
      en: "Academic & Cross-Cultural Collaboration - VRU Thailand Exchange",
    },
    category: "Additional",
    role: {
      id: "Student Delegate",
      en: "Student Delegate",
    },
    description: {
      id: "Delegasi program Lecturer and Student Exchange ITB STIKOM Bali x Valaya Alongkorn Rajabhat University (VRU), Thailand. Mengikuti kuliah tematik (Cloud Computing, Project Management, IT Research Methodology) dan aktivitas budaya (Thai Dance, Cooking Class, VRU Showcase 2025). Program ini memperluas wawasan akademis dan memperkaya pemahaman lintas budaya.",
      en: "Delegate for Lecturer and Student Exchange program ITB STIKOM Bali x Valaya Alongkorn Rajabhat University (VRU), Thailand. Attended thematic courses (Cloud Computing, Project Management, IT Research Methodology) and cultural activities (Thai Dance, Cooking Class, VRU Showcase 2025). This program expanded academic insights and enriched cross-cultural understanding.",
    },
    techStack: [],
    links: [],
    reflection: {
      id: {
        what: "Selama program exchange, saya mengikuti serangkaian kuliah tematik yang memperdalam pemahaman tentang Cloud Computing, Project Management, dan IT Research Methodology dengan perspektif internasional. Saya juga berpartisipasi dalam aktivitas budaya seperti Thai Dance workshop, Thai Cooking Class, dan VRU Showcase 2025, di mana saya berinteraksi dengan mahasiswa dan dosen dari berbagai negara.",
        soWhat: "Program ini memberikan pembelajaran berharga tentang kolaborasi internasional, komunikasi lintas budaya, dan cara pandang berbeda dalam pendekatan akademis. Saya belajar menghargai keberagaman, beradaptasi dengan lingkungan baru, dan membangun jaringan global yang akan berguna di masa depan. Pengalaman ini juga meningkatkan kepercayaan diri saya dalam berkomunikasi menggunakan bahasa Inggris di setting akademis dan profesional.",
        nowWhat: "Ke depan, saya berencana untuk memperluas jaringan internasional melalui konferensi, webinar, dan kolaborasi riset lintas negara. Saya juga ingin mempersiapkan diri untuk melanjutkan studi S2 di luar negeri dengan meningkatkan kemampuan bahasa, memperdalam riset, dan membangun track record akademis yang kuat. Pengalaman exchange ini menjadi langkah awal untuk menjadi profesional teknologi yang berpandangan global.",
      },
      en: {
        what: "During the exchange program, I attended a series of thematic courses that deepened understanding of Cloud Computing, Project Management, and IT Research Methodology with international perspectives. I also participated in cultural activities such as Thai Dance workshop, Thai Cooking Class, and VRU Showcase 2025, where I interacted with students and faculty from various countries.",
        soWhat: "This program provided valuable learning about international collaboration, cross-cultural communication, and different perspectives in academic approaches. I learned to appreciate diversity, adapt to new environments, and build global networks that will be useful in the future. This experience also increased my confidence in communicating in English in academic and professional settings.",
        nowWhat: "Moving forward, I plan to expand international networks through conferences, webinars, and cross-country research collaborations. I also want to prepare for graduate studies abroad by improving language skills, deepening research, and building a strong academic track record. This exchange experience is the first step to becoming a technology professional with a global perspective.",
      },
    },
  },
];