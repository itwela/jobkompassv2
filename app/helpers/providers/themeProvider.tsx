'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeStyles = {
  background: string;
  card: {
    background: string;
    border: string;
    hoverTransform: string;
    accent: string;
    boxShadow: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    title: string;
    subtitle: string;
    error: string;
    success: string;
  };
  icon: {
    default: string;
    hover: string;
    accent: string;
  };
  nav: {
    background: string;
    border: string;
    activeColor: string;
    inactiveColor: string;
    hoverTransform: string;
    colors: {
      home: string;
      applications: string;
      companyHub: string;
      careerAssistant: string;
      workers: string;
      blog: string;
      settings: string;
      landing: string;
    };
  };
  status: {
    interested: string;
    applied: string;
    interviewing: string;
    offer: string;
    rejected: string;
    ghosted: string;
  };
  form: {
    input: {
      background: string;
      text: string;
      placeholder: string;
      border: string;
      focus: string;
      hover: {
        background: string;
        transform: string;
        shadow: string;
      };
    };
    select: {
      background: string;
      text: string;
      border: string;
      hover: {
        background: string;
        transform: string;
      };
    };
    popup: {
      background: string;
      backdropFilter: string;
      shadow: string;
    };
  };
};

interface JobKompassThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  styles: ThemeStyles;
}

const JobKompassThemeContext = createContext<JobKompassThemeContextType | null>(null);

export function JobKompassThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const styles: Record<'light' | 'dark', ThemeStyles> = {
    dark: {
      background: '#0f0f0f',
      card: {
        background: '#1a1a1a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        hoverTransform: 'hover:translate-y-[-2px]',
        accent: 'rgba(255, 255, 255, 0.05)',
        boxShadow: 'rgba(255, 255, 255, 0.1)'
      },
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
        tertiary: 'rgba(255, 255, 255, 0.4)',
        title: '#ffffff',
        subtitle: 'rgba(255, 255, 255, 0.7)',
        error: '#dc2626',
        success: '#16a34a'
      },
      icon: {
        default: 'text-white/70',
        hover: 'text-white/90',
        accent: '#3b82f6'
      },
      nav: {
        background: '#1a1a1a',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        activeColor: '#ffffff',
        inactiveColor: 'rgba(255, 255, 255, 0.7)',
        hoverTransform: 'hover:translate-y-[-2px]',
        colors: {
          home: '#88F4FF',
          applications: '#3b82f6',
          companyHub: '#2563eb',
          careerAssistant: '#4f46e5',
          workers: '#7c3aed',
          blog: '#ffffff',
          settings: '#ffffff',
          landing: '#ffffff',
        }
      },
      status: {
        interested: 'rgba(255, 255, 255, 0.5)',
        applied: '#219BE4',
        interviewing: '#635AD9',
        offer: '#7338AC',
        rejected: '#ff8c69',
        ghosted: '#4a5568'
      },
      form: {
        input: {
          background: 'rgba(255, 255, 255, 0.05)',
          text: '#ffffff',
          placeholder: 'rgba(255, 255, 255, 0.4)',
          border: 'rgba(255, 255, 255, 0.1)',
          focus: '#3b82f6',
          hover: {
            background: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateY(-1px)',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }
        },
        select: {
          background: 'rgba(255, 255, 255, 0.05)',
          text: '#ffffff',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: {
            background: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateY(-1px)'
          }
        },
        popup: {
          background: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(8px)',
          shadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }
      }
    },
    light: {
      background: '#ffffff',
      card: {
        background: '#f8f9fa',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        hoverTransform: 'hover:translate-y-[-2px]',
        accent: 'rgba(0, 0, 0, 0.05)',
        boxShadow: 'rgba(0, 0, 0, 0.1)'
      },
      text: {
        primary: '#111827',
        secondary: '#374151',
        tertiary: '#6B7280',
        title: '#111827',
        subtitle: '#374151',
        error: '#dc2626',
        success: '#16a34a'
      },
      icon: {
        default: 'text-gray-400',
        hover: 'text-gray-900',
        accent: '#3b82f6'
      },
      nav: {
        background: '#f8f9fa',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        activeColor: '#1a1a1a',
        inactiveColor: 'rgba(0, 0, 0, 0.7)',
        hoverTransform: 'hover:translate-y-[-2px]',
        colors: {
          home: '#88F4FF',
          applications: '#3b82f6',
          companyHub: '#2563eb',
          careerAssistant: '#4f46e5',
          workers: '#7c3aed',
          blog: '#1a1a1a',
          settings: '#1a1a1a',
          landing: '#1a1a1a',
        }
      },
      status: {
        interested: 'rgba(0, 0, 0, 0.2)',
        applied: '#219BE4',
        interviewing: '#635AD9',
        offer: '#7338AC',
        rejected: '#ff8c69',
        ghosted: '#4a5568'
      },
      form: {
        input: {
          background: 'rgba(0, 0, 0, 0.02)',
          text: '#111827',
          placeholder: 'rgba(0, 0, 0, 0.4)',
          border: 'rgba(0, 0, 0, 0.1)',
          focus: '#3b82f6',
          hover: {
            background: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateY(-1px)',
            shadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }
        },
        select: {
          background: 'rgba(0, 0, 0, 0.02)',
          text: '#111827',
          border: 'rgba(0, 0, 0, 0.1)',
          hover: {
            background: 'rgba(0, 0, 0, 0.04)',
            transform: 'translateY(-1px)'
          }
        },
        popup: {
          background: 'rgba(248, 249, 250, 0.95)',
          backdropFilter: 'blur(8px)',
          shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }
    },
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const value = {
    theme,
    toggleTheme,
    styles: styles[theme],
  };

  return (
    <JobKompassThemeContext.Provider value={value}>
      <div className={`transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        {children}
      </div>
    </JobKompassThemeContext.Provider>
  );
}

export const useJobKompassTheme = () => {
  const context = useContext(JobKompassThemeContext);
  if (!context) {
    throw new Error('useJobKompassTheme must be used within a JobKompassThemeProvider');
  }
  return context;
};