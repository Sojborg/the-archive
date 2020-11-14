import React, { createContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

interface UserState {
  loggedIn: boolean;
}

interface IAppContext {
  user: UserState
}

export const AppContext = createContext({} as IAppContext);

export const AppProvider = (props: any) => {
  const history = useHistory();
  const [userState, setUserState] = useState({
      loggedIn: false
    } as UserState
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = window.localStorage.getItem('access_token');
    const newUserState = {
      ...userState,
      loggedIn: !!accessToken
    }
    setUserState(newUserState);
    if (newUserState.loggedIn) {
      setIsLoading(false);
    } else {
      window.location.assign('/login');
    }
  }, [history.location]);

  useEffect(() => {
    
  }, [userState.loggedIn])

  return (
    <AppContext.Provider value={{
        user: userState
      }
    }>
      {isLoading ? <h1>Loading...</h1> : props.children}
    </AppContext.Provider>
  )
}