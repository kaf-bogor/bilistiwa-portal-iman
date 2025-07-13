import { useState, useEffect, useCallback } from 'react';
import { FirebaseDocument, FirebaseService, QueryOptions } from '@/lib/firebaseService';

// Hook for managing a collection with CRUD operations
export function useFirebaseCollection(service: FirebaseService, options?: QueryOptions) {
  const [documents, setDocuments] = useState<FirebaseDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch documents
  const fetchDocuments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const docs = await service.getAll(options);
      setDocuments(docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [service, options]);

  // Create document
  const createDocument = useCallback(async (data: Omit<FirebaseDocument, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setError(null);
      const id = await service.create(data);
      await fetchDocuments();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document');
      throw err;
    }
  }, [service, fetchDocuments]);

  // Update document
  const updateDocument = useCallback(async (id: string, data: Partial<Omit<FirebaseDocument, 'id' | 'createdAt'>>) => {
    try {
      setError(null);
      await service.update(id, data);
      await fetchDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      throw err;
    }
  }, [service, fetchDocuments]);

  // Delete document
  const deleteDocument = useCallback(async (id: string) => {
    try {
      setError(null);
      await service.delete(id);
      await fetchDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      throw err;
    }
  }, [service, fetchDocuments]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    loading,
    error,
    createDocument,
    updateDocument,
    deleteDocument,
    refetch: fetchDocuments
  };
}
