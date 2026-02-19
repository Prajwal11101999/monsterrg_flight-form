/**
 * Country code interface for phone number selection
 */
export interface CountryCode {
  name: string;
  dialCode: string;
  isoCode: string;
  flag: string;
  minLength: number;  // Minimum mobile number length (without country code)
  maxLength: number;  // Maximum mobile number length (without country code)
}

/**
 * Helper function to get mobile length for a country by ISO code
 * Returns accurate lengths for major countries, reasonable defaults for others
 */
export function getMobileLengthForCountry(isoCode: string): { minLength: number; maxLength: number } {
  const lengths: Record<string, { minLength: number; maxLength: number }> = {
    'US': { minLength: 10, maxLength: 10 },  // United States
    'GB': { minLength: 10, maxLength: 10 },  // United Kingdom
    'IN': { minLength: 10, maxLength: 10 },  // India
    'CA': { minLength: 10, maxLength: 10 },  // Canada
    'AU': { minLength: 9, maxLength: 9 },    // Australia
    'DE': { minLength: 10, maxLength: 11 },  // Germany
    'FR': { minLength: 9, maxLength: 9 },    // France
    'CN': { minLength: 11, maxLength: 11 },  // China
    'JP': { minLength: 10, maxLength: 10 },  // Japan
    'BR': { minLength: 10, maxLength: 11 },  // Brazil
    'MX': { minLength: 10, maxLength: 10 },  // Mexico
    'IT': { minLength: 9, maxLength: 10 },   // Italy
    'ES': { minLength: 9, maxLength: 9 },    // Spain
    'KR': { minLength: 10, maxLength: 11 },  // South Korea
    'RU': { minLength: 10, maxLength: 10 },  // Russia
    'ZA': { minLength: 9, maxLength: 9 },    // South Africa
    'NL': { minLength: 9, maxLength: 9 },    // Netherlands
    'CH': { minLength: 9, maxLength: 9 },    // Switzerland
    'SE': { minLength: 9, maxLength: 9 },    // Sweden
    'PL': { minLength: 9, maxLength: 9 },    // Poland
    'AE': { minLength: 9, maxLength: 9 },    // UAE
    'SA': { minLength: 9, maxLength: 9 },    // Saudi Arabia
    'TR': { minLength: 10, maxLength: 10 },  // Turkey
    'ID': { minLength: 10, maxLength: 13 },  // Indonesia
    'TH': { minLength: 9, maxLength: 9 },    // Thailand
    'PH': { minLength: 10, maxLength: 10 },  // Philippines
    'VN': { minLength: 9, maxLength: 10 },   // Vietnam
    'MY': { minLength: 9, maxLength: 10 },   // Malaysia
    'SG': { minLength: 8, maxLength: 8 },    // Singapore
    'BD': { minLength: 10, maxLength: 10 },  // Bangladesh
    'PK': { minLength: 10, maxLength: 10 },  // Pakistan
    'EG': { minLength: 10, maxLength: 10 },  // Egypt
    'NG': { minLength: 10, maxLength: 10 },  // Nigeria
    'AR': { minLength: 10, maxLength: 10 },  // Argentina
    'CO': { minLength: 10, maxLength: 10 },  // Colombia
    'CL': { minLength: 9, maxLength: 9 },    // Chile
    'PE': { minLength: 9, maxLength: 9 },    // Peru
    'NZ': { minLength: 9, maxLength: 10 },    // New Zealand
    'IE': { minLength: 9, maxLength: 9 },    // Ireland
    'BE': { minLength: 9, maxLength: 9 },    // Belgium
    'AT': { minLength: 10, maxLength: 13 },  // Austria
    'NO': { minLength: 8, maxLength: 8 },    // Norway
    'DK': { minLength: 8, maxLength: 8 },    // Denmark
    'FI': { minLength: 9, maxLength: 10 },   // Finland
    'PT': { minLength: 9, maxLength: 9 },    // Portugal
    'GR': { minLength: 10, maxLength: 10 },  // Greece
    'CZ': { minLength: 9, maxLength: 9 },    // Czech Republic
    'RO': { minLength: 10, maxLength: 10 },  // Romania
    'HU': { minLength: 9, maxLength: 9 },    // Hungary
    'IL': { minLength: 9, maxLength: 10 },   // Israel
  };
  
  return lengths[isoCode] || { minLength: 7, maxLength: 15 };  // Default range for unlisted countries
}

/**
 * Comprehensive list of country codes for phone number input
 * Sorted alphabetically by country name  
 * Mobile length is WITHOUT country code (local number only)
 */
export const COUNTRY_CODES: CountryCode[] = [
  { name: 'Afghanistan', dialCode: '+93', isoCode: 'AF', flag: '🇦🇫', ...getMobileLengthForCountry('AF') },
  { name: 'Albania', dialCode: '+355', isoCode: 'AL', flag: '🇦🇱', ...getMobileLengthForCountry('AL') },
  { name: 'Algeria', dialCode: '+213', isoCode: 'DZ', flag: '🇩🇿', ...getMobileLengthForCountry('DZ') },
  { name: 'American Samoa', dialCode: '+1-684', isoCode: 'AS', flag: '🇦🇸', ...getMobileLengthForCountry('AS') },
  { name: 'Andorra', dialCode: '+376', isoCode: 'AD', flag: '🇦🇩', ...getMobileLengthForCountry('AD') },
  { name: 'Angola', dialCode: '+244', isoCode: 'AO', flag: '🇦🇴', ...getMobileLengthForCountry('AO') },
  { name: 'Anguilla', dialCode: '+1-264', isoCode: 'AI', flag: '🇦🇮', ...getMobileLengthForCountry('AI') },
  { name: 'Antarctica', dialCode: '+672', isoCode: 'AQ', flag: '🇦🇶', ...getMobileLengthForCountry('AQ') },
  { name: 'Antigua and Barbuda', dialCode: '+1-268', isoCode: 'AG', flag: '🇦🇬', ...getMobileLengthForCountry('AG') },
  { name: 'Argentina', dialCode: '+54', isoCode: 'AR', flag: '🇦🇷', ...getMobileLengthForCountry('AR') },
  { name: 'Armenia', dialCode: '+374', isoCode: 'AM', flag: '🇦🇲', ...getMobileLengthForCountry('AM') },
  { name: 'Aruba', dialCode: '+297', isoCode: 'AW', flag: '🇦🇼', ...getMobileLengthForCountry('AW') },
  { name: 'Australia', dialCode: '+61', isoCode: 'AU', flag: '🇦🇺', ...getMobileLengthForCountry('AU') },
  { name: 'Austria', dialCode: '+43', isoCode: 'AT', flag: '🇦🇹', ...getMobileLengthForCountry('AT') },
  { name: 'Azerbaijan', dialCode: '+994', isoCode: 'AZ', flag: '🇦🇿', ...getMobileLengthForCountry('AZ') },
  { name: 'Bahamas', dialCode: '+1-242', isoCode: 'BS', flag: '🇧🇸', ...getMobileLengthForCountry('BS') },
  { name: 'Bahrain', dialCode: '+973', isoCode: 'BH', flag: '🇧🇭', ...getMobileLengthForCountry('BH') },
  { name: 'Bangladesh', dialCode: '+880', isoCode: 'BD', flag: '🇧🇩', ...getMobileLengthForCountry('BD') },
  { name: 'Barbados', dialCode: '+1-246', isoCode: 'BB', flag: '🇧🇧', ...getMobileLengthForCountry('BB') },
  { name: 'Belarus', dialCode: '+375', isoCode: 'BY', flag: '🇧🇾', ...getMobileLengthForCountry('BY') },
  { name: 'Belgium', dialCode: '+32', isoCode: 'BE', flag: '🇧🇪', ...getMobileLengthForCountry('BE') },
  { name: 'Belize', dialCode: '+501', isoCode: 'BZ', flag: '🇧🇿', ...getMobileLengthForCountry('BZ') },
  { name: 'Benin', dialCode: '+229', isoCode: 'BJ', flag: '🇧🇯', ...getMobileLengthForCountry('BJ') },
  { name: 'Bermuda', dialCode: '+1-441', isoCode: 'BM', flag: '🇧🇲', ...getMobileLengthForCountry('BM') },
  { name: 'Bhutan', dialCode: '+975', isoCode: 'BT', flag: '🇧🇹', ...getMobileLengthForCountry('BT') },
  { name: 'Bolivia', dialCode: '+591', isoCode: 'BO', flag: '🇧🇴', ...getMobileLengthForCountry('BO') },
  { name: 'Bosnia and Herzegovina', dialCode: '+387', isoCode: 'BA', flag: '🇧🇦', ...getMobileLengthForCountry('BA') },
  { name: 'Botswana', dialCode: '+267', isoCode: 'BW', flag: '🇧🇼', ...getMobileLengthForCountry('BW') },
  { name: 'Brazil', dialCode: '+55', isoCode: 'BR', flag: '🇧🇷', ...getMobileLengthForCountry('BR') },
  { name: 'British Indian Ocean Territory', dialCode: '+246', isoCode: 'IO', flag: '🇮🇴', ...getMobileLengthForCountry('IO') },
  { name: 'British Virgin Islands', dialCode: '+1-284', isoCode: 'VG', flag: '🇻🇬', ...getMobileLengthForCountry('VG') },
  { name: 'Brunei', dialCode: '+673', isoCode: 'BN', flag: '🇧🇳', ...getMobileLengthForCountry('BN') },
  { name: 'Bulgaria', dialCode: '+359', isoCode: 'BG', flag: '🇧🇬', ...getMobileLengthForCountry('BG') },
  { name: 'Burkina Faso', dialCode: '+226', isoCode: 'BF', flag: '🇧🇫', ...getMobileLengthForCountry('BF') },
  { name: 'Burundi', dialCode: '+257', isoCode: 'BI', flag: '🇧🇮', ...getMobileLengthForCountry('BI') },
  { name: 'Cambodia', dialCode: '+855', isoCode: 'KH', flag: '🇰🇭', ...getMobileLengthForCountry('KH') },
  { name: 'Cameroon', dialCode: '+237', isoCode: 'CM', flag: '🇨🇲', ...getMobileLengthForCountry('CM') },
  { name: 'Canada', dialCode: '+1', isoCode: 'CA', flag: '🇨🇦', ...getMobileLengthForCountry('CA') },
  { name: 'Cape Verde', dialCode: '+238', isoCode: 'CV', flag: '🇨🇻', ...getMobileLengthForCountry('CV') },
  { name: 'Cayman Islands', dialCode: '+1-345', isoCode: 'KY', flag: '🇰🇾', ...getMobileLengthForCountry('KY') },
  { name: 'Central African Republic', dialCode: '+236', isoCode: 'CF', flag: '🇨🇫', ...getMobileLengthForCountry('CF') },
  { name: 'Chad', dialCode: '+235', isoCode: 'TD', flag: '🇹🇩', ...getMobileLengthForCountry('TD') },
  { name: 'Chile', dialCode: '+56', isoCode: 'CL', flag: '🇨🇱', ...getMobileLengthForCountry('CL') },
  { name: 'China', dialCode: '+86', isoCode: 'CN', flag: '🇨🇳', ...getMobileLengthForCountry('CN') },
  { name: 'Christmas Island', dialCode: '+61', isoCode: 'CX', flag: '🇨🇽', ...getMobileLengthForCountry('CX') },
  { name: 'Cocos Islands', dialCode: '+61', isoCode: 'CC', flag: '🇨🇨', ...getMobileLengthForCountry('CC') },
  { name: 'Colombia', dialCode: '+57', isoCode: 'CO', flag: '🇨🇴', ...getMobileLengthForCountry('CO') },
 { name: 'Comoros', dialCode: '+269', isoCode: 'KM', flag: '🇰🇲', ...getMobileLengthForCountry('KM') },
  { name: 'Cook Islands', dialCode: '+682', isoCode: 'CK', flag: '🇨🇰', ...getMobileLengthForCountry('CK') },
  { name: 'Costa Rica', dialCode: '+506', isoCode: 'CR', flag: '🇨🇷', ...getMobileLengthForCountry('CR') },
  { name: 'Croatia', dialCode: '+385', isoCode: 'HR', flag: '🇭🇷', ...getMobileLengthForCountry('HR') },
  { name: 'Cuba', dialCode: '+53', isoCode: 'CU', flag: '🇨🇺', ...getMobileLengthForCountry('CU') },
  { name: 'Curacao', dialCode: '+599', isoCode: 'CW', flag: '🇨🇼', ...getMobileLengthForCountry('CW') },
  { name: 'Cyprus', dialCode: '+357', isoCode: 'CY', flag: '🇨🇾', ...getMobileLengthForCountry('CY') },
  { name: 'Czech Republic', dialCode: '+420', isoCode: 'CZ', flag: '🇨🇿', ...getMobileLengthForCountry('CZ') },
  { name: 'Democratic Republic of the Congo', dialCode: '+243', isoCode: 'CD', flag: '🇨🇩', ...getMobileLengthForCountry('CD') },
  { name: 'Denmark', dialCode: '+45', isoCode: 'DK', flag: '🇩🇰', ...getMobileLengthForCountry('DK') },
  { name: 'Djibouti', dialCode: '+253', isoCode: 'DJ', flag: '🇩🇯', ...getMobileLengthForCountry('DJ') },
  { name: 'Dominica', dialCode: '+1-767', isoCode: 'DM', flag: '🇩🇲', ...getMobileLengthForCountry('DM') },
  { name: 'Dominican Republic', dialCode: '+1-809', isoCode: 'DO', flag: '🇩🇴', ...getMobileLengthForCountry('DO') },
  { name: 'East Timor', dialCode: '+670', isoCode: 'TL', flag: '🇹🇱', ...getMobileLengthForCountry('TL') },
  { name: 'Ecuador', dialCode: '+593', isoCode: 'EC', flag: '🇪🇨', ...getMobileLengthForCountry('EC') },
  { name: 'Egypt', dialCode: '+20', isoCode: 'EG', flag: '🇪🇬', ...getMobileLengthForCountry('EG') },
  { name: 'El Salvador', dialCode: '+503', isoCode: 'SV', flag: '🇸🇻', ...getMobileLengthForCountry('SV') },
  { name: 'Equatorial Guinea', dialCode: '+240', isoCode: 'GQ', flag: '🇬🇶', ...getMobileLengthForCountry('GQ') },
  { name: 'Eritrea', dialCode: '+291', isoCode: 'ER', flag: '🇪🇷', ...getMobileLengthForCountry('ER') },
  { name: 'Estonia', dialCode: '+372', isoCode: 'EE', flag: '🇪🇪', ...getMobileLengthForCountry('EE') },
  { name: 'Ethiopia', dialCode: '+251', isoCode: 'ET', flag: '🇪🇹', ...getMobileLengthForCountry('ET') },
  { name: 'Falkland Islands', dialCode: '+500', isoCode: 'FK', flag: '🇫🇰', ...getMobileLengthForCountry('FK') },
  { name: 'Faroe Islands', dialCode: '+298', isoCode: 'FO', flag: '🇫🇴', ...getMobileLengthForCountry('FO') },
  { name: 'Fiji', dialCode: '+679', isoCode: 'FJ', flag: '🇫🇯', ...getMobileLengthForCountry('FJ') },
  { name: 'Finland', dialCode: '+358', isoCode: 'FI', flag: '🇫🇮', ...getMobileLengthForCountry('FI') },
  { name: 'France', dialCode: '+33', isoCode: 'FR', flag: '🇫🇷', ...getMobileLengthForCountry('FR') },
  { name: 'French Polynesia', dialCode: '+689', isoCode: 'PF', flag: '🇵🇫', ...getMobileLengthForCountry('PF') },
  { name: 'Gabon', dialCode: '+241', isoCode: 'GA', flag: '🇬🇦', ...getMobileLengthForCountry('GA') },
  { name: 'Gambia', dialCode: '+220', isoCode: 'GM', flag: '🇬🇲', ...getMobileLengthForCountry('GM') },
  { name: 'Georgia', dialCode: '+995', isoCode: 'GE', flag: '🇬🇪', ...getMobileLengthForCountry('GE') },
  { name: 'Germany', dialCode: '+49', isoCode: 'DE', flag: '🇩🇪', ...getMobileLengthForCountry('DE') },
  { name: 'Ghana', dialCode: '+233', isoCode: 'GH', flag: '🇬🇭', ...getMobileLengthForCountry('GH') },
  { name: 'Gibraltar', dialCode: '+350', isoCode: 'GI', flag: '🇬🇮', ...getMobileLengthForCountry('GI') },
  { name: 'Greece', dialCode: '+30', isoCode: 'GR', flag: '🇬🇷', ...getMobileLengthForCountry('GR') },
  { name: 'Greenland', dialCode: '+299', isoCode: 'GL', flag: '🇬🇱', ...getMobileLengthForCountry('GL') },
  { name: 'Grenada', dialCode: '+1-473', isoCode: 'GD', flag: '🇬🇩', ...getMobileLengthForCountry('GD') },
  { name: 'Guam', dialCode: '+1-671', isoCode: 'GU', flag: '🇬🇺', ...getMobileLengthForCountry('GU') },
  { name: 'Guatemala', dialCode: '+502', isoCode: 'GT', flag: '🇬🇹', ...getMobileLengthForCountry('GT') },
  { name: 'Guernsey', dialCode: '+44-1481', isoCode: 'GG', flag: '🇬🇬', ...getMobileLengthForCountry('GG') },
  { name: 'Guinea', dialCode: '+224', isoCode: 'GN', flag: '🇬🇳', ...getMobileLengthForCountry('GN') },
  { name: 'Guinea-Bissau', dialCode: '+245', isoCode: 'GW', flag: '🇬🇼', ...getMobileLengthForCountry('GW') },
  { name: 'Guyana', dialCode: '+592', isoCode: 'GY', flag: '🇬🇾', ...getMobileLengthForCountry('GY') },
  { name: 'Haiti', dialCode: '+509', isoCode: 'HT', flag: '🇭🇹', ...getMobileLengthForCountry('HT') },
  { name: 'Honduras', dialCode: '+504', isoCode: 'HN', flag: '🇭🇳', ...getMobileLengthForCountry('HN') },
  { name: 'Hong Kong', dialCode: '+852', isoCode: 'HK', flag: '🇭🇰', ...getMobileLengthForCountry('HK') },
  { name: 'Hungary', dialCode: '+36', isoCode: 'HU', flag: '🇭🇺', ...getMobileLengthForCountry('HU') },
  { name: 'Iceland', dialCode: '+354', isoCode: 'IS', flag: '🇮🇸', ...getMobileLengthForCountry('IS') },
  { name: 'India', dialCode: '+91', isoCode: 'IN', flag: '🇮🇳', ...getMobileLengthForCountry('IN') },
  { name: 'Indonesia', dialCode: '+62', isoCode: 'ID', flag: '🇮🇩', ...getMobileLengthForCountry('ID') },
 { name: 'Iran', dialCode: '+98', isoCode: 'IR', flag: '🇮🇷', ...getMobileLengthForCountry('IR') },
  { name: 'Iraq', dialCode: '+964', isoCode: 'IQ', flag: '🇮🇶', ...getMobileLengthForCountry('IQ') },
  { name: 'Ireland', dialCode: '+353', isoCode: 'IE', flag: '🇮🇪', ...getMobileLengthForCountry('IE') },
  { name: 'Isle of Man', dialCode: '+44-1624', isoCode: 'IM', flag: '🇮🇲', ...getMobileLengthForCountry('IM') },
  { name: 'Israel', dialCode: '+972', isoCode: 'IL', flag: '🇮🇱', ...getMobileLengthForCountry('IL') },
  { name: 'Italy', dialCode: '+39', isoCode: 'IT', flag: '🇮🇹', ...getMobileLengthForCountry('IT') },
  { name: 'Ivory Coast', dialCode: '+225', isoCode: 'CI', flag: '🇨🇮', ...getMobileLengthForCountry('CI') },
  { name: 'Jamaica', dialCode: '+1-876', isoCode: 'JM', flag: '🇯🇲', ...getMobileLengthForCountry('JM') },
  { name: 'Japan', dialCode: '+81', isoCode: 'JP', flag: '🇯🇵', ...getMobileLengthForCountry('JP') },
  { name: 'Jersey', dialCode: '+44-1534', isoCode: 'JE', flag: '🇯🇪', ...getMobileLengthForCountry('JE') },
  { name: 'Jordan', dialCode: '+962', isoCode: 'JO', flag: '🇯🇴', ...getMobileLengthForCountry('JO') },
  { name: 'Kazakhstan', dialCode: '+7', isoCode: 'KZ', flag: '🇰🇿', ...getMobileLengthForCountry('KZ') },
  { name: 'Kenya', dialCode: '+254', isoCode: 'KE', flag: '🇰🇪', ...getMobileLengthForCountry('KE') },
  { name: 'Kiribati', dialCode: '+686', isoCode: 'KI', flag: '🇰🇮', ...getMobileLengthForCountry('KI') },
  { name: 'Kosovo', dialCode: '+383', isoCode: 'XK', flag: '🇽🇰', ...getMobileLengthForCountry('XK') },
  { name: 'Kuwait', dialCode: '+965', isoCode: 'KW', flag: '🇰🇼', ...getMobileLengthForCountry('KW') },
  { name: 'Kyrgyzstan', dialCode: '+996', isoCode: 'KG', flag: '🇰🇬', ...getMobileLengthForCountry('KG') },
  { name: 'Laos', dialCode: '+856', isoCode: 'LA', flag: '🇱🇦', ...getMobileLengthForCountry('LA') },
  { name: 'Latvia', dialCode: '+371', isoCode: 'LV', flag: '🇱🇻', ...getMobileLengthForCountry('LV') },
  { name: 'Lebanon', dialCode: '+961', isoCode: 'LB', flag: '🇱🇧', ...getMobileLengthForCountry('LB') },
  { name: 'Lesotho', dialCode: '+266', isoCode: 'LS', flag: '🇱🇸', ...getMobileLengthForCountry('LS') },
  { name: 'Liberia', dialCode: '+231', isoCode: 'LR', flag: '🇱🇷', ...getMobileLengthForCountry('LR') },
  { name: 'Libya', dialCode: '+218', isoCode: 'LY', flag: '🇱🇾', ...getMobileLengthForCountry('LY') },
  { name: 'Liechtenstein', dialCode: '+423', isoCode: 'LI', flag: '🇱🇮', ...getMobileLengthForCountry('LI') },
  { name: 'Lithuania', dialCode: '+370', isoCode: 'LT', flag: '🇱🇹', ...getMobileLengthForCountry('LT') },
  { name: 'Luxembourg', dialCode: '+352', isoCode: 'LU', flag: '🇱🇺', ...getMobileLengthForCountry('LU') },
  { name: 'Macau', dialCode: '+853', isoCode: 'MO', flag: '🇲🇴', ...getMobileLengthForCountry('MO') },
  { name: 'Macedonia', dialCode: '+389', isoCode: 'MK', flag: '🇲🇰', ...getMobileLengthForCountry('MK') },
  { name: 'Madagascar', dialCode: '+261', isoCode: 'MG', flag: '🇲🇬', ...getMobileLengthForCountry('MG') },
  { name: 'Malawi', dialCode: '+265', isoCode: 'MW', flag: '🇲🇼', ...getMobileLengthForCountry('MW') },
  { name: 'Malaysia', dialCode: '+60', isoCode: 'MY', flag: '🇲🇾', ...getMobileLengthForCountry('MY') },
  { name: 'Maldives', dialCode: '+960', isoCode: 'MV', flag: '🇲🇻', ...getMobileLengthForCountry('MV') },
{ name: 'Mali', dialCode: '+223', isoCode: 'ML', flag: '🇲🇱', ...getMobileLengthForCountry('ML') },
  { name: 'Malta', dialCode: '+356', isoCode: 'MT', flag: '🇲🇹', ...getMobileLengthForCountry('MT') },
  { name: 'Marshall Islands', dialCode: '+692', isoCode: 'MH', flag: '🇲🇭', ...getMobileLengthForCountry('MH') },
  { name: 'Mauritania', dialCode: '+222', isoCode: 'MR', flag: '🇲🇷', ...getMobileLengthForCountry('MR') },
  { name: 'Mauritius', dialCode: '+230', isoCode: 'MU', flag: '🇲🇺', ...getMobileLengthForCountry('MU') },
  { name: 'Mayotte', dialCode: '+262', isoCode: 'YT', flag: '🇾🇹', ...getMobileLengthForCountry('YT') },
  { name: 'Mexico', dialCode: '+52', isoCode: 'MX', flag: '🇲🇽', ...getMobileLengthForCountry('MX') },
  { name: 'Micronesia', dialCode: '+691', isoCode: 'FM', flag: '🇫🇲', ...getMobileLengthForCountry('FM') },
  { name: 'Moldova', dialCode: '+373', isoCode: 'MD', flag: '🇲🇩', ...getMobileLengthForCountry('MD') },
  { name: 'Monaco', dialCode: '+377', isoCode: 'MC', flag: '🇲🇨', ...getMobileLengthForCountry('MC') },
  { name: 'Mongolia', dialCode: '+976', isoCode: 'MN', flag: '🇲🇳', ...getMobileLengthForCountry('MN') },
  { name: 'Montenegro', dialCode: '+382', isoCode: 'ME', flag: '🇲🇪', ...getMobileLengthForCountry('ME') },
  { name: 'Montserrat', dialCode: '+1-664', isoCode: 'MS', flag: '🇲🇸', ...getMobileLengthForCountry('MS') },
  { name: 'Morocco', dialCode: '+212', isoCode: 'MA', flag: '🇲🇦', ...getMobileLengthForCountry('MA') },
  { name: 'Mozambique', dialCode: '+258', isoCode: 'MZ', flag: '🇲🇿', ...getMobileLengthForCountry('MZ') },
  { name: 'Myanmar', dialCode: '+95', isoCode: 'MM', flag: '🇲🇲', ...getMobileLengthForCountry('MM') },
  { name: 'Namibia', dialCode: '+264', isoCode: 'NA', flag: '🇳🇦', ...getMobileLengthForCountry('NA') },
  { name: 'Nauru', dialCode: '+674', isoCode: 'NR', flag: '🇳🇷', ...getMobileLengthForCountry('NR') },
  { name: 'Nepal', dialCode: '+977', isoCode: 'NP', flag: '🇳🇵', ...getMobileLengthForCountry('NP') },
  { name: 'Netherlands', dialCode: '+31', isoCode: 'NL', flag: '🇳🇱', ...getMobileLengthForCountry('NL') },
  { name: 'Netherlands Antilles', dialCode: '+599', isoCode: 'AN', flag: '🇧🇶', ...getMobileLengthForCountry('AN') },
  { name: 'New Caledonia', dialCode: '+687', isoCode: 'NC', flag: '🇳🇨', ...getMobileLengthForCountry('NC') },
  { name: 'New Zealand', dialCode: '+64', isoCode: 'NZ', flag: '🇳🇿', ...getMobileLengthForCountry('NZ') },
  { name: 'Nicaragua', dialCode: '+505', isoCode: 'NI', flag: '🇳🇮', ...getMobileLengthForCountry('NI') },
  { name: 'Niger', dialCode: '+227', isoCode: 'NE', flag: '🇳🇪', ...getMobileLengthForCountry('NE') },
  { name: 'Nigeria', dialCode: '+234', isoCode: 'NG', flag: '🇳🇬', ...getMobileLengthForCountry('NG') },
  { name: 'Niue', dialCode: '+683', isoCode: 'NU', flag: '🇳🇺', ...getMobileLengthForCountry('NU') },
  { name: 'North Korea', dialCode: '+850', isoCode: 'KP', flag: '🇰🇵', ...getMobileLengthForCountry('KP') },
  { name: 'Northern Mariana Islands', dialCode: '+1-670', isoCode: 'MP', flag: '🇲🇵', ...getMobileLengthForCountry('MP') },
  { name: 'Norway', dialCode: '+47', isoCode: 'NO', flag: '🇳🇴', ...getMobileLengthForCountry('NO') },
  { name: 'Oman', dialCode: '+968', isoCode: 'OM', flag: '🇴🇲', ...getMobileLengthForCountry('OM') },
  { name: 'Pakistan', dialCode: '+92', isoCode: 'PK', flag: '🇵🇰', ...getMobileLengthForCountry('PK') },
  { name: 'Palau', dialCode: '+680', isoCode: 'PW', flag: '🇵🇼', ...getMobileLengthForCountry('PW') },
  { name: 'Palestine', dialCode: '+970', isoCode: 'PS', flag: '🇵🇸', ...getMobileLengthForCountry('PS') },
  { name: 'Panama', dialCode: '+507', isoCode: 'PA', flag: '🇵🇦', ...getMobileLengthForCountry('PA') },
  { name: 'Papua New Guinea', dialCode: '+675', isoCode: 'PG', flag: '🇵🇬', ...getMobileLengthForCountry('PG') },
  { name: 'Paraguay', dialCode: '+595', isoCode: 'PY', flag: '🇵🇾', ...getMobileLengthForCountry('PY') },
  { name: 'Peru', dialCode: '+51', isoCode: 'PE', flag: '🇵🇪', ...getMobileLengthForCountry('PE') },
  { name: 'Philippines', dialCode: '+63', isoCode: 'PH', flag: '🇵🇭', ...getMobileLengthForCountry('PH') },
  { name: 'Pitcairn', dialCode: '+64', isoCode: 'PN', flag: '🇵🇳', ...getMobileLengthForCountry('PN') },
  { name: 'Poland', dialCode: '+48', isoCode: 'PL', flag: '🇵🇱', ...getMobileLengthForCountry('PL') },
  { name: 'Portugal', dialCode: '+351', isoCode: 'PT', flag: '🇵🇹', ...getMobileLengthForCountry('PT') },
  { name: 'Puerto Rico', dialCode: '+1-787', isoCode: 'PR', flag: '🇵🇷', ...getMobileLengthForCountry('PR') },
  { name: 'Qatar', dialCode: '+974', isoCode: 'QA', flag: '🇶🇦', ...getMobileLengthForCountry('QA') },
  { name: 'Republic of the Congo', dialCode: '+242', isoCode: 'CG', flag: '🇨🇬', ...getMobileLengthForCountry('CG') },
  { name: 'Reunion', dialCode: '+262', isoCode: 'RE', flag: '🇷🇪', ...getMobileLengthForCountry('RE') },
  { name: 'Romania', dialCode: '+40', isoCode: 'RO', flag: '🇷🇴', ...getMobileLengthForCountry('RO') },
  { name: 'Russia', dialCode: '+7', isoCode: 'RU', flag: '🇷🇺', ...getMobileLengthForCountry('RU') },
  { name: 'Rwanda', dialCode: '+250', isoCode: 'RW', flag: '🇷🇼', ...getMobileLengthForCountry('RW') },
  { name: 'Saint Barthelemy', dialCode: '+590', isoCode: 'BL', flag: '🇧🇱', ...getMobileLengthForCountry('BL') },
  { name: 'Saint Helena', dialCode: '+290', isoCode: 'SH', flag: '🇸🇭', ...getMobileLengthForCountry('SH') },
  { name: 'Saint Kitts and Nevis', dialCode: '+1-869', isoCode: 'KN', flag: '🇰🇳', ...getMobileLengthForCountry('KN') },
  { name: 'Saint Lucia', dialCode: '+1-758', isoCode: 'LC', flag: '🇱🇨', ...getMobileLengthForCountry('LC') },
  { name: 'Saint Martin', dialCode: '+590', isoCode: 'MF', flag: '🇲🇫', ...getMobileLengthForCountry('MF') },
  { name: 'Saint Pierre and Miquelon', dialCode: '+508', isoCode: 'PM', flag: '🇵🇲', ...getMobileLengthForCountry('PM') },
  { name: 'Saint Vincent and the Grenadines', dialCode: '+1-784', isoCode: 'VC', flag: '🇻🇨', ...getMobileLengthForCountry('VC') },
  { name: 'Samoa', dialCode: '+685', isoCode: 'WS', flag: '🇼🇸', ...getMobileLengthForCountry('WS') },
  { name: 'San Marino', dialCode: '+378', isoCode: 'SM', flag: '🇸🇲', ...getMobileLengthForCountry('SM') },
  { name: 'Sao Tome and Principe', dialCode: '+239', isoCode: 'ST', flag: '🇸🇹', ...getMobileLengthForCountry('ST') },
  { name: 'Saudi Arabia', dialCode: '+966', isoCode: 'SA', flag: '🇸🇦', ...getMobileLengthForCountry('SA') },
  { name: 'Senegal', dialCode: '+221', isoCode: 'SN', flag: '🇸🇳', ...getMobileLengthForCountry('SN') },
  { name: 'Serbia', dialCode: '+381', isoCode: 'RS', flag: '🇷🇸', ...getMobileLengthForCountry('RS') },
  { name: 'Seychelles', dialCode: '+248', isoCode: 'SC', flag: '🇸🇨', ...getMobileLengthForCountry('SC') },
  { name: 'Sierra Leone', dialCode: '+232', isoCode: 'SL', flag: '🇸🇱', ...getMobileLengthForCountry('SL') },
  { name: 'Singapore', dialCode: '+65', isoCode: 'SG', flag: '🇸🇬', ...getMobileLengthForCountry('SG') },
  { name: 'Sint Maarten', dialCode: '+1-721', isoCode: 'SX', flag: '🇸🇽', ...getMobileLengthForCountry('SX') },
  { name: 'Slovakia', dialCode: '+421', isoCode: 'SK', flag: '🇸🇰', ...getMobileLengthForCountry('SK') },
  { name: 'Slovenia', dialCode: '+386', isoCode: 'SI', flag: '🇸🇮', ...getMobileLengthForCountry('SI') },
  { name: 'Solomon Islands', dialCode: '+677', isoCode: 'SB', flag: '🇸🇧', ...getMobileLengthForCountry('SB') },
  { name: 'Somalia', dialCode: '+252', isoCode: 'SO', flag: '🇸🇴', ...getMobileLengthForCountry('SO') },
  { name: 'South Africa', dialCode: '+27', isoCode: 'ZA', flag: '🇿🇦', ...getMobileLengthForCountry('ZA') },
  { name: 'South Korea', dialCode: '+82', isoCode: 'KR', flag: '🇰🇷', ...getMobileLengthForCountry('KR') },
  { name: 'South Sudan', dialCode: '+211', isoCode: 'SS', flag: '🇸🇸', ...getMobileLengthForCountry('SS') },
  { name: 'Spain', dialCode: '+34', isoCode: 'ES', flag: '🇪🇸', ...getMobileLengthForCountry('ES') },
  { name: 'Sri Lanka', dialCode: '+94', isoCode: 'LK', flag: '🇱🇰', ...getMobileLengthForCountry('LK') },
  { name: 'Sudan', dialCode: '+249', isoCode: 'SD', flag: '🇸🇩', ...getMobileLengthForCountry('SD') },
  { name: 'Suriname', dialCode: '+597', isoCode: 'SR', flag: '🇸🇷', ...getMobileLengthForCountry('SR') },
  { name: 'Svalbard and Jan Mayen', dialCode: '+47', isoCode: 'SJ', flag: '🇸🇯', ...getMobileLengthForCountry('SJ') },
  { name: 'Swaziland', dialCode: '+268', isoCode: 'SZ', flag: '🇸🇿', ...getMobileLengthForCountry('SZ') },
  { name: 'Sweden', dialCode: '+46', isoCode: 'SE', flag: '🇸🇪', ...getMobileLengthForCountry('SE') },
  { name: 'Switzerland', dialCode: '+41', isoCode: 'CH', flag: '🇨🇭', ...getMobileLengthForCountry('CH') },
  { name: 'Syria', dialCode: '+963', isoCode: 'SY', flag: '🇸🇾', ...getMobileLengthForCountry('SY') },
  { name: 'Taiwan', dialCode: '+886', isoCode: 'TW', flag: '🇹🇼', ...getMobileLengthForCountry('TW') },
  { name: 'Tajikistan', dialCode: '+992', isoCode: 'TJ', flag: '🇹🇯', ...getMobileLengthForCountry('TJ') },
  { name: 'Tanzania', dialCode: '+255', isoCode: 'TZ', flag: '🇹🇿', ...getMobileLengthForCountry('TZ') },
  { name: 'Thailand', dialCode: '+66', isoCode: 'TH', flag: '🇹🇭', ...getMobileLengthForCountry('TH') },
  { name: 'Togo', dialCode: '+228', isoCode: 'TG', flag: '🇹🇬', ...getMobileLengthForCountry('TG') },
  { name: 'Tokelau', dialCode: '+690', isoCode: 'TK', flag: '🇹🇰', ...getMobileLengthForCountry('TK') },
  { name: 'Tonga', dialCode: '+676', isoCode: 'TO', flag: '🇹🇴', ...getMobileLengthForCountry('TO') },
  { name: 'Trinidad and Tobago', dialCode: '+1-868', isoCode: 'TT', flag: '🇹🇹', ...getMobileLengthForCountry('TT') },
  { name: 'Tunisia', dialCode: '+216', isoCode: 'TN', flag: '🇹🇳', ...getMobileLengthForCountry('TN') },
  { name: 'Turkey', dialCode: '+90', isoCode: 'TR', flag: '🇹🇷', ...getMobileLengthForCountry('TR') },
  { name: 'Turkmenistan', dialCode: '+993', isoCode: 'TM', flag: '🇹🇲', ...getMobileLengthForCountry('TM') },
  { name: 'Turks and Caicos Islands', dialCode: '+1-649', isoCode: 'TC', flag: '🇹🇨', ...getMobileLengthForCountry('TC') },
  { name: 'Tuvalu', dialCode: '+688', isoCode: 'TV', flag: '🇹🇻', ...getMobileLengthForCountry('TV') },
  { name: 'U.S. Virgin Islands', dialCode: '+1-340', isoCode: 'VI', flag: '🇻🇮', ...getMobileLengthForCountry('VI') },
  { name: 'Uganda', dialCode: '+256', isoCode: 'UG', flag: '🇺🇬', ...getMobileLengthForCountry('UG') },
  { name: 'Ukraine', dialCode: '+380', isoCode: 'UA', flag: '🇺🇦', ...getMobileLengthForCountry('UA') },
  { name: 'United Arab Emirates', dialCode: '+971', isoCode: 'AE', flag: '🇦🇪', ...getMobileLengthForCountry('AE') },
  { name: 'United Kingdom', dialCode: '+44', isoCode: 'GB', flag: '🇬🇧', ...getMobileLengthForCountry('GB') },
  { name: 'United States', dialCode: '+1', isoCode: 'US', flag: '🇺🇸', ...getMobileLengthForCountry('US') },
  { name: 'Uruguay', dialCode: '+598', isoCode: 'UY', flag: '🇺🇾', ...getMobileLengthForCountry('UY') },
  { name: 'Uzbekistan', dialCode: '+998', isoCode: 'UZ', flag: '🇺🇿', ...getMobileLengthForCountry('UZ') },
  { name: 'Vanuatu', dialCode: '+678', isoCode: 'VU', flag: '🇻🇺', ...getMobileLengthForCountry('VU') },
  { name: 'Vatican', dialCode: '+379', isoCode: 'VA', flag: '🇻🇦', ...getMobileLengthForCountry('VA') },
{ name: 'Venezuela', dialCode: '+58', isoCode: 'VE', flag: '🇻🇪', ...getMobileLengthForCountry('VE') },
  { name: 'Vietnam', dialCode: '+84', isoCode: 'VN', flag: '🇻🇳', ...getMobileLengthForCountry('VN') },
  { name: 'Wallis and Futuna', dialCode: '+681', isoCode: 'WF', flag: '🇼🇫', ...getMobileLengthForCountry('WF') },
  { name: 'Western Sahara', dialCode: '+212', isoCode: 'EH', flag: '🇪🇭', ...getMobileLengthForCountry('EH') },
  { name: 'Yemen', dialCode: '+967', isoCode: 'YE', flag: '🇾🇪', ...getMobileLengthForCountry('YE') },
  { name: 'Zambia', dialCode: '+260', isoCode: 'ZM', flag: '🇿🇲', ...getMobileLengthForCountry('ZM') },
  { name: 'Zimbabwe', dialCode: '+263', isoCode: 'ZW', flag: '🇿🇼', ...getMobileLengthForCountry('ZW') }
];
