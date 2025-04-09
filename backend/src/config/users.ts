export interface SystemUser {
  id: string;
  username: string;
  password: string;
  name: string;
  crm: string;
  role: "admin" | "anesthesiologist";
  signatureFile: string;
}

const users: SystemUser[] = [
  {
    id: '1',
    username: 'bruno.torres',
    password: 'Botelho1',
    name: 'Bruno Torres',
    crm: 'CRM-XX 12345',
    role: 'admin',
    signatureFile: 'assets/signatures/bruno_torres.png',
  },
  {
    id: '2',
    username: 'andressa.fonseca',
    password: 'Botelho1',
    name: 'Andressa Fonseca',
    crm: 'CRM-XX 67890',
    role: 'anesthesiologist',
    signatureFile: 'assets/signatures/andressa_fonseca.png',
  },
];

export default users;
