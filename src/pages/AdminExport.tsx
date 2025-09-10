import { useState } from 'react';
import { AdminCSVExport } from '../components/AdminCSVExport';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Loader2 } from 'lucide-react';

export default function AdminExport() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');

  // Admin password (in production, this should be more secure)
  const ADMIN_PASSWORD = 'daamieventss1234@@89';

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setAuthError('');
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      // Store authentication in sessionStorage for this session
      sessionStorage.setItem('admin-authenticated', 'true');
    } else {
      setAuthError('Invalid password. Please try again.');
    }
    
    setIsAuthenticating(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  // Check if already authenticated in this session
  useState(() => {
    const isAuth = sessionStorage.getItem('admin-authenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-creative-purple/30 to-creative-pink/30 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-creative-blue/30 to-creative-purple/30 rounded-full blur-3xl"></div>
        </div>
        
        <Card className="w-full max-w-md glassmorphism border-white/20 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center pb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-creative-purple/20 to-creative-pink/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-creative-purple" />
            </div>
            <CardTitle className="text-white text-2xl">Admin Access Required</CardTitle>
            <p className="text-white/60 text-sm">Enter password to access participant data export</p>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <div className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 h-12 text-base"
                  disabled={isAuthenticating}
                />
                {authError && (
                  <p className="text-red-400 text-sm mt-2">{authError}</p>
                )}
              </div>
              
              <Button
                onClick={handleLogin}
                disabled={isAuthenticating || !password.trim()}
                className="w-full bg-gradient-to-r from-creative-purple to-creative-pink hover:from-creative-purple/80 hover:to-creative-pink/80 text-white font-semibold py-3 text-lg rounded-xl shadow-lg"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </div>
            
            <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30">
              <p className="text-yellow-400 text-sm text-center">
                <strong>Authorized Personnel Only</strong><br />
                This area contains sensitive participant data
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminCSVExport />;
}