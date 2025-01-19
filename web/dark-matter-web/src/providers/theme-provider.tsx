import {
    useContext,
    createContext,
    type PropsWithChildren,
    useState,
    useEffect,
} from 'react';

const THEME_KEY = "theme-preference-override";

const ThemeContext = createContext<{
    toggle: () => void;
}>({ toggle: () => {} });

// This hook can be used to access the user info.
export function useTheme() {
    const value = useContext(ThemeContext);
    if (!value) {
        throw new Error('useTheme must be wrapped in a <ThemeProvider/>');
    }

    return value;
}

export function ThemeProvider({ children }: Readonly<PropsWithChildren>) {

    const [ dark, setDark ] = useState(false);

    useEffect(() => {
        const value = window.localStorage.getItem(THEME_KEY);
        if (value === "dark") {
            setDark(true);
            setTheme(true);
        } else if (value == "light") {
            setTheme(false);
        }
    }, []);

    const toggle = () => {
        console.log(!dark);
        setDark(!dark);
        window.localStorage.setItem(THEME_KEY, !dark ? "dark" : "light");
        setTheme(!dark);
    }

    const setTheme = (dark: boolean) => {
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    }

    return (
        <ThemeContext.Provider
            value={{
                toggle: toggle,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
