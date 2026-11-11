/**
 * English content. Curriculum names come from PDF 1 (English, spelling fixed);
 * prose is a faithful translation of PDF 2 (Arabic).
 */
export default {
  lang: 'en',
  dir: 'ltr',
  locale: 'en_US',
  path: '/en/',
  alt: { lang: 'ar', path: '/ar/', label: 'العربية', short: 'ع' },

  meta: {
    title: 'Cybersecurity Fundamentals Diploma | EraaSecurity by EraaSoft',
    description:
      'EraaSoft’s Cybersecurity Fundamentals Diploma: 120 hours (about 5 months) from cybersecurity basics, Python, networking, Windows and Linux to Security+, hands-on labs, TryHackMe and a final project.',
    ogImageAlt: 'EraaSecurity — Cybersecurity Fundamentals Diploma by EraaSoft',
  },

  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    close: 'Close',
    langSwitch: 'عرض الصفحة بالعربية',
    railLabel: 'Curriculum sections',
    home: 'EraaSoft — home',
  },

  nav: [
    { href: '#journey', label: 'Curriculum' },
    { href: '#toolkit', label: 'Tools' },
    { href: '#labs', label: 'Projects' },
    { href: '#careers', label: 'Careers' },
    { href: '#faq', label: 'FAQ' },
  ],
  navCta: 'Contact us',

  hero: {
    eyebrow: '// cybersecurity fundamentals diploma',
    title: 'Cybersecurity Fundamentals Diploma',
    lead: 'Build a coherent technical and security foundation, gain hands-on experience with tools and practical tasks, and make an informed decision about your next path in cybersecurity.',
    stats: [
      { value: '120', label: 'hours' },
      { value: '~5', label: 'months' },
      { value: '8', label: 'sections' },
      { value: '15+1', label: 'projects + final project' },
    ],
    ctaPrimary: 'Explore the curriculum',
    ctaSecondary: 'Contact us',
    scroll: 'Scroll to decrypt',
  },

  mission: {
    eyebrow: '// the mission',
    title: 'What is the goal of the Cybersecurity Fundamentals Diploma?',
    lead: 'The diploma builds a progressive foundation in cybersecurity. You start by understanding the field and the concepts of threats and risks, then learn programming basics with Python, networking principles, and the Windows and Linux operating systems, before moving on to cybersecurity concepts, tools, and practical applications.',
    body: 'The core idea is to understand how systems and networks work before studying how to protect or test them. That is why the structure combines technical knowledge, security concepts, and hands-on training and projects.',
    pillars: ['Technical knowledge', 'Security concepts', 'Hands-on training & projects'],
  },

  audience: {
    eyebrow: '// is it for you?',
    title: 'Who is this diploma for?',
    items: [
      'University students and graduates who want to start a career path in cybersecurity.',
      'Beginners interested in the field with no prior practical experience in Cybersecurity.',
      'People working in IT, technical support, networking, or system administration who want to understand the security side of their work.',
      'People considering a future specialization in SOC, Penetration Testing, DFIR, or GRC who want a shared foundation before choosing a specific path.',
      'Anyone who prefers learning through hands-on practice, labs, and projects alongside theory.',
    ],
    beginner: {
      title: 'Is the diploma suitable for complete beginners?',
      answer:
        'Yes. The topics start from foundational concepts and do not assume you are a cybersecurity or programming professional. A dedicated Python basics part, plus parts on networking and operating systems, helps you build knowledge step by step. You will still need to commit to practicing, solving exercises, and reviewing what you learn.',
    },
    prereq: {
      title: 'Do I need any prerequisites?',
      note: 'The following are guidelines that describe the expected readiness — they are not formal admission requirements.',
      subtitle: 'Knowledge that helps before you start',
      items: [
        'General computer skills: managing files and installing software.',
        'Willingness to learn new concepts and try commands and tools yourself.',
        'A reasonable level of English reading, since many tool names, messages, and technical references are in English.',
        'The ability to set aside time for studying and practice outside lecture hours.',
      ],
      footnote:
        'No prior experience in Python, Linux, or security testing tools is required — these topics are part of the diploma structure. Required device specifications and software are confirmed with EraaSoft before the training starts.',
    },
  },

  outcomes: {
    eyebrow: '// what you will learn',
    title: 'What will you learn and gain?',
    intro: 'Eight areas that carry your journey from understanding to practice.',
    items: [
      { title: 'Understanding cybersecurity', text: 'What cybersecurity means, threats and risks, types of attackers, attack and defense methods, and the importance of policies and ethics.' },
      { title: 'Programming fundamentals', text: 'Writing simple Python programs using variables, data types, conditions, loops, functions, and data structures.' },
      { title: 'Networking fundamentals', text: 'Understanding OSI, IPv4, ports, protocols, transmission media, routing and switching, VLANs, and network segmentation.' },
      { title: 'Operating systems', text: 'Working with Windows tools, Command Prompt, and PowerShell, and getting to know Linux administration, files, users, processes, and services.' },
      { title: 'Scripting & automation', text: 'Getting to know Bash and PowerShell and using scripting to perform simple administrative and security tasks.' },
      { title: 'Security concepts', text: 'Security controls, threats and vulnerabilities, security architecture, security operations, incident response, risk management, and governance.' },
      { title: 'Tools & practice', text: 'Hands-on introduction to tools such as Wireshark, Nmap, Nessus, Metasploit, Hydra, John the Ripper, Burp Suite, and CyberChef within authorized labs.' },
      { title: 'Projects', text: 'Practical tasks related to vulnerability scanning, network traffic analysis, scripting, building Python tools, and a final project.' },
    ],
  },

  journey: {
    eyebrow: '// the journey',
    title: 'The curriculum journey',
    intro: (sections, topics) => `${sections} sections, ${topics} topics. Each letter of SECURITY unlocks one section of the curriculum.`,
    sectionLabel: 'Section',
    topicsLabel: (n) => `${n} topics`,
    subtitles: {},
    cert: {
      networkPlus: (p) => `Built ${p}% on the CompTIA Network+ certification`,
      linuxPlus: (p) => `Built ${p}% on the CompTIA Linux+ certification`,
      securityPlus: (p) => `Built ${p}% on the CompTIA Security+ (Version 8) certification`,
    },
    certDisclaimer: 'The diploma is not accredited by CompTIA and does not include exam fees or the official certification.',
    domainsHint: 'Five domains — pick a domain to see its objectives.',
    objectives: null,
    libraries: {
      title: 'Security Libraries',
      scapy: 'For network packet manipulation and scanning.',
      requests: 'For sending HTTP requests (testing web vulnerabilities).',
      cryptography: 'For encryption and decryption tasks.',
    },
    projectsTitle: 'Practical Cybersecurity Projects and Code',
    trackLabel: 'Track',
    trackCert: 'Completion certificate from TryHackMe',
    trackNote: 'Earning the completion certificate depends on the platform’s requirements, the student’s account, and how the training is delivered.',
    toolsLink: 'Meet the tools',
  },

  toolkit: {
    eyebrow: '// toolkit',
    title: 'The tools you will learn',
    intro: 'Eight tools you get hands-on with inside authorized labs. Pick a tool to see what it is for.',
    terminalTitle: 'eraasecurity@lab: ~',
    descriptions: {
      wireshark: 'An introduction to capturing and analyzing network traffic and understanding protocols and communications.',
      nmap: 'Discovering hosts, services, and ports within an authorized scope.',
      john: 'Auditing passwords and hashes in authorized training environments.',
      metasploit: 'Getting to know the penetration testing framework and using it inside safe labs.',
      burp: 'An introduction to testing web applications and analyzing requests and responses.',
      hydra: 'Testing authentication strength in dedicated labs with clear permission.',
      nessus: 'Vulnerability scanning and reading the findings and recommendations.',
      cyberchef: 'Processing data, encodings, and security-related transformations.',
    },
  },

  labs: {
    eyebrow: '// labs & projects',
    title: 'Projects & labs',
    intro: '15 hands-on projects and a final project that brings together everything you learn.',
    labLabel: 'Project',
    finalLabel: 'Final Project',
    titles: [
      'Research report on the cybersecurity field.',
      'Build a small program with Python.',
      'Build a full network simulation & implementation for a company.',
      'Build a small program with PowerShell.',
      'Build a small program with Bash Script.',
      'Build a shell script for automation tasks with AI.',
      'Vulnerability scanning with Nmap & Nessus, and analyzing the results.',
      'Network traffic analysis with Wireshark.',
      'Cracking password hashes with John the Ripper.',
      'Brute-force attack with Hydra.',
      'Risk assessment & vulnerabilities assessment report.',
      'Build a port scanner tool with Python.',
      'Build a hash cracking & generation tool with Python.',
      'Simulated attack on Windows with Metasploit in a lab environment.',
      'IDS lab with Kibana, based on the available training setup.',
    ],
    final: 'Build a cybersecurity framework with Python covering everything learned in the diploma.',
    rulesTitle: 'Important rules during practice',
    rules:
      'Any scanning or offensive test must be done on devices, applications, or networks you own, inside training platforms, or with clear and specific authorization from the system owner. Never use scanning, guessing, or exploitation tools against public systems or other people’s accounts without permission. The purpose of the labs is safe and responsible learning.',
    progress: 'Lab',
    dragHint: 'Scroll to browse the projects',
  },

  careers: {
    eyebrow: '// career paths',
    title: 'What can the diploma prepare you for?',
    note: 'The following are introductory career directions you can explore after the diploma — not a promise of employment or of full specialist skills.',
    items: [
      { title: 'Cybersecurity Trainee / Junior Security', tag: '', text: 'The diploma helps you understand core terminology, systems, networks, and security tools, and gives you an organized starting point to keep learning in the field.' },
      { title: 'SOC Analyst', tag: 'Introductory path', text: 'Networking, operating systems, Security Operations concepts, and security data analysis help you understand how a security operations center works. You will then need deeper training in SIEM, log and alert analysis, and incident response.' },
      { title: 'Junior Penetration Tester', tag: 'Introductory path', text: 'Networking, Linux, and Python fundamentals plus an introduction to scanning and testing tools give you an initial base. Real-world work requires further depth in testing methodologies, web applications, exploitation, and report writing.' },
      { title: 'IT / Network / System Support', tag: 'With security awareness', text: 'You can use networking, Windows, and Linux fundamentals and protection concepts to set up and run systems and networks with greater awareness of security risks.' },
      { title: 'GRC / Information Security', tag: 'Foundational level', text: 'You get to know the concepts of risk, controls, policies, governance, and compliance. GRC roles usually require deeper study of standards and regulations and applying them in practice.' },
    ],
    limitsTitle: 'What the diploma does not guarantee on its own',
    limits: [
      'It does not guarantee a job or an internship just by completing the lectures.',
      'It does not automatically grant official CompTIA certifications; studying a certification’s topics is different from sitting and passing the official exam.',
      'It does not make you an advanced specialist in Penetration Testing, SOC, DFIR, or GRC without additional specialized training.',
      'It does not replace building a portfolio and documented projects, continuous practice, and preparing for interviews and job requirements.',
    ],
    outcome:
      'The best expected outcome: a clearer understanding of the field, an initial technical foundation, experience with a set of tools and projects, and a better ability to choose the path you want to go deeper in.',
  },

  references: {
    eyebrow: '// built on',
    title: 'The references behind the diploma',
    intro: 'The diploma structure is based on the following references and learning tracks.',
    percentLabel: (p) => `${p}% of the certification`,
    descriptions: {
      'py-basics': 'A reference for Python fundamentals such as variables, data types, program flow control, and data structures.',
      'py-cyber': 'An introductory reference linking programming to cybersecurity uses and tasks.',
      'network-plus': 'A reference framework for networking topics: connectivity concepts, infrastructure, implementation, and network security. The networking section is built 70% on this certification.',
      'linux-plus': 'A reference framework for Linux system administration, services, users, security, and scripting. The Linux part is built 70% on this certification.',
      'a-plus': 'A reference resource on the resources list, without a specified percentage or a dedicated section.',
      'security-plus-8': 'The main reference framework for the Cybersecurity section, which is built 100% on this certification.',
      'security-plus-7': 'Listed among the resources, without a separate defined role in the Cybersecurity section structure.',
      'thm-pre': 'A hands-on track within the practical training section.',
      'thm-101': 'A hands-on track within the practical training section.',
      'eraasoft-thm': 'The Practical TryHackMe section is based on EraaSoft.',
    },
    disclaimer: 'Mentioning CompTIA means the diploma topics are based on the frameworks and objectives of these certifications. It does not mean the diploma is accredited by CompTIA or that exam fees or the official certification are included.',
  },

  faq: {
    eyebrow: '// faq',
    title: 'Frequently asked questions',
    items: [
      { q: 'How long is the diploma?', a: 'The diploma is 120 hours, delivered over about 5 months.' },
      { q: 'Do I need a computer science or engineering degree?', a: 'The diploma structure does not require a specific university major. A technical background may help, but readiness to learn and practice matters most. Contact EraaSoft to learn about any official admission requirements.' },
      { q: 'Do I need to know Python?', a: 'No. There is a Python basics section that starts with an introduction, input and output, variables, conditions, loops, functions, and data structures, then moves on to using Python in cybersecurity applications.' },
      { q: 'Will we learn Networking?', a: 'Yes. The section covers networking concepts such as OSI, ports, protocols, and IPv4, then routing, switching, and VLANs, followed by network security fundamentals, segmentation, and defenses.' },
      { q: 'Will we learn Windows and Linux?', a: 'Yes. Windows covers tools such as Task Manager, Command Prompt, and PowerShell, while Linux covers system, device, storage, and network administration, users, processes, software, security, and Bash.' },
      { q: 'Is the diploma practical or theoretical?', a: 'The structure combines theoretical concepts with applications. It includes tools, labs, and projects, as well as two TryHackMe tracks: Pre Security and Cyber Security 101. The amount of practical time and the assessment method depend on how the training is delivered.' },
      { q: 'Will we learn Penetration Testing?', a: 'You will get to know tools and concepts related to vulnerability scanning and security testing, such as Nmap, Nessus, Metasploit, and Burp Suite. However, this is a Fundamentals diploma, so it should not be considered a substitute for a complete professional penetration testing path.' },
      { q: 'Will we learn SOC and Incident Response?', a: 'The content covers monitoring, alerting, data sources, investigation, and incident response concepts. This is foundational knowledge; specializing in SOC requires additional practice with SIEM, analyzing real logs, and investigation scenarios.' },
      { q: 'Will I get a CompTIA certification?', a: 'No. Mentioning CompTIA means the diploma topics are based on the frameworks or objectives of certain certifications. It does not mean the diploma is accredited by CompTIA or that exam fees or the official certification are included.' },
      { q: 'Do the TryHackMe tracks award a certificate?', a: 'The diploma includes completing the Pre Security and Cyber Security 101 tracks on TryHackMe. Completing a track or earning a completion certificate depends on the platform’s requirements, the student’s account, and how the training is delivered.' },
      { q: 'Does the diploma guarantee me a job?', a: 'No. The diploma helps you build the foundation and find your direction, but employment depends on your practical level, your projects, your communication and language skills, and the job and market requirements.' },
    ],
  },

  enroll: {
    eyebrow: '// before you enroll',
    title: 'Advice before you enroll',
    paragraphs: [
      'Ask about the lecture format, the amount of hands-on practice, device specifications, attendance requirements, the assessment method, and whether there are separate fees for platforms, exams, or certifications. It is best to confirm these details with the EraaSoft team before registering.',
      'After you finish, choose one path to go deeper in instead of trying to study every specialization at once. Use the projects you completed as the start of a portfolio, and document what you learned and the results you reached.',
    ],
    goalLabel: 'The goal of the diploma',
    goal: 'Build a coherent technical and security foundation, gain hands-on experience with tools and practical tasks, and help the student make an informed decision about their next path in cybersecurity.',
  },

  contact: {
    eyebrow: '// contact',
    title: 'Ready to start your journey?',
    lead: 'Contact the EraaSoft team to ask about registration and any details you need to confirm.',
    whatsapp: 'Chat on WhatsApp',
    call: 'Call us',
    email: 'Email us',
    socials: 'Follow EraaSoft',
  },

  footer: {
    rights: 'All rights reserved',
    website: 'Official website',
  },
};
