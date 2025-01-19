import {
    useContext,
    createContext,
    type PropsWithChildren,
    useMemo,
} from 'react';
import { jwtDecode } from 'jwt-decode';
import { DarkMatterClient } from '../client/DarkMatterClient';
import { useSession } from './session-provider';
import { API_HOST } from '../helpers/const';

// Shamelessly stolen by yours truly (JS) from the Mobile App.

const ClientContext = createContext<{
    client?: DarkMatterClient | null;
}>({});

// This hook can be used to access the user info.
export function useClient() {
    const value = useContext(ClientContext);
    if (!value) {
        throw new Error('useClient must be wrapped in a <ClientProvider/>');
    }

    return value;
}

export function ClientProvider({ children }: Readonly<PropsWithChildren>) {
    const { sessionToken, sessionId, signIn, signOut } =
        useSession();

    const client = useMemo(() => {
        return new DarkMatterClient(API_HOST, {
            async fetch(
                url: RequestInfo,
                init: RequestInit | undefined
            ): Promise<Response> {
                if (sessionToken) {
                    const token = jwtDecode(sessionToken);
                    const now = Date.now() / 1000;

                    if ((token.exp ?? 0) < now) {
                        signOut();
                    }
                }

                for (let index = 0; index < 2; index++) {
                    if (sessionToken) {
                        init = init || {};
                        init.headers = {
                            ...init.headers, // Spread existing headers if there are any
                            Authorization: `Bearer ${sessionToken}`,
                        };
                    }

                    const result = await fetch(url, init);

                    if (result.status === 401) {
                        // not authenticated
                        break;
                    } else {
                        return result;
                    }
                }

                signOut();
                throw new Error( 'Authentication issue' + 'You are not logged in');
            },
        });
    }, [sessionId, sessionToken, signIn, signOut]);

    return (
        <ClientContext.Provider
            value={{
                client,
            }}
        >
            {children}
        </ClientContext.Provider>
    );
}
