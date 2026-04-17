/**
 * SDO_DOMAINS — Domaines métier de l'application
 */
export const MOCK_DOMAINS = [
  { id: 1, code: 'SOTREL', label: 'SOTREL', description: 'Prestations décès et invalidité', is_active: true,  route: '/sotrel', icon: 'shield' },
  { id: 2, code: 'SADE',   label: 'SADE',   description: 'Suivi Administratif des Entreprises', is_active: true, route: '/sade',   icon: 'building' },
  { id: 3, code: 'IFA',    label: 'IFA',    description: 'Prestpv Ipriac Fongecfa Agecfa',  is_active: false, route: '/ifa',    icon: 'folder' },
  { id: 4, code: 'MII',    label: 'MII',    description: 'Prestpv Mensu Incap Inval',        is_active: false, route: '/mii',    icon: 'folder' },
  { id: 5, code: 'SDC',    label: 'SDC',    description: 'Suivi des Comptes',                is_active: false, route: '/sdc',    icon: 'folder' },
  { id: 6, code: 'GU1',    label: 'GU1',    description: 'Guichet Unique',                   is_active: false, route: '/gu1',    icon: 'folder' },
  { id: 7, code: 'SIP',    label: 'SIP',    description: 'SIPRE',                            is_active: false, route: '/sip',    icon: 'folder' },
]
