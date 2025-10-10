import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Loader2, Eye, Trash2 } from 'lucide-react';

interface UserAdminData {
  id: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  hasPaid?: boolean;
  paymentStatus?: string;
  hasSubmittedArtwork?: boolean;
  hasSubmittedArtwork2?: boolean;
  createdAt?: any;
  submissionDate?: any;
  submissionDate2?: any;
  artworkDisplayUrl?: string;
  artworkDisplayUrl2?: string;
}

const AdminConfirmation = () => {
  const [users, setUsers] = useState<UserAdminData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<UserAdminData | null>(null);
  const [isArtworkModalOpen, setIsArtworkModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const usersCollection = collection(db, 'indiancreativestar_accounts');
        const usersSnapshot = await getDocs(usersCollection);
        const usersList: UserAdminData[] = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as any }));
        // Sort users by creation date, most recent first
        usersList.sort((a, b) => (b.createdAt?.toDate()?.getTime() || 0) - (a.createdAt?.toDate()?.getTime() || 0));
        setUsers(usersList);
      } catch (error) {
        console.error("Error fetching users:", error);
        alert('Failed to fetch user data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleMarkAsPaid = async (userId: string) => {
    if (!window.confirm('Are you sure you want to mark this user as paid? This action cannot be undone.')) {
      return;
    }
    
    setIsUpdating(userId);
    try {
      const userRef = doc(db, 'indiancreativestar_accounts', userId);
      await updateDoc(userRef, {
        hasPaid: true,
        paymentStatus: 'success',
        paymentDate: new Date(),
        paymentMethod: 'manual_admin',
        paymentAmount: 1, // ⚠️ TESTING MODE - Change back to 249 for production
        paymentCurrency: 'INR',
        lastUpdated: new Date()
      });

      // Update local state to reflect the change immediately
      setUsers(prevUsers => prevUsers.map(user => 
        user.id === userId 
          ? { ...user, hasPaid: true, paymentStatus: 'success' } 
          : user
      ));

      alert('User marked as paid successfully!');
    } catch (error) {
      console.error('Error marking user as paid:', error);
      alert('Failed to update user payment status.');
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDeleteArtwork = async (userId: string, artworkNumber: 1 | 2) => {
    if (!window.confirm(`Are you sure you want to delete artwork ${artworkNumber} for this user? This is irreversible.`)) {
      return;
    }

    const fieldsToReset: any = {
      lastUpdated: new Date()
    };

    if (artworkNumber === 1) {
      fieldsToReset.hasSubmittedArtwork = false;
      fieldsToReset.submissionDate = null;
      fieldsToReset.artworkUrl = null;
      fieldsToReset.artworkDisplayUrl = null;
    } else {
      fieldsToReset.hasSubmittedArtwork2 = false;
      fieldsToReset.submissionDate2 = null;
      fieldsToReset.artworkUrl2 = null;
      fieldsToReset.artworkDisplayUrl2 = null;
    }

    try {
      const userRef = doc(db, 'indiancreativestar_accounts', userId);
      await updateDoc(userRef, fieldsToReset);

      // Update local state
      setUsers(prevUsers => prevUsers.map(u => u.id === userId ? { ...u, ...fieldsToReset } : u));
      setSelectedUser(prevUser => prevUser ? { ...prevUser, ...fieldsToReset } : null);
      
      alert(`Artwork ${artworkNumber} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting artwork ${artworkNumber}:`, error);
      alert(`Failed to delete artwork ${artworkNumber}.`);
    }
  };

  const safeFormatDate = (date: any) => {
    if (!date) return 'N/A';
    if (date.toDate) return new Date(date.toDate()).toLocaleString();
    return new Date(date).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Confirmation</h1>
          <p className="text-gray-600 mt-1">Manage user payments and submission status.</p>
        </header>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-[200px]">User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>WhatsApp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Artwork</TableHead>
                <TableHead>Registered</TableHead>
                <TableHead className="text-right w-[250px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name || 'N/A'}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.whatsapp || 'N/A'}</TableCell>
                  <TableCell>
                    {user.hasPaid ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Not Paid
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.hasSubmittedArtwork ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.hasSubmittedArtwork2 ? '2/2 Submitted' : user.hasSubmittedArtwork ? '1/2 Submitted' : '0/2 Submitted'}
                    </span>
                  </TableCell>
                  <TableCell>{safeFormatDate(user.createdAt)}</TableCell>
                  <TableCell className="text-right space-x-2">
                    {user.hasSubmittedArtwork && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsArtworkModalOpen(true);
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Art
                      </Button>
                    )}
                    {!user.hasPaid && (
                      <Button
                        size="sm"
                        onClick={() => handleMarkAsPaid(user.id)}
                        disabled={isUpdating === user.id}
                        className="bg-green-500 hover:bg-green-600 text-white"
                      >
                        {isUpdating === user.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {isArtworkModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={() => setIsArtworkModalOpen(false)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <Card>
              <CardHeader>
                <CardTitle>Artworks by {selectedUser.name}</CardTitle>
                <CardDescription>{selectedUser.email}</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedUser.hasSubmittedArtwork && selectedUser.artworkDisplayUrl ? (
                  <div>
                    <h3 className="font-semibold mb-2">Artwork 1</h3>
                    <img src={selectedUser.artworkDisplayUrl} alt="Artwork 1" className="rounded-md border mb-2" />
                    <p className="text-sm text-gray-500">Submitted: {safeFormatDate(selectedUser.submissionDate)}</p>
                    <Button variant="destructive" size="sm" className="mt-2" onClick={() => handleDeleteArtwork(selectedUser.id, 1)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Artwork 1
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">No artwork 1 submitted.</div>
                )}
                {selectedUser.hasSubmittedArtwork2 && selectedUser.artworkDisplayUrl2 ? (
                  <div>
                    <h3 className="font-semibold mb-2">Artwork 2</h3>
                    <img src={selectedUser.artworkDisplayUrl2} alt="Artwork 2" className="rounded-md border mb-2" />
                    <p className="text-sm text-gray-500">Submitted: {safeFormatDate(selectedUser.submissionDate2)}</p>
                    <Button variant="destructive" size="sm" className="mt-2" onClick={() => handleDeleteArtwork(selectedUser.id, 2)}>
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Artwork 2
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">No artwork 2 submitted.</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConfirmation;