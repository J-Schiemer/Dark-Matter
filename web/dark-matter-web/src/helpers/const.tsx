export const API_HOST: string =
    import.meta.env.MODE === 'development'
        ? 'http://localhost:5103'
        : import.meta.env.API_HOST_ADDRESS; // API_HOST_ADDRESS contains the production API host address.
