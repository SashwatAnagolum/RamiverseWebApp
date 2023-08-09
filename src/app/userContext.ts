import { createContext } from 'react';

const userContext = createContext({
    username: '',
    setUsername: (arg0: string) => { }
});

export default userContext;