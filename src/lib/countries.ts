/**
 * Maps country codes / abbreviations stored in the `assets` table
 * to their full display names.  Falls back to the raw value if no
 * mapping exists so new countries surface gracefully.
 */
const COUNTRY_NAMES: Record<string, string> = {
  // Caribbean
  GUY: 'Guyana',
  TRI: 'Trinidad & Tobago',
  TT:  'Trinidad & Tobago',
  JAM: 'Jamaica',
  BAR: 'Barbados',
  BRB: 'Barbados',
  SUR: 'Suriname',
  ANT: 'Antigua & Barbuda',
  STL: 'Saint Lucia',
  GRN: 'Grenada',
  VIN: 'Saint Vincent & the Grenadines',
  SKN: 'Saint Kitts & Nevis',
  DOM: 'Dominica',
  HAI: 'Haiti',
  BEL: 'Belize',

  // South Asia
  IND: 'India',
  NEP: 'Nepal',
  SRI: 'Sri Lanka',
  LKA: 'Sri Lanka',
  PAK: 'Pakistan',
  BGD: 'Bangladesh',
  BTN: 'Bhutan',
  MDV: 'Maldives',

  // North America
  USA: 'United States',
  US:  'United States',
  CAN: 'Canada',
  CA:  'Canada',
  MEX: 'Mexico',

  // United Kingdom & Europe
  UK:  'United Kingdom',
  GBR: 'United Kingdom',
  NED: 'Netherlands',
  NLD: 'Netherlands',
  FRA: 'France',
  GER: 'Germany',
  DEU: 'Germany',
  POR: 'Portugal',
  ESP: 'Spain',
  ITA: 'Italy',
  SWE: 'Sweden',
  NOR: 'Norway',
  DEN: 'Denmark',
  BEL_EU: 'Belgium',
  SWI: 'Switzerland',
  CHE: 'Switzerland',

  // Oceania
  AUS: 'Australia',
  NZL: 'New Zealand',
  NZ:  'New Zealand',
  FIJ: 'Fiji',

  // Africa
  SAF: 'South Africa',
  ZAF: 'South Africa',
  KEN: 'Kenya',
  UGA: 'Uganda',
  TAN: 'Tanzania',
  MAU: 'Mauritius',
  MUS: 'Mauritius',

  // Middle East
  UAE: 'United Arab Emirates',
  KWT: 'Kuwait',
  BAH: 'Bahrain',
  QAT: 'Qatar',
  OMN: 'Oman',

  // Southeast / East Asia
  SIN: 'Singapore',
  SGP: 'Singapore',
  MAL: 'Malaysia',
  MYS: 'Malaysia',
  IDN: 'Indonesia',
  THA: 'Thailand',

  // Americas (other)
  BRA: 'Brazil',
  ARG: 'Argentina',
}

/**
 * Returns the full country name for a stored value, or the original
 * if it's already long-form or unmapped.
 */
export function countryDisplayName(raw: string | null | undefined): string {
  if (!raw) return ''
  // If it already looks like a full name (has a space or > 4 chars and lowercase), return as-is
  const trimmed = raw.trim()
  if (trimmed.length > 4 && trimmed !== trimmed.toUpperCase()) return trimmed
  return COUNTRY_NAMES[trimmed.toUpperCase()] ?? trimmed
}
