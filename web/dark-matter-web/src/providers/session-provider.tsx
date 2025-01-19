import {
    useContext,
    createContext,
    type PropsWithChildren,
    useState,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

export interface User {
    userId: string;
    username: string;
    email: string;
    roles: string[] | null;
    displayname: string;
}

interface JwtUser {
    email: string;
    unique_name: string;
    sub: string;
    name: string;
    jti: string;
    role: string | string[];
    nbf: number;
    exp: number;
    iat: number;
    iss: string;
    aud: string;
}

const AuthContext = createContext<{
    signIn: (
        sessionToken: string,
        sessionId: string
    ) => void;
    signOut: () => void;
    getUser: () => User | null;
    sessionId?: string | null;
    sessionToken?: string | null;
    refreshToken?: string | null;
}>({
    signIn: (_sessionToken: string, _sessionId: string) =>
        null,
    signOut: () => null,
    getUser: () => null,
    sessionId: null,
    sessionToken: null,
    refreshToken: null,
});

// This hook can be used to access the user info.
export function useSession() {
    const value = useContext(AuthContext);
    return value;
}

export function SessionProvider({ children }: Readonly<PropsWithChildren>) {
    // Use local state - this state will not be persisted! You get logged out when the tab is closed
    // This is also a good idea for security purposes of the admin panel
    const [session, setSession] = useState<string | null>(null);
    const [sessionId, setSessionId] = useState<string | null>(null);

    let navigate = useNavigate();

    return (
        <AuthContext.Provider
            value={{
                signIn: (
                    sessionToken: string,
                    sessionId: string
                ) => {
                    setSession(sessionToken);
                    setSessionId(sessionId);
                },
                signOut: () => {
                    setSession(null);
                    setSessionId(null);
                    navigate('/login');
                },
                getUser: () => {
                    return tokenToUser(session ?? '');
                },
                sessionToken: session,
                sessionId: sessionId,
            }}
        >
            {children}
        </AuthContext.Provider>
    );

    function tokenToUser(sessionToken: string) {
        const token = jwtDecode<JwtUser>(sessionToken ?? '');

        return {
            userId: token.sub,
            username: token.unique_name,
            email: token.email,
            roles: Array.isArray(token.role) ? token.role : [token.role],
            displayname: token.name,
        };
    }
}
