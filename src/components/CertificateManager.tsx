import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { 
  Upload, 
  FileText, 
  Users, 
  Award,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye,
  Download,
  RefreshCw
} from "lucide-react";
import {
  bulkUploadCertificates,
  getCertificateUploadStatus,
  getParticipantsInCSVOrder
} from "../utils/certificateUpload";
import {
  autoUploadCertificatesFromFolder,
  getCertificateFolderMapping,
  previewAutoUpload
} from "../utils/autoCertificateUpload";

interface UploadProgress {
  current: number;
  total: number;
  participant: string;
  percentage: number;
}

interface CertificateStatus {
  total: number;
  withCertificates: number;
  withoutCertificates: number;
  participants: Array<{
    serialNumber: number;
    name: string;
    email: string;
    hasCertificate: boolean;
    certificateUrl?: string;
  }>;
}

export function CertificateManager() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [certificateStatus, setCertificateStatus] = useState<CertificateStatus | null>(null);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isAutoUploading, setIsAutoUploading] = useState(false);
  const [showFolderPreview, setShowFolderPreview] = useState(false);
  const [folderMapping, setFolderMapping] = useState<any>(null);
  const { toast } = useToast();

  // Load certificate status on component mount
  useEffect(() => {
    loadCertificateStatus();
  }, []);

  const loadCertificateStatus = async () => {
    setIsLoadingStatus(true);
    try {
      const status = await getCertificateUploadStatus();
      setCertificateStatus(status);
    } catch (error) {
      toast({
        title: "Error Loading Status",
        description: "Failed to load certificate status",
        variant: "destructive",
      });
    } finally {
      setIsLoadingStatus(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFiles(files);
      
      toast({
        title: "Files Selected",
        description: `Selected ${files.length} certificate images`,
      });
    }
  };

  const handleBulkUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select certificate images first",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(null);

    try {
      const result = await bulkUploadCertificates(
        selectedFiles,
        (progress) => {
          setUploadProgress({
            ...progress,
            percentage: Math.round((progress.current / progress.total) * 100)
          });
        }
      );

      if (result.success) {
        toast({
          title: "Upload Completed!",
          description: result.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Upload Partially Failed",
          description: result.message,
          variant: "destructive",
          duration: 7000,
        });
      }

      // Reload status after upload
      await loadCertificateStatus();
      
      // Clear selected files
      setSelectedFiles(null);
      const fileInput = document.getElementById('certificate-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';

    } catch (error) {
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(null);
    }
  };

  const downloadParticipantList = async () => {
    try {
      const participants = await getParticipantsInCSVOrder();
      
      const csvContent = [
        'Serial,Name,Email,Registration Date',
        ...participants.map((p, index) =>
          `${index + 1},"${p.name}","${p.email}","${p.registrationDate.toISOString()}"`
        )
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `participant-csv-order-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      toast({
        title: "List Downloaded",
        description: "Participant list in CSV order has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download participant list",
        variant: "destructive",
      });
    }
  };

  const handleAutoUpload = async () => {
    setIsAutoUploading(true);
    
    try {
      const result = await autoUploadCertificatesFromFolder(
        (progress) => {
          setUploadProgress({
            ...progress,
            percentage: Math.round((progress.current / progress.total) * 100)
          });
        }
      );

      if (result.success) {
        toast({
          title: "Auto Upload Completed!",
          description: `${result.newUploads} certificates uploaded successfully from folder`,
          duration: 5000,
        });
      } else {
        toast({
          title: "Auto Upload Partially Failed",
          description: result.message,
          variant: "destructive",
          duration: 7000,
        });
      }

      // Reload status after upload
      await loadCertificateStatus();

    } catch (error) {
      toast({
        title: "Auto Upload Failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsAutoUploading(false);
      setUploadProgress(null);
    }
  };

  const showFolderMapping = async () => {
    try {
      const mapping = await getCertificateFolderMapping();
      setFolderMapping(mapping);
      setShowFolderPreview(true);
      
      toast({
        title: "Folder Mapping Loaded",
        description: `Found ${mapping.totalParticipants} participants mapped to certificates`,
      });
    } catch (error) {
      toast({
        title: "Failed to Load Mapping",
        description: "Could not load certificate folder mapping",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-full mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-creative-purple to-creative-pink rounded-full flex items-center justify-center mx-auto">
              <Award className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-creative-purple via-creative-pink to-creative-blue bg-clip-text text-transparent leading-tight">
            Certificate Manager
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Sikkim Creative Star Season 1
          </h2>
          
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Upload certificates in serial order matching participant registration sequence. Each certificate will be automatically matched with participants based on their registration date.
          </p>
        </div>

        {/* Status Overview */}
        {certificateStatus && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificateStatus.total}</div>
                <p className="text-white/60 text-sm">Total Participants</p>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificateStatus.withCertificates}</div>
                <p className="text-white/60 text-sm">With Certificates</p>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <AlertCircle className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">{certificateStatus.withoutCertificates}</div>
                <p className="text-white/60 text-sm">Pending Certificates</p>
              </CardContent>
            </Card>
            
            <Card className="glassmorphism border-white/20 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white">
                  {Math.round((certificateStatus.withCertificates / certificateStatus.total) * 100)}%
                </div>
                <p className="text-white/60 text-sm">Completion Rate</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Upload Section */}
        <Card className="glassmorphism border-white/20 backdrop-blur-sm mb-8">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-white text-2xl flex items-center justify-center gap-2">
              <Upload className="h-6 w-6 text-creative-purple" />
              Bulk Certificate Upload
            </CardTitle>
            <CardDescription className="text-white/60 text-base">
              Select certificate images (1.jpg, 2.jpg, etc.) to upload in serial order
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <div className="space-y-6">
              {/* File Selection */}
              <div className="border-2 border-dashed border-white/30 rounded-xl p-8 text-center hover:border-creative-blue/50 transition-colors bg-gradient-to-br from-white/5 to-white/10">
                <input
                  type="file"
                  id="certificate-upload"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  disabled={isUploading}
                />
                <label htmlFor="certificate-upload" className="cursor-pointer">
                  <Upload className="h-12 w-12 text-white/40 mx-auto mb-4" />
                  <p className="text-white/70 text-lg mb-2">Click to select certificate images</p>
                  <p className="text-white/50 text-sm mb-4">
                    Select multiple JPG files (1.jpg, 2.jpg, 3.jpg, etc.)
                  </p>
                  {selectedFiles && (
                    <Badge className="bg-creative-purple text-white px-4 py-2 text-sm">
                      {selectedFiles.length} files selected
                    </Badge>
                  )}
                </label>
              </div>

              {/* Upload Progress */}
              {uploadProgress && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      Uploading certificate {uploadProgress.current} of {uploadProgress.total}
                    </span>
                    <span className="text-white/60">
                      {uploadProgress.percentage}%
                    </span>
                  </div>
                  <Progress value={uploadProgress.percentage} className="h-3" />
                  <p className="text-white/70 text-sm">
                    Processing: {uploadProgress.participant}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleBulkUpload}
                  disabled={isUploading || !selectedFiles}
                  className="flex-1 bg-gradient-to-r from-creative-purple to-creative-pink hover:from-creative-purple/80 hover:to-creative-pink/80 text-white font-semibold py-3 text-lg rounded-xl shadow-lg"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-5 w-5" />
                      Upload Certificates
                    </>
                  )}
                </Button>

                <Button
                  onClick={downloadParticipantList}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-3 rounded-xl backdrop-blur-sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Serial List
                </Button>

                <Button
                  onClick={loadCertificateStatus}
                  disabled={isLoadingStatus}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-6 py-3 rounded-xl backdrop-blur-sm"
                >
                  {isLoadingStatus ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participant Status List */}
        {certificateStatus && (
          <Card className="glassmorphism border-white/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center gap-2">
                <Eye className="h-5 w-5 text-creative-purple" />
                Participant Certificate Status
              </CardTitle>
              <CardDescription className="text-white/60">
                Serial order based on registration date (earliest registration = Serial #1)
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="max-h-96 overflow-y-auto">
                <div className="grid gap-3">
                  {certificateStatus.participants.slice(0, 20).map((participant) => (
                    <div
                      key={participant.serialNumber}
                      className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-creative-purple/20 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {participant.serialNumber}
                          </span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{participant.name}</p>
                          <p className="text-white/60 text-sm">{participant.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {participant.hasCertificate ? (
                          <>
                            <Badge className="bg-green-500 text-white">
                              Certificate Ready
                            </Badge>
                            {participant.certificateUrl && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                                onClick={() => window.open(participant.certificateUrl, '_blank')}
                              >
                                <Eye className="h-3 w-3" />
                              </Button>
                            )}
                          </>
                        ) : (
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                            Pending
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                  {certificateStatus.participants.length > 20 && (
                    <div className="text-center py-4">
                      <p className="text-white/60">
                        Showing first 20 participants. Total: {certificateStatus.participants.length}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Folder Preview Modal */}
        {showFolderPreview && folderMapping && (
          <Card className="glassmorphism border-white/20 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle className="text-white text-xl flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-creative-purple" />
                  Certificate Folder Mapping Preview
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowFolderPreview(false)}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Close
                </Button>
              </CardTitle>
              <CardDescription className="text-white/60">
                Preview of how certificates will be matched with participants
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                    <p className="text-white font-semibold">Total Participants</p>
                    <p className="text-blue-400 text-2xl font-bold">{folderMapping.totalParticipants}</p>
                  </div>
                  <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <p className="text-white font-semibold">Expected Certificates</p>
                    <p className="text-green-400 text-2xl font-bold">{folderMapping.expectedCertificates}</p>
                  </div>
                  <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <p className="text-white font-semibold">Folder Path</p>
                    <p className="text-purple-400 text-xs break-all">{folderMapping.folderPath}</p>
                  </div>
                </div>
                
                <div className="max-h-64 overflow-y-auto">
                  <h3 className="text-white font-semibold mb-3">Certificate Mapping (First 20):</h3>
                  <div className="space-y-2">
                    {folderMapping.mapping.slice(0, 20).map((item: any) => (
                      <div key={item.serialNumber} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-mono text-sm w-8">{item.serialNumber}.</span>
                          <span className="text-white text-sm">{item.participantName}</span>
                          <span className="text-white/60 text-xs">({item.participantEmail})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-creative-blue text-sm font-mono">{item.expectedFile}</span>
                          {item.hasCertificate ? (
                            <Badge className="bg-green-500 text-white text-xs">Ready</Badge>
                          ) : (
                            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">Pending</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                    {folderMapping.mapping.length > 20 && (
                      <p className="text-center text-white/60 text-sm py-2">
                        ... and {folderMapping.mapping.length - 20} more participants
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Instructions */}
        <Card className="glassmorphism border-white/20 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-lg">Upload Instructions</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-white font-semibold">CSV Order Matching</h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Certificates match exact CSV export order</li>
                  <li>• Certificate 1.jpg → First row in CSV</li>
                  <li>• Certificate 2.jpg → Second row in CSV</li>
                  <li>• Same order as participant name/device ID CSV</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Auto Upload Process</h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Reads directly from specified folder</li>
                  <li>• Uploads to Cloudinary with proper naming</li>
                  <li>• Updates Firebase with certificate URLs</li>
                  <li>• 2-second delays to avoid rate limits</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}