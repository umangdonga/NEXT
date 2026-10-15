import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScreenId, Language, UserKioskData } from './types';
import { TRANSLATIONS } from './translations';
import { audio } from './audioService';
import { KioskHeader } from './components/KioskHeader';
import { ModalE4Idle } from './components/ModalE4Idle';

// Screens
import { Screen01BeforeStart } from './components/Screen01BeforeStart';
import { Screen02Aadhaar } from './components/Screen02Aadhaar';
import { Screen03OTP } from './components/Screen03OTP';
import { Screen04ScanCards } from './components/Screen04ScanCards';
import { Screen05Checking } from './components/Screen05Checking';
import { Screen06ConfirmDetails } from './components/Screen06ConfirmDetails';
import { Screen07MoreDetails } from './components/Screen07MoreDetails';
import { Screen08ReviewAgree } from './components/Screen08ReviewAgree';
import { Screen08bServices } from './components/Screen08bServices';
import { Screen09Signature } from './components/Screen09Signature';
import { Screen10BankVerifying } from './components/Screen10BankVerifying';
import { Screen11AccountReady } from './components/Screen11AccountReady';
import { Screen12PrintPassbook } from './components/Screen12PrintPassbook';
import { Screen13AllSet } from './components/Screen13AllSet';

// Edge Cases
import { ScreenE1DocsMissing } from './components/ScreenE1DocsMissing';
import { ScreenE2OTPProblem } from './components/ScreenE2OTPProblem';
import { ScreenE3ScannerError } from './components/ScreenE3ScannerError';
import { ScreenE5SessionCleared } from './components/ScreenE5SessionCleared';
import { ScreenE6HelpComing } from './components/ScreenE6HelpComing';

const INITIAL_USER_DATA: UserKioskData = {
  aadhaarNumber: '7714',
  showAadhaar: false,
  otp: '482',
  panNumber: 'ABCPK9481F',
  fullName: 'Ramesh Kumar Patel',
  dob: '14 March 1962',
  gender: 'Male',
  fatherName: 'Mohan Patel',
  address: '12, Shanti Nagar Society, Navrangpura, Ahmedabad, Gujarat – 380009',
  mobile: 'XXXXXX4521',
  photoUrl: '',
  nomineeName: 'Sunita Patel',
  nomineeRelation: 'Spouse',
  nomineeDob: '18 August 1965',
  occupation: 'Retired',
  yearlyIncome: 'Below ₹1 lakh',
  wantDebitCard: true,
  debitCardType: 'RuPay Classic',
  wantNetBanking: true,
  wantChequeBook: false,
  signatureDataUrl: null,
  referenceNumber: 'VK-482917',
  accountNumber: '3912 4560 7781',
  ifsc: 'SBIN0001234',
  branch: 'This branch (your home branch)',
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('01-before-start');
  const [language, setLanguage] = useState<Language>('en');
  const [userData, setUserData] = useState<UserKioskData>(INITIAL_USER_DATA);
  const [showIdleModal, setShowIdleModal] = useState<boolean>(false);
  const [isVoiceActive, setIsVoiceActive] = useState<boolean>(false);
  const [previousScreenBeforeHelp, setPreviousScreenBeforeHelp] = useState<ScreenId>('01-before-start');

  // Idle timer logic (60s inactivity triggers E4)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    // Only arm idle timer if we are in active kiosk flow
    if (
      currentScreen !== 'E5-session-cleared' &&
      currentScreen !== '13-all-set' &&
      !showIdleModal
    ) {
      idleTimerRef.current = setTimeout(() => {
        setShowIdleModal(true);
      }, 60000); // 60 seconds
    }
  }, [currentScreen, showIdleModal]);

  useEffect(() => {
    const handleUserActivity = () => {
      resetIdleTimer();
    };

    window.addEventListener('pointerdown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    resetIdleTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('pointerdown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [resetIdleTimer]);

  const updateUserData = (patch: Partial<UserKioskData>) => {
    setUserData((prev) => ({ ...prev, ...patch }));
  };

  const handleHelpTrigger = (fromScreen: ScreenId) => {
    setPreviousScreenBeforeHelp(fromScreen);
    setCurrentScreen('E6-help-coming');
  };

  const handleClearSession = () => {
    setShowIdleModal(false);
    setUserData(INITIAL_USER_DATA);
    setCurrentScreen('E5-session-cleared');
  };

  const handleVoiceRead = () => {
    if (isVoiceActive) {
      audio.stopSpeaking();
      setIsVoiceActive(false);
      return;
    }

    const t = TRANSLATIONS[language];
    let spokenText = '';

    switch (currentScreen) {
      case '01-before-start':
        spokenText = `${t.s1.title}. ${t.s1.time}. ${t.s1.keepThese}. ${t.s1.c1Title}, ${t.s1.c2Title}, ${t.s1.c3Title}.`;
        break;
      case '02-aadhaar':
        spokenText = `${t.s2.title}. ${t.s2.sub}`;
        break;
      case '03-otp':
        spokenText = `${t.s3.title}. ${t.s3.sub}`;
        break;
      case '04-scan-cards':
        spokenText = `${t.s4.title}. ${t.s4.sub}. ${t.s4.instruction1}`;
        break;
      case '05-checking':
        spokenText = `${t.s5.title}. ${t.s5.sub}`;
        break;
      case '06-confirm-details':
        spokenText = `${t.s6.title}. ${t.s6.sub}. ${userData.fullName}.`;
        break;
      case '07-more-details':
        spokenText = `${t.s7.title}. ${t.s7.sub}`;
        break;
      case '08-review-agree':
        spokenText = `${t.s8.title}. ${t.s8.sub}. ${t.s8.t1}`;
        break;
      case '08b-services':
        spokenText = `${t.s8b.title}. ${t.s8b.sub}.`;
        break;
      case '09-signature':
        spokenText = `${t.s9.title}. ${t.s9.sub}. ${t.s9.photoNoticeTitle}.`;
        break;
      case '10-bank-verifying':
        spokenText = `${t.s10.title}. ${t.s10.sub}. ${t.s10.refTitle} is ${userData.referenceNumber}.`;
        break;
      case '11-account-ready':
        spokenText = `${t.s11.title}. ${t.s11.welcome}. ${t.s11.collectPassbookTitle}.`;
        break;
      case '12-print-passbook':
        spokenText = `${t.s12.title}. ${t.s12.sub}`;
        break;
      case '13-all-set':
        spokenText = `${t.s13.title}. ${t.s13.sub}`;
        break;
      default:
        spokenText = `${t.appName}. Welcome to State Bank self service kiosk.`;
    }

    setIsVoiceActive(true);
    audio.speak(spokenText, language);
    setTimeout(() => {
      setIsVoiceActive(false);
    }, 6000);
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-100 font-sans text-slate-800 antialiased overflow-hidden select-none">
      {/* Main Kiosk Header */}
      <KioskHeader
        currentScreen={currentScreen}
        language={language}
        onLanguageChange={(lang) => {
          setLanguage(lang);
        }}
        onVoiceRead={handleVoiceRead}
        isVoiceActive={isVoiceActive}
      />

      {/* Main View Port / Screen Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Screen 01: Before you start */}
        {currentScreen === '01-before-start' && (
          <Screen01BeforeStart
            language={language}
            onNext={() => setCurrentScreen('02-aadhaar')}
            onMissing={() => setCurrentScreen('E1-docs-missing')}
            onHelp={() => handleHelpTrigger('01-before-start')}
          />
        )}

        {/* Screen 02: Enter Aadhaar */}
        {currentScreen === '02-aadhaar' && (
          <Screen02Aadhaar
            language={language}
            aadhaarNumber={userData.aadhaarNumber}
            showAadhaar={userData.showAadhaar}
            onUpdateAadhaar={(val) => updateUserData({ aadhaarNumber: val })}
            onToggleShow={() =>
              updateUserData({ showAadhaar: !userData.showAadhaar })
            }
            onNext={() => setCurrentScreen('03-otp')}
            onBack={() => setCurrentScreen('01-before-start')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('02-aadhaar')}
            onScanCardAlternative={() => setCurrentScreen('04-scan-cards')}
            onDigiLockerAlternative={() => setCurrentScreen('E1-docs-missing')}
          />
        )}

        {/* Screen 03: Enter OTP */}
        {currentScreen === '03-otp' && (
          <Screen03OTP
            language={language}
            otp={userData.otp}
            mobileNumber={userData.mobile}
            onUpdateOtp={(val) => updateUserData({ otp: val })}
            onNext={() => setCurrentScreen('04-scan-cards')}
            onBack={() => setCurrentScreen('02-aadhaar')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('03-otp')}
            onNoPhone={() => setCurrentScreen('E2-otp-problem')}
          />
        )}

        {/* Screen 04: Scan Cards */}
        {currentScreen === '04-scan-cards' && (
          <Screen04ScanCards
            language={language}
            onNext={() => setCurrentScreen('05-checking')}
            onBack={() => setCurrentScreen('03-otp')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('04-scan-cards')}
            onScannerError={() => setCurrentScreen('E3-scanner-error')}
          />
        )}

        {/* Screen 05: Checking details */}
        {currentScreen === '05-checking' && (
          <Screen05Checking
            language={language}
            onDone={() => setCurrentScreen('06-confirm-details')}
            onCancelAndClear={handleClearSession}
            onHelp={() => handleHelpTrigger('05-checking')}
          />
        )}

        {/* Screen 06: Confirm details */}
        {currentScreen === '06-confirm-details' && (
          <Screen06ConfirmDetails
            language={language}
            userData={userData}
            onNext={() => setCurrentScreen('07-more-details')}
            onBack={() => setCurrentScreen('04-scan-cards')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('06-confirm-details')}
            onSomethingWrong={() => handleHelpTrigger('06-confirm-details')}
          />
        )}

        {/* Screen 07: More details (Nominee, Occupation, Income) */}
        {currentScreen === '07-more-details' && (
          <Screen07MoreDetails
            language={language}
            userData={userData}
            onUpdate={updateUserData}
            onNext={() => setCurrentScreen('08-review-agree')}
            onBack={() => setCurrentScreen('06-confirm-details')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('07-more-details')}
          />
        )}

        {/* Screen 08: Review and agree */}
        {currentScreen === '08-review-agree' && (
          <Screen08ReviewAgree
            language={language}
            userData={userData}
            onNext={() => setCurrentScreen('08b-services')}
            onBack={() => setCurrentScreen('07-more-details')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('08-review-agree')}
          />
        )}

        {/* Screen 08b: Choose banking services (Debit Card & Net Banking) */}
        {currentScreen === '08b-services' && (
          <Screen08bServices
            language={language}
            userData={userData}
            onUpdate={updateUserData}
            onNext={() => setCurrentScreen('09-signature')}
            onBack={() => setCurrentScreen('08-review-agree')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('08b-services')}
          />
        )}

        {/* Screen 09: Signature (Photo already verified from Aadhaar, clean signature pad) */}
        {currentScreen === '09-signature' && (
          <Screen09Signature
            language={language}
            userData={userData}
            onUpdateSignature={(dataUrl) =>
              updateUserData({ signatureDataUrl: dataUrl })
            }
            onNext={() => setCurrentScreen('10-bank-verifying')}
            onBack={() => setCurrentScreen('08b-services')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('09-signature')}
          />
        )}

        {/* Screen 10: Bank verifying */}
        {currentScreen === '10-bank-verifying' && (
          <Screen10BankVerifying
            language={language}
            userData={userData}
            onNext={() => setCurrentScreen('11-account-ready')}
            onContinueLater={() => setCurrentScreen('13-all-set')}
            onHelp={() => handleHelpTrigger('10-bank-verifying')}
          />
        )}

        {/* Screen 11: Account ready */}
        {currentScreen === '11-account-ready' && (
          <Screen11AccountReady
            language={language}
            userData={userData}
            onPrintPassbook={() => setCurrentScreen('12-print-passbook')}
            onHelp={() => handleHelpTrigger('11-account-ready')}
          />
        )}

        {/* Screen 12: Print passbook */}
        {currentScreen === '12-print-passbook' && (
          <Screen12PrintPassbook
            language={language}
            userData={userData}
            onNext={() => setCurrentScreen('13-all-set')}
            onHelp={() => handleHelpTrigger('12-print-passbook')}
          />
        )}

        {/* Screen 13: All set */}
        {currentScreen === '13-all-set' && (
          <Screen13AllSet
            language={language}
            userData={userData}
            onFinish={handleClearSession}
            onHelp={() => handleHelpTrigger('13-all-set')}
          />
        )}

        {/* Edge Case E1: Documents missing */}
        {currentScreen === 'E1-docs-missing' && (
          <ScreenE1DocsMissing
            language={language}
            onBack={() => setCurrentScreen('01-before-start')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('E1-docs-missing')}
            onStaffHelp={() => handleHelpTrigger('E1-docs-missing')}
          />
        )}

        {/* Edge Case E2: OTP problem (Fingerprint & Print Slip options) */}
        {currentScreen === 'E2-otp-problem' && (
          <ScreenE2OTPProblem
            language={language}
            userData={userData}
            onBack={() => setCurrentScreen('03-otp')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('E2-otp-problem')}
            onFingerprintSuccess={() => setCurrentScreen('04-scan-cards')}
          />
        )}

        {/* Edge Case E3: Scanner error */}
        {currentScreen === 'E3-scanner-error' && (
          <ScreenE3ScannerError
            language={language}
            onBack={() => setCurrentScreen('04-scan-cards')}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('E3-scanner-error')}
            onScanAgain={() => setCurrentScreen('04-scan-cards')}
            onStaffScan={() => handleHelpTrigger('E3-scanner-error')}
          />
        )}

        {/* Edge Case E5: Session cleared */}
        {currentScreen === 'E5-session-cleared' && (
          <ScreenE5SessionCleared
            language={language}
            onHome={() => setCurrentScreen('01-before-start')}
            onHelp={() => handleHelpTrigger('E5-session-cleared')}
          />
        )}

        {/* Edge Case E6: Help is coming */}
        {currentScreen === 'E6-help-coming' && (
          <ScreenE6HelpComing
            language={language}
            onCancelHelp={() => setCurrentScreen(previousScreenBeforeHelp)}
            onContinueOnMyOwn={() => setCurrentScreen(previousScreenBeforeHelp)}
          />
        )}

        {/* Edge Case E4: Inactivity Idle Modal */}
        {showIdleModal && (
          <ModalE4Idle
            language={language}
            onStay={() => {
              setShowIdleModal(false);
              resetIdleTimer();
            }}
            onExit={handleClearSession}
          />
        )}
      </main>
    </div>
  );
}
