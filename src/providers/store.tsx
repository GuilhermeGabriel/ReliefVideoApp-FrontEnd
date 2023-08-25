import React, { useEffect, useState, createContext, useContext, ReactNode } from 'react';

interface Data {
  listVideos: string[];
  bookmarks: string[];
  actualVideo: string;
}

interface StoreContextType {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data>({
    listVideos: [],
    bookmarks: [],
    actualVideo: '',
  });

  useEffect(() => {
    const dataStorage = localStorage.getItem('data');
    if (dataStorage) {
      setData(JSON.parse(dataStorage));
    } else {
      localStorage.setItem('data', JSON.stringify(data));
    }
  }, []);

  return (
    <StoreContext.Provider value={{ data, setData }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
