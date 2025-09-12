import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userId, passes, eventName } = req.body;

  if (!userId || !passes || !passes.length || !eventName) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const passCollection = collection(db, 'eventPasses');
    const promises = passes.map(pass => {
      return addDoc(passCollection, {
        userId,
        eventName,
        ...pass,
        createdAt: serverTimestamp(),
      });
    });

    await Promise.all(promises);

    res.status(200).json({ message: 'Passes generated successfully' });
  } catch (error) {
    console.error('Error generating passes:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}