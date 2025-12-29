export type Reflection = {
  what: string;
  soWhat: string;
  nowWhat: string;
};

export type Artifact = {
  id: string;
  title: string;
  category: "Project Based" | "Case Based" | "Additional";
  role: string;
  description: string;
  techStack?: string[];
  links?: { label: string; url: string }[];
  reflection: Reflection;
};

export const artifacts: Artifact[] = [
  // PROJECT BASED
  {
    id: "sigma",
    title: "SIGMA (Smart Intelligent Guidance for Mobility Automation)",
    category: "Project Based",
    role: "Project Leader & Developer",
    description:
      "Pengembangan sistem rambu lalu lintas cerdas berbasis IoT dan AI menggunakan YOLOv8 untuk mendeteksi kendaraan dan menyesuaikan durasi lampu hijau secara otomatis, dengan tujuan mengurangi kemacetan di area perkotaan melalui edge computing dan dashboard analitik.",
    techStack: [
      "YOLOv8",
      "Raspberry Pi",
      "Python",
      "Edge Computing",
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
      what: "Proyek ini melibatkan perumusan konsep AIoT untuk mengatasi masalah kemacetan urban, pembuatan model deteksi kendaraan menggunakan YOLOv8, integrasi kamera dan Raspberry Pi sebagai edge device, pengembangan dashboard monitoring real-time, serta pengujian prototipe di lingkungan simulasi. Saya memimpin tim dari ideasi hingga implementasi teknis, koordinasi pengumpulan dataset, training model, dan integrasi hardware-software.",
      soWhat:
        "Pembelajaran terbesar adalah memahami trade-off antara akurasi model dengan kecepatan inferensi pada perangkat edge yang terbatas. Saya belajar pentingnya optimasi model agar dapat berjalan real-time di Raspberry Pi, kolaborasi lintas hardware dan software engineering, serta problem-solving di kondisi nyata seperti variasi pencahayaan dan sudut kamera. Proyek ini mengajarkan saya bagaimana menerjemahkan konsep AI menjadi solusi praktis yang dapat diimplementasikan.",
      nowWhat:
        "Ke depan, saya berencana mengembangkan SIGMA menjadi sistem skala kota dengan integrasi data lalu lintas real-time dari berbagai sumber, eksplorasi multi-sensor fusion untuk meningkatkan akurasi, serta publikasi ilmiah tentang metodologi dan hasil penelitian. Saya juga ingin berkontribusi pada implementasi smart city di Indonesia dengan menguji sistem ini di lokasi nyata dan berkolaborasi dengan stakeholder pemerintah.",
    },
  },

  // CASE BASED
  {
    id: "dangdut-research",
    title:
      "Implementation of the Hybrid K-Nearest Neighbour Algorithm for Dangdut Music Sub-Genre Classification",
    category: "Case Based",
    role: "Research Assistant / Student Researcher",
    description:
      "Terlibat dalam penelitian dosen di bidang machine learning, khususnya implementasi algoritmi Hybrid K-NN untuk klasifikasi sub-genre musik dangdut. Berkontribusi pada pengumpulan data audio, labeling, dan diskusi terkait teknik ekstraksi fitur serta evaluasi model.",
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
      what: "Dalam penelitian ini, saya terlibat dalam tahap pengumpulan dataset audio dari berbagai sub-genre dangdut, melakukan pelabelan data dengan supervisi dosen, serta diskusi mendalam tentang teknik ekstraksi fitur audio seperti MFCC (Mel-Frequency Cepstral Coefficients). Saya juga membantu dalam proses pre-processing data, dokumentasi metodologi, dan analisis hasil klasifikasi menggunakan algoritma Hybrid K-NN.",
      soWhat:
        "Pengalaman ini membuka wawasan saya tentang alur penelitian ilmiah yang sistematis, mulai dari identifikasi masalah hingga publikasi. Saya belajar pentingnya kualitas data dalam machine learning, cara membaca dan membandingkan paper ilmiah, serta memahami bagaimana algoritma klasik seperti K-NN dapat dimodifikasi untuk domain spesifik. Penelitian di ranah musik tradisional/daerah mengajarkan saya bahwa AI dapat diaplikasikan untuk melestarikan dan menganalisis warisan budaya lokal.",
      nowWhat:
        "Ke depan, saya ingin memperdalam riset di bidang audio AI dan music information retrieval, mengeksplorasi deep learning untuk klasifikasi musik yang lebih kompleks, serta mengembangkan proyek penelitian mandiri yang dapat dipublikasikan di jurnal internasional. Pengalaman ini menjadi fondasi untuk mempersiapkan diri menuju studi lanjut S2 di bidang AI dan berkontribusi pada penelitian yang lebih impactful.",
    },
  },

  // ADDITIONAL ARTIFACTS
  {
    id: "theater-poetry",
    title: "Teater & Puisi - Teater Biner, PEKSIMIDA, PEKSIMINAS",
    category: "Additional",
    role: "Writer & Performer",
    description:
      "Menulis puisi dan naskah teater yang mengangkat isu sosial, perjuangan, dan harapan dengan simbolisme kuat, serta tampil dalam pementasan dan lomba seperti PEKSIMIDA dan PEKSIMINAS. Karya-karya ini menggabungkan narasi emosional dengan kritik sosial yang mendalam.",
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
      what: "Saya menulis naskah puisi dan teater dengan tema-tema seperti perjuangan identitas, kritik sosial, dan harapan generasi muda. Proses kreatif melibatkan riset mendalam tentang isu yang diangkat, penulisan draft, serta latihan intensif untuk pementasan. Saya tampil di berbagai panggung termasuk kompetisi tingkat provinsi (PEKSIMIDA) dan nasional (PEKSIMINAS), serta aktif di komunitas Teater Biner.",
      soWhat:
        "Melalui seni teater dan puisi, saya belajar empati yang lebih dalam terhadap berbagai perspektif kehidupan, mengasah kemampuan komunikasi dan public speaking, serta memahami kekuatan kata-kata dalam menyampaikan pesan moral dan sosial. Seni mengajarkan saya untuk berpikir kreatif, berani mengekspresikan ide, dan menghargai proses kolaboratif dengan sutradara, aktor, dan crew lainnya.",
      nowWhat:
        "Ke depan, saya ingin mengeksplorasi perpaduan antara seni dan teknologi, misalnya menggunakan AI untuk analisis naskah, digital performance, atau interactive storytelling. Saya juga berencana terus menulis dan tampil untuk menjaga keseimbangan antara sisi teknis dan humanis dalam diri saya, serta menggunakan platform seni sebagai medium untuk menyuarakan isu-isu penting.",
    },
  },

  {
    id: "rade-leadership",
    title: "Leadership - Ketua RADE (Robotics and Embedded Systems Research Group)",
    category: "Additional",
    role: "Ketua RADE",
    description:
      "Memimpin organisasi riset mahasiswa yang fokus pada IoT, robotika, dan AI. Mengkoordinasikan berbagai kegiatan riset, pelatihan teknis, seminar, dan kompetisi nasional. Membangun kultur inovasi dan kolaborasi di kampus serta membawa RADE meraih prestasi di berbagai ajang tingkat nasional.",
    techStack: [],
    links: [
      {
        label: "Berita Prestasi",
        url: "https://www.stikom-bali.ac.id/id/ukm-rade-itb-stikom-bali-tunjukkan-prestasi-di-ajang-pnbrc-2025-tingkat-nasional/",
      },
    ],
    reflection: {
      what: "Sebagai Ketua RADE, saya bertanggung jawab mengkoordinasikan program kerja tahunan, mengelola tim riset dan divisi-divisi, memfasilitasi pelatihan teknis IoT dan robotika, serta memimpin persiapan kompetisi. Saya juga berperan dalam membangun kemitraan dengan industri, mengorganisir seminar dengan pembicara eksternal, dan menciptakan lingkungan yang kondusif untuk eksperimen dan inovasi mahasiswa.",
      soWhat:
        "Pengalaman kepemimpinan ini mengajarkan saya tentang manajemen tim, delegasi tugas, resolusi konflik, dan pentingnya visi bersama. Saya belajar bahwa leadership bukan hanya tentang mengatur, tetapi juga menginspirasi, mendengarkan, dan memberdayakan anggota untuk berkembang. Prestasi yang diraih RADE di kompetisi nasional menjadi bukti bahwa kolaborasi dan dedikasi dapat menghasilkan dampak nyata.",
      nowWhat:
        "Ke depan, saya ingin terus mengembangkan kemampuan kepemimpinan dan manajemen organisasi, khususnya dalam konteks riset dan inovasi teknologi. Pengalaman ini menjadi bekal untuk berkarier di perusahaan teknologi atau membangun startup sendiri, di mana kemampuan memimpin tim lintas fungsi sangat krusial. Saya juga berkomitmen untuk terus membimbing junior dan berkontribusi pada ekosistem teknologi di Indonesia.",
    },
  },

  {
    id: "vru-exchange",
    title: "Academic & Cross-Cultural Collaboration - VRU Thailand Exchange",
    category: "Additional",
    role: "Student Delegate",
    description:
      "Delegasi program Lecturer and Student Exchange ITB STIKOM Bali x Valaya Alongkorn Rajabhat University (VRU), Thailand. Mengikuti kuliah tematik (Cloud Computing, Project Management, IT Research Methodology) dan aktivitas budaya (Thai Dance, Cooking Class, VRU Showcase 2025). Program ini memperluas wawasan akademis dan memperkaya pemahaman lintas budaya.",
    techStack: [],
    links: [],
    reflection: {
      what: "Selama program exchange, saya mengikuti serangkaian kuliah tematik yang memperdalam pemahaman tentang Cloud Computing, Project Management, dan IT Research Methodology dengan perspektif internasional. Saya juga berpartisipasi dalam aktivitas budaya seperti Thai Dance workshop, Thai Cooking Class, dan VRU Showcase 2025, di mana saya berinteraksi dengan mahasiswa dan dosen dari berbagai negara.",
      soWhat:
        "Program ini memberikan pembelajaran berharga tentang kolaborasi internasional, komunikasi lintas budaya, dan cara pandang berbeda dalam pendekatan akademis. Saya belajar menghargai keberagaman, beradaptasi dengan lingkungan baru, dan membangun jaringan global yang akan berguna di masa depan. Pengalaman ini juga meningkatkan kepercayaan diri saya dalam berkomunikasi menggunakan bahasa Inggris di setting akademis dan profesional.",
      nowWhat:
        "Ke depan, saya berencana untuk memperluas jaringan internasional melalui konferensi, webinar, dan kolaborasi riset lintas negara. Saya juga ingin mempersiapkan diri untuk melanjutkan studi S2 di luar negeri dengan meningkatkan kemampuan bahasa, memperdalam riset, dan membangun track record akademis yang kuat. Pengalaman exchange ini menjadi langkah awal untuk menjadi profesional teknologi yang berpandangan global.",
    },
  },
];
