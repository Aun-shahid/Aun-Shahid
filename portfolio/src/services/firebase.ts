import { initializeApp } from 'firebase/app'
import { 
  getFirestore, 
  doc, 
  onSnapshot, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment,
  collection,
} from 'firebase/firestore'

// Firebase config - replace with your values from Firebase Console
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export interface Appreciation {
  name: string
  fingerprint: string
  timestamp: string
}

// Portfolio Insights Service
export const portfolioInsightsService = {
  // Watch views count in real-time
  onViewsChange(callback: (views: number) => void) {
    const statsRef = doc(db, 'portfolio', 'stats')
    return onSnapshot(statsRef, (snapshot) => {
      const data = snapshot.data()
      callback(data?.views || 0)
    }, (error) => {
      console.error('Error listening to views:', error)
      callback(0)
    })
  },

  // Watch appreciations in real-time
  onAppreciationsChange(callback: (appreciations: Appreciation[]) => void) {
    const appreciationsRef = collection(db, 'portfolio', 'stats', 'appreciations')
    return onSnapshot(appreciationsRef, (snapshot) => {
      const list: Appreciation[] = []
      snapshot.forEach((doc) => {
        list.push(doc.data() as Appreciation)
      })
      callback(list)
    }, (error) => {
      console.error('Error listening to appreciations:', error)
      callback([])
    })
  },

  // Increment views (called once per day per browser)
  async incrementViews() {
    try {
      const statsRef = doc(db, 'portfolio', 'stats')
      
      // First, ensure the document exists
      const statsSnapshot = await getDoc(statsRef)
      if (!statsSnapshot.exists()) {
        await setDoc(statsRef, { views: 1 })
      } else {
        // Increment the views field
        await updateDoc(statsRef, {
          views: increment(1)
        })
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  },

  // Add appreciation
  async addAppreciation(appreciation: Appreciation) {
    try {
      const appreciationRef = doc(db, 'portfolio', 'stats', 'appreciations', appreciation.fingerprint)
      await setDoc(appreciationRef, appreciation)
    } catch (error) {
      console.error('Error adding appreciation:', error)
    }
  },

  // Check if fingerprint has already appreciated
  async hasAppreciated(fingerprint: string): Promise<boolean> {
    try {
      const appreciationRef = doc(db, 'portfolio', 'stats', 'appreciations', fingerprint)
      const snapshot = await getDoc(appreciationRef)
      return snapshot.exists()
    } catch (error) {
      console.error('Error checking appreciation:', error)
      return false
    }
  },
}

export default db
