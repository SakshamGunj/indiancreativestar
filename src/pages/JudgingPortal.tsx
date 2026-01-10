import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, Filter, Eye, Download, Maximize2, User, Phone, Mail, Calendar, Trophy, Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ArtworkSubmission {
  id: string;
  name?: string;
  email?: string;
  whatsapp?: string;
  age?: string;
  hasPaid?: boolean;
  paymentStatus?: string;
  hasSubmittedArtwork?: boolean;
  hasSubmittedArtwork2?: boolean;
  submissionDate?: any;
  submissionDate2?: any;
  artworkDisplayUrl?: string;
  artworkDisplayUrl2?: string;
  artworkFileName?: string;
  artworkFileName2?: string;
  submissionType?: 'firebase' | 'simple';
  createdAt?: any;
}

const JudgingPortal = () => {
  const [submissions, setSubmissions] = useState<ArtworkSubmission[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<ArtworkSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [submissionFilter, setSubmissionFilter] = useState<string>('all');
  const [selectedArtwork, setSelectedArtwork] = useState<{submission: ArtworkSubmission, artworkNumber: number} | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const submissionsPerPage = 12;

  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        const allSubmissions: ArtworkSubmission[] = [];

        // Fetch Firebase users
        const usersCollection = collection(db, 'indiancreativestar_accounts');
        const usersSnapshot = await getDocs(usersCollection);
        const firebaseUsers: ArtworkSubmission[] = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data() as any,
          submissionType: 'firebase' as const
        }));
        allSubmissions.push(...firebaseUsers);

        // Sort by submission date, most recent first
        allSubmissions.sort((a, b) => {
          const dateA = a.submissionDate?.toDate ? a.submissionDate.toDate().getTime() : new Date(a.submissionDate || 0).getTime();
          const dateB = b.submissionDate?.toDate ? b.submissionDate.toDate().getTime() : new Date(b.submissionDate || 0).getTime();
          return dateB - dateA;
        });

        // Filter only submissions with artworks
        const withArtworks = allSubmissions.filter(sub => sub.hasSubmittedArtwork || sub.hasSubmittedArtwork2);
        setSubmissions(withArtworks);
        setFilteredSubmissions(withArtworks);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        alert('Failed to fetch artwork submissions.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  useEffect(() => {
    let filtered = submissions;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(sub =>
        sub.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.whatsapp?.includes(searchTerm)
      );
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(sub => sub.paymentStatus === paymentFilter);
    }

    // Submission filter
    if (submissionFilter !== 'all') {
      if (submissionFilter === 'single') {
        filtered = filtered.filter(sub => sub.hasSubmittedArtwork && !sub.hasSubmittedArtwork2);
      } else if (submissionFilter === 'double') {
        filtered = filtered.filter(sub => sub.hasSubmittedArtwork2);
      }
    }

    setFilteredSubmissions(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [submissions, searchTerm, paymentFilter, submissionFilter]);

  const safeFormatDate = (date: any) => {
    if (!date) return 'N/A';
    if (date.toDate) return new Date(date.toDate()).toLocaleDateString('en-IN');
    if (typeof date === 'string') return new Date(date).toLocaleDateString('en-IN');
    return new Date(date).toLocaleDateString('en-IN');
  };

  const openArtworkModal = (submission: ArtworkSubmission, artworkNumber: number) => {
    setSelectedArtwork({ submission, artworkNumber });
  };

  const closeArtworkModal = () => {
    setSelectedArtwork(null);
  };

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / submissionsPerPage);
  const startIndex = (currentPage - 1) * submissionsPerPage;
  const endIndex = startIndex + submissionsPerPage;
  const currentSubmissions = filteredSubmissions.slice(startIndex, endIndex);

  const stats = {
    total: filteredSubmissions.length,
    paid: filteredSubmissions.filter(s => s.hasPaid).length,
    singleArtwork: filteredSubmissions.filter(s => s.hasSubmittedArtwork && !s.hasSubmittedArtwork2).length,
    doubleArtwork: filteredSubmissions.filter(s => s.hasSubmittedArtwork2).length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Loading artwork submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Judging Portal</h1>
                <p className="text-sm text-gray-600">Indian Creative Star - Art Competition</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
                <div className="text-xs text-gray-500">Total Submissions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-0 rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Artworks</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.paid}</div>
              <div className="text-sm text-gray-600">Paid Entries</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.singleArtwork}</div>
              <div className="text-sm text-gray-600">Single Artwork</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-0 rounded-xl shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.doubleArtwork}</div>
              <div className="text-sm text-gray-600">Double Artwork</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-white border-0 rounded-xl shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10 bg-gray-50 border-gray-200 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-40 h-10 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Payment Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payment</SelectItem>
                    <SelectItem value="success">Paid Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={submissionFilter} onValueChange={setSubmissionFilter}>
                  <SelectTrigger className="w-40 h-10 bg-gray-50 border-gray-200 rounded-lg">
                    <SelectValue placeholder="Artwork Count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Submissions</SelectItem>
                    <SelectItem value="single">Single Artwork</SelectItem>
                    <SelectItem value="double">Double Artwork</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artworks Grid */}
        {currentSubmissions.length === 0 ? (
          <Card className="bg-white border-0 rounded-xl shadow-sm">
            <CardContent className="p-12 text-center">
              <ImageIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No artwork submissions found</h3>
              <p className="text-gray-500">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {currentSubmissions.map((submission) => (
              <Card key={submission.id} className="bg-white border-0 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden group">
                {/* Artwork Preview */}
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  {submission.artworkDisplayUrl && (
                    <img
                      src={submission.artworkDisplayUrl}
                      alt={`${submission.name}'s artwork`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  )}

                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => openArtworkModal(submission, 1)}
                      className="bg-white/90 hover:bg-white text-gray-800"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View 1
                    </Button>
                    {submission.hasSubmittedArtwork2 && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openArtworkModal(submission, 2)}
                        className="bg-white/90 hover:bg-white text-gray-800"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View 2
                      </Button>
                    )}
                  </div>

                  {/* Badge for multiple artworks */}
                  {submission.hasSubmittedArtwork2 && (
                    <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                      2 Artworks
                    </div>
                  )}
                </div>

                {/* User Info */}
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg truncate">{submission.name || 'Unknown'}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {submission.hasPaid ? (
                          <Badge className="bg-green-100 text-green-700">Paid</Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-700">Unpaid</Badge>
                        )}
                        <span className="text-xs text-gray-500">ID: {submission.id.slice(-6)}</span>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{submission.email || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3 w-3" />
                        <span>{submission.whatsapp || 'N/A'}</span>
                      </div>
                      {submission.age && (
                        <div className="flex items-center gap-2">
                          <User className="h-3 w-3" />
                          <span>Age: {submission.age}</span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-gray-500 border-t pt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>Submitted: {safeFormatDate(submission.submissionDate)}</span>
                      </div>
                      {submission.hasSubmittedArtwork2 && (
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>Artwork 2: {safeFormatDate(submission.submissionDate2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Artwork Modal */}
      {selectedArtwork && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeArtworkModal}>
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedArtwork.submission.name}</h2>
                <p className="text-sm text-gray-600">
                  {selectedArtwork.artworkNumber === 1 ? 'Artwork 1' : 'Artwork 2'} •
                  {selectedArtwork.submission.email} •
                  {selectedArtwork.submission.whatsapp}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={closeArtworkModal}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4">
              <img
                src={
                  selectedArtwork.artworkNumber === 1
                    ? selectedArtwork.submission.artworkDisplayUrl
                    : selectedArtwork.submission.artworkDisplayUrl2
                }
                alt={`${selectedArtwork.submission.name}'s artwork ${selectedArtwork.artworkNumber}`}
                className="w-full h-auto max-h-[60vh] object-contain rounded-lg border"
              />

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <span className="ml-2 text-gray-600">{selectedArtwork.submission.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Phone:</span>
                  <span className="ml-2 text-gray-600">{selectedArtwork.submission.whatsapp}</span>
                </div>
                {selectedArtwork.submission.age && (
                  <div>
                    <span className="font-medium text-gray-700">Age:</span>
                    <span className="ml-2 text-gray-600">{selectedArtwork.submission.age}</span>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Payment:</span>
                  <span className="ml-2">
                    {selectedArtwork.submission.hasPaid ? (
                      <Badge className="bg-green-100 text-green-700">Paid</Badge>
                    ) : (
                      <Badge className="bg-yellow-100 text-yellow-700">Unpaid</Badge>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JudgingPortal;