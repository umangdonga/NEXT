export type ScreenId =
  | '01-before-start'
  | '02-aadhaar'
  | '03-otp'
  | '04-scan-cards'
  | '05-checking'
  | '06-confirm-details'
  | '07-more-details'
  | '08-review-agree'
  | '08b-services'
  | '09-signature'
  | '10-bank-verifying'
  | '11-account-ready'
  | '12-print-passbook'
  | '13-all-set'
  | 'E1-docs-missing'
  | 'E2-otp-problem'
  | 'E3-scanner-error'
  | 'E5-session-cleared'
  | 'E6-help-coming';

export type Language = 'en' | 'hi' | 'gu';

export type KioskStepStage = 'check' | 'verify' | 'details' | 'approval' | 'passbook';

export interface UserKioskData {
  aadhaarNumber: string;
  showAadhaar: boolean;
  otp: string;
  panNumber: string;
  fullName: string;
  dob: string;
  gender: string;
  fatherName: string;
  address: string;
  mobile: string;
  photoUrl: string;
  nomineeName: string;
  nomineeRelation: string;
  nomineeDob: string;
  occupation: string;
  yearlyIncome: string;
  wantDebitCard: boolean;
  debitCardType: 'RuPay Classic' | 'Visa Platinum' | 'MasterCard Global';
  wantNetBanking: boolean;
  wantChequeBook: boolean;
  signatureDataUrl: string | null;
  referenceNumber: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
}
