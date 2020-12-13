import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface UserState {
  loggedIn: boolean;
}

interface IAppContext {
  user: UserState,
  startLoading(): void;
  stopLoading(): void;
  isLoading: boolean;
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = (props: any) => {
  const history = useHistory();
  const [userState, setUserState] = useState({
      loggedIn: false
    } as UserState
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    setUserState((state) => {
      const newUserState = {
        ...state,
        loggedIn: !!accessToken
      }
      
      if (newUserState.loggedIn) {
        
      } else {
        window.location.assign('/login');
      }
      return newUserState;
    });
  }, [history.location]);

  useEffect(() => {
    
  }, [userState.loggedIn])

  return (
    <AppContext.Provider value={{
        user: userState,
        startLoading: () => setIsLoading(true),
        stopLoading: () => setIsLoading(false),
        isLoading
      }
    }>
      {userState.loggedIn && props.children}
    </AppContext.Provider>
  )
}