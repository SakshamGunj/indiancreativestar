import { useState } from 'react';
import { collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

export default function AdminVerify() {
  const [scannedToken, setScannedToken] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<string | null>(null);
  const [passDetails, setPassDetails] = useState<any | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );

    async function onScanSuccess(decodedText: string) {
      setScannedToken(decodedText);
      const passesRef = collection(db, 'eventPasses');
      const q = query(passesRef, where('token', '==', decodedText));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setVerificationStatus('Invalid');
        setPassDetails(null);
      } else {
        const passDoc = querySnapshot.docs[0];
        const passData = passDoc.data();
        setPassDetails(passData);

        if (passData.status === 'checked-in') {
          setVerificationStatus('Duplicate');
        } else {
          setVerificationStatus('Valid');
          await updateDoc(passDoc.ref, { status: 'checked-in' });
        }
      }
      scanner.clear();
    }

    function onScanFailure(error: any) {
      console.warn(error);
    }

    scanner.render(onScanSuccess, onScanFailure);
  }, []);


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">QR Code Verification</h1>
      <div className="max-w-md mx-auto">
        <div id="reader"></div>
        {verificationStatus && (
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold">
              {verificationStatus === 'Valid' && '✅ Valid Pass'}
              {verificationStatus === 'Duplicate' && '❌ Duplicate Pass'}
              {verificationStatus === 'Invalid' && '❌ Invalid Pass'}
            </h2>
            {passDetails && (
              <div className="mt-4">
                <p>Name: {passDetails.name}</p>
                <p>Phone: {passDetails.phone}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}