import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { 
  Download, 
  FileText, 
  Users, 
  Database,
  Loader2,
  CheckCircle,
  AlertCircle,
  Eye
} from "lucide-react";
import { exportParticipantsToCSV, exportParticipantsSimpleCSV, previewParticipantsData } from "../utils/csvExport";

interface ParticipantPreview {
  id: string;
  name: string;
  email: string;
  phone: string;
  deviceId: string;
  registrationDate: Date;
  status: string;
  authProvider?: string;
}

export function AdminCSVExport() {
  const [isExporting, setIsExporting] = useState(false);
  const [isExportingSimple, setIsExportingSimple] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [previewData, setPreviewData] = useState<ParticipantPreview[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const handleFullExport = async () => {
    setIsExporting(true);
    try {
      const result = await exportParticipantsToCSV();
      
      if (result.success) {
        toast({
          title: "Export Successful!",
          description: result.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Export Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Export Error",
        description: "An unexpected error occurred during export.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSimpleExport = async () => {
    setIsExportingSimple(true);
    try {
      const result = await exportParticipantsSimpleCSV();
      
      if (result.success) {
        toast({
          title: "Export Successful!",
          description: result.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Export Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Export Error",
        description: "An unexpected error occurred during export.",
        variant: "destructive",
      });
    } finally {
      setIsExportingSimple(false);
    }
  };

  const handlePreview = async () => {
    setIsPreviewing(true);
    try {
      const result = await previewParticipantsData();
      
      if (result.success && result.data) {
        setPreviewData(result.data.slice(0, 10)); // Show first 10 records
        setShowPreview(true);
        toast({
          title: "Data Loaded",
          description: `${result.message}. Showing first 10 records.`,
        });
      } else {
        toast({
          title: "Preview Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Preview Error",
        description: "An unexpected error occurred while loading preview.",
        variant: "destructive",
      });
    } finally {
      setIsPreviewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-2 bg-gradient-to-r from-creative-purple/20 to-creative-pink/20 rounded-full mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-creative-purple to-creative-pink rounded-full flex items-center justify-center mx-auto">
              <Database className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-creative-purple via-creative-pink to-creative-blue bg-clip-text text-transparent leading-tight">
            Sikkim Creative Star
          </h1>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Participant Data Export
          </h2>
          
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Export participant registration data including names, device IDs, and complete profiles
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Simple Export Card */}
          <Card className="glassmorphism border-white/20 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-white text-xl">Simple Export</CardTitle>
              <CardDescription className="text-white/60">
                Export essential data: Name, Device ID, and Registration Date
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                  <h3 className="text-white font-semibold mb-2">Includes:</h3>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• Participant Name</li>
                    <li>• Device ID</li>
                    <li>• Registration Date</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleSimpleExport}
                  disabled={isExportingSimple}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 text-lg rounded-xl shadow-lg"
                >
                  {isExportingSimple ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Simple CSV
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Full Export Card */}
          <Card className="glassmorphism border-white/20 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-white text-xl">Complete Export</CardTitle>
              <CardDescription className="text-white/60">
                Export all participant data including contact details and profile info
              </CardDescription>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/30">
                  <h3 className="text-white font-semibold mb-2">Includes:</h3>
                  <ul className="text-white/80 text-sm space-y-1">
                    <li>• All participant details</li>
                    <li>• Contact information</li>
                    <li>• Profile images URLs</li>
                    <li>• Registration status</li>
                    <li>• Authentication method</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={handleFullExport}
                  disabled={isExporting}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 text-lg rounded-xl shadow-lg"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-5 w-5" />
                      Download Full CSV
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Section */}
        <Card className="glassmorphism border-white/20 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-white text-xl flex items-center justify-center gap-2">
              <Eye className="h-6 w-6 text-creative-purple" />
              Data Preview
            </CardTitle>
            <CardDescription className="text-white/60">
              Preview participant data before downloading
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="text-center mb-6">
              <Button 
                onClick={handlePreview}
                disabled={isPreviewing}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-3 text-lg font-semibold rounded-xl backdrop-blur-sm"
              >
                {isPreviewing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-5 w-5" />
                    Preview Data
                  </>
                )}
              </Button>
            </div>

            {showPreview && previewData.length > 0 && (
              <div className="overflow-x-auto">
                <div className="mb-4 flex items-center justify-between">
                  <Badge className="bg-creative-purple text-white">
                    Showing first 10 records
                  </Badge>
                  <Badge className="bg-green-500 text-white">
                    Total: {previewData.length}+ participants
                  </Badge>
                </div>
                
                <div className="bg-white/5 rounded-xl p-4 backdrop-blur-sm">
                  <div className="grid gap-4">
                    {previewData.map((participant, index) => (
                      <div key={participant.id} className="p-4 bg-white/10 rounded-lg border border-white/20">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-white/60 text-sm">Name</p>
                            <p className="text-white font-semibold">{participant.name}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm">Device ID</p>
                            <p className="text-white font-mono text-sm">{participant.deviceId}</p>
                          </div>
                          <div>
                            <p className="text-white/60 text-sm">Registration Date</p>
                            <p className="text-white text-sm">{participant.registrationDate.toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <Badge className={participant.status === 'registered' ? 'bg-blue-500' : 'bg-gray-500'}>
                            {participant.status}
                          </Badge>
                          <Badge variant="outline" className="border-white/30 text-white/70">
                            {participant.authProvider || 'email'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="glassmorphism border-white/20 backdrop-blur-sm mt-8">
          <CardHeader>
            <CardTitle className="text-white text-lg flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Usage Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Simple Export</h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Best for quick analysis and tracking</li>
                  <li>• Contains essential identification data</li>
                  <li>• Smaller file size for easy sharing</li>
                  <li>• Device ID helps identify unique registrations</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-white font-semibold">Complete Export</h3>
                <ul className="text-white/80 text-sm space-y-2">
                  <li>• Full participant database backup</li>
                  <li>• Contains all registration details</li>
                  <li>• Includes contact information for outreach</li>
                  <li>• Profile image URLs for verification</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}