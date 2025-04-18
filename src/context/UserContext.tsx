// context/UserContext.tsx
import {createContext, useContext, useState, ReactNode} from 'react';
import {User} from 'firebase/auth';

interface UserContextType {
  user: User | null;
  addUser: (user: User) => void;
  removeUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{user, addUser, removeUser}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
