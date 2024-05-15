import { Injectable, inject } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  getDocs,
  where,
} from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { Patient } from './patient.interface';
import { sendEmailVerification } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private firestore: Firestore;
  firebaseAuth = inject(Auth);

  constructor() {
    this.firestore = getFirestore();
  }

  register(
    email: string,
    password: string,
    username: string,
    phoneNumber: number
  ): Observable<any> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth as Auth,
      email,
      password
    ).then(async (response) => {
      const auth = getAuth();
      const user = response.user;

      if (user) {
        sendEmailVerification(user).then(() => {
          console.log('Email verification sent!');
        });
      }
      updateProfile(response.user, { displayName: username });
      const db = collection(this.firestore, 'Patient');
      localStorage.setItem('uid', response.user.uid);
      const ref = await addDoc(db, {
        name: username,
        email: email,
        uid: response.user.uid,
        phoneNumber: phoneNumber,
        address: '',
        Dob: '',
      });
      localStorage.setItem('id', ref.id);
    });
    return from(promise); // Convert promise to observable using 'from' operator
  }

  login(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth as Auth,
      email,
      password
    ).then(async (response) => {
      const usersQuery = query(collection(this.firestore, 'Patient'));
      const querySnapshot = await getDocs(usersQuery);

      let userExists = false;

      for (let doc of querySnapshot.docs) {
        if (doc.data()['uid'] === response.user.uid) {
          // Store the id of the user document in localStorage under the key 'id'
          localStorage.setItem('id', doc.id);
          userExists = true;
          break;
        }
      }

      if (!userExists) {
        throw new Error('No such user!');
      }
    });

    return from(promise); // Convert promise to observable using 'from' operator
  }

  async updateUser(userId: string, data: any): Promise<void> {
    const userRef = doc(this.firestore, 'Patient', userId);
    await updateDoc(userRef, data);
  }
  async getUser(userId: string): Promise<any> {
    const usersCollection = collection(this.firestore, 'Patient');
    const userDoc = doc(usersCollection, userId);
    const userSnap = await getDoc(userDoc);

    if (userSnap.exists()) {
      return userSnap.data();
    } else {
      throw new Error('No such user!');
    }
  }
}
