import React, { useState, useEffect } from 'react';
import { Landing } from './views/Landing';
import { Dashboard } from './views/Dashboard';
import { AddCrop } from './views/AddCrop';
import { WeatherView } from './views/WeatherView';
import { Scanner } from './views/Scanner';
import { Onboarding } from './views/Onboarding'; 
import { ProfileView } from './views/ProfileView'; 
import { Login } from './views/Login'; 
import { RiskMap } from './views/RiskMap';
import { Community } from './views/Community';
import { BottomNav } from './components/BottomNav';
import { LanguageToggle } from './components/LanguageToggle';
import { TutorialOverlay } from './components/TutorialOverlay'; 
import { Language } from './types';
import { getProfile, hasSeenTutorial, markTutorialSeen, getCrops, updateCropsBatch } from './services/storageService';
import { TRANSLATIONS } from './constants';
import { Sprout, Bot, WifiOff, Wifi } from 'lucide-react';
import { getVoidrStorageAlert, VoidrAlertResponse } from './services/aiService';
import { fetchWeather, calculateShelfLife } from './services/weatherService';

export const App: React.FC = () => {
  // Initialize view based on whether the user has a profile (Remember User)
  const [view, setView] = useState(() => getProfile() ? 'login' : 'landing');
  const [lang, setLang] = useState<Language>('bn');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  // Offline State
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // Global Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- ONLINE/OFFLINE HANDLER & SYNC ---
  useEffect(() => {
    const handleOnline = async () => {
        setIsOffline(false);
        showToast("You are back online! Syncing data...");
        await syncCrops();
    };
    
    const handleOffline = () => {
        setIsOffline(true);
        showToast("You are offline. Using cached data.");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncCrops = async () => {
      const crops = getCrops();
      const active = crops.filter(c => c.status === 'active');
      if (active.length === 0) return;
      
      let updatedCount = 0;
      const updatedCrops = [...crops];

      // Sequential update to avoid overwhelming network/API immediately after reconnect
      for (const crop of active) {
          try {
              // Recalculate shelf life with fresh weather data
              const newHours = await calculateShelfLife(crop.cropType, crop.division, crop.harvestDate);
              
              let risk: 'low' | 'medium' | 'high' = 'low';
              if (newHours < 48) risk = 'high';
              else if (newHours < 168) risk = 'medium';

              // Only update if changed
              if (newHours !== crop.etclHours || risk !== crop.riskLevel) {
                  const index = updatedCrops.findIndex(c => c.id === crop.id);
                  if (index !== -1) {
                      updatedCrops[index] = { ...crop, etclHours: newHours, riskLevel: risk };
                      updatedCount++;
                  }
              }
          } catch (e) {
              console.error("Sync failed for crop", crop.id);
          }
      }

      if (updatedCount > 0) {
          updateCropsBatch(updatedCrops);
          showToast(`Synced ${updatedCount} crops with live weather.`);
      }
  };

  // --- VOIDR ALERT BOT (GLOBAL BACKGROUND SERVICE) ---
  useEffect(() => {
    let intervalId: any;

    const runGlobalBot = async () => {
        // Only run if authenticated and user has crops and ONLINE
        if (!isAuthenticated || isOffline) return;
        
        const crops = getCrops();
        const activeCrops = crops.filter(c => c.status === 'active');
        if (activeCrops.length === 0) return;

        const profile = getProfile();
        let loc = profile?.district || 'Dhaka';

        try {
            // Fetch minimal context
            const weather = await fetchWeather(loc);
            const weatherDesc = `${weather.condition}, Temp: ${weather.temp}C`;

            // Process active crops for critical alerts SEQUENTIALLY to avoid Rate Limits
            for (const crop of activeCrops) {
                // We use a simplified check here to avoid spamming the AI API globally if not needed
                const response = await getVoidrStorageAlert(
                    crop.storageType, 
                    crop.cropType,
                    loc,
                    weatherDesc
                );

                if (response && response.status === 'harmful') {
                    sendGlobalSMS(profile?.phone, response.alert_message);
                }

                // Add small delay between calls to be nice to API
                await new Promise(r => setTimeout(r, 2000));
            }

        } catch (e) {
            console.error("Global Bot Error", e);
        }
    };

    if (isAuthenticated) {
        // Run immediately
        runGlobalBot();
        // Run every 60 seconds (Increased from 15s to reduce quota usage)
        intervalId = setInterval(runGlobalBot, 60000);
    }

    return () => clearInterval(intervalId);
  }, [isAuthenticated, isOffline]);

  const sendGlobalSMS = (phone: string | undefined, message: string) => {
      if (!phone) return;
      
      const storedGateway = localStorage.getItem('sms_gateway_url');
      const storedKey = localStorage.getItem('sms_api_key');
      const lastSentKey = `last_sms_${message.slice(0, 10)}`;
      const lastSentTime = localStorage.getItem(lastSentKey);
      
      // Prevent spamming the same SMS every 60 seconds. Limit to once per 10 mins for demo.
      if (lastSentTime && (Date.now() - parseInt(lastSentTime) < 600000)) {
          return;
      }

      if (storedGateway && storedKey) {
          const encodedMessage = encodeURIComponent(message);
          const url = `${storedGateway}?api_key=${storedKey}&type=text&contacts=${phone}&senderid=8809601001329&msg=${encodedMessage}`;
          
          fetch(url)
            .then(() => {
                showToast(`SMS Sent: ${message.slice(0, 20)}...`);
                localStorage.setItem(lastSentKey, Date.now().toString());
            })
            .catch(err => console.error(err));
      } else {
          console.log(`%c[BACKGROUND SMS] To: ${phone} | Msg: ${message}`, "color: yellow; background: red; font-weight: bold;");
          // Only show toast for simulation if it's "new"
          showToast(`⚠️ SMS Alert Sent to ${phone}`);
          localStorage.setItem(lastSentKey, Date.now().toString());
      }
  };

  const showToast = (msg: string) => {
      setToastMessage(msg);
      setTimeout(() => setToastMessage(null), 3000);
  };
  // ----------------------------------------------------

  const handleRegister = () => {
    setView('onboarding');
  };

  const handleLoginStart = () => {
    setView('login');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('dashboard');
    if (!hasSeenTutorial()) {
        setShowTutorial(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('landing');
  };

  const handleOnboardingComplete = () => {
    setIsAuthenticated(true);
    setView('dashboard');
    setShowTutorial(true);
  };

  const handleTutorialComplete = () => {
    markTutorialSeen();
    setShowTutorial(false);
  };

  const handleReset = () => {
      setIsAuthenticated(false);
      setView('landing');
  };

  // Intercept view changes to handle logout immediately
  const handleSetView = (newView: string) => {
    if (newView === 'logout') {
      handleLogout();
    } else {
      setView(newView);
    }
  };

  // Views that are "internal" require the nav bar
  const isInternalView = ['dashboard', 'add', 'weather', 'scanner', 'profile', 'map', 'community'].includes(view);

  // If user tries to access internal view without auth, kick to landing or login
  useEffect(() => {
      if (isInternalView && !isAuthenticated) {
          // If profile exists, go to login (PIN), else landing
          const hasProfile = getProfile();
          setView(hasProfile ? 'login' : 'landing');
      }
  }, [view, isAuthenticated]);

  return (
    <div className="bg-slate-50 min-h-screen w-full relative overflow-x-hidden font-sans text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Offline Banner */}
      {isOffline && (
        <div className="bg-amber-500 text-amber-950 px-4 py-2 text-center text-xs font-bold uppercase tracking-widest sticky top-0 z-[60] flex items-center justify-center gap-2 shadow-md animate-in slide-in-from-top">
            <WifiOff size={14} />
            <span>Offline Mode • Using Cached Data</span>
        </div>
      )}

      {/* Top Bar (visible on internal pages) */}
      {isInternalView && (
        <div className={`bg-emerald-800 text-white shadow-lg sticky ${isOffline ? 'top-8' : 'top-0'} z-50 backdrop-blur-md bg-opacity-95 border-b border-emerald-900 transition-all`}>
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleSetView('dashboard')}>
               {!logoError ? (
                   <img 
                    src="/SAMI.svg" 
                    alt="Logo" 
                    className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-105 transition-transform" 
                    onError={() => setLogoError(true)}
                   />
               ) : (
                   <div className="w-10 h-10 bg-emerald-700/50 rounded-lg flex items-center justify-center border border-emerald-600/50">
                       <Sprout className="text-lime-400" size={24} />
                   </div>
               )}
               <h1 className="font-bold text-2xl tracking-wide hidden sm:block text-emerald-50">{TRANSLATIONS.appTitle[lang]}</h1>
            </div>
            <div className="flex items-center gap-2 md:gap-6">
              <span className="text-emerald-200/80 text-sm font-medium hidden lg:block tracking-wide uppercase">{TRANSLATIONS.navTagline[lang]}</span>
              
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1 mr-4">
                  {[
                      {id: 'dashboard', label: TRANSLATIONS.dashboard[lang]},
                      {id: 'add', label: TRANSLATIONS.addBatch[lang]},
                      {id: 'community', label: TRANSLATIONS.community[lang]},
                      {id: 'map', label: TRANSLATIONS.riskMap[lang]},
                      {id: 'weather', label: TRANSLATIONS.weather[lang]},
                      {id: 'scanner', label: TRANSLATIONS.scanner[lang]}
                  ].map(item => (
                      <button 
                        key={item.id}
                        onClick={() => handleSetView(item.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === item.id ? 'bg-emerald-900/50 text-white shadow-inner' : 'text-emerald-100 hover:bg-emerald-700/50'}`}
                      >
                          {item.label}
                      </button>
                  ))}
                  <button 
                      onClick={() => handleSetView('profile')}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === 'profile' ? 'bg-emerald-900/50 text-white shadow-inner' : 'text-emerald-100 hover:bg-emerald-700/50'}`}
                  >
                      {TRANSLATIONS.farmerProfile[lang]}
                  </button>
              </div>

              <LanguageToggle lang={lang} setLang={setLang} />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className={`min-h-[calc(100vh-80px)] w-full ${isInternalView ? 'pb-32 md:pb-0' : ''}`}>
        <div className="w-full">
          {view === 'landing' && <Landing onEnter={handleRegister} onLogin={handleLoginStart} lang={lang} />}
          {view === 'login' && <Login lang={lang} onLogin={handleLoginSuccess} onReset={handleReset} />}
          {view === 'onboarding' && <Onboarding onComplete={handleOnboardingComplete} lang={lang} setLang={setLang} />}
          {view === 'dashboard' && <Dashboard lang={lang} setView={handleSetView} />}
          {view === 'add' && <AddCrop lang={lang} setView={handleSetView} />}
          {view === 'weather' && <WeatherView lang={lang} />}
          {view === 'scanner' && <Scanner lang={lang} />}
          {view === 'map' && <RiskMap lang={lang} />}
          {view === 'community' && <Community lang={lang} />}
          {view === 'profile' && <ProfileView lang={lang} setView={handleSetView} />}
        </div>
      </main>

      {/* Tutorial Overlay */}
      {showTutorial && isInternalView && (
        <TutorialOverlay onComplete={handleTutorialComplete} lang={lang} />
      )}

      {/* Bottom Navigation (Mobile Only, Internal Views) */}
      {isInternalView && (
        <BottomNav currentView={view} setView={handleSetView} lang={lang} />
      )}

      {/* Global Toast Notification */}
      {toastMessage && (
          <div className={`fixed top-28 right-4 z-[100] animate-in slide-in-from-right-10 fade-in duration-300`}>
              <div className="bg-slate-900/90 backdrop-blur-md text-white px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 max-w-sm">
                  {toastMessage.includes("SMS") ? <Bot size={24} className="text-lime-400" /> : <Wifi size={24} className="text-emerald-400" />}
                  <div>
                      <h4 className="font-bold text-sm text-lime-400 uppercase tracking-wider mb-1">System Alert</h4>
                      <p className="text-sm font-medium leading-tight">{toastMessage}</p>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};