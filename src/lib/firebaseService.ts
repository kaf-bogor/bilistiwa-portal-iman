import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryConstraint,
  Timestamp,
  onSnapshot,
  Unsubscribe,
  WhereFilterOp
} from 'firebase/firestore';
import { db } from './firebase';

export interface FirebaseDocument {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  [key: string]: unknown;
}

export interface QueryOptions {
  orderByField?: string;
  orderDirection?: 'asc' | 'desc';
  limitCount?: number;
  whereConditions?: Array<{
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }>;
  startAfterDoc?: DocumentData;
}

export class FirebaseService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  // Create a new document
  async create(data: Omit<FirebaseDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = Timestamp.now();
      const docData = {
        ...data,
        createdAt: now,
        updatedAt: now
      };

      const docRef = await addDoc(collection(db, this.collectionName), docData);
      return docRef.id;
    } catch (error) {
      console.error(`Error creating document in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Read a single document by ID
  async getById(id: string): Promise<FirebaseDocument | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as FirebaseDocument;
      } else {
        return null;
      }
    } catch (error) {
      console.error(`Error getting document ${id} from ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Read all documents with optional query options
  async getAll(options?: QueryOptions): Promise<FirebaseDocument[]> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [];

      // Add where conditions
      if (options?.whereConditions) {
        options.whereConditions.forEach(condition => {
          constraints.push(where(condition.field, condition.operator, condition.value));
        });
      }

      // Add ordering
      if (options?.orderByField) {
        constraints.push(orderBy(options.orderByField, options.orderDirection || 'asc'));
      }

      // Add limit
      if (options?.limitCount) {
        constraints.push(limit(options.limitCount));
      }

      // Add pagination
      if (options?.startAfterDoc) {
        constraints.push(startAfter(options.startAfterDoc));
      }

      const q = query(collectionRef, ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseDocument[];
    } catch (error) {
      console.error(`Error getting documents from ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Update a document
  async update(id: string, data: Partial<Omit<FirebaseDocument, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const updateData = {
        ...data,
        updatedAt: Timestamp.now()
      };

      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error(`Error updating document ${id} in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Delete a document
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error(`Error deleting document ${id} from ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Real-time listener for all documents
  onSnapshot(
    callback: (documents: FirebaseDocument[]) => void,
    options?: QueryOptions
  ): Unsubscribe {
    try {
      const collectionRef = collection(db, this.collectionName);
      const constraints: QueryConstraint[] = [];

      // Add where conditions
      if (options?.whereConditions) {
        options.whereConditions.forEach(condition => {
          constraints.push(where(condition.field, condition.operator, condition.value));
        });
      }

      // Add ordering
      if (options?.orderByField) {
        constraints.push(orderBy(options.orderByField, options.orderDirection || 'asc'));
      }

      // Add limit
      if (options?.limitCount) {
        constraints.push(limit(options.limitCount));
      }

      const q = query(collectionRef, ...constraints);

      return onSnapshot(q, (querySnapshot) => {
        const documents = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as FirebaseDocument[];
        callback(documents);
      });
    } catch (error) {
      console.error(`Error setting up snapshot listener for ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Real-time listener for a single document
  onDocumentSnapshot(id: string, callback: (document: FirebaseDocument | null) => void): Unsubscribe {
    try {
      const docRef = doc(db, this.collectionName, id);

      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const document = {
            id: docSnap.id,
            ...docSnap.data()
          } as FirebaseDocument;
          callback(document);
        } else {
          callback(null);
        }
      });
    } catch (error) {
      console.error(`Error setting up document snapshot listener for ${id} in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Search documents by text field
  async search(field: string, searchTerm: string): Promise<FirebaseDocument[]> {
    try {
      const collectionRef = collection(db, this.collectionName);
      const q = query(
        collectionRef,
        where(field, '>=', searchTerm),
        where(field, '<=', searchTerm + '\uf8ff'),
        orderBy(field)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseDocument[];
    } catch (error) {
      console.error(`Error searching documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Count documents (Note: This requires reading all documents, use with caution for large collections)
  async count(options?: QueryOptions): Promise<number> {
    try {
      const documents = await this.getAll(options);
      return documents.length;
    } catch (error) {
      console.error(`Error counting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  // Batch operations
  async batchCreate(documents: Array<Omit<FirebaseDocument, 'id' | 'createdAt' | 'updatedAt'>>): Promise<string[]> {
    try {
      const promises = documents.map(doc => this.create(doc));
      return await Promise.all(promises);
    } catch (error) {
      console.error(`Error batch creating documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async batchUpdate(updates: Array<{ id: string; data: Partial<Omit<FirebaseDocument, 'id' | 'createdAt'>> }>): Promise<void> {
    try {
      const promises = updates.map(update => this.update(update.id, update.data));
      await Promise.all(promises);
    } catch (error) {
      console.error(`Error batch updating documents in ${this.collectionName}:`, error);
      throw error;
    }
  }

  async batchDelete(ids: string[]): Promise<void> {
    try {
      const promises = ids.map(id => this.delete(id));
      await Promise.all(promises);
    } catch (error) {
      console.error(`Error batch deleting documents in ${this.collectionName}:`, error);
      throw error;
    }
  }
}

// Pre-configured services for different collections
export const waqfAssetsService = new FirebaseService('waqfAssets');
export const scholarshipsService = new FirebaseService('scholarships');
export const taawunDonationsService = new FirebaseService('taawunDonations');
export const productiveWaqfService = new FirebaseService('productiveWaqf');
export const teacherWelfareService = new FirebaseService('teacherWelfare');
export const documentsService = new FirebaseService('documents');
export const eventsService = new FirebaseService('events');
export const usersService = new FirebaseService('users');
export const menuItemsService = new FirebaseService('menuItems');

// Export the main service class for custom collections
export default FirebaseService;
