/**
 * Language-independent content.
 *
 * SOURCE RULE: every educational item below comes from
 *   PDF 1 — "Cybersecurity_Fundamentals_Course_Structure.pdf"
 *   PDF 2 — "Cybersecurity_Fundamentals_Student_FAQ_Guide_Updated.pdf"
 * Only spelling / grammar was corrected (approved by the client).
 * Curriculum topic names stay in English on both pages (client decision:
 * all technical terms in English).
 */

export const brand = {
  word: 'EraaSecurity',
  prefix: 'Eraa',
  suffix: 'Security',
  diplomaName: 'Cybersecurity Fundamentals Diploma',
  provider: 'EraaSoft',
  providerUrl: 'https://eraasoft.com',
  durationHours: 120, // provided by the client (not in the PDFs)
  durationMonths: 5, // provided by the client: "about 5 months"
};

/** Contact data taken from https://eraasoft.com (footer / contact links). */
export const contact = {
  phoneDisplay: '01070783809',
  phoneHref: 'tel:+201070783809',
  // The official site links to wa.me/2001070783809 (extra 0 after the country code).
  // The valid international format is used here.
  whatsappHref: 'https://wa.me/201070783809',
  email: 'info@eraasoft.com',
  socials: [
    { id: 'facebook', label: 'Facebook', href: 'https://facebook.com/eraasoft' },
    { id: 'instagram', label: 'Instagram', href: 'https://instagram.com/eraasoft' },
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/eraasoft' },
    { id: 'x', label: 'X', href: 'https://x.com/eraasoft' },
    { id: 'youtube', label: 'YouTube', href: 'https://youtube.com/@eraasoft' },
  ],
};

/**
 * PDF 1 — the 8 numbered sections. Each section is indexed by one letter of
 * "SECURITY" (visual index only — the letters carry no meaning).
 * `cert` keys are resolved to localized labels in ar.mjs / en.mjs.
 */
export const curriculum = [
  {
    id: 'intro',
    letter: 'S',
    title: 'Intro to Cybersecurity',
    layout: 'list',
    groups: [
      {
        items: [
          'What is Cybersecurity?',
          'Threats & Risks',
          'Cybersecurity Organizations',
          'Cybersecurity Jobs',
          'How to Get Started?',
          'Types of Attackers',
          'Common Attacks',
          'Methods of Attack',
          'Defenses Against Threats',
          'Policy and Ethics',
        ],
      },
    ],
  },
  {
    id: 'python',
    letter: 'E',
    title: 'Python Programming Fundamentals',
    layout: 'code',
    groups: [
      {
        title: 'Python Fundamentals',
        items: [
          'Introduction to Python',
          'Input & Output',
          'Variables',
          'Operators',
          'Data Types',
          'Conditional Statements',
          'Loops',
          'Functions',
        ],
      },
      {
        title: 'Python Data Structures',
        items: ['String', 'List', 'Tuples', 'Dictionary', 'Arrays'],
      },
    ],
  },
  {
    id: 'network',
    letter: 'C',
    title: 'Network Fundamentals',
    cert: { key: 'networkPlus', percent: 70 },
    layout: 'layers',
    groups: [
      {
        title: 'Networking Concepts',
        items: [
          'OSI Model Layers',
          'Cloud Concepts',
          'Ports and Protocols',
          'Traffic Types',
          'Transmission Media',
          'Network Topologies',
          'IPv4 Addressing',
        ],
      },
      {
        title: 'Network Implementation',
        items: ['Routing Technologies', 'Switching Technologies', 'VLANs'],
      },
      {
        title: 'Network Security',
        items: [
          'Logical Security',
          'Physical Security',
          'Security Terminology',
          'Network Segmentation',
          'Types of Attacks',
          'Security Features and Defense',
        ],
      },
    ],
  },
  {
    id: 'os',
    letter: 'U',
    title: 'Operating Systems: Windows & Linux',
    layout: 'split',
    parts: [
      {
        id: 'windows',
        title: 'Part One — Windows',
        groups: [
          { title: 'Windows Tools', items: ['Task Manager', 'Command Prompt'] },
          { title: 'File Systems', items: ['Handling File Systems'] },
          { title: 'PowerShell Programming Language', items: ['Writing Scripts with PowerShell'] },
        ],
      },
      {
        id: 'linux',
        title: 'Part Two — Linux',
        cert: { key: 'linuxPlus', percent: 70 },
        groups: [
          {
            title: 'System Management',
            items: [
              'Linux Basics',
              'Device Management',
              'Storage Management',
              'Network Configuration',
              'Shell Operations',
              'Virtualization',
            ],
          },
          {
            title: 'Services and User Management',
            items: [
              'Files & Directories',
              'Account Management',
              'Process Control',
              'Software Management',
              'Systems Management',
            ],
          },
          { title: 'Security', items: ['OS Hardening', 'Account Security', 'Cryptography'] },
          {
            title: 'Automation and Scripting',
            items: ['Bash Script Programming Language', 'Shell Scripting', 'Automation', 'AI Best Practices'],
          },
        ],
      },
    ],
  },
  {
    id: 'security-plus',
    letter: 'R',
    title: 'Cybersecurity',
    cert: { key: 'securityPlus', percent: 100 },
    layout: 'domains',
    // Objective translations live in ar.mjs (same order).
    groups: [
      {
        id: 'general',
        title: 'General Security Concepts',
        items: [
          'Compare and contrast various types of security controls',
          'Demonstrate the impact of change management processes on security',
          'Explain the importance of using appropriate cryptographic solutions',
        ],
      },
      {
        id: 'threats',
        title: 'Threats, Vulnerabilities, and Attacks',
        items: [
          'Compare and contrast common threat actors and motivations',
          'Explain common threat vectors and attack surfaces',
          'Analyze indicators of malicious activity',
          'Examine common vulnerabilities and associated risks',
          'Explain the security risks associated with artificial intelligence (AI)',
        ],
      },
      {
        id: 'architecture',
        title: 'Security Architecture',
        items: [
          'Compare and contrast security implications of different architecture models',
          'Apply security principles to secure enterprise infrastructure',
          'Understand concepts related to data protection',
          'Explain the importance of resilience and recovery in security architectures',
        ],
      },
      {
        id: 'operations',
        title: 'Security Operations',
        items: [
          'Apply common security techniques to computing resources',
          'Explain asset management concepts and practices',
          'Analyze indicators of vulnerabilities and implement appropriate mitigation strategies',
          'Describe security monitoring and alerting concepts',
          'Manage identity and access controls',
          'Explain the importance of automation and orchestration in security operations',
          'Implement incident response activities',
          'Use data sources to support investigations',
        ],
      },
      {
        id: 'program',
        title: 'Security Program Management and Oversight',
        items: [
          'Define elements of an effective security governance program',
          'Manage security risk management processes and concepts',
          'Explain third-party risk management concepts',
          'Support security compliance and privacy considerations',
          'Compare and contrast audits and assessments',
          'Promote security awareness practices',
        ],
      },
    ],
  },
  {
    id: 'python-cyber',
    letter: 'I',
    title: 'Python for Cybersecurity',
    layout: 'terminal',
    libraries: [
      { name: 'Scapy', key: 'scapy' },
      { name: 'Requests', key: 'requests' },
      { name: 'cryptography', key: 'cryptography' },
    ],
    projects: ['Building a Port Scanner', 'Building a Hash Cracking & Generation Tool'],
  },
  {
    id: 'tryhackme',
    letter: 'T',
    title: 'Practical TryHackMe',
    layout: 'tracks',
    basedOn: 'Based on EraaSoft',
    tracks: ['Pre Security', 'Cyber Security 101'],
  },
  {
    id: 'exam-qa',
    letter: 'Y',
    title: 'Security+ Exam Q&A',
    layout: 'tools',
    // PDF 1 lists the course tools under this section heading.
    groupTitle: 'What tools are learned in this course?',
  },
];

/** PDF 1 — Section 8 tool list (names as corrected), with PDF 2 descriptions in ar/en. */
export const tools = [
  { id: 'wireshark', name: 'Wireshark', label: 'Wireshark: The Basics', cmd: 'wireshark' },
  { id: 'nmap', name: 'Nmap', label: 'Nmap: The Basics', cmd: 'nmap' },
  { id: 'john', name: 'John the Ripper', label: 'John the Ripper', cmd: 'john' },
  { id: 'metasploit', name: 'Metasploit', label: 'Metasploit', cmd: 'msfconsole' },
  { id: 'burp', name: 'Burp Suite', label: 'Burp Suite: The Basics', cmd: 'burpsuite' },
  { id: 'hydra', name: 'Hydra', label: 'Hydra', cmd: 'hydra' },
  { id: 'nessus', name: 'Nessus', label: 'Nessus', cmd: 'nessus' },
  { id: 'cyberchef', name: 'CyberChef', label: 'CyberChef: The Basics', cmd: 'cyberchef' },
];

/** PDF 1 — "Projects or Labs for this course" (15 + final). Tool tags only where named in the title. */
export const projects = [
  { n: 1, tags: [] },
  { n: 2, tags: ['Python'] },
  { n: 3, tags: [] },
  { n: 4, tags: ['PowerShell'] },
  { n: 5, tags: ['Bash'] },
  { n: 6, tags: ['Shell Script', 'AI'] },
  { n: 7, tags: ['Nmap', 'Nessus'] },
  { n: 8, tags: ['Wireshark'] },
  { n: 9, tags: ['John the Ripper'] },
  { n: 10, tags: ['Hydra'] },
  { n: 11, tags: [] },
  { n: 12, tags: ['Python'] },
  { n: 13, tags: ['Python'] },
  { n: 14, tags: ['Metasploit', 'Windows'] },
  { n: 15, tags: ['IDS', 'Kibana'] },
];

/** PDF 1 p.2 resources + PDF 2 §9 descriptions (in ar/en). */
export const references = [
  { id: 'py-basics', name: 'Python Basics', source: 'GeeksforGeeks' },
  { id: 'py-cyber', name: 'Python for Cybersecurity', source: 'GeeksforGeeks' },
  { id: 'network-plus', name: 'CompTIA Network+', percent: 70 },
  { id: 'linux-plus', name: 'CompTIA Linux+', percent: 70 },
  { id: 'a-plus', name: 'CompTIA A+' },
  { id: 'security-plus-8', name: 'CompTIA Security+ (Version 8)', percent: 100 },
  { id: 'security-plus-7', name: 'CompTIA Security+ (Version 7)' },
  { id: 'thm-pre', name: 'Pre Security Track', source: 'TryHackMe' },
  { id: 'thm-101', name: 'Cyber Security 101 Track', source: 'TryHackMe' },
  { id: 'eraasoft-thm', name: 'Practical TryHackMe Section', source: 'EraaSoft' },
];

/** Count helpers (derived from the data above, never hard-coded). */
export function countTopics() {
  return curriculum.reduce((sum, section) => {
    if (section.groups) sum += section.groups.reduce((s, g) => s + g.items.length, 0);
    if (section.parts) sum += section.parts.reduce((s, p) => s + p.groups.reduce((a, g) => a + g.items.length, 0), 0);
    if (section.libraries) sum += section.libraries.length + section.projects.length;
    if (section.tracks) sum += section.tracks.length;
    if (section.layout === 'tools') sum += tools.length;
    return sum;
  }, 0);
}
