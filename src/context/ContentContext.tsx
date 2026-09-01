import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProfileData, TimelineItem, EssayItem } from '../types';
import { profileData as defaultProfile } from '../data/profile';
import { timelineData as defaultTimeline } from '../data/timeline';
import { essaysData as defaultEssays } from '../data/essays';

interface ContentContextType {
  profile: ProfileData;
  timeline: TimelineItem[];
  essays: EssayItem[];
  isAdminOpen: boolean;
  isAuthDialogOpen: boolean;
  isAuthenticated: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
  openAuthDialog: () => void;
  closeAuthDialog: () => void;
  verifyPassword: (pwd: string) => boolean;
  setPassword: (pwd: string) => void;
  updateProfile: (data: ProfileData) => void;
  updateTimeline: (data: TimelineItem[]) => void;
  updateEssays: (data: EssayItem[]) => void;
  resetToDefaults: () => void;
  exportCodeFiles: () => { profileCode: string; timelineCode: string; essaysCode: string; fullJson: string };
}

const STORAGE_KEYS = {
  PROFILE: 'minan_portfolio_profile',
  TIMELINE: 'minan_portfolio_timeline',
  ESSAYS: 'minan_portfolio_essays',
  PASSWORD: 'minan_portfolio_admin_pwd',
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<ProfileData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? JSON.parse(saved) : defaultProfile;
    } catch {
      return defaultProfile;
    }
  });

  const [timeline, setTimeline] = useState<TimelineItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TIMELINE);
      return saved ? JSON.parse(saved) : defaultTimeline;
    } catch {
      return defaultTimeline;
    }
  });

  const [essays, setEssays] = useState<EssayItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ESSAYS);
      return saved ? JSON.parse(saved) : defaultEssays;
    } catch {
      return defaultEssays;
    }
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Sync to localStorage
  const updateProfile = (data: ProfileData) => {
    setProfile(data);
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const updateTimeline = (data: TimelineItem[]) => {
    setTimeline(data);
    try {
      localStorage.setItem(STORAGE_KEYS.TIMELINE, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const updateEssays = (data: EssayItem[]) => {
    setEssays(data);
    try {
      localStorage.setItem(STORAGE_KEYS.ESSAYS, JSON.stringify(data));
    } catch (e) {
      console.error(e);
    }
  };

  const resetToDefaults = () => {
    setProfile(defaultProfile);
    setTimeline(defaultTimeline);
    setEssays(defaultEssays);
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.TIMELINE);
    localStorage.removeItem(STORAGE_KEYS.ESSAYS);
  };

  const verifyPassword = (pwd: string) => {
    const saved = localStorage.getItem(STORAGE_KEYS.PASSWORD) || 'minan888';
    if (pwd === saved) {
      setIsAuthenticated(true);
      setIsAuthDialogOpen(false);
      setIsAdminOpen(true);
      return true;
    }
    return false;
  };

  const setPassword = (pwd: string) => {
    localStorage.setItem(STORAGE_KEYS.PASSWORD, pwd);
  };

  const openAdmin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsAuthDialogOpen(true);
    }
  };

  const closeAdmin = () => setIsAdminOpen(false);
  const openAuthDialog = () => setIsAuthDialogOpen(true);
  const closeAuthDialog = () => setIsAuthDialogOpen(false);

  // Global shortcut: Ctrl+Shift+E or Cmd+Shift+E
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'E' || e.key === 'e')) {
        e.preventDefault();
        openAdmin();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const exportCodeFiles = () => {
    const profileCode = `import { ProfileData } from '../types';
import avatarImg from '../assets/avatar.jpg';

export const profileData: ProfileData = ${JSON.stringify(
      { ...profile, avatarUrl: 'avatarImg' },
      null,
      2
    ).replace('"avatarUrl": "avatarImg"', 'avatarUrl: avatarImg')};
`;

    const timelineCode = `import { TimelineItem } from '../types';

export const timelineData: TimelineItem[] = ${JSON.stringify(timeline, null, 2)};
`;

    const essaysCode = `import { EssayItem } from '../types';

export const essaysData: EssayItem[] = ${JSON.stringify(essays, null, 2)};
`;

    const fullJson = JSON.stringify({ profile, timeline, essays }, null, 2);

    return { profileCode, timelineCode, essaysCode, fullJson };
  };

  return (
    <ContentContext.Provider
      value={{
        profile,
        timeline,
        essays,
        isAdminOpen,
        isAuthDialogOpen,
        isAuthenticated,
        openAdmin,
        closeAdmin,
        openAuthDialog,
        closeAuthDialog,
        verifyPassword,
        setPassword,
        updateProfile,
        updateTimeline,
        updateEssays,
        resetToDefaults,
        exportCodeFiles,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
